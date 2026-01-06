let qrCode = null;

// Se ejecutará cuando la BD esté lista
dbReadyCallback = cargarPersonas;

function cargarPersonas() {
  const tx = db.transaction("personas", "readonly");
  const store = tx.objectStore("personas");
  const request = store.getAll();

  request.onsuccess = () => {
    const select = document.getElementById("selectPersonas");
    select.innerHTML = "";

    if (request.result.length === 0) {
      const option = document.createElement("option");
      option.textContent = "No hay personas registradas";
      option.disabled = true;
      option.selected = true;
      select.appendChild(option);
      return;
    }

    request.result.forEach(persona => {
      const option = document.createElement("option");
      option.value = persona.id;
      option.textContent = `${persona.nombre} (${persona.numControl})`;
      select.appendChild(option);
    });
  };
}

// Generar QR
function generarQR() {
  const personaId = document.getElementById("selectPersonas").value;

  if (!personaId) {
    alert("Selecciona una persona");
    return;
  }

  const datosQR = {
    personaId: parseInt(personaId)
  };

  document.getElementById("qr").innerHTML = "";

  qrCode = new QRCode(document.getElementById("qr"), {
    text: JSON.stringify(datosQR),
    width: 220,
    height: 220
  });
}
