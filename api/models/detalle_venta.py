from django.db import models
from api.models import Factura, Producto


class DetalleDeVenta(models.Model):
    """ Modelo de detalle venta """
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='producto_detalle',
                                    blank=False, null=False)
    factura = models.ForeignKey(Factura, on_delete=models.CASCADE, related_name='factura_detalle',
                                    blank=False, null=False)
    subtotal = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False)
    cantidad = models.PositiveIntegerField(null=False, blank=False)
    
    # campos estandares
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, *args):
        self.activo = False
        self.save()
        return True
