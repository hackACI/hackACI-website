from django.contrib import admin
from .models import Event
from .api.models import Page
# Register your models here.
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'is_recent', 'is_old')
    list_filter = ('date',)

@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ('title', 'date','description')
    list_filter = ('date',)

admin.AdminSite.site_header = "hAckCI Admin Panel"
