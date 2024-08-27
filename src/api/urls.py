from django.urls.conf import path, include
from rest_framework.authtoken.views import obtain_auth_token
from src.api import views

urlpatterns = [
    path('login/', views.LoginView.as_view(), name=views.LoginView.name),
    path('logout/', views.LogoutView.as_view(), name=views.LogoutView.name),
    path('register/', views.RegisterView.as_view(), name=views.RegisterView.name),
    path('api-token-auth/', obtain_auth_token, name='API Token Auth'),
    path('users/', views.UserList.as_view(), name=views.UserList.name),
    path('search/', views.PageSearchView.as_view(), name=views.PageSearchView.name),
    #allow for users search and delete by id 
    path('users/<int:pk>', views.UserDetail.as_view(),name=views.UserDetail.name),
    path('users/<int:pk>/delete', views.UserDelete.as_view(), name=views.UserDelete.name),
    path('users/me/', views.CurrentUserView.as_view(), name=views.CurrentUserView.name)
]
