"""
URL configuration for To_Do_List project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from to_do_app import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [

    path('admin/', admin.site.urls),
    path('',views.home,name = 'home'),
    path('login',views.login_func, name = 'login'),
    path('create_account',views.create_account, name = 'create_account'),
    path('Otp-mail', views.mailling_process , name = 'mail'),
    path('verify_of_otp',views.verify_of_otp, name= 'otp_verification'),
    path('home',views.home_page , name = 'home_page'),
    path('add_task',views.add_task , name = 'add_task'),
    path('show_all_task',views.show_all_task , name = 'show_all_task'),
    path('incom_task',views.incom_task, name = "incom_task"),
    path('show_complete_task',views.show_complete_task , name ="complete_task"),
    path('delete_task',views.delete_task , name = 'delete_task'),
    path('complete_task',views.complete_task , name = 'complete_task'),
    path('log_out',views.log_out , name = 'log_out'),
    path('high_priority_task',views.high_priority_task , name = 'high_priority_task'),
    path('editing_task',views.editing_task , name = 'editing_task'),
    path('update_task',views.update_task , name='update_task'),

]





if settings.DEBUG:

    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)