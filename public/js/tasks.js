let task_name = document.getElementById('task_name');
let urgency = document.getElementById('urgency');
let description = document.getElementById('description');

try{
    document.getElementById('submit_task').addEventListener('click', async ()=>{
        const data = {
            'task_name': task_name.value,
            'urgency': urgency.value,
            'description': description.value,
        }
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('/mongopost', options);
        const json = await response.json();
        console.log(json);
    });
}
catch(error){
    console.log(error);
}

