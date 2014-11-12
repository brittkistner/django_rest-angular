from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django_rest import settings


class User(AbstractUser):
    about = models.TextField(null=True)
    # token = models.OneToOneField(Token, through)


    def __unicode__(self):
        return u"{}".format(self.username)

    @receiver(post_save, sender=settings.AUTH_USER_MODEL)
    def create_auth_token(sender, instance=None, created=False, **kwargs):
        if created:
            Token.objects.create(user=instance)

class Project(models.Model):
    title = models.CharField(max_length=75)
    description = models.TextField()
    owner = models.ForeignKey(User, related_name="projects")
    follower = models.ManyToManyField(User, related_name="followed_project", null=True, blank=True)
    created_time = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return self.title

# from django.contrib.auth.models import User
# from rest_framework.authtoken.models import Token
#
# for user in User.objects.all():
#     Token.objects.get_or_create(user=user)