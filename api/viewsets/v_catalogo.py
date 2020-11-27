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
    search_fields = ("nombre", "descripcion")
    ordering_fields = ("creado")


    def get_queryset(self):
        if self.request.user and self.action == 'list':
            return Producto.objects.filter(activo=True).exclude(vendedor__id=self.request.user.id)
        else:
            return Producto.objects.filter(activo=True)


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

    def create(self, request):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def update(self, request):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    @action(methods=["get"], detail=False)
    def detalleProducto(self, request, *args, **kwargs):
        datos = request.query_params
        el_id = datos['id'][:-1]
        print('datos', el_id)

        datos_productos = Producto.objects.filter(
                                            activo=True,
                                            pk=int(el_id),
                                            existencia__gt=0
                                        ).values('id', 'nombre', 'descripcion', 'precio_venta','existencia')
        if (datos_productos):
            return Response({'results': datos_productos }, status=status.HTTP_200_OK)
        else:
            return Response({'results': 'no existe el producto'}, status=status.HTTP_400_BAD_REQUEST)
    