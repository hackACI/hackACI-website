from django.views.generic import TemplateView
# Create your views here.

class IndexView(TemplateView):
    template_name = "home.html"
    title = "Home"
    documentTitle = "" # root will be hackACI

class AboutView(TemplateView):
    template_name = "about.html"
    title = "About Us"
    documentTitle = " - About"

