from django.views.generic import TemplateView
# Create your views here.

class IndexView(TemplateView):
    template_name = "home.html"

class AboutView(TemplateView):
    template_name = "about.html"
