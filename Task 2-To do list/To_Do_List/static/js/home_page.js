all_task();
glow_button();
function all_task() {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    
    fetch('show_all_task', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.text())
    .then(text => {
        const tasks = JSON.parse(text);

     
        const div = document.querySelector('#tasks_display');
        div.innerHTML = ''; 

        console.log(tasks);
    
        tasks.forEach(element => {

            var time = element.fields.due_date;  
            element.fields.due_date = time.replace('T', '  at ').replace('Z', '');

            if( element.fields.status == '1'){

                var show = 'Task is Completed';

                display = '';

             
            }
            else{

                show = 'Complete';

                var display = ` <button class="buttons_side" id = "complete" onclick="show_edit_task(${element.pk})">
                Edit Task

                </button>`


            }

            var status = element.fields.status ;

            if(status == '1' ){

                status = 'Task Completed';
            }
            else{

                status = 'Task is Incomplete';
            }
        

            div.innerHTML += `
                <div class="task-card">
                    <div class="left">
                        <label class="title">
                            ${element.fields.task}
                        </label>
                        <p class="description">
                            ${element.fields.description}
                        </p>
                    </div>
                    <div class="centre">
                        <div>
                            <label class="time">
                                Time: 
                            </label>
                            <label class="time">
                                ${element.fields.due_date}
                            </label>
                        </div>
                        <div>
                            <label class="priority">
                                Priority:
                            </label>
                            <label class="priority">
                                ${element.fields.priority}
                            </label>
                        </div>
                        <p>
                            ${status}
                        </p>
                    </div>
                    <div class="right">
                        <button class="buttons_side" id = "delete" onclick="delete_task(${element.pk})">
                            Delete  
                        </button>
                        <button class="buttons_side" id = "complete" onclick="complete_task(${element.pk})">
                            ${show}
                        </button>

                        


                    ${display}
                    </div>
                </div>
            `;
        });
    })
    .catch(error => {
        console.log("Error:", error);
        alert("Error occurred. Trying to refresh the site and fill it again.");
    });
}


function glow_button(given_div){

    var all_posts = document.getElementById('all_posts');
    var c_tasks = document.getElementById('c_tasks');
    var in_tasks = document.getElementById('in_tasks');
    var h_tasks = document.getElementById('h_tasks');


    if( given_div == 'all_posts'){
        
        all_posts.style.backgroundColor = 'gainsboro';
        all_posts.style.border = '1px solid black';
        c_tasks.style.backgroundColor = 'transparent';
        in_tasks.style.backgroundColor = 'transparent';
        h_tasks.style.backgroundColor = 'transparent';

        all_task()

    }
    else if (given_div == 'c_tasks'){
        all_posts.style.backgroundColor = 'transparent';
        c_tasks.style.backgroundColor = 'gainsboro';
        c_tasks.style.border = '1px solid black';
        in_tasks.style.backgroundColor = 'transparent';
        h_tasks.style.backgroundColor = 'transparent';


        show_complete_task();
        
    }
    else if(given_div == 'in_tasks'){

        all_posts.style.backgroundColor = 'transparent';
        c_tasks.style.backgroundColor = 'transparent';
        in_tasks.style.backgroundColor = 'gainsboro';
        in_tasks.style.border = '1px solid black';
        h_tasks.style.backgroundColor = 'transparent';


        incomplete_task();

    }
    else if(given_div == 'h_tasks'){


        all_posts.style.backgroundColor = 'transparent';
        c_tasks.style.backgroundColor = 'transparent';
        in_tasks.style.backgroundColor = 'transparent';
        h_tasks.style.border = '1px solid black';
        h_tasks.style.backgroundColor = 'gainsboro';

        high_priority_tasks();

    }
    else{
      
        all_posts.style.backgroundColor = 'gainsboro';
        all_posts.style.border = '1px solid black';
        c_tasks.style.backgroundColor = 'transparent';
        in_tasks.style.backgroundColor = 'transparent';
        h_tasks.style.backgroundColor = 'transparent';

        all_task();

    }

}

function show_add_task(){

    var div = document.getElementById('popup_div');

    div.style.display = 'block';

}





function closeDiv(){
    
    var div = document.getElementById('popup_div');

    div.style.display = 'none';




}


function edit_closeDiv(){
    
    var div = document.getElementById('pop');

    div.style.display = 'none';

}

