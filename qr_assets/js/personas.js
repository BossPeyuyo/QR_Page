function guardarPersona() {
  event.preventDefault(); // evita recargar la página

  const nombre = document.getElementById("nombre").value.trim();
  const numControl = document.getElementById("numControl").value.trim();
  const empresa = document.getElementById("empresa").value.trim();

  if (!nombre || !numControl || !empresa) {
    Swal.fire("Error", "Completa todos los campos", "warning");
    return;
  }

  const persona = {
    nombre,
    numControl,
    empresa,
    fechaRegistro: new Date().toISOString()
  };

  const tx = db.transaction("personas", "readwrite");
  const store = tx.objectStore("personas");

  store.add(persona);

  tx.oncomplete = () => {
    Swal.fire("✔ Guardado", "Persona registrada correctamente", "success");
    document.getElementById("formPersona").reset();
  };

  tx.onerror = () => {
    Swal.fire("❌ Error", "No se pudo guardar la persona", "error");
  };
}

document.getElementById("formPersona")
    .addEventListener("submit", guardarPersona);
