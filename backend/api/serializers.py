from rest_framework import serializers
from .models import WatchList


class WatchlistSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = WatchList
        fields = '__all__'