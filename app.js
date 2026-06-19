let fruta = null;
let zona = null;
let ultimo = null;

function setFruta(f) {
  fruta = f;
  console.log('Fruta:', f);
}

function setZona(z) {
  zona = z;
  console.log('Zona:', z);
}

function registar() {
  const linha = document.getElementById('linha').value;
  const obs = document.getElementById('obs').value;

  if (!fruta || !zona || !linha) {
    alert('Preencher tudo');
    return;
  }

  const reg = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    fruta,
    zona,
    linha: parseInt(linha),
    observacoes: obs
  };

  db_add(reg);
  ultimo = reg;

  document.getElementById('linha').value = '';
  document.getElementById('obs').value = '';
}

function registarIgual() {
  if (!ultimo) return;

  const novo = {...ultimo, id: Date.now(), timestamp: new Date().toISOString() };
  db_add(novo);
}

function exportCSV() {
  db_getAll().then(data => {
    let csv = 'timestamp,fruta,zona,linha,observacoes\n';

    data.forEach(r => {
      csv += `${r.timestamp},${r.fruta},${r.zona},${r.linha},${r.observacoes}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'registos.csv';
    a.click();
  });
}
