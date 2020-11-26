from django.db import models
# from django.conf import settings
from django.contrib.auth.models import User


class Producto(models.Model):
    """ Modelo de producto """
    nombre = models.CharField(max_length=350,blank=False, null=False)
    descripcion = models.CharField(max_length=400, null=False, blank=False)
    precio_compra = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False)
    precio_venta = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False)
    vendedor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='vendedor_producto',
                                    blank=False, null=False)
    existencia = models.PositiveIntegerField(default=0, null=False, blank=False)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, *args):
        self.active = False
        self.save()
        return True