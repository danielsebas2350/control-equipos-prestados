from django.db import models

class TipoEquipo(models.Model):
    nombre = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nombre

class Ubicacion(models.Model):
    nombre = models.CharField(max_length=100)
    edificio = models.CharField(max_length=100)
    piso = models.CharField(max_length=50, blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.nombre} - {self.edificio}"

class Persona(models.Model):
    ci = models.CharField(max_length=20, primary_key=True)
    nombre = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    cargo = models.CharField(max_length=100)
    email = models.EmailField()
    telefono = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.nombre} {self.apellidos}"

class Equipo(models.Model):
    ESTADO_CHOICES = [
        ('disponible', 'Disponible'),
        ('prestado', 'Prestado'),
        ('mantenimiento', 'Mantenimiento'),
    ]
    marca = models.CharField(max_length=100)
    modelo = models.CharField(max_length=100)
    codigo_interno = models.CharField(max_length=100, unique=True)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='disponible')
    fecha_registro = models.DateField(auto_now_add=True)
    tipo = models.ForeignKey(TipoEquipo, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.marca} {self.modelo} ({self.codigo_interno})"

class Prestamo(models.Model):
    fecha_desde = models.DateField()
    fecha_hasta = models.DateField()
    activo = models.ForeignKey(Equipo, on_delete=models.CASCADE)
    responsable = models.ForeignKey(Persona, on_delete=models.CASCADE)
    ubicacion = models.ForeignKey(Ubicacion, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"Préstamo {self.id} - {self.activo.codigo_interno}"