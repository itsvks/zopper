from django.db import models

# Create your models here.

class Device(models.Model):
    device_name = models.CharField(max_length=255)
    range = models.IntegerField()