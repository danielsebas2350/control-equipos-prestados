from django.contrib import admin
from .models import TipoEquipo, Ubicacion, Persona, Equipo, Prestamo

# Registrar cada modelo para que aparezca en el admin
admin.site.register(TipoEquipo)
admin.site.register(Ubicacion)
admin.site.register(Persona)
admin.site.register(Equipo)
admin.site.register(Prestamo)