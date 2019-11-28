from django.db import models
import uuid
from model_utils.models import TimeStampedModel


class WatchList(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, verbose_name='id')
    name = models.CharField(max_length=250, verbose_name='name')
    show_id = models.CharField(max_length=10, verbose_name='id', unique=True)
    image = models.CharField(max_length=550, verbose_name='image', null=True, blank=True)
    description = models.CharField(max_length=550, verbose_name='description', null=True, blank=True)
    network = models.CharField(max_length=250, verbose_name='network', null=True, blank=True)
    schedule = models.CharField(max_length=250, verbose_name='schedule', null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-modified']
        indexes = [
            models.Index(fields=['-modified']),
        ]
        verbose_name = 'watchlist'
        verbose_name_plural = 'watchlists'
