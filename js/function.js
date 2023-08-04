// Evento que se ejecuta cuando se carga la página
document.addEventListener("DOMContentLoaded", function () {
    // Cargar las tareas almacenadas en el localstorage al cargar la página
    loadTasksFromLocalStorage();
});

// Evento que se ejecuta cuando se envía el formulario
// Evento que se ejecuta cuando se envía el formulario
document.getElementById("task-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    // Obtener el valor ingresado por el usuario en el campo de entrada
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();

    // Verificar que la tarea no esté vacía
    if (taskText !== "") {
        // Crear un nuevo elemento de lista para la tarea
        const newTaskElement = document.createElement("li");
        newTaskElement.textContent = taskText;

        // Agregar el botón de eliminar solo si hay texto en la tarea
        if (taskText.trim() !== "") {
            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
            deleteButton.addEventListener("click", function () {
                // Eliminar la tarea cuando se haga clic en el botón de eliminar
                newTaskElement.remove();
                // Actualizar las tareas en el localstorage después de eliminar
                updateLocalStorage();
            });
            newTaskElement.appendChild(deleteButton);
        }

        // Agregar la tarea a la lista
        document.getElementById("task-list").appendChild(newTaskElement);

        // Limpiar el campo de entrada después de agregar la tarea
        taskInput.value = "";

        // Guardar las tareas en el localstorage
        updateLocalStorage();
    }
});

// Función para guardar las tareas en el localstorage
function updateLocalStorage() {
    const tasks = [];
    const taskElements = document.querySelectorAll("#task-list li");

    // Recorrer todas las tareas en la lista y obtener sus textos
    taskElements.forEach(function (taskElement) {
        // Obtener solo el texto de la tarea, sin el botón "Eliminar"
        const taskText = taskElement.textContent.replace("Eliminar", "").trim();
        // Agregar el texto de la tarea a la lista de tareas
        tasks.push(taskText);
    });

    // Convertir la lista de tareas en una cadena JSON y guardarla en el localstorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Función para cargar las tareas desde el localstorage al cargar la página
function loadTasksFromLocalStorage() {
    // Obtener las tareas almacenadas en el localstorage
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    // Verificar que haya tareas en el localstorage
    if (tasks && tasks.length > 0) {
        // Recorrer todas las tareas almacenadas y agregarlas a la lista
        tasks.forEach(function (taskText) {
            const newTaskElement = document.createElement("li");
            newTaskElement.textContent = taskText;

            // Agregar el botón de eliminar solo si hay texto en la tarea
            if (taskText.trim() !== "") {
                const deleteButton = document.createElement("button");
                deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
                deleteButton.addEventListener("click", function () {
                    // Eliminar la tarea cuando se haga clic en el botón de eliminar
                    newTaskElement.remove();
                    // Actualizar las tareas en el localstorage después de eliminar
                    updateLocalStorage();
                });
                newTaskElement.appendChild(deleteButton);
            }

            // Agregar la tarea a la lista de tareas en la página
            document.getElementById("task-list").appendChild(newTaskElement);
        });
    }
}