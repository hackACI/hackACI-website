from django.urls import include, path
from src.api import urls as apiurls
from src import views  

urlpatterns = [
    path("", views.IndexView.as_view(), name=views.IndexView.name),
    path("api/", include(apiurls)),
    path("aboutus/", views.AboutView.as_view(), name=views.AboutView.name),
    path("search/", views.SearchView.as_view(), name=views.SearchView.name),
    path("events/", views.EventView.as_view(), name=views.EventView.name),
    path("login/", views.LoginView.as_view(), name=views.LoginView.name),
    path("register/", views.RegisterView.as_view(), name=views.RegisterView.name)
]
