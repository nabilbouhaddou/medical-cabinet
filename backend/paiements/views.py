from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Paiement
from .serializers import PaiementSerializer


class PaiementViewSet(ModelViewSet):
    serializer_class = PaiementSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        # 👨‍💻 Admin voit tout
        if user.role == "admin":
            return Paiement.objects.all()

        # 👨‍⚕️ Médecin voit paiements de ses consultations
        if user.role == "medecin":
            return Paiement.objects.filter(consultation__medecin__user=user)

        # 👤 Patient voit seulement ses paiements
        if user.role == "patient":
            return Paiement.objects.filter(consultation__patient__user=user)

        return Paiement.objects.none()
