let allItems = [];

async function loadData() {
  const movies = await fetch('movies.json').then(r => r.json());
  const tv = await fetch('tv_series.json').then(r => r.json());
  const anime = await fetch('anime.json').then(r => r.json());

  allItems = [...movies, ...tv, ...anime];
  renderTable(allItems);
}

function renderTable(items) {
  const tbody = document.querySelector('#movie-table tbody');
  tbody.innerHTML = '';

  items.forEach(item => {
    const watched = item.watched === true ? 'Yes' : item.watched === false ? 'No' : 'N/A';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.title}</td>
      <td>${item.genre || ''}</td>
      <td>${item.type}</td>
      <td>${item.year || ''}</td>
      <td>${watched}</td>
    `;
    tbody.appendChild(tr);
  });
}

function filterAndSearch() {
  const type = document.getElementById('filter-type').value;
  const watched = document.getElementById('filter-watched').value;
  const search = document.getElementById('search-title').value.toLowerCase();

  let filtered = allItems;
  if (type) filtered = filtered.filter(m => m.type === type);
  if (watched) {
    filtered = filtered.filter(m =>
      watched === 'watched' ? m.watched === true : m.watched === false
    );
  }
  if (search) filtered = filtered.filter(m => m.title.toLowerCase().includes(search));

  renderTable(filtered);
}

document.getElementById('filter-type').addEventListener('change', filterAndSearch);
document.getElementById('filter-watched').addEventListener('change', filterAndSearch);
document.getElementById('search-title').addEventListener('input', filterAndSearch);

loadData();
