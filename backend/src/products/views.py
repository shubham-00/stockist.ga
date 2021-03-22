from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import ProductSerializer
from .models import Product
from companies.models import Company


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_view(request):
    # user validation
    if not request.user.profile.company:
        return Response({"error": "Access denied!"})

    # data validation
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        product = Product(**serializer.validated_data)
        product.company = request.user.profile.company
        product.current = product.opening
        product.save()
        return Response(serializer.validated_data)

    else:
        return Response(serializer.errors)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def list_view(request):
    # user validation
    if not request.user.profile.company:
        return Response({"error": "Access denied!"})

    # data validation
    queryset = Product.objects.filter(company=request.user.profile.company)
    serializer = ProductSerializer(instance=queryset, many=True)
    return Response(serializer.data)
