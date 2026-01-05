const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = 3000;

// Basit endpoint: EKAP duyurularını çek
app.get("/ekap", async (req, res) => {
  try {
    const response = await fetch("https://www.ihale.gov.tr/Duyurular"); 
    const text = await response.text();

    // Burada HTML içinden duyuruları ayıklaman gerekiyor (örneğin regex veya cheerio ile)
    // Şimdilik sadece ham HTML döndürelim
    res.send(text);
  } catch (err) {
    res.status(500).send("Veri çekilemedi: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});[
  {
    "baslik": "Karaman Belediyesi Temizlik İhalesi",
    "tarih": "2026-01-15",
    "sektor": "Temizlik"
  },
  {
    "baslik": "Sağlık Bakanlığı Tıbbi Malzeme İhalesi",
    "tarih": "2026-01-20",
    "sektor": "Sağlık"
  },
  {
    "baslik": "Milli Eğitim Bakanlığı Okul İnşaatı İhalesi",
    "tarih": "2026-01-25",
    "sektor": "İnşaat"
  }
][
  {
    "baslik": "Karaman Belediyesi Temizlik İhalesi",
    "tarih": "2026-01-15",
    "sektor": "Temizlik"
  },
  {
    "baslik": "Sağlık Bakanlığı Tıbbi Malzeme İhalesi",
    "tarih": "2026-01-20",
    "sektor": "Sağlık"
  },
  {
    "baslik": "Milli Eğitim Bakanlığı Okul İnşaatı İhalesi",
    "tarih": "2026-01-25",
    "sektor": "İnşaat"
  }
]