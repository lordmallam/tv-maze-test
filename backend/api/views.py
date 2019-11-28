from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework import viewsets

from . import utils, models, serializers


@permission_classes([AllowAny])
class WatchlistViewSet(viewsets.ModelViewSet):
    queryset = models.WatchList.objects.all()
    serializer_class = serializers.WatchlistSerializer


@api_view(['GET'])
@renderer_classes([JSONRenderer])
@permission_classes([AllowAny])
def get_url(request, *args, **kwargs):
    url = request.build_absolute_uri().replace('http://localhost:8000/api', 'http://api.tvmaze.com')
    return Response(utils.make_request(url))

