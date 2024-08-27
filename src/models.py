from datetime import timedelta
from django.db import models
from django.utils import timezone

# For Events.html
class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField()
    registration_deadline = models.DateTimeField(blank=True, null=True)#optionally blank

    location = models.CharField(max_length=80)
    order = models.IntegerField(blank=True, null=True)
    image = models.ImageField(upload_to='event_images/', blank=True, null=True)

    def __str__(self) -> str:
        return str(self.title) #for linting purposes

    @property
    def is_recent(self) -> bool:
        return self.date > timezone.now() - timedelta(days=7)

    @property
    def is_old(self) -> bool:
        return self.date < timezone.now() - timedelta(days=30)


