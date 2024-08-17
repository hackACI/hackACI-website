from django.views.generic import TemplateView
from src.mixins import CommonContextMixin

class IndexView(CommonContextMixin, TemplateView):
    template_name = "home.html"
    name = "Home"

class SearchView(CommonContextMixin, TemplateView):
    template_name = "search.html"
    name = "Search"
    ignoreRender = True #ignores rendering for header + footer

class AboutView(CommonContextMixin, TemplateView):
    template_name = "about.html"
    name = "About Us"

class EventView(CommonContextMixin, TemplateView):
    template_name = "events.html"
    name = "Events"

class LoginView(CommonContextMixin, TemplateView):
    template_name = "login.html"
    name = "Login"

class RegisterView(CommonContextMixin, TemplateView):
    template_name = "register.html"
    name = "Register"
    ignoreRender = True
