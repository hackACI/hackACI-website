from django.urls.conf import path, include
from rest_framework.authtoken.views import obtain_auth_token
from src.api import views

urlpatterns = [
    path('login/', views.LoginView.as_view(), name=views.LoginView.name),
    path('register/', views.RegisterView.as_view(), name=views.RegisterView.name),
    path('api-token-auth/', obtain_auth_token, name='API Token Auth'),
    path('users/', views.UserList.as_view(), name=views.UserList.name),
    path('users/<int:pk>', views.UserDetail.as_view(),name=views.UserDetail.name),
    path('users/<int:pk>/delete', views.UserDelete.as_view(), name=views.UserDelete.name),
]
