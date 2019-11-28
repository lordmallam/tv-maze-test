from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'watchlists', views.WatchlistViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api/shows', view=views.get_url, name='get-url'),
    path('api/shows/<str:id>', view=views.get_url, name='get-url'),
    path('api/search/shows', view=views.get_url, name='get-url'),
]
