from typing import List
from .utils import getclasses
from django.views.generic.base import ContextMixin

def get_title(defaultName: str) -> str:
    return "hackACI - " + defaultName

def get_class_list(moduleName: str, appendList: List) -> List:
    classes = getclasses.return_classes(moduleName)
    for cls in classes:
        if hasattr(cls, "name") and not hasattr(cls, "ignoreRender"):
            appendList.append(cls.name)
    appendList.insert(0, appendList.pop(appendList.index("Home")))
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
        return context
