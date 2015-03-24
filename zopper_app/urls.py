from django.conf.urls import patterns, url
from zopper_app import views

urlpatterns = patterns('',
                    
    url(r'^$', views.DeviceList.as_view()),
    url(r'^(?P<pk>[0-9]+)/$', views.DeviceDetail.as_view()),
)