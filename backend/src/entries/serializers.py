from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Entry


class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = ["product", "quantity", "description"]

    def to_representation(self, instance):
        data = {
            "product": instance.pk,
            "quantity": instance.quantity,
            "name": instance.product.name,
            "user": instance.user.username,
            "description": instance.description or "",
        }
        return data
