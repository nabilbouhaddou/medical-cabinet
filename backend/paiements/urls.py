from rest_framework.routers import DefaultRouter
from .views import PaiementViewSet

router = DefaultRouter()
router.register('paiements', PaiementViewSet)

urlpatterns = router.urls