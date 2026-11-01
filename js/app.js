const produkUmkm = [
  { nama: "Kopi Nyuweni Woke", kategori: "Rumahan", berat: 250, harga: 40000, stok: 5 },
  { nama: "Kopsu Gula Aren", kategori: "Rumahan", berat: 250, harga: 50000, stok: 0 },
  { nama: "Cappuccino", kategori: "Rumahan", berat: 250, harga: 50000, stok: 10 },
  { nama: "Matcha", kategori: "Lapak", harga: 12000, stok: 15 },
  { nama: "Red Velvet", kategori: "Lapak", harga: 14000, stok: 5 },
  { nama: "Kopsu Avocado", kategori: "Lapak", harga: 13000, stok: 10 },
];
console.table(produkUmkm);

// =========== Format rupiah ============
const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

// =========== Kondisi Stok ===========
function statusStok(stok) {
  if (stok === 0) {
    return { label: "Habis", className: "empty" };
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

// ======== RENDER DATA KE DOM ============
function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");

  if (!grid || !ringkasan) {
    return;
  }

  let jumlahTersedia = 0;
  let markup = "";

  for (const produk of produkUmkm) {
    const status = statusStok(produk.stok);
    const kategori = labelKategori(produk.kategori);
    const labelAksi = produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";

    if (produk.stok > 0) {
      jumlahTersedia = jumlahTersedia + 1;
    }

    markup = markup + `
      <article class="js-product-card">
        <h3>${produk.nama}</h3>
        <p>${kategori}</p>
        <p class="price">${formatRupiah.format(produk.harga)}</p>
        <span class="stock-badge ${status.className}">${status.label}</span>
        <p>${labelAksi}</p>
      </article>
    `;
  }

  grid.innerHTML = markup;
  ringkasan.textContent = `${jumlahTersedia} produk tersedia dari ${produkUmkm.length} data.`;
}

document.addEventListener("DOMContentLoaded", renderProduk);