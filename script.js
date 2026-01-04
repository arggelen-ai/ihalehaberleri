async function ihaleleriGetir() {
  const response = await fetch("https://www.kik.gov.tr/rss/duyurular.xml"); // Örnek RSS
  const text = await response.text();

  const parser = new DOMParser();
  const xml = parser.parseFromString(text, "application/xml");

  const items = xml.querySelectorAll("item");
  const liste = document.getElementById("ihaleler");
  liste.innerHTML = "";

  items.forEach((item, index) => {
    const title = item.querySelector("title").textContent;
    const link = item.querySelector("link").textContent;
    const date = item.querySelector("pubDate")?.textContent || "";

    // Filtre: sadece "inşaat" geçen ihaleleri göster
    if (title.toLowerCase().includes("inşaat")) {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${link}" target="_blank">${title}</a> <small>${date}</small>`;
      liste.appendChild(li);
    }
  });
}

// Sayfa açıldığında çalıştır
ihaleleriGetir();

// 30 dakikada bir güncelle
setInterval(ihaleleriGetir, 1800000);