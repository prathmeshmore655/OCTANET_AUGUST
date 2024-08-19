from django.db import models
from django.contrib.auth.models import User


class ToDoData(models.Model):
    
    user = models.OneToOneField(User , on_delete=models.CASCADE)
    task = models.CharField(max_length=20)
    description = models.CharField(max_length=100)
    due_date = models.DateTimeField()
    priority = models.CharField(max_length=10)
    status = models.BooleanField(default=False)
    
    def __str__(self):
        return self.task

