from rest_framework import generics
from zopper_app.models import Device
from zopper_app.serializers import DeviceSerializer
from zopper_app.filters import DeviceFilter

# Create your views here.

class DeviceList(generics.ListCreateAPIView):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
#     filter_fields = ('device_name', 'range')
    filter_class =  DeviceFilter

class DeviceDetail(generics.RetrieveUpdateDestroyAPIView):
    model = Device
    serializer_class = DeviceSerializer