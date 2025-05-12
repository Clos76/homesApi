from django.test import TestCase

# Create your tests here.
from django.test import TestCase
from .models import Home


#revisar si la classe HomeModelTest se comporta correctamente y como esperado
class HomeModelTest(TestCase):
    #metodo que inicia antes de la prueba, usado para poner los datos
    def setUp(self):
        #crear el ejemplo del Home objeto en la base de datos
        Home.objects.create(
            title="Test Home",
            description="A beautiful test home.",
            price=250000,
            location="Test City",
            bedrooms=3,
            bathrooms=2,
            sqfoot=1200
        )

# #conprobar que la prueba fue creada, y que los datos contenidos son correctos
#     def test_home_creation(self):
#         #obtener el objeto Home creado en el setUp
#         home = Home.objects.get(title="Test Home")
#         #revisar si el titulos es igual
#         self.assertEqual(home.title, "Test Home")
#         self.assertEqual(home.__str__(), "Test Home")
#         self.assertEqual(home.bedrooms, 3)
#         self.assertEqual(home.sqfoot, 1200)


        #pruba de verificacion de datos. 
from django.core.exceptions import ValidationError

# def test_missing_required_fields(self):
#     home = Home(
#         # falta 'titulo' y 'precio', que son requeridos
#         description="Missing fields test",
#         location="Nowhere",
#         bedrooms=2,
#         bathrooms=1,
#         sqfoot=800
#     )
#     with self.assertRaises(ValidationError):
#         home.full_clean()  # prueba el modelo validacion

#prueba si el modelo accepta que no aiga imagen ingresada
# def test_image_field_optional(self):
#     home = Home.objects.create(
#         title="Image Test Home",
#         description="This home has no image.",
#         price=200000,
#         location="Testville",
#         bedrooms=2,
#         bathrooms=1,
#         sqfoot=900
#         # no imagen ingresada
#     )
#     self.assertIsNone(home.images)



##pruebas para rutas de api
from django.urls import reverse
from rest_framework.test import APITestCase #clase para poder testear DRF del API
from rest_framework import status #clase para probar HTTP classes
from .models import Home #el modelo Home
from django.contrib.auth.models import User #modelo User del Django

#definir la classe para las URL's y puntos de API's
class URLTests(APITestCase):
    
    #se crea un usuario en la base de datos
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')

#   se crea un ejemplo de una instancia de casa para usarse en los detalles
        self.home = Home.objects.create(
            title="Test URL Home",
            description="Testing URL endpoints.",
            price=100000,
            location="TestCity",
            bedrooms=2,
            bathrooms=1,
            sqfoot=1000
        )
        # Obtener JWT token
        response = self.client.post('/api/token/', {
            'username': 'testuser',
            'password': 'testpass'
        })
        self.token = response.data['access'] #se guarda para futuras request

    def test_home_list_url(self):
        #Test: Get para la ruta /homes/ con authenticacion
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        response = self.client.get('/homes/')
        self.assertEqual(response.status_code, status.HTTP_200_OK) #se da codigo 200 para ok

#test: GET pedido para /homes/<id> con authenticacion
    def test_home_detail_url(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)
        response = self.client.get(f'/homes/{self.home.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


#test: POST pedido para poder registrar a nuevo usuario
    def test_register_user_url(self):
        # prueba registrcion (no authenticacion necesaria)
        response = self.client.post('/api/register/', {
            'username': 'newuser',
            'password': 'newpass123',
            'email': 'newuser@example.com' 
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

#Test: Obtener un token JWT con credenciales validas
    def test_token_obtain_pair_url(self):
        response = self.client.post('/api/token/', {
            'username': 'testuser',
            'password': 'testpass'
            
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK) #exito con token
        self.assertIn('access', response.data) #el token esta en la respuesta (response.)

#Test: para poder editar hogares
    def test_update_home_view_url_requires_auth(self):
        # sin authorizacion: dar  401
        self.client.credentials()  #sin authenticacion
        response = self.client.post('/update-home/', {})
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])

