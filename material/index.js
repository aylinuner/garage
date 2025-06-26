loginPlease();
document.addEventListener('DOMContentLoaded', () => {
    loadAllMaterials(); // Sayfa yüklendiğinde tüm malzemeleri getir
    document.getElementById("logout_dropdown_btn").addEventListener('click', (e) => {
        e.preventDefault()
        logout()
    })
    document.getElementById("new_btn").addEventListener('click', () => {
        window.location.href = "detail.html"
    })
    userName();
    //arama işlemi 
    const inputIds = ["idSearch", "nameSearch", "propertySearch", "descriptionSearch", "qrCode"]
    inputIds.forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            const isEmpty = inputIds.every(inputId => document.getElementById(inputId).value.trim() === "");
            if (isEmpty) {
                loadAllMaterials();
            } else {
                searchMaterials();
            }
        })
    })
});

//Fonksiyonlar
function loginPlease() {
    const grg_ls = JSON.parse(localStorage.getItem('grg_ls'))
    if (!grg_ls.signed_user.id) {
        alert('Lütfen giriş yapınız!!')
        window.location.href = "/user.html"
    }
}
function logout() {
    grg_ls.signed_user = {};
    localStorage.setItem('grg_ls', JSON.stringify(grg_ls))
    alert('Başarıyla çıkış yaptınız')
    window.location.href = "/user.html";
}
function userName() {
    const grg_ls = JSON.parse(localStorage.getItem("grg_ls"));
    // Kullanıcı adı varsa HTML içine yerleştir
    if (grg_ls.signed_user.name) {
        document.getElementById("logged_user_name").textContent = grg_ls.signed_user.name;
    }
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
    <td>${material.property}</td>
    <td>${material.description}</td>
    <td>${material.qrCode}</td>
`;
        tr.addEventListener('dblclick', () => {
            window.location.href = `detail.html?id=${material.id}`;
        });
        tbody.appendChild(tr);
    });
}
function loadAllMaterials() {
    fetch('http://localhost:5265/api/Material/GetMaterials')
        .then(response => response.json())
        .then(data => renderTable(data))
        .catch(error => console.error('Veri alınamadı:', error));
}
function searchMaterials() {
    debugger
    const id = document.getElementById("idSearch").value.trim();
    const name = document.getElementById("nameSearch").value.trim();
    const property = document.getElementById("propertySearch").value.trim();
    const description = document.getElementById("descriptionSearch").value.trim();
    const qrCode = document.getElementById("qrCode").value.trim();

    const queryParams = new URLSearchParams({
        id,
        name,
        property,
        description,
        qrCode
    });
    fetch(`http://localhost:5265/api/Material/Search?${queryParams}`)
        .then(response => response.json())
        .then(data => renderTable(data))
        .catch(error => console.error("Hata:", error));
}