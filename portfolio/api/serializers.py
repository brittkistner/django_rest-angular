from rest_framework import serializers
from portfolio.models import User, Project

class UserSerializer(serializers.ModelSerializer):
    project_count = serializers.SerializerMethodField('get_project_count')
    followed_projects = serializers.SerializerMethodField('get_followed_projects')


    class Meta:
        model = User
        #Below is how we explicitly set what is being shown instead of showing everything.
        fields = ('id', 'project_count', 'followed_project', 'password', 'username', 'first_name', 'last_name', 'email', 'is_staff', 'date_joined', 'about')
        #Read only won't allow users to change these fields.
        # read_only_fields = ('date_joined', 'username')

    def get_project_count(self, obj):
        return obj.projects.count()

    def get_followed_projects(self, obj):
        return obj.followed_project

    def validate_password(self, attrs, source):
        """
        Check that the password created is longer than 4 characters
        """
        password = attrs[source]
        username= attrs[source]

        if password == username:
            raise serializers.ValidationError("Your username and password match.  Pick another password")
        return attrs

class ProjectSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)

    class Meta:
        model = Project