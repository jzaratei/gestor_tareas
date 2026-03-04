# Gestor de Tareas (To-Do List) - Actividad 6

Este proyecto es una aplicación web interactiva desarrollada para la asignatura de **Desarrollo Web en Entorno Cliente**. Permite a los usuarios gestionar una lista de tareas (añadir, marcar como completadas y eliminar) manipulando el DOM dinámicamente sin recargar la página.
Adicionalmente, este proyecto forma parte de la actividad 6 del modulo **Despliegue de aplicaciones web**

## Estructura del Proyecto

El proyecto sigue el principio de **Separación de Responsabilidades**:

* **`index.html`**: Contiene únicamente la estructura semántica y los contenedores.
* **`styles.css`**: Gestiona toda la apariencia visual y estados (como la clase `.completada`).
* **`script.js`**: Contiene la lógica de negocio y manipulación del DOM.

## Decisiones de Diseño e Implementación

### 1. Manipulación del DOM y Seguridad
* **`textContent` vs `innerHTML`**: Se ha priorizado el uso de `textContent` para asignar el texto de las tareas.
    * *Motivo:* Previene ataques de inyección de código (XSS) y es más eficiente al tratar el contenido como texto plano en lugar de parsear HTML.
* **Creación de Nodos**: Se utiliza `document.createElement()` y `appendChild()`.
    * *Motivo:* Es más eficiente y limpio que concatenar cadenas de texto HTML, permitiendo mantener referencias directas a los elementos creados.

### 2. Optimización: Delegación de Eventos
En lugar de asignar un *Event Listener* a cada botón o tarea individualmente, se ha implementado el patrón de **Delegación de Eventos**.
* **Implementación:** Se asigna un único `addEventListener` al elemento padre `<ul>` (`#lista-tareas`).
* **Motivo:**
    * **Rendimiento:** Reduce drásticamente el consumo de memoria.
    * **Mantenibilidad:** No es necesario asignar/eliminar eventos manualmente cada vez que se crea o borra una tarea dinámica.
    * **Lógica:** Se utiliza `e.target.closest('li')` para identificar correctamente la tarea sobre la que se interactúa, independientemente de si se hace clic en el texto o en el borde.

### 3. Gestión de Estilos (CSS Classes)
La lógica de visualización (tachar texto, cambiar color) no se manipula directamente desde JS (ej. `style.textDecoration`).
* **Implementación:** JS simplemente añade o quita la clase CSS `.completada` usando `classList.toggle()`.
* **Motivo:** Mantiene el CSS como unico lugar para el diseño.

### 4. Experiencia de Usuario (UX)
* **Teclado:** Se ha añadido un evento para permitir agregar tareas presionando la tecla `Enter`, no solo con el clic del ratón.
* **Feedback Visual:** Uso de `cursor: pointer` y cambios de color en `:hover` para indicar interactividad.
* **Validación:** Se utiliza `.trim()` para evitar agregar tareas vacías o compuestas solo por espacios.