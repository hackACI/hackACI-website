from typing import List
from .utils import getclasses
from django.views.generic.base import ContextMixin

def get_title(defaultName: str) -> str:
    return "hAckCI - " + defaultName

def get_class_list(moduleName: str, appendList: List) -> List:
    classes = getclasses.return_classes(moduleName)
    for cls in classes:
        ignoreRender = getattr(cls, "ignoreRender", None)
        if hasattr(cls, "name") and ignoreRender is not True:
            appendList.append(cls.name)
    if "Home" in appendList:
        appendList.insert(0, appendList.pop(appendList.index("Home")))
    if "Profile" in appendList:
        index = len(appendList) - 2
        appendList.insert(index, appendList.pop(appendList.index("Profile")))
    return appendList

class CommonContextMixin(ContextMixin):
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        name = getattr(self, "name", None) #return None if no name
        if name:
            context['documentTitle'] = get_title(name)
            classes_in_file = []
            classes_in_file = get_class_list(self.__module__, classes_in_file)
            context['url_list'] =  classes_in_file
            if self.request.user.is_authenticated:
                context['username'] = self.request.user.username
                context['is_admin'] = self.request.user.is_superuser
            else:
                context['is_admin'] = False
        return context
