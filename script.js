//elementos del DOM
const inputTarea = document.getElementById("nueva-tarea");
const btnAgregar = document.getElementById("agregar-btn");
const listaTareas = document.getElementById("lista-tareas");

/**
 * Crea un elemento de tarea con el texto proporcionado.
 * @param {*} texto
 * @returns {HTMLElement} Elemento <li> que representa la tarea.
 */
function crearElementoTarea(texto) {
  const li = document.createElement("li");

  // Usamos span para el texto para separarlo del botón visualmente
  const span = document.createElement("span");
  span.textContent = texto;
  li.appendChild(span);

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";
  btnEliminar.className = "delete-btn";
  li.appendChild(btnEliminar);

  return li;
}

/**
 * Agrega una nueva tarea a la lista de tareas.
 * @returns
 */
function agregarTarea() {
  const texto = inputTarea.value.trim();
  if (texto === "") return;
  const nuevaTarea = crearElementoTarea(texto);
  listaTareas.appendChild(nuevaTarea);
  inputTarea.value = "";
  // Devolver el foco al input después de agregar la tarea
  inputTarea.focus();
}

/**Gestiona los eventos de la lista de tareas */

// Evento 1: Clic en el botón agregar
btnAgregar.addEventListener("click", agregarTarea);

// Evento 2: Tecla Enter en el input
inputTarea.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    agregarTarea();
  }
});

// Evento 3: Clic en la lista de tareas (delegación de eventos)
listaTareas.addEventListener("click", function (e) {
  const elementoClicado = e.target;

  // Eliminar Tarea
  // Verificamos si lo que se clicó tiene la clase del botón eliminar
  if (elementoClicado.classList.contains("delete-btn")) {
    // Buscamos el padre directo <li> para eliminarlo
    const tarea = elementoClicado.closest("li");
    if (tarea) {
      tarea.remove();
    }
  }

  // Marcar Completada
  // Usamos .closest('li') para detectar si el clic fue en el texto (span) o en el propio li
  // y asegurarnos de que no fue en el botón de eliminar
  else {
    const tarea = elementoClicado.closest("li");
    if (tarea) {
      tarea.classList.toggle("completada");
    }
  }
});
