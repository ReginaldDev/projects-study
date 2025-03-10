function clickMenu() {
    let itens = document.getElementById('itens');
    let burger = document.getElementById('burger');
    itens.classList.toggle('show');
    if (itens.classList.contains('show')) {
        burger.setAttribute('aria-expanded', 'true');
    } else {
        burger.setAttribute('aria-expanded', 'false');
    }
}

function mudouTamanho() {
    if (window.innerWidth >= 768) {
        let itens = document.getElementById('itens');
        let burger = document.getElementById('burger');
        itens.classList.remove('show');
        burger.setAttribute('aria-expanded', 'false');
    }
}

window.addEventListener('resize', mudouTamanho);