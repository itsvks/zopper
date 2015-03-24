from rest_framework import serializers
from zopper_app.models import Device

# Create your serializers here.

class DeviceSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Device