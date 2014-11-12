from rest_framework import viewsets, status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response
from portfolio.api.permissions import IsOwnerOrReadOnly
from portfolio.api.serializers import ProjectSerializer, UserSerializer

from portfolio.models import Project, User

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # lookup_field = 'username'
    filter_fields = ('id', 'first_name', 'last_name',)
    # /users/?search=rudy searches across all listed fields
    search_fields = ('first_name', 'last_name', 'about')
    # /users/?ordering=first_name orders by first name alphabetically
    ordering_fields = ('first_name', 'last_name')
    # /users/ default ordering is by the highest id
    ordering = ('-id',)

    @list_route()
    def recent_users(self, request):
        # print User.objects.all().order_by('username')
        recent_users = User.objects.all().order_by('-last_login')
        page = self.paginate_queryset(recent_users)
        serializer = self.get_pagination_serializer(page)
        return Response(serializer.data)

    @list_route(methods=['post'])
    def register(self, request):
        user = User.objects.create_user(
            username=request.DATA.get('username', None),
            password=request.DATA.get('password', None))
        token = Token.objects.get(user=user)
        user = User.objects.get(auth_token=token)
        # print token
        serializer = self.serializer_class(user)

        # print serializer.data
        return Response(serializer.data)
        # return Response(status=status.HTTP_200_OK)



class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    #First way to filter
    filter_fields = ('owner__username',)
    ordering = ('created_time')
    permission_classes = (IsOwnerOrReadOnly,)

    def pre_save(self, obj):
        obj.owner = self.request.user

    #Second way to filter
    def get_queryset(self):
        queryset = Project.objects.all()
        username = self.request.QUERY_PARAMS.get('username', None)
        if username is not None: # Optionally filters against 'username' query param
            queryset = queryset.filter(owner__username=username)
        return queryset

    #create a detail route
    @detail_route(methods=['post'])
    def follow(self, request, pk):
        project = Project.objects.get(pk=pk)
        # follower_id = request.DATA.get('follower', None)
        project.follower.add(request.user)
        return Response(status=status.HTTP_200_OK)

    @detail_route(methods=['delete'])
    def unfollow(self, request, pk):
        project = Project.objects.get(pk=pk)
        project.follower.remove(request.user)
        return Response(status=status.HTTP_200_OK)