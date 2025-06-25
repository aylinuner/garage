## Frontend Detayları

Frontend, `garage` klasöründe yer almakta olup **Bootstrap** kullanılarak responsive ve şık bir arayüz tasarlanmıştır. JavaScript ile kullanıcı etkileşimleri yönetilir.

### Örnek: `detail.html` ve `detail.js`

- `detail.html` içinde Bootstrap CSS dosyası dahil edilmiştir.
- Sol tarafta sabit bir sidebar (menü) bulunmaktadır.
- Araç detayları için form elemanları (plaka, km, marka, model, renk) Bootstrap form sınıfları ile oluşturulmuştur.
- Üst sağda kayıt, güncelleme, silme, geri butonları yer almaktadır.

### JavaScript (`detail.js`) Özellikleri

- Kullanıcı giriş durumu **localStorage** üzerinden kontrol edilir.
- Araç bilgileri localStorage'daki `grg_ls` nesnesinden okunur ve sayfa yüklendiğinde forma yerleştirilir.
- Araç kaydetme, güncelleme ve silme işlemleri localStorage içinde gerçekleştirilir.
- Kullanıcı çıkışı (logout) fonksiyonu localStorage’dan kullanıcı bilgilerini temizler.
- URL parametresi ile araç seçimi yapılır (örnek: `detail.html?id=3`).
- Butonlar dinamik olarak gösterilip gizlenir.

### API Kullanımı

Bazı sayfalarda ise veriler backend API’den **fetch** ile çekilmektedir. Bu sayede localStorage’daki veriler backend ile senkronize olabilir.


## Özet

- Frontend: HTML + Bootstrap + Vanilla JS
- Veri Yönetimi: localStorage + Backend API (fetch)
- Responsive ve kullanıcı dostu arayüz
- Kolay araç ekleme, güncelleme, silme


