const grg_ls = JSON.parse(localStorage.getItem('grg_ls'))
if (!grg_ls.signed_user.id) {
    alert('Lütfen giriş yapınız!!')
    window.location.href = "/user.html"
}

document.addEventListener('DOMContentLoaded', () => {

    loadAllMaterials(); // Sayfa yüklendiğinde tüm malzemeleri getir
    //Çıkış butonu
    document.getElementById("logout_dropdown_btn").addEventListener('click', (e) => {
        e.preventDefault()
        logout()
    })
    document.getElementById("new_btn").addEventListener('click', () => {
        window.location.href = "detail.html"
    })
    const grg_ls = JSON.parse(localStorage.getItem("grg_ls"));
    // Kullanıcı adı varsa HTML içine yerleştir
    if (grg_ls.signed_user.name) {
        document.getElementById("logged_user_name").textContent = grg_ls.signed_user.name;
    }
    //arama işlemi 
    document.getElementById('search').addEventListener('input', () => {
        const query = document.getElementById('search').value.trim();

        if (query === '') {
            loadAllMaterials(); // Arama boşsa tüm listeyi tekrar getir
        } else {
            searchMaterials(query); // Arama varsa filtreli getir
        }
    });
});

//Fonksiyonlar
function logout() {
    grg_ls.signed_user = {};
    localStorage.setItem('grg_ls', JSON.stringify(grg_ls))
    alert('Başarıyla çıkış yaptınız')
    window.location.href = "/user.html";
}
function renderTable(materials) {
    const tbody = document.querySelector('#materialTable tbody');
    tbody.innerHTML = '';

    if (materials.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="2" class="text-center">Hiç sonuç bulunamadı.</td>`;
        tbody.appendChild(tr);
        return;
    }

    materials.forEach(material => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
    <td>${material.id}</td>
    <td>${material.name}</td>
`;
        tbody.appendChild(tr);
    });
}
function loadAllMaterials() {
    fetch('http://localhost:5265/api/Material/GetMaterials')
        .then(response => response.json())
        .then(data => renderTable(data))
        .catch(error => console.error('Veri alınamadı:', error));
}
function searchMaterials(query) {
    fetch(`http://localhost:5265/api/Material/Search?query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => renderTable(data))
        .catch(error => console.error("Hata:", error));
}