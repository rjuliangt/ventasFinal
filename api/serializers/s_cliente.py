from rest_framework import serializers
from api.models import Cliente


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'


class ClienteCrearSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = (
                'first_name',
                'last_name',
            )
