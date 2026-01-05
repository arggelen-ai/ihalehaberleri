// SEKTÖRE GÖRE RESİM KÜTÜPHANESİ
const sektorResimleri = {
    insaat: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&w=300&q=80",
    hizmet: "https://images.unsplash.com/photo-1558905619-172542632462?auto=format&fit=crop&w=300&q=80",
    teknoloji: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&q=80",
    default: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=300&q=80"
};

async function ihaleleriYukle() {
    const konteyner = document.getElementById('ihale-container');
    if (!konteyner) return;

    try {
        const cevap = await fetch('ihaleler.json');
        const veriler = await cevap.json();
        
        konteyner.innerHTML = veriler.map(ihale => {
            const resim = sektorResimleri[ihale.sektor] || sektorResimleri.default;
            return `
                <div class="ihale-card" data-sektor="${ihale.sektor}">
                    <div class="card-image" style="background-image: url('${resim}')"></div>
                    <div class="card-body">
                        <span class="badge ${ihale.durum}">${ihale.durumMetni}</span>
                        <h3>${ihale.baslik}</h3>
                        <div class="info-grid">
                            <div class="info-row"><i class="fas fa-university"></i> <span><strong>Kurum:</strong> ${ihale.kurum}</span></div>
                            <div class="info-row"><i class="fas fa-map-marker-alt"></i> <span><strong>Konum:</strong> ${ihale.konum}</span></div>
                            <div class="info-row"><i class="fas fa-calendar-alt"></i> <span><strong>Tarih:</strong> ${ihale.tarih}</span></div>
                            <div class="info-row"><i class="fas fa-wallet"></i> <span><strong>Tahmini Bedel:</strong> ${ihale.bedel}</span></div>
                        </div>
                        <a href="${ihale.link}" target="_blank" class="btn-detay">EKAP'ta İncele <i class="fas fa-external-link-alt" style="font-size: 11px; margin-left: 8px;"></i></a>
                    </div>
                </div>
            `;
        }).join('');
    } catch (h) { 
        console.error("Hata oluştu:", h); 
    }
}

// FİLTRELEME FONKSİYONU
function filtrele() {
    const aramaDegeri = document.getElementById('aramaInput').value.toLowerCase();
    const secilenSektor = document.getElementById('sektorSelect').value.toLowerCase();
    const kartlar = document.querySelectorAll('.ihale-card');

    kartlar.forEach(kart => {
        const metin = kart.innerText.toLowerCase();
        // Değişken ismindeki boşluk kaldırıldı (syntax hatası giderildi)
        const aramaUyuyorMu = metin.includes(aramaDegeri);
        const sektorUyuyorMu = secilenSektor === "all" || metin.includes(secilenSektor);

        kart.style.display = (aramaUyuyorMu && sektorUyuyorMu) ? "flex" : "none";
    });
}

window.onload = ihaleleriYukle;
