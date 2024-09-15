from django.urls import reverse_lazy
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from src.mixins import CommonContextMixin
from .models import Event
from django.utils import timezone
from datetime import timedelta

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
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        now = timezone.now()
        context['old_events'] = Event.objects.filter(date__lt=now - timedelta(days=30)).order_by('-date')
        context['current_events'] = Event.objects.filter(date__range=(now - timedelta(days=7), now)).order_by('-date')
        context['order'] = Event.objects.all().order_by('order')
        return context
    

class LoginView(CommonContextMixin, TemplateView):
    template_name = "login.html"
    name = "Login"
    

class AccountView(LoginRequiredMixin, CommonContextMixin, TemplateView):
    template_name = "account.html"
    name = "Profile"
    login_url = reverse_lazy("Login")

class SponsorView(CommonContextMixin, TemplateView):
    template_name = "sponsors.html"
    name = "Sponsors"
    ignoreRender = True


