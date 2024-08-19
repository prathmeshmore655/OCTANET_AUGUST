from django.contrib import admin
from .models import *

class ToDoDataAdmin(admin.ModelAdmin):
    list_display = ('task', 'description', 'due_date', 'priority', 'status')
    search_fields = ('task', 'description','due_date', 'priority', 'status')

admin.site.register(ToDoData, ToDoDataAdmin)
