from django.urls import include, path
from src.api import urls as apiurls
from src import views  

urlpatterns = [
    path("", views.IndexView.as_view(), name=views.IndexView.name),
    path("api/", include(apiurls)),
    path("aboutus/", views.AboutView.as_view(), name=views.AboutView.name),
]
