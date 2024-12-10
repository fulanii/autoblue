from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from autoblue_django.utils import get_env_variable
from cryptography.fernet import Fernet


class BlueskyProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bluesky_username = models.CharField(max_length=255)
    bluesky_password = models.CharField(blank=True, null=True)

    def save(self, *args, **kwargs):
        fernet = Fernet(get_env_variable("ENCRYPTION_KEY"))
        self.bluesky_password = fernet.encrypt(self.bluesky_password.encode()).decode()
        super().save(*args, **kwargs)

    def decrypt_bluesky_password(self):
        fernet = Fernet(get_env_variable("ENCRYPTION_KEY"))
        return fernet.decrypt(self.bluesky_password.encode()).decode()


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    post = models.TextField(null=False, blank=False)
    posting_date = models.DateTimeField(null=False, blank=False)
    is_posted = models.BooleanField(default=False)
