from rest_framework.routers import DefaultRouter
from .views import DossierMedicalViewSet

router = DefaultRouter()
router.register('dossiers', DossierMedicalViewSet)

urlpatterns = router.urls