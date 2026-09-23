const form = document.querySelector("#form-kontak");
const preview = document.querySelector("#preview-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  preview.textContent = [
    `Nama: ${data.get("nama")}`,
    `Email: ${data.get("email")}`,
    `No. WA: ${data.get("whatsapp")}`,
    `Tanggal: ${data.get("tanggal")}`,
    `Waktu: ${data.get("waktu")}`,
    `Topik: ${data.get("topik")}`,
    `Kategori: ${data.get("kategori") || "-"}`,
    `Paket: ${data.get("paket") || "-"}`,
    `Pesan: ${data.get("pesan")}`,
  ].join("\n");
});