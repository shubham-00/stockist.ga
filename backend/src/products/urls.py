from django.urls import path
from .views import create_view, list_view

app_name = "products"

urlpatterns = [
    path("create/", create_view, name="create"),
    path("list/", list_view, name="list"),
]
