function show_vcode(){

    var div = document.getElementById('otp_verify');
    var button = document.getElementById('sub_button');

    div.style.display = 'block';
    button.style.display = 'none';
}


function sending_otp(){


    var first_name = document.getElementById('first_name').value;
    var last_name = document.getElementById('last_name').value;
    var email = document.getElementById('email').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;


    console.log(first_name,last_name,email,username,password);


    if( first_name !== '' || last_name !== '' || email !== '' || username !== '' || password !== ''){

        data = {
            first_name : first_name,
            last_name : last_name,
            username : username,
            password : password,
            email : email
        }
    
    
    
        fetch('Otp-mail', {
            method: 'POST',
            headers: {
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);  
            
            
            show_vcode();
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Enter valid email id");
        });
    
    
    
    



    }
    else{

        alert("Fill All Details Properly");
    }


    
}


