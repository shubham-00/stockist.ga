from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import EntrySerializer
from .models import Entry
from companies.models import Company
from products.models import Product


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_view(request):
    print(request.data)
    # user validation
    if not request.user.profile.company:
        print("user validation failed")
        return Response({"error": "Access denied!"})

    # product validation
    queryset = Product.objects.filter(pk=request.data.get("product"), company=request.user.profile.company)
    if not queryset.exists():
        print("product validation failed")
        return Response({"error": "Access denied!"})
    product = queryset.first()

    # data validation
    serializer = EntrySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        product.current += serializer.data.get("quantity")
        product.save()
        return Response(serializer.data)

    else:
        return Response(serializer.errors)


# @api_view(["PUT"])
# @permission_classes([IsAuthenticated])
# def edit_view(request):
#     # user validation
#     if not request.user.profile.company:
#         return Response({"error": "Access denied!"})

#     # company and product validation
#     product = None
#     queryset = Product.objects.filter(pk=request.data.get("pk"), company=request.user.profile.company)
#     if queryset.exists():
#         product = queryset.first()
#     else:
#         return Response({"error": "Access Denied!"})

#     # data validation
#     serializer = ProductSerializer(instance=product, data=request.data)
#     if serializer.is_valid():
#         # product.name = serializer.validated_data.get("name")
#         # product.description = serializer.validated_data.get("description")
#         # product.opening = serializer.validated_data.get("opening")
#         # product.unit = serializer.validated_data.get("unit")
#         # product.save()
#         serializer.save(current=product.current + serializer.validated_data.get("opening") - product.opening)

#         return Response(serializer.data)

#     else:
#         return Response(serializer.errors)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def list_view(request):
    # user validation
    if not request.user.profile.company:
        return Response({"error": "Access denied!"})

    # data validation
    product_queryset = Product.objects.filter(company=request.user.profile.company)
    queryset = []
    for product in product_queryset:
        queryset.extend(Entry.objects.filter(product=product))
    serializer = EntrySerializer(instance=queryset, many=True)
    print("Returning as below")
    print(serializer.data)
    return Response(serializer.data)
