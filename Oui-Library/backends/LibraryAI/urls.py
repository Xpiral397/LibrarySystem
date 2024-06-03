from django.urls import path, include


urlpatterns = [
   path('user/', include('users.urls')),
   path('admin/', include('admins.urls')),
   path('routes/', include('share.urls'))
]