function high_priority_tasks(){

    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        
        fetch('high_priority_task', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.text())
        .then(text => {
            const tasks = JSON.parse(text);

            console.log(tasks);
        
            const div = document.querySelector('#tasks_display');
            div.innerHTML = ''; 
        
            tasks.forEach(element => {


                var time = element.fields.due_date;  
                element.fields.due_date = time.replace('T', ' at ').replace('Z', '');

                div.innerHTML += `
                    <div class="task-card">
                        <div class="left">
                            <label class="title">
                                ${element.fields.task}
                            </label>
                            <p class="description">
                                ${element.fields.description}
                            </p>
                        </div>
                        <div class="centre">
                            <div>
                                <label class="time">
                                    Time: 
                                </label>
                                <label class="time">
                                    ${element.fields.due_date}
                                </label>
                            </div>
                            <div>
                                <label class="priority">
                                    Priority:
                                </label>
                                <label class="priority">
                                    ${element.fields.priority}
                                </label>
                            </div>
                        </div>
                        <div class="right">
                        <button class="buttons_side" id = "delete" onclick="delete_task(${element.id})">
                                Delete
                            </button>
                        <button class="buttons_side" id = "complete" onclick="complete_task(${element.pk})">
                                Complete
                            </button>

                            <button class="buttons_side" id = "complete" onclick="show_edit_task(${element.pk})">
                                Edit Task

                            </button>
                        </div>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.log("Error:", error);
            alert("Error occurred. Trying to refresh the site and fill it again.");
        });



}


function incomplete_task(){

        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        
        fetch('incom_task', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.text())
        .then(text => {
            const tasks = JSON.parse(text);

           
        
            const div = document.querySelector('#tasks_display');
            div.innerHTML = ''; 
        
            tasks.forEach(element => {


                var time = element.fields.due_date;  
                element.fields.due_date = time.replace('T', ' at ').replace('Z', '');

                div.innerHTML += `
                    <div class="task-card">
                        <div class="left">
                            <label class="title">
                                ${element.fields.task}
                            </label>
                            <p class="description">
                                ${element.fields.description}
                            </p>
                        </div>
                        <div class="centre">
                            <div>
                                <label class="time">
                                    Time: 
                                </label>
                                <label class="time">
                                    ${element.fields.due_date}
                                </label>
                            </div>
                            <div>
                                <label class="priority">
                                    Priority:
                                </label>
                                <label class="priority">
                                    ${element.fields.priority}
                                </label>
                            </div>
                        </div>
                        <div class="right">
                        <button class="buttons_side" id = "delete" onclick="delete_task(${element.id})">
                                Delete
                            </button>
                        <button class="buttons_side" id = "complete" onclick="complete_task(${element.pk})">
                                Complete
                            </button>


                            <button class="buttons_side" id = "complete" onclick="show_edit_task(${element.pk})">
                                Edit Task

                            </button>
                        </div>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.log("Error:", error);
            alert("Error occurred. Trying to refresh the site and fill it again.");
        });    
}



function show_complete_task(){

    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    
    fetch('show_complete_task', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.text())
    .then(text => {
        const tasks = JSON.parse(text);

       
        const div = document.querySelector('#tasks_display');
        div.innerHTML = ''; 
    
        tasks.forEach(element => {

            var time = element.fields.due_date;  
            element.fields.due_date = time.replace('T', ' at ').replace('Z', '');
       
            div.innerHTML += `
                <div class="task-card">
                    <div class="left">
                        <label class="title">
                            ${element.fields.task}
                        </label>
                        <p class="description">
                            ${element.fields.description}
                        </p>
                    </div>
                    <div class="centre">
                        <div>
                            <label class="time">
                                Time: 
                            </label>
                            <label class="time">
                                ${element.fields.due_date}
                            </label>
                        </div>
                        <div>
                            <label class="priority">
                                Priority:
                            </label>
                            <label class="priority">
                                ${element.fields.priority}
                            </label>
                        </div>
                    </div>
                    <div class="right">
                        <button class="buttons_side" id = "delete" onclick="delete_task(${element.id})">
                            Delete 
                        </button>
                        <button class="buttons_side" id = "complete">
                            Task Completed
                        </button>
                    </div>
                </div>
            `;
        });
    })
    .catch(error => {
        console.log("Error:", error);
        alert("Error occurred. Trying to refresh the site and fill it again.");
    });    
}



function delete_task(id) {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    fetch('delete_task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({
            id: id
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        
        const taskElement = document.querySelector(`#task-${id}`);
        if (taskElement) {
            taskElement.remove();  
        }
        alert('Task deleted successfully');
    })


    glow_button();
}


function complete_task(id){

    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    fetch('complete_task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({
            id: id
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Task added in completed successfully');
    })


    glow_button();
}

function show_edit_task(id){


    console.log(id);

    var div = document.getElementById('pop');

    div.style.display = 'block';

    editing_task(id);

}




function editing_task(id) {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    fetch('editing_task', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id
        })
    })
    .then(response => response.json())  // Parse JSON directly
    .then(tasks => {
        console.log(tasks);

        const div = document.querySelector('.transfer');
        div.innerHTML = '';

        tasks.forEach(element => {
            const dueDate = new Date(element.fields.due_date).toISOString().slice(0, 16); // Format for datetime-local

            div.innerHTML += `
                <div class="working_block">



                <input type="hidden" value = "${element.pk}" name = "task_id">
                    <div>
                        <label for="task">Task Title:</label>
                        <input type="text" id="task" name="task" value="${element.fields.task}" required>
                    </div>
                    <div>
                        <label for="description">Description:</label>
                        <textarea name="info" cols="30" rows="5" id="description" required>${element.fields.description}</textarea>
                    </div>
                    <div>
                        <label for="due_date">Due Date & Time:</label>
                        <input type="datetime-local" id="due_date" name="due_date" value="${dueDate}" required>
                    </div>
                    <div>
                        <label for="priority">Priority:</label>
                        <select name="priority" id="priority" required>
                            <option value="Low" ${element.fields.priority === 'Low' ? 'selected' : ''}>Low</option>
                            <option value="Medium" ${element.fields.priority === 'Medium' ? 'selected' : ''}>Medium</option>
                            <option value="High" ${element.fields.priority === 'High' ? 'selected' : ''}>High</option>
                        </select>
                    </div>
                    <div style="display: none;">
                        <label for="status">Status:</label>
                        <input type="text" placeholder="Progress Level" id="status" name="status" value="False" required>
                    </div>
                    <button type="submit" id="task_submit">Submit</button>
                    <div class="close">
                        <button type="button" onclick="edit_closeDiv()"><u>Close</u></button>
                    </div>
                </div>
            `;
        });
    })
    .catch(error => {
        console.log("Error:", error);
        alert("Error occurred. Trying to refresh the site and fill it again.");
    });
}
