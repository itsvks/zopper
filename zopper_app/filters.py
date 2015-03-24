from zopper_app.models import Device
import django_filters


class DeviceFilter(django_filters.FilterSet):
    min_range = django_filters.NumberFilter(name="range", lookup_type='gte')
    max_range = django_filters.NumberFilter(name="range", lookup_type='lte')
    class Meta:
        model = Device
        fields = ['device_name', 'range', 'min_range', 'max_range']