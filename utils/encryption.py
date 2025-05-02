from cryptography.fernet import Fernet

#clave secreta (guardarla segurn, )
KEY = b'ffhua31TSDAEhKGJDottSMtBeux6aR0bUwLWdYHNT2w='

fernet = Fernet(KEY)

def encrypt_data(data):
    """ Encripta los datos"""
    return fernet.encrypt(data.encode()).decode()

def decrypt_data(token):
    """ Desencripta los datos"""
    return fernet.decrypt(token.encode()).decode