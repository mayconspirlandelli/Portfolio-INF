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
