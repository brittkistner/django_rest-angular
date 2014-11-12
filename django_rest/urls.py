from django.conf.urls import patterns, include, url
from django.contrib import admin
from rest_framework import routers
from rest_framework.authtoken import views
from portfolio.api.views import ProjectViewSet, UserViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, base_name='users')
router.register(r'projects', ProjectViewSet, base_name='projects')

urlpatterns = patterns('',
    url(r'^', include(router.urls)), # Include router urls into our urlpatterns
    url(r'rest/$', 'portfolio.views.projects', name='projects'),
    # url(r'rest$', 'portfolio.views.detail', name='detail'),
    url(r'^angular/$', 'portfolio.views.index', name="index"),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    #Post for Auth Token
    url(r'^api-token-auth/', views.obtain_auth_token),
    url(r'^admin/', include(admin.site.urls)),
)
