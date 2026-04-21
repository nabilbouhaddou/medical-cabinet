from rest_framework.routers import DefaultRouter
from .views import MedecinViewSet

router = DefaultRouter()
router.register('medecins', MedecinViewSet)

urlpatterns = router.urls  # ← cette ligne est obligatoire !