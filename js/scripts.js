// Filtragem dos projetos de extensão com base na pesquisa
const input = document.getElementById('searchInput');
const accordionItems = document.querySelectorAll('.accordion-item');

input.addEventListener('input', function () {
    const termo = this.value.toLowerCase();

    accordionItems.forEach(item => {
        const lis = item.querySelectorAll('li');
        let algumVisivel = false;

        lis.forEach(li => {
            const texto = li.textContent.toLowerCase();
            if (texto.includes(termo)) {
                li.style.display = '';
                algumVisivel = true;
            } else {
                li.style.display = 'none';
            }
        });

        item.style.display = algumVisivel ? '' : 'none';
    });
});

// Ajustar a altura do iframe automaticamente
function ajustarAlturaIframe() {
    var iframe = document.getElementById("iframePesquisa");
    if (iframe) {
        iframe.style.height = iframe.contentWindow.document.body.scrollHeight + "px";
    }
}

// Aguarde o carregamento completo do iframe antes de ajustar a altura
document.getElementById("iframePesquisa").addEventListener("load", ajustarAlturaIframe);

// Expande automaticamente os acordeões que contêm o termo pesquisado
document.getElementById("searchInput").addEventListener("input", function () {
    let searchTerm = this.value.toLowerCase();
    let accordionItems = document.querySelectorAll(".accordion-item");

    accordionItems.forEach(item => {
        let button = item.querySelector(".accordion-button");
        let collapseDiv = item.querySelector(".accordion-collapse");
        let listItems = item.querySelectorAll("li");

        let found = false;

        listItems.forEach(li => {
            if (li.textContent.toLowerCase().includes(searchTerm)) {
                found = true;
            }
        });

        if (found) {
            button.classList.remove("collapsed"); // Expande o botão
            collapseDiv.classList.add("show"); // Abre a seção
            button.style.fontSize = "1.2rem"; // Aumenta o tamanho do botão ao abrir
            button.style.padding = "12px"; // Ajusta o espaçamento ao abrir
        } else {
            button.classList.add("collapsed"); // Fecha o botão
            collapseDiv.classList.remove("show"); // Fecha a seção
            button.style.fontSize = "1rem"; // Retorna ao tamanho padrão ao fechar
            button.style.padding = "10px"; // Retorna ao espaçamento padrão ao fechar
        }
    });
});

