// Document - это DOM, доступ к которому можно получить в консоли с помощью document.window.
// Дерево находится сверху, html, body, p и т.д.

// Проблема: Взаимодействие с пользователем не дает правильных результатов.
// Решение: Добавьте интерактивность, чтобы пользователь мог управлять ежедневными задачами.
// Разбейте все на более мелкие этапы и делайте каждый шаг за раз.


// Обработка событий, взаимодействие с пользователем - это то, с чего начинается выполнение кода.

const taskInput = document.getElementById("new-task"); //Add a new task.
const addButton = document.querySelector("#add-btn"); //first button
const incompleteTaskHolder = document.getElementById("incompleteTasks"); //ul of #incompleteTasks
const completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks


//New task list item
const createNewTaskElement = function (taskString) {

    const listItem = document.createElement("li");

    //input (checkbox)
    const checkBox = document.createElement("input"); //checkbx
    //label
    const label = document.createElement("label"); //label
    //input (text)
    const editInput = document.createElement("input"); //text
    //button.edit
    const editButton = document.createElement("button"); //edit button

    //button.delete
    const deleteButton = document.createElement("button"); //delete button
    const deleteButtonImg = document.createElement("img"); //delete button image

    listItem.className = 'list__item'

    label.innerText = taskString;
    label.className = 'task list__item-label';

    //Each elements, needs appending
    checkBox.type = "checkbox";
    checkBox.className = 'inp__checkbox'
    editInput.type = "text";
    editInput.className = "task inp_text";

    editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
    editButton.className = "edit btn";

    deleteButton.className = "delete btn";
    deleteButtonImg.src = './img/remove.svg';
    deleteButtonImg.className = 'btn__img'
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



const addTask = function () {
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    const listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";

}

//Edit an existing task.

const editTask = function () {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    const listItem = this.parentNode;

    const editInput = listItem.querySelector('input[type=text]');
    const label = listItem.querySelector("label");
    const editBtn = listItem.querySelector(".edit");
    const containsClass = listItem.classList.contains("editMode");
    //If class of the parent is .editmode
    if (containsClass) {

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("editMode");
};


//Delete task.
const deleteTask = function () {
    console.log("Delete Task...");

    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
const taskCompleted = function () {
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    const listItem = this.parentNode;
    listItem.classList.toggle('completed-tasks__label')
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


const taskIncomplete = function () {
    console.log("Incomplete Task...");
    //Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    const listItem = this.parentNode;
    listItem.classList.toggle('completed-tasks__label')
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}



const ajaxRequest = function () {
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    //select ListItems children
    const checkBox = taskListItem.querySelector("input[type=checkbox]");
    const editButton = taskListItem.querySelector("button.edit");
    const deleteButton = taskListItem.querySelector("button.delete");


    //Bind editTask to edit button.
    editButton.onclick = editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.