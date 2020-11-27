# Generated by Django 2.2.13 on 2020-11-27 04:22

import django.contrib.auth.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
        ('api', '0006_auto_20201126_2154'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cliente',
            fields=[
            ],
            options={
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('auth.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]