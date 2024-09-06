from django.urls import include, path
from src.api import urls as apiurls
from src import views  
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", views.IndexView.as_view(), name=views.IndexView.name),
    path("api/", include(apiurls)),
    path("aboutus/", views.AboutView.as_view(), name=views.AboutView.name),
    path("search/", views.SearchView.as_view(), name=views.SearchView.name),
    path("events/", views.EventView.as_view(), name=views.EventView.name),
    path("account/", views.AccountView.as_view(), name=views.AccountView.name),
    path("login/", views.LoginView.as_view(), name=views.LoginView.name),
]

if settings.DEBUG:
    # static files (images, css, javascript, etc.)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
