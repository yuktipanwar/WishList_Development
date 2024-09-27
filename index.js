
let todoInput = document.querySelector(".input");
let addToDoButton = document.querySelector(".button");
let showTodos = document.querySelector(".todos-container");
let todo;

let localData = JSON.parse(localStorage.getItem("todo"));         //getting value from local storage as an array.
let todoList = localData || [];

/**Creating function to get unique id */
//uuid--> Universal Unique Identification
function uuid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (param){
        let number = Math.random()* 16 | 0;
        let randomNumber = param == 'x' ? number : (number & 0x3 | 0x8);
        return randomNumber.toString(16);
    })

}


addToDoButton.addEventListener("click", (e)=> {
    e.preventDefault(); //don't do the default action of submitting the form
    todo = todoInput.value;

    //---check case for empty input---//
    if(todo.length > 0){
        todoList.push({id: uuid(), todo: todo, isCompleted: false});
    }

    //adding data to local storage
    localStorage.setItem("todo", JSON.stringify(todoList));   //JSON.stringify(todoList) converts array to a string as local storage stores data as string.

    renderTodoList(todoList);

    todoInput.value= "";  //removes input after adding into wishlist.
    
})

//event delegation: event listener depends on what is there in the parent. 
showTodos.addEventListener("click", (e)=> {
    let key = e.target.dataset.key;
    let delTodokey = e.target.dataset.todokey;
    todoList = todoList.map(todo => todo.id === key? {...todo, isCompleted: !todo.isCompleted} : todo) //taking the key isCompleted and changing it to the reverse value.
    //deleting
    todoList = todoList.filter(todo => todo.id !== delTodokey);    

    
    localStorage.setItem("todo", JSON.stringify(todoList));
    renderTodoList(todoList);  //updated todoList
    
    
})


/**rendering to do list */
function renderTodoList(todoList){
    showTodos.innerHTML = todoList.map(({id, todo, isCompleted}) => `
    <div class="todo relative">
        <input class="t-checkbox t-pointer" id="item-${id}" type ="checkbox" data-key=${id} ${isCompleted ? "checked" : ""}> 
        <label for="item-${id}" class="todo todo-text t-pointer ${isCompleted ? "checked-todo" : ""}" data-key=${id}>${todo} </label> 
        <button class="absolute right-0 button cursor"> <span data-todokey=${id}  class="del-btn material-icons-outlined">delete</span></button>
    </div>`)
}

renderTodoList(todoList);