from django.db import models


#crear modelo para Homes - base de datos-
class Home(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=5000)
    price = models.IntegerField()
    location = models.CharField(max_length=100)
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    images = models.ImageField(upload_to='home_images/', null=True, blank=True)
    sqfoot = models.IntegerField()

    #para la base de datos, como se veran las casas, (nombre y descripcion)
    def __str__(self):
        return self.title #puede agregar + ''+ self.descrition

