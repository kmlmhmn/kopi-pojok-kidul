const produkUmkm = [
  { nama: "Kopi Nyuweni Woke", kategori: "Rumahan", berat: 250, harga: 40000, stok: 5, unggulan : true },
  { nama: "Kopsu Gula Aren", kategori: "Rumahan", berat: 250, harga: 50000, stok: 0, unggulan : false },
  { nama: "Cappuccino", kategori: "Rumahan", berat: 250, harga: 50000, stok: 10, unggulan : false},
  { nama: "Matcha", kategori: "Lapak", berat : null ,harga: 12000, stok: 15, unggulan : true },
  { nama: "Red Velvet", kategori: "Lapak", berat : null ,harga: 14000, stok: 5, unggulan : false },
  { nama: "Kopsu Avocado", kategori: "Lapak", berat : null ,harga: 13000, stok: 10, unggulan : false },
];
console.table(produkUmkm);

// =========== Format rupiah ============
function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}

// =========== Kondisi Stok ===========
function statusStok(stok) {
  if (stok <= 0) {
    return { label: "Habis", className: "warning" };
  }

  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }

  return { label: "Tersedia", className: "" };
}

// ============= Kondisi kategori =============
function labelKategori(kategori) {
  switch (kategori) {
    case "Lapak":
      return "Produk Lapak";
    case "Rumahan":
      return "Paket hemat rumahan";
    default:
      return "Produk UMKM";
  }
}

// ============= Membuat kartu produk ============
function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);

  return `
    <article class="js-product-card">
     ${produk.unggulan === true
        ? '<span class="featured-badge">Unggulan</span>' : ''
      }
      <h3>${produk.nama}</h3>
      <p class="category-note">${produk.kategori}</p>
      <p class="price">${formatRupiah(produk.harga)}</p>
      <span class="stock-badge ${status.className}">${status.label}</span>
    </article>
  `;
}
// ============= Pengolahan data produk =============
const produkTersedia = produkUmkm.filter((produk) => produk.stok > 0);
console.log("Produk tersedia:", produkTersedia);
const produkUnggulan = produkUmkm.find((produk) => produk.unggulan === true);
console.log("Produk unggulan:", produkUnggulan);
const markupProduk = produkTersedia.map(buatKartuProduk).join("");
console.log("Markup produk:", markupProduk);

// ============ forEach untuk debugging terarah ==============
produkUmkm.forEach((produk) => {
  console.log("Debug produk:", produk.nama, "stok:", produk.stok);
});

// ======== RENDER DATA KE DOM ============
function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");
  const unggulan = document.querySelector("#produk-unggulan");

  if (!grid || !ringkasan || !unggulan) {
    console.warn("Target render produk belum lengkap.");
    return;
  }

  const produkTersedia = produkUmkm.filter((produk) => produk.stok > 0);
  const produkUnggulan = produkUmkm.find((produk) => produk.unggulan === true);
  const markupProduk = produkTersedia.map(buatKartuProduk).join("");

  grid.innerHTML = markupProduk;
  ringkasan.textContent = `${produkTersedia.length} produk tersedia dari ${produkUmkm.length} data.`;
  unggulan.textContent = produkUnggulan
    ? `Produk unggulan: ${produkUnggulan.nama}`
    : "Belum ada produk unggulan.";

  console.table(produkUmkm);
}
document.addEventListener("DOMContentLoaded", renderProduk);