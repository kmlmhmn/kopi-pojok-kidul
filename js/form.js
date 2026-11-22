const form = document.querySelector("#form-kontak");
const preview = document.querySelector("#preview-form");
const formFeedback = document.querySelector("#form-feedback");
const fields = ["nama", "email", "telepon", "paket", "pesan", "persetujuan"].map((id) => document.querySelector(`#${id}`));
const topikInputs = document.querySelectorAll('input[name="topik"]');


function getFieldError(field) {
  const validity = field.validity;

  if (validity.valueMissing) return "Bagian ini wajib diisi.";
  if (validity.typeMismatch) return "Format data belum sesuai.";
  if (validity.tooShort) return `Isi minimal ${field.minLength} karakter.`;
  if (validity.patternMismatch) return "Format belum sesuai contoh yang diminta.";

  return "";
}


function tampilkanError(field, pesan) {
  const error = document.querySelector(`#${field.id}-error`);
  field.setCustomValidity(pesan);
  field.setAttribute("aria-invalid", pesan ? "true" : "false");

  if (error) {
    error.textContent = pesan;
  }
}

function validasiField(field) {
  field.setCustomValidity("");
  const pesan = getFieldError(field);
  tampilkanError(field, pesan);
  return pesan === "";
}

function validasiTopik() {
  const topikValid = Array.from(topikInputs).some((input) => input.checked);

  topikError.textContent = topikValid ? "" : "Silakan pilih salah satu topik.";
  topikFieldset.setAttribute("aria-invalid", topikValid ? "false" : "true");

  return topikValid;
}

// Validasi ketika pengguna memperbaiki input
fields.forEach((field) => {
  const jenisEvent = field.type === "checkbox" || field.tagName === "SELECT"
    ? "change"
    : "input";

  field.addEventListener(jenisEvent, () => validasiField(field));
});

topikInputs.forEach((input) => {
  input.addEventListener("change", validasiTopik);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const semuaValid = fields.every((field) => validasiField(field));
  const topikValid = Array.from(topikInputs).some((input) => input.checked);

  if (!semuaValid || !topikValid || !form.checkValidity()) {
    formFeedback.textContent = "Periksa kembali bagian yang ditandai.";
    formFeedback.classList.remove("success");
    form.reportValidity();
    form.querySelector(":invalid")?.focus();
    return;
  }

  simpanPreferensi();
  
  const data = new FormData(form);
  preview.textContent = [
    `Nama: ${data.get("nama")}`,
    `Email: ${data.get("email")}`,
    `No. WA: ${data.get("whatsapp")}`,
    `Topik: ${data.get("topik")}`,
    `Kategori: ${data.get("kategori") || "-"}`,
    `Paket: ${data.get("paket") || "-"}`,
    `Channel: ${data.get("channel") || "-"}`,
    `Pesan: ${data.get("pesan")}`,
  ].join("\n");

  formFeedback.textContent = "Form valid. Preview berhasil dibuat.";
  formFeedback.classList.add("success");
});
