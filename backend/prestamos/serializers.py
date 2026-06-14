from rest_framework import serializers
from .models import TipoEquipo, Ubicacion, Persona, Equipo, Prestamo

class TipoEquipoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoEquipo
        fields = '__all__'

class UbicacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ubicacion
        fields = '__all__'

class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = '__all__'

class EquipoSerializer(serializers.ModelSerializer):
    tipo_nombre = serializers.CharField(source='tipo.nombre', read_only=True)

    class Meta:
        model = Equipo
        fields = '__all__'

class PrestamoSerializer(serializers.ModelSerializer):
    activo_codigo = serializers.CharField(source='activo.codigo_interno', read_only=True)
    responsable_nombre = serializers.CharField(source='responsable.nombre', read_only=True)
    responsable_apellidos = serializers.CharField(source='responsable.apellidos', read_only=True)
    ubicacion_nombre = serializers.CharField(source='ubicacion.nombre', read_only=True)

    class Meta:
        model = Prestamo
        fields = '__all__'