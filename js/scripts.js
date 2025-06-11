document.addEventListener("DOMContentLoaded", () => {
  // Filtragem dos projetos de extensão com base na pesquisa
  const input = document.getElementById('searchInput');
  const accordionItems = document.querySelectorAll('.accordion-item');
  const iframe = document.getElementById("iframePesquisa");

  function ajustarAlturaIframe() {
    try {
      const doc = iframe.contentWindow.document;
      const altura = doc.documentElement.scrollHeight;
      iframe.style.height = altura + "px";
    } catch (e) {
      console.error("Erro ao ajustar iframe:", e);
    }
  }

  if (iframe) {
    // Ajusta altura ao carregar o iframe
    iframe.addEventListener("load", ajustarAlturaIframe);

    // Escuta eventos do conteúdo interno para redimensionar iframe
    iframe.contentWindow.addEventListener("resizeIframe", ajustarAlturaIframe);
  }

  // Escuta mensagens enviadas do iframe
  window.addEventListener("message", (event) => {
    if (event.data === "resizeIframe") {
      ajustarAlturaIframe();
    }
  });

  // Notifica o pai para redimensionar o iframe
  function notificarResize() {
    window.parent.postMessage('resizeIframe', '*');
  }

  // Notifica o pai sempre que um accordion for aberto ou fechado
  document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
      setTimeout(() => {
        notificarResize();

        // Controle da altura maior do conteúdo ao abrir/fechar
        const item = button.closest('.accordion-item');
        const collapseDiv = item.querySelector('.accordion-collapse');

        if (!button.classList.contains('collapsed')) {
          // Se está aberto, adiciona a classe para aumentar a altura
          collapseDiv.classList.add('expandido');
        } else {
          // Se fechou, remove a classe para voltar ao tamanho padrão
          collapseDiv.classList.remove('expandido');
        }
      }, 300); // espera a animação terminar
    });
  });

  // Também notifica ao carregar a página
  window.addEventListener('load', () => {
    notificarResize();
  });

  // Função para filtrar e expandir acordeões conforme pesquisa
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

      // Expande ou recolhe acordeões com base na pesquisa
      const button = item.querySelector(".accordion-button");
      const collapseDiv = item.querySelector(".accordion-collapse");

      if (termo === "") {
        // Campo vazio, fecha todos os acordeões
        button.classList.add("collapsed");
        collapseDiv.classList.remove("show");
        collapseDiv.classList.remove("expandido");
        button.style.fontSize = "1rem";
        button.style.padding = "10px";
      } else if (algumVisivel) {
        // Se encontrou resultados, abre o acordeão
        button.classList.remove("collapsed");
        collapseDiv.classList.add("show");
        collapseDiv.classList.add("expandido");
        button.style.fontSize = "1.2rem";
        button.style.padding = "12px";
      } else {
        // Sem resultados, mantém fechado
        button.classList.add("collapsed");
        collapseDiv.classList.remove("show");
        collapseDiv.classList.remove("expandido");
        button.style.fontSize = "1rem";
        button.style.padding = "10px";
      }
    });
  });
});
