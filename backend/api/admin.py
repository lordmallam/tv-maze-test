from django.contrib import admin

from .models import WatchList


class BaseAdmin(admin.ModelAdmin):
    empty_value_display = '---'
    list_per_page = 25
    readonly_fields = ('id',)
    show_full_result_count = True


class WatchlistAdmin(BaseAdmin):
    list_display = ('id', 'name',)

admin.site.register(WatchList, WatchlistAdmin)
