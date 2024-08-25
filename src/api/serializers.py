from django.contrib.auth.models import User
from rest_framework import serializers
import re
import string 

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'id': {'read_only': True},
            'first_name': {'required': False, 'allow_blank': True},
            'last_name': {'required': False, 'allow_blank': True},
        }

    def validate_email(self, value):
        pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]*tdsb\.[a-zA-Z]+\.[a-zA-Z]+$'
        if not re.match(pattern, value):
            raise serializers.ValidationError("Invalid email format. Email must be a TDSB email.")
        return value

    def validate_password(self, value: str):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        if not any(char in string.punctuation for char in value):
            raise serializers.ValidationError("Password must contain a special character!")
        return value

    def validate(self, attrs):
        if not attrs.get("username"):
            raise serializers.ValidationError({"username": "This field is required."})
        if not attrs.get("email"):
            raise serializers.ValidationError({"email": "This field is required."})
        if not attrs.get("password"):
            raise serializers.ValidationError({"password": "This field is required."})
        
        return attrs

    def create(self, validated_data):
        validated_data['first_name'] = validated_data.get('first_name', '')
        validated_data['last_name'] = validated_data.get('last_name', '')

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        return user
