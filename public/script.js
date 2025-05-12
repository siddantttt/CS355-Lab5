const $ = selector => document.querySelector(selector);

$('#insertBtn').onclick = () => {
  const text = $('#input').value.trim();
  if (!text) return;

  fetch('/insert', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })
    .then(res => res.json())
    .then(doc => {
      $('#results').innerHTML = `<p>Inserted: ${doc.text}</p>`;
      $('#input').value = '';
    });
};

$('#searchBtn').onclick = () => {
  const text = $('#input').value.trim();
  if (!text) return;

  fetch('/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })
    .then(res => res.json())
    .then(docs => {
      $('#results').innerHTML = docs.length
        ? docs.map(doc => `<p>${doc.text}</p>`).join('')
        : '<p>No results found.</p>';
    });
};
