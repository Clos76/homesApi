from django.contrib import admin
from django.urls import path, include
from homes import views
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from homes.views import register_user, update_home_view


urlpatterns = [
    path('admin/', admin.site.urls),
    # de la classe views llamar (home_list function)
    path('homes/', views.home_list),
    # create path for different items 
    path('homes/<int:id>', views.home_detail), 
    # create for JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # user registration
    path('api/register/', register_user, name='register'),

    path('api/', include('users.urls')),

    path('update-home/', update_home_view, name='update-home'),
]

# Add static files handling only in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Optional: Add support for URL format suffixes
urlpatterns = format_suffix_patterns(urlpatterns)
