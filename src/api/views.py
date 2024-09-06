from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.contrib.auth.models import User
from .serializers import UserSerializer, PageSerializer
from .models import Page

class LogoutView(APIView):
    name = "auth-logout"
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Clear the authentication cookie
        logout(request)

        response = Response({
            'message': 'Logout successful!'
        }, status=status.HTTP_200_OK)
        # make sure to delete cookiiiie!
        response.delete_cookie('sessionid')
        return response


class RegisterView(APIView):
    name = "auth-register"
    authentication_classes = []
    permission_classes = []
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        print(serializer.initial_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        #else, return
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    name = "auth-login"
    authentication_classes = []
    permission_classes = []
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)

            response = Response({
                'message': 'Login Successful!',
                'user': UserSerializer(user).data
            }, status=status.HTTP_200_OK)
            return response
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

class UserList(generics.ListAPIView):
    #TODO, make into admin user
    permission_classes = [IsAuthenticated]

    queryset = User.objects.all()
    serializer_class = UserSerializer
    name = "User List"

class UserDetail(generics.RetrieveAPIView):
    #TODO, make into admin user
    permission_classes = [IsAuthenticated]

    queryset = User.objects.all()
    serializer_class = UserSerializer
    name = "User Details"

class UserDelete(generics.DestroyAPIView):
    permission_classes = [IsAdminUser] #only admins can delete

    queryset = User.objects.all()
    serializer_class = UserSerializer
    name = "User Delete"

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]
    name = "Current User"

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        
        is_admin = user.is_staff or user.is_superuser
        response_data = {
            'data': serializer.data,
            'is_admin': is_admin
        }
        return Response(response_data)

class CurrentUserDelete(APIView):
    permission_classes = [IsAuthenticated]
    name = "Current User Delete"

    def delete(self, request):
        user = request.user

        user.delete() #deletes user from db

        return Response({"message": "Your account has been deleted."})

class PageSearchView(APIView):
    authentication_classes = []
    permission_classes = []
    name = "Search"

    def get(self, request):
        query = request.GET.get('q', '')
        if query:
            pages = Page.objects.filter(title__icontains=query)
            serializer = PageSerializer(pages, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"error": "No search query provided"}, status=status.HTTP_400_BAD_REQUEST)

