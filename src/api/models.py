from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=150)

    groups = models.ManyToManyField(
            Group,
            related_name='custom_user_groups',
            blank=True,
            help_text="The groups this user belongs to.",
            verbose_name="groups",
    )
    user_permissions = models.ManyToManyField(
            Permission,
            related_name='custom_user_permissions',
            blank=True,
            help_text="Specific Permissions for this user.",
            verbose_name="user permissions",
        )
    def __str__(self) -> str:
        return str(self.full_name)
