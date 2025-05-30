from django.shortcuts import render
from django.http import JsonResponse
from .models import Home
from .serializers import HomeSerializer
from django_ratelimit.decorators import ratelimit
from django.contrib.auth import authenticate


#from ratelimit.decorators import ratelimit

# DRF imports
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

#import user for user registration
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny  #since post is protected need to pass this

# Function-Based Views with JWT Authentication
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def home_list(request, format=None):
    if request.method == 'GET':
        homes = Home.objects.all()
        serializer = HomeSerializer(homes, many=True)
        return Response({'homes': serializer.data})

    elif request.method == 'POST':
        if not request.user.is_staff:
            return Response({'detail': 'Solo Administradores pueden agregar casas'}, status=status.HTTP_403_FORBIDDEN)

        serializer = HomeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def home_detail(request, id, format=None):
    try:
        home = Home.objects.get(pk=id)
    except Home.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = HomeSerializer(home)
        return Response(serializer.data)

    elif request.method == 'PUT':
        if not request.user.is_staff:
            return Response({'detail': 'Solo Administradores pueden modificar casas'}, status=status.HTTP_403_FORBIDDEN)

        serializer = HomeSerializer(home, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if not request.user.is_staff:
            return Response({'detail': 'Solo Administradores pueden eliminar casas'}, status=status.HTTP_403_FORBIDDEN)

        home.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Class-Based Views with JWT
class HomeListView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, id):
        try:
            return Home.objects.get(pk=id)
        except Home.DoesNotExist:
            return None

    def get(self, request, id):
        home = self.get_object(id)
        if home is None:
            return Response({'detail': 'Not found.'}, status=404)

        serializer = HomeSerializer(home)
        return Response(serializer.data)

    def put(self, request, id):
        if not request.user.is_staff:
            return Response({'detail': 'Only admins can modify homes'}, status=403)

        home = self.get_object(id)
        if home is None:
            return Response({'detail': 'Not found.'}, status=404)

        serializer = HomeSerializer(home, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, id):
        if not request.user.is_staff:
            return Response({'detail': 'Only admins can delete homes'}, status=403)

        home = self.get_object(id)
        if home is None:
            return Response({'detail': 'Not found.'}, status=404)

        home.delete()
        return Response(status=204)


# Called when creating homes (only for admins)
class HomeCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not request.user.is_staff:
            return Response({'detail': 'Only admins can add homes.'}, status=403)

        serializer = HomeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)



from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status



@api_view(['POST'])
@permission_classes([AllowAny]) #para poder acceder a post por todos para crear un usuario
@ratelimit(key='ip', rate='5/m',block=True) # se blocquea despues de 5 intentos por ip
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    

    # Optional: Add basic validation
    if not username or not password or not email:
        return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already taken'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.create_user(username=username, email=email, password=password)
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


# views.py
from django.http import HttpResponse, HttpResponseForbidden
from django.utils import timezone
import logging

audit_logger = logging.getLogger('audit')

def update_home_view(request):
    ip = request.META.get("REMOTE_ADDR")  # Get IP once
    if not request.user.is_authenticated:
        audit_logger.info(f'Unauthorized access attempt from IP {ip}')
        return HttpResponseForbidden("You must be logged in to access this page.")
    
    if request.method == 'POST':
        # Simulate a critical data update
        audit_logger.info(f'User {request.user} updated a home listing at {timezone.now()} from IP {ip}')
        return HttpResponse("Home listing updated successfully.")
    
    # Log all GET requests to this endpoint
    audit_logger.info(f'User {request.user} made GET request to update-home at {timezone.now()} from IP {ip}')
    return HttpResponse("Send a POST request to update.")


# class CustomTokenObtainPairView(TokenObtainPairView):
#     def post(self, request, *args, **kwargs):
#         response = super().post(request, *args, **kwargs)
#         username = request.data.get('username')
#         ip = request.META.get('REMOTE_ADDR')
#         audit_logger.info(f'Intento de inicio de sesión para {username} desde IP {ip}')

#         if response.status_code == 200:
#             audit_logger.info(f'Inicio de sesión exitoso para {username} desde IP {ip}')
#         else:
#             audit_logger.warning(f'Intento de inicio de sesión fallido para {username} desde IP {ip}')

#         return response
