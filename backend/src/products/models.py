from django.db import models
from companies.models import Company


class Product(models.Model):
    name = models.CharField(max_length=500)
    description = models.TextField(null=True, blank=True)
    opening = models.FloatField(default=0)
    current = models.FloatField(default=0)
    unit = models.CharField(max_length=500)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
