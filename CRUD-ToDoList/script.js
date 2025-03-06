function add() {
    let li = document.createElement('LI');
    let input_value = document.form_main.task.value;
    let input_text = document.createTextNode(input_value);

    li.appendChild(input_text);
    document.querySelector('ul').appendChild(li);
    document.form_main.task.value = "";

    createCloseButton(li);

    // Adiciona evento de clique para marcar como concluída
    li.addEventListener('click', function() {
        this.classList.toggle('checked');
    });
}

function createCloseButton(li) {
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");

    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    span.onclick = () => span.parentElement.style.display = "none";
}

// Adiciona evento de clique aos itens da lista ao carregar a página
document.querySelectorAll('li').forEach(function(li) {
    li.addEventListener('click', function() {
        this.classList.toggle('checked');
    });
});

document.querySelector('form[name="form_main"]').addEventListener('submit', function(e) {
    e.preventDefault();
    add();
});

document.querySelector('input[name="task"]').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        add();
    }
});

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}

 