from rest_framework import serializers
from .models import Patient
from users.serializers import UserSerializer

class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    age = serializers.SerializerMethodField()

    class Meta:
        model = Patient
        fields = '__all__'

    def get_age(self, obj):
        return obj.age()