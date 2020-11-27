from django.db import models
from api.models.cliente import Cliente


class Factura(models.Model):
    """ Modelo para facturacion """
    fecha = models.DateTimeField(auto_now_add=True, blank=False, null=False)
    direccion = models.CharField(max_length=250, null=True, blank=True)
    nit = models.CharField(max_length=15, null=True, default='C/F', blank=True)
    total = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False)
    comprador = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='comprador',
                                    blank=False, null=False)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, *args):
        self.activo = False
        self.save()
        return True