// =========================================
// SELEÇÃO DOS ELEMENTOS DO HTML
// =========================================
const taskInput = document.getElementById("taskInput");
const categoryInput = document.getElementById("categoryInput");
const prioritySelect = document.getElementById("prioritySelect");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const statusFilter = document.getElementById("statusFilter");
const priorityFilter = document.getElementById("priorityFilter");

// =========================================
// FUNÇÃO PARA ATUALIZAR CONTADORES
// =========================================
function updateCounters() {
    const allTasks = document.querySelectorAll(".task-card");
    const completed = document.querySelectorAll(".task-card.completed");
    const pending = allTasks.length - completed.length;

    totalTasks.textContent = allTasks.length;
    completedTasks.textContent = completed.length;
    pendingTasks.textContent = pending;
}

// =========================================
// FUNÇÃO PARA ADICIONAR EVENTOS A UMA TAREFA
// =========================================
function addTaskEvents(taskCard) {
    const checkbox = taskCard.querySelector(".task-checkbox");
    const deleteButton = taskCard.querySelector(".delete-button");

    // Evento de marcar como concluída
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            taskCard.classList.add("completed");
            taskCard.dataset.status = "concluida";
        } else {
            taskCard.classList.remove("completed");
            taskCard.dataset.status = "pendente";
        }

        updateCounters();
        filterTasks();
    });

    // Evento de excluir tarefa
    deleteButton.addEventListener("click", function () {
        taskCard.remove();
        updateCounters();
        filterTasks();
    });
}

// =========================================
// FUNÇÃO PARA CRIAR UMA NOVA TAREFA
// =========================================
function createTask() {
    const taskText = taskInput.value.trim();
    const categoryText = categoryInput.value.trim();
    const priorityValue = prioritySelect.value;

    // Validação simples
    if (taskText === "" || categoryText === "" || priorityValue === "") {
        alert("Preencha todos os campos antes de adicionar a tarefa.");
        return;
    }

    // Cria o card da tarefa
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");
    taskCard.dataset.status = "pendente";
    taskCard.dataset.priority = priorityValue;

    // Define classe de prioridade
    if (priorityValue === "alta") {
        taskCard.classList.add("priority-high");
    } else if (priorityValue === "media") {
        taskCard.classList.add("priority-medium");
    } else if (priorityValue === "baixa") {
        taskCard.classList.add("priority-low");
    }

    // Cria o conteúdo interno da tarefa
    taskCard.innerHTML = `
        <div class="task-left">
            <input type="checkbox" class="task-checkbox">
            <div class="task-content">
                <p class="task-text">${taskText}</p>
                <span class="task-category">Categoria: ${categoryText}</span>
            </div>
        </div>
        <button class="delete-button">Excluir</button>
    `;

    // Adiciona a tarefa na lista
    taskList.appendChild(taskCard);

    // Adiciona os eventos da nova tarefa
    addTaskEvents(taskCard);

    // Limpa os campos
    taskInput.value = "";
    categoryInput.value = "";
    prioritySelect.value = "";

    // Atualiza contadores e filtros
    updateCounters();
    filterTasks();
}

// =========================================
// FUNÇÃO DE FILTRO
// =========================================
function filterTasks() {
    const tasks = document.querySelectorAll(".task-card");
    const selectedStatus = statusFilter.value;
    const selectedPriority = priorityFilter.value;

    tasks.forEach(function (task) {
        const taskStatus = task.dataset.status;
        const taskPriority = task.dataset.priority;

        let showByStatus = false;
        let showByPriority = false;

        // Filtro de status
        if (selectedStatus === "todas") {
            showByStatus = true;
        } else if (selectedStatus === "pendentes" && taskStatus === "pendente") {
            showByStatus = true;
        } else if (selectedStatus === "concluidas" && taskStatus === "concluida") {
            showByStatus = true;
        }

        // Filtro de prioridade
        if (selectedPriority === "todas") {
            showByPriority = true;
        } else if (selectedPriority === taskPriority) {
            showByPriority = true;
        }

        // Mostrar ou esconder a tarefa
        if (showByStatus && showByPriority) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
}

// =========================================
// EVENTOS INICIAIS
// =========================================

// Botão de adicionar
addButton.addEventListener("click", createTask);

// Enter no campo da tarefa
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        createTask();
    }
});

// Filtros
statusFilter.addEventListener("change", filterTasks);
priorityFilter.addEventListener("change", filterTasks);

// =========================================
// ATIVAR EVENTOS NAS TAREFAS JÁ EXISTENTES
// =========================================
const initialTasks = document.querySelectorAll(".task-card");
initialTasks.forEach(function (task) {
    addTaskEvents(task);
});

// Atualiza contadores ao iniciar
updateCounters();