from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed

class CookieTokenAuthentication(TokenAuthentication):
    def authenticate(self, request):
        # Look for the token in the cookies
        token = request.COOKIES.get('authToken')
        
        if not token:
            return None  # No token found, fallback to other authentication methods (if any)

        try:
            user, token = self.authenticate_credentials(token)
        except AuthenticationFailed:
            return None  # Invalid token
        
        return (user, token)
