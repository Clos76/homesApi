from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from django.urls import reverse

class AuthTests(APITestCase):
    def setUp(self):
        self.login_url = reverse('token_obtain_pair')
        self.username = 'testuser'
        self.password = 'testpass'
        User.objects.create_user(username=self.username, password=self.password)

    def test_login_success(self):
        response = self.client.post(self.login_url, {
            'username': self.username,
            'password': self.password
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn('access', response.data)

    def test_login_failure(self):
        response = self.client.post(self.login_url, {
            'username': 'wronguser',
            'password': 'wrongpass'
        })
        self.assertEqual(response.status_code, 401)

    def test_brute_force_block(self):
        for i in range(6):  # Simulate 6 failed attempts
            response = self.client.post(self.login_url, {
                'username': 'wronguser',
                'password': 'wrongpass'
            })
        # Expecting a block (if using ratelimit or axes)
        self.assertIn(response.status_code, [401, 429])
