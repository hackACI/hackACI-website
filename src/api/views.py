from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status, generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.contrib.auth.models import User
from .serializers import UserSerializer
from django.conf import settings


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
            token, created = Token.objects.get_or_create(user=user)
            response = Response({
                'message': 'Login Successful!',
                'user': UserSerializer(user).data
            }, status=status.HTTP_200_OK)
            response.set_cookie(
                key='authToken',
                value=token.key,
                httponly=True, #no js access
                secure=settings.SECURE_SSL_REDIRECT, #cookies only work on https
                samesite='Lax'
            )
            return response
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

class UserList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    queryset = User.objects.all()
    serializer_class = UserSerializer
    name = "User List"

class UserDetail(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    queryset = User.objects.all()
    serializer_class = UserSerializer
    name = "User Details"

class UserDelete(generics.DestroyAPIView):
    permission_classes = [IsAdminUser] #only admins can delete

    queryset = User.objects.all()
    serializer_class = UserSerializer
    name = "User Delete"
