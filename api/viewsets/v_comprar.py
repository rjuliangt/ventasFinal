from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status, filters
from django.db import transaction
import json

from api.models import Factura, Cliente, DetalleDeVenta, Producto
from django.contrib.auth.models import User
from api.serializers import FacturaSerializer, FacturaReadSerializer, FacturaCreateSerializer, FacturaCreateCompraSerializer


class ComprarViewset(viewsets.ModelViewSet):
    queryset = Producto.objects.filter(activo=True)
    # queryset2 = Cliente.objects.filter(is_active=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("comprador__first_name", "direccion")
    search_fields = ("comprador__first_name", "direccion")
    ordering_fields = ("creado")

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == "list" or self.action == "create":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    # def get_serializer_class(self):
    #     """Definiendo serializer para API"""
    #     if self.action == 'list' or self.action == 'retrieve':
    #         return FacturaCreateCompraSerializer
    #     elif self.action == 'create':
    #         return FacturaCreateCompraSerializer
    #     else:
    #         return FacturaCreateCompraSerializer


    def create(self, request, *args, **kwargs):
        print('llego')
        try:
            print('entro al try')
            datos = request.data
            with transaction.atomic():
                print('entro al la transaccion')
                # datosUser = request.user
                print('data' , datos)
                print('nombre', datos['first_name'])
                print('nombre', datos['last_name'])
                # print(data[])
                comprador = Cliente.objects.create(username=datos['first_name'] + datos['last_name'], first_name=datos['first_name'], last_name=datos['last_name'])
                comprador.save()
                producto = Producto.objects.get(pk=datos['id'])
                nit = 'c/f'
                print('data comprador' , comprador)
                print('data producto' , producto)

                if (datos['nit']):
                    nit = datos['nit']
                resultado = float(datos['cantidad']) * float(producto.precio_venta)
                if(producto.existencia > 0):
                    factura = Factura.objects.create(
                                        activo=True,
                                        comprador=comprador,
                                        direccion=datos['direccion'],
                                        total=0,
                                        nit=nit
                                    )
                    detalle = DetalleDeVenta.objects.create(
                                            producto=producto,
                                            cantidad=datos['cantidad'],
                                            subtotal=float(resultado),
                                            activo=True,
                                            factura=factura
                                            )
                    producto.existencia -= int(datos['cantidad'])
                    factura.total = resultado
                    factura.save()
                    producto.save()

                return Response({'results': 'se creo con exito'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'details': str(e)}, status=status.HTTP_400_BAD_REQUEST)