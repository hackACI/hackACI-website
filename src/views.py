from django.views.generic import TemplateView
# Create your views here.

class IndexView(TemplateView):
    template_name = "home.html"
    name = "Home"
    documentTitle = "hackACI" # root will be hackACI

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["documentTitle"] = self.documentTitle
        return context

class AboutView(TemplateView):
    template_name = "about.html"
    name = "About Us"
    documentTitle = "hackACI - About"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["documentTitle"] = self.documentTitle
        return context
