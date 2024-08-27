from django.urls import reverse
from django.db import models
# Create your models here.
class Page(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField()

    def __str__(self):
        return self.title

    def get_url(self) -> str:
        return reverse(self.title)

    @property
    def url(self):
        return self.get_url()
