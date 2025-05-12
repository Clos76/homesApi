from cryptography.fernet import Fernet
from decouple import config



#clave secreta (guardarla segurn, )
KEY = config("FERNET_KEY") #leer de .env

fernet = Fernet(KEY)

def encrypt_data(data):
    """ Encripta los datos"""
    return fernet.encrypt(data.encode()).decode()

def decrypt_data(token):
    """ Desencripta los datos"""
    return fernet.decrypt(token.encode()).decode