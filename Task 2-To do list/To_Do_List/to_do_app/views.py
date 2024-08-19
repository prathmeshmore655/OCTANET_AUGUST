import random
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login as auth_login, logout
from django.core.mail import send_mail
import json
from .models import *
from django.core.serializers import serialize




def home(request):


    return render(request,'login.html',{})



def home_page(request):


    return render(request , 'home.html')



def login_func(request):

    if request.method == 'POST':

        username = request.POST.get('username')
        password = request.POST.get('password')


        user = authenticate(request, username = username , password = password)

        if user is not None:

            auth_login(request , user)

            return redirect('home_page')
        
        else:

            message =  "Login Failed ! Check Your Credentials"
            return render(request,'login.html',{"message":message})
    else:

        return redirect('home')
    

def create_account(request):


        return render(request, 'create_account.html')
    


def mailling_process(request):

    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')
    email = request.POST.get('email')
    username = request.POST.get('username')
    password = request.POST.get('password')



    data = json.loads(request.body)

    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')

    subject = 'OTP Verification Email'
    otp = random.randint(100000,999999)

    request.session['otp'] = otp
    message = f"Dear {first_name} {last_name}, Your OTP is {otp}"
    from_email = 'prathmeshmore655@gmail.com'
    recipient_list = [email]

    send_mail(subject , message , from_email , recipient_list)

    key = "Mail send succesfully"

    return JsonResponse({"otp": key})


def verify_of_otp(request):




    if request.method == 'POST':

    
        client_otp = request.POST.get('v_code')
        system_otp = request.session.get('otp')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        username =request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')


        if str(client_otp) == str(system_otp):

            try:
                creating_user(request, first_name , last_name , username , password , email)
            
            except IntegrityError:

                return HttpResponse("Username Is Already Used ! Enter Unique")
            
            except:

                return redirect('home')


        else:

            return HttpResponse("OTP Doesn't Validated")
    else:

        return redirect('home')
    
    return redirect('home')
    


def creating_user(request, first_name , last_name , username , password , email):

    if request.method == 'POST':

        User.objects.create_user(first_name = first_name , last_name = last_name , username = username , email = email , password = password)

        return HttpResponse("User Created")

    else:

        return redirect('home')



def add_task(request):

    if request.method == 'POST':
        
            task = request.POST.get('task')
            description = request.POST.get('info')
            due_date = request.POST.get('due_date')
            priority = request.POST.get('priority')
            status = request.POST.get('status')

            user = request.user


            
            ToDoData.objects.create(
                task=task,
                description = description,
                due_date = due_date,
                priority = priority,
                status=status,
                user_id = user.id
            )


            return redirect('home_page')

    

    return render(request,'home.html')
    

    

      




def show_all_task(request):
    user = request.user
    tasks = ToDoData.objects.filter(user_id=user.id)
    
    serialized_tasks = serialize('json', tasks)
    
    tasks_json = json.loads(serialized_tasks)
    
    return JsonResponse(tasks_json, safe=False)


def incom_task(request):

    user_id = request.user

    user = ToDoData.objects.filter(status = False).filter(user_id = user_id.id)

    serialized_tasks = serialize('json', user)
    
    tasks_json = json.loads(serialized_tasks)
    
    return JsonResponse(tasks_json, safe=False)


def show_complete_task(request):

    user_id = request.user

    user = ToDoData.objects.filter(status = True).filter(user_id = user_id.id )

    serialized_tasks = serialize('json', user)
    
    tasks_json = json.loads(serialized_tasks)
    
    return JsonResponse(tasks_json, safe=False)



def delete_task(request):

    data = json.loads(request.body)

    id = data.get('id')

    tasks = ToDoData.objects.get(pk = id)

    tasks.delete()

    return JsonResponse("Task Deleted", safe=False)


def complete_task(request):


    data = json.loads(request.body)

    id = data.get('id')


    tasks = ToDoData.objects.get(pk = id)

    tasks.status = True

    tasks.save()

    return JsonResponse("Task Completed",safe=False)


def log_out(request):

    logout(request)

    return redirect('home')


def high_priority_task(request):

    user = request.user

    high_priority_tasks = ToDoData.objects.filter(status=False, priority='High', user_id=user.id)


    serialized_tasks = serialize('json', high_priority_tasks)

    tasks_json = json.loads(serialized_tasks)

    return JsonResponse(tasks_json, safe=False)



def editing_task(request):
    data = json.loads(request.body)

    id = data.get('id')

    task = ToDoData.objects.get(pk=id)

    serialized_task = serialize('json', [task])  
    tasks_json = json.loads(serialized_task)

    return JsonResponse(tasks_json, safe=False)


def update_task(request):


    id = request.POST.get('task_id')
    task = request.POST.get('task')
    description = request.POST.get('info')
    due_date = request.POST.get('due_date')
    priority = request.POST.get('priority')
    

    task_list = ToDoData.objects.get(pk = id)


    task_list.task = task
    task_list.description = description
    task_list.due_date = due_date
    task_list.priority = priority

    task_list.save()

    return redirect('home_page')