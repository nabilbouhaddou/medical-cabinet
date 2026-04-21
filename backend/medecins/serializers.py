from rest_framework import serializers
from .models import Medecin
from users.serializers import UserSerializer

class MedecinSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Medecin
        fields = '__all__'