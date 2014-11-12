# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0002_project_created_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='created_time',
            field=models.DateTimeField(default=datetime.datetime(2014, 11, 11, 0, 35, 8, 323176, tzinfo=utc), auto_now_add=True),
            preserve_default=False,
        ),
    ]
