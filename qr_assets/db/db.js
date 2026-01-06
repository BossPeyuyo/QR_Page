let db;
let dbReadyCallback = null;

const request = indexedDB.open("AsistenciaDB", 1);

request.onupgradeneeded = (event) => {
  db = event.target.result;

  if (!db.objectStoreNames.contains("personas")) {
    db.createObjectStore("personas", {
      keyPath: "id",
      autoIncrement: true
    });
  }

  if (!db.objectStoreNames.contains("asistencia")) {
    db.createObjectStore("asistencia", {
      keyPath: "id",
      autoIncrement: true
    });
  }
};

request.onsuccess = (event) => {
  db = event.target.result;
  console.log("✅ Base de datos lista");

  if (dbReadyCallback) {
    dbReadyCallback();
  }
};

request.onerror = () => {
  console.error("❌ Error al abrir IndexedDB");
};
