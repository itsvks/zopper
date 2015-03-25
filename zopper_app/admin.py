from django.contrib import admin
from zopper_app.models import Device
# Register your models here.

class DeviceAdmin(admin.ModelAdmin):
	model = Device
	list_display = ('id', 'device_name', 'range')
	ordering = ('id',)

admin.site.register(Device, DeviceAdmin)