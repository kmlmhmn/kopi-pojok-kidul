const STORAGE_KEY = "kopi-pojok-kidul-preferensi-kontak";

function simpanPreferensi() {
  const data = new FormData(form);
  const preferensi = {
    topik: data.get("topik"),
    pesan: data.get("pesan"),
    updatedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferensi));
  } catch (error) {
    console.warn("Preferensi gagal disimpan.", error);
  }
}

function muatPreferensi() {
  try {
    const tersimpan = localStorage.getItem(STORAGE_KEY);
    if (!tersimpan) return;

    const preferensi = JSON.parse(tersimpan);
    document.querySelector("#topik").value = preferensi.topik ?? "";
    document.querySelector("#pesan").value = preferensi.pesan ?? "";
    const topik = document.querySelector(`input[name="topik"][value="${preferensi.topik}"]`);
    if (topik) topik.checked = true;
  } catch (error) {
    console.warn("Preferensi tidak valid.", error);
    localStorage.removeItem(STORAGE_KEY);
  }
}