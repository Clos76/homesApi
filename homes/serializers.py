#serializer class to make things like JSON going from python object -> JSON

from rest_framework import serializers 
from .models import Home

class HomeSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Home
        fields = ['id', 'title', 'description', 'price', 'location', 'bedrooms', 'bathrooms', 'sqfoot','images' ]