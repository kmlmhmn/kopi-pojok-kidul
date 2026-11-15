const produkUmkm = [
  { nama: "Kopi Nyuweni Woke", kategori: "Rumahan", berat: 250, harga: 40000, stok: 5, unggulan : true },
  { nama: "Kopsu Gula Aren", kategori: "Rumahan", berat: 250, harga: 50000, stok: 0, unggulan : false },
  { nama: "Cappuccino", kategori: "Rumahan", berat: 250, harga: 50000, stok: 10, unggulan : false},
  { nama: "Matcha", kategori: "Lapak", berat : null ,harga: 12000, stok: 15, unggulan : true },
  { nama: "Red Velvet", kategori: "Lapak", berat : null ,harga: 14000, stok: 5, unggulan : false },
  { nama: "Kopsu Avocado", kategori: "Lapak", berat : null ,harga: 13000, stok: 10, unggulan : false },
];
console.table(produkUmkm);

const produkGrid = document.querySelector("#produk-grid");
const produkStatus = document.querySelector("#produk-status");
const tombolFilter = document.querySelectorAll("[data-filter]");

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

function buatElemenProduk(produk) {
  const card = document.createElement("article");
  card.classList.add("product-card");

  const title = document.createElement("h3");
  title.textContent = produk.nama;

  const category = document.createElement("p");
  category.classList.add("category-note");
  category.textContent = produk.kategori;

  const price = document.createElement("p");
  price.classList.add("price");
  price.textContent = formatRupiah(produk.harga);

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = "Sembunyikan";
  removeButton.classList.add("ghost-button");

  removeButton.addEventListener("click", () => {
    card.remove();
    produkStatus.textContent = "Satu kartu disembunyikan dari tampilan sementara.";
  });

  const stock = document.createElement("span");
  const status = statusStok(produk.stok);
  stock.classList.add("stock-badge");
  if (status.className) {
    stock.classList.add(status.className);
  }
  stock.textContent = status.label;

  card.append(title, category, price, stock, removeButton);
  return card;
}

//empty state
function buatEmptyState(kategori) {
  const empty = document.createElement("p");
  empty.classList.add("empty-state");
  empty.textContent = `Belum ada produk pada kategori ${kategori}.`;
  return empty;
}

// render produk filter
function renderProduk(kategoriAktif = "Semua") {
  if (!produkGrid || !produkStatus) {
    console.warn("Target render produk tidak ditemukan.");
    return;
  }

  console.log("Render kategori:", kategoriAktif);


  const produkTampil = kategoriAktif === "Semua"
    ? produkUmkm
    : produkUmkm.filter((produk) => produk.kategori === kategoriAktif);

  produkGrid.replaceChildren();

  if (produkTampil.length === 0) {
    produkGrid.append(buatEmptyState(kategoriAktif));
    produkStatus.textContent = "0 produk ditemukan.";
    return;
  }

  produkTampil.forEach((produk) => {
    produkGrid.append(buatElemenProduk(produk));
  });

  produkStatus.textContent = `${produkTampil.length} produk ditampilkan.`;
}

// render produk dari data lokal/versi p10
function renderProdukDinamis() {
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
}

renderProduk();
renderProdukDinamis();


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

//menambhkan event listener untuk tombol filter
tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", (event) => {
    const tombolAktif = event.currentTarget;
    const kategori = tombolAktif.dataset.filter;

    tombolFilter.forEach((item) => item.classList.remove("is-active"));
    tombolAktif.classList.add("is-active");

    renderProduk(kategori);
  });
});

