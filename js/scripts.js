  const input = document.getElementById('searchInput');
  const lista = document.getElementById('listaExtensao');
  const itens = lista.getElementsByTagName('li');

  input.addEventListener('keyup', function() {
    const filtro = input.value.toLowerCase();
    for (let i = 0; i < itens.length; i++) {
      const texto = itens[i].textContent.toLowerCase();
      itens[i].style.display = texto.includes(filtro) ? '' : 'none';
    }
  });