from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    TipoEquipoViewSet, UbicacionViewSet, PersonaViewSet,
    EquipoViewSet, PrestamoViewSet,
    dashboard, equipos_disponibles, historial_prestamos,
    registrar_prestamo, devolver_prestamo
)

router = DefaultRouter()
router.register(r'tipos-equipo', TipoEquipoViewSet)
router.register(r'ubicaciones', UbicacionViewSet)
router.register(r'personas', PersonaViewSet)
router.register(r'equipos', EquipoViewSet)
router.register(r'prestamos', PrestamoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/', dashboard),
    path('equipos-disponibles/', equipos_disponibles),
    path('historial/', historial_prestamos),
    path('registrar-prestamo/', registrar_prestamo),
    path('devolver/<int:pk>/', devolver_prestamo),
]