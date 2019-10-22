async function getdb(){
    try{
        const response = await fetch('/mongoget');
        const json = await response.json();
        let i=1;
        json.forEach((item)=>{
            $("div.task_manager").append(
                `<div class='db_content'>
                    <form>
                        <span id='task_name'>Task Name: ${item.task_name}</span><br>
                        <span id='urgency'>Urgency: ${item.urgency}</span><br>
                        <p id='description'><b>Description</b>: ${item.description}</p>
                        <input type="button" id="update" value="Update Status" onclick="Update_Task('${item._id}','${item.task_name}')"></input><br>
                        <input type="submit" id="delete" value="Delete Task" onclick="Delete_Task('${item._id}')"></input>
                    </form>
                </div>`
            );
        })       
        console.log(json);
    }
    catch(error){
        console.log(error);
    }
}
let id;
let name;
let update_urgency;
let update_description;

async function Update_Task(id,name){
    $("div.update_task").append(
        `<h2 class="update_title">Update</h2>
            <div class='updater'>
                <form>
                    <span id='task_id'>${id}</span><br>
                    <span id='update_task_name'>${name}</span><br>
                    <select name="update_urgency" class="update_urgency" id="update_urgency">
                        <option value="Low">Low</option>
                        <option value="Normal">Normal</option>
                        <option value="Critical">Critical</option>
                    </select><br>
                    <textarea id="update_description" name="update_description" class="update_description" placeholder="Type Description"></textarea><br>
                    <button type="submit" id="update_task" name="update_task" onclick="update('${id}','${name}')">Update</button>
                </form>
            </div>`
    )
    update_urgency = document.getElementById('update_urgency');
    update_description = document.getElementById('update_description');
}

async function update(id,name){
    try{
        const data = {
            'task_name': name,
            '_id': id,
            'urgency': update_urgency.value,
            'description': update_description.value,
        }
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('/mongoupdate', options);
        const json = await response.json();
        console.log(json);
    }
    catch(error){
        console.log(error);
    }
}
async function Delete_Task(id){
    try{
        const data = {
            '_id': id,
        }
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('/mongodelete', options);
        const json = await response.json();
        console.log(json);
    }
    catch(error){
        console.log(error);
    }
}