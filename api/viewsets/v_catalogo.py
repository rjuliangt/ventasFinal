from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from api.models import Producto
from api.serializers import ProductoReadSerializer, ProductoSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import permissions, exceptions

class CatalogoViewset(viewsets.ModelViewSet):
    queryset = Producto.objects.filter(activo=True)
    # print(self)
    # print(get__)
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre", "descripcion")
    search_fields = ("producto", "subtotal")
    ordering_fields = ("producto")

    def get_serializer_class(self):
        """Definiendo serializer para API"""
        if self.action == 'list' or self.action == 'retrieve':
            return ProductoReadSerializer
        else:
            return ProductoSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == "list" or self.action == "detalleProducto":
            permission_classes = [AllowAny]
        elif self.action == "catalogoDeOtrosVendedores":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    @action(methods=["get"], detail=False)
    def detalleProducto(self, request, *args, **kwargs):
        permission_classes = [AllowAny]
        datos = request.query_params
        datos_productos = Producto.objects.filter(
                                            activo=True,
                                            pk=int(datos['id'][0]),
                                            # existencia__gt=0
                                        ).values('id', 'nombre', 'descripcion', 'precio_venta','existencia')
        if (datos_productos):
            return Response({'results': datos_productos }, status=status.HTTP_200_OK)
        else:
            return Response({'results': 'no existe el producto'}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["get"], detail=False)
    def catalogoDeOtrosVendedores(self, request, *args, **kwargs):
        vendedor = request.user
        query2 = Producto.objects.filter(
                                            activo=True
                                        ).exclude(
                                                    vendedor=vendedor
                                                ).values('id', 'nombre',
                                                        'descripcion', 'precio_venta',
                                                        'existencia')
        print(query2)
        if (query2):
            return Response({'results': query2 }, status=status.HTTP_200_OK)
        else:
            return Response({'results': 'no existe producto'}, status=status.HTTP_400_BAD_REQUEST)