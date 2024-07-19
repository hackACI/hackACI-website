from django.urls import include, path
from src.api import urls as apiurls
from src import views  

urlpatterns = [
    path("", views.IndexView.as_view(), name="home"),
    path("api/", include(apiurls)),
    path("aboutus/", views.AboutView.as_view(), name="About Us"),
]
