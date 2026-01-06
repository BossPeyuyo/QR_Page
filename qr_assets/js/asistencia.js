const resultado = document.getElementById("resultado");

function registrarAsistencia(personaId) {
  const tx = db.transaction("asistencia", "readwrite");
  const store = tx.objectStore("asistencia");

  const asistencia = {
    personaId: personaId,
    fecha: new Date().toLocaleString()
  };

  store.add(asistencia);

  tx.oncomplete = () => {
    resultado.textContent = "✅ Asistencia registrada";
  };
}

function onScanSuccess(decodedText) {
  resultado.textContent = `QR leído: ${decodedText}`;
  registrarAsistencia(Number(decodedText));
}

const html5QrCode = new Html5Qrcode("reader");

html5QrCode.start(
  { facingMode: "environment" },
  { fps: 10, qrbox: 250 },
  onScanSuccess
);
