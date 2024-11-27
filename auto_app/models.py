from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=12, unique=True, blank=False)
    password = models.CharField()

    def __str__(self):
        return self.username