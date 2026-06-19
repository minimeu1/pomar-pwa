let fruta = null;
let zona = null;
let ultimo = null;

function setFruta(f) {
  fruta = f;
  clearSelections('fruta-btn');
  document.getElementById(`fruta-${f}`).classList.add('selected');
}

function clearSelections(type) {
  const buttons = document.querySelectorAll(`.${type}`);
  buttons.forEach(b => b.classList.remove('selected'));
}

function setZona(z) {
  zona = z;
  clearSelections('zona-btn');
  document.getElementById(`zona-${z}`).classList.add('selected');
}

function registar() {
  const linha = document.getElementById('linha').value;
  const obs = document.getElementById('obs').value;

  if (navigator.vibrate) {
    navigator.vibrate(100);
  }

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

function apagarUltimo() {
  if (!ultimo) {
    alert("Sem registos recentes");
    return;
  }

  db_delete(ultimo.id);
  ultimo = null;
}

function verUltimos() {
  db_getAll().then(data => {
    const ultimos = data.slice(-5).reverse();

    let txt = "Últimos registos:\\n\\n";

    ultimos.forEach(r => {
      txt += `${r.fruta} | ${r.zona} | L${r.linha}\\n`;
    });

    alert(txt);
  });
}
