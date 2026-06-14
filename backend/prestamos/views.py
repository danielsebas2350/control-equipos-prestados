from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count, Q
from .models import TipoEquipo, Ubicacion, Persona, Equipo, Prestamo
from .serializers import (
    TipoEquipoSerializer, UbicacionSerializer, PersonaSerializer,
    EquipoSerializer, PrestamoSerializer
)

class TipoEquipoViewSet(viewsets.ModelViewSet):
    queryset = TipoEquipo.objects.all()
    serializer_class = TipoEquipoSerializer

class UbicacionViewSet(viewsets.ModelViewSet):
    queryset = Ubicacion.objects.all()
    serializer_class = UbicacionSerializer

class PersonaViewSet(viewsets.ModelViewSet):
    queryset = Persona.objects.all()
    serializer_class = PersonaSerializer

class EquipoViewSet(viewsets.ModelViewSet):
    queryset = Equipo.objects.all()
    serializer_class = EquipoSerializer

class PrestamoViewSet(viewsets.ModelViewSet):
    queryset = Prestamo.objects.all()
    serializer_class = PrestamoSerializer

@api_view(['GET'])
def dashboard(request):
    total_equipos = Equipo.objects.count()
    equipos_disponibles = Equipo.objects.filter(estado='disponible').count()
    equipos_prestados = Equipo.objects.filter(estado='prestado').count()
    equipos_mantenimiento = Equipo.objects.filter(estado='mantenimiento').count()
    total_personas = Persona.objects.count()
    prestamos_activos = Prestamo.objects.count()  # si no tienes fecha_devolucion_real, todos son activos
    data = {
        'total_equipos': total_equipos,
        'equipos_disponibles': equipos_disponibles,
        'equipos_prestados': equipos_prestados,
        'equipos_mantenimiento': equipos_mantenimiento,
        'total_personas': total_personas,
        'prestamos_activos': prestamos_activos,
    }
    return Response(data)

@api_view(['GET'])
def equipos_disponibles(request):
    equipos = Equipo.objects.filter(estado='disponible')
    serializer = EquipoSerializer(equipos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def historial_prestamos(request):
    prestamos = Prestamo.objects.all().order_by('-fecha_desde')
    serializer = PrestamoSerializer(prestamos, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def registrar_prestamo(request):
    serializer = PrestamoSerializer(data=request.data)
    if serializer.is_valid():
        prestamo = serializer.save()
        equipo = prestamo.activo
        equipo.estado = 'prestado'
        equipo.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['PUT'])
def devolver_prestamo(request, pk):
    try:
        prestamo = Prestamo.objects.get(pk=pk)
        # Eliminamos el préstamo (no usamos fecha_devolucion_real)
        prestamo.delete()
        # El equipo vuelve a disponible
        equipo = prestamo.activo
        equipo.estado = 'disponible'
        equipo.save()
        return Response({'status': 'devolución registrada, préstamo eliminado'})
    except Prestamo.DoesNotExist:
        return Response({'error': 'Préstamo no encontrado'}, status=404)