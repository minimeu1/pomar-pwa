const DB_NAME = 'pomarDB';
const STORE = 'registos';

let db;

const request = indexedDB.open(DB_NAME, 1);

request.onupgradeneeded = e => {
  db = e.target.result;
  db.createObjectStore(STORE, { keyPath: 'id' });
};

request.onsuccess = e => {
  db = e.target.result;
};

function db_add(obj) {
  const tx = db.transaction(STORE, 'readwrite');
  tx.objectStore(STORE).add(obj);
}

function db_getAll() {
  return new Promise(resolve => {
    const tx = db.transaction(STORE, 'readonly');
    const store = tx.objectStore(STORE);
    const req = store.getAll();

    req.onsuccess = () => resolve(req.result);
  });
}

function db_delete(id) {
  const tx = db.transaction(STORE, 'readwrite');
  tx.objectStore(STORE).delete(id);
}
