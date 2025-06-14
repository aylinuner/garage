const grg_ls = JSON.parse(localStorage.getItem('grg_ls'))
if (!grg_ls.signed_user.id) {
    alert('Lütfen giriş yapınız!!')
    window.location.href = "/user.html"
}
//Event
//MOUNTED:YÜKLENDİĞİNDE İLK BURASI ÇALIŞIR.
showTable()

document.getElementById("logout_dropdown_btn").addEventListener('click', (e) => {
    e.preventDefault()
    logout()
})
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get("id"));
    debugger
    if (id && vehicle_model.id !== 0) {
        // Güncelle butonunu göster, BU KISMA BAKILACAK.
        document.getElementById('update_btn').classList.remove('d-none');
    }

    let grg_ls = JSON.parse(localStorage.getItem("grg_ls")) || { db: { vehicle: [] } };
    const item = grg_ls.db.vehicle.find(v => v.id === id);
    if (item) {
        document.getElementById("plate").value = item.plate;
        document.getElementById("km").value = item.km;
        document.getElementById("brand").value = item.brand;
        document.getElementById("model").value = item.model;
        document.getElementById("color").value = item.color;
    }
});


//Fonksiyon
function logout() {
    grg_ls.signed_user = {};
    localStorage.setItem('grg_ls', JSON.stringify(grg_ls))
    alert('Başarıyla çıkış yaptınız')
    window.location.href = "/user.html";
}
function showTable() {
    const table_body = document.querySelector("#vehicleTable tbody");
    table_body.innerHTML = '';
    grg_ls.db.vehicle.forEach(x => {
        const row = document.createElement('tr')
        row.innerHTML = `
 <td>${x.id}</td>
<td>${x.plate}</td>
<td>${x.km}</td>
<td>${x.brand}</td>
<td>${x.model}</td>
<td>${x.color}</td>
`;
        //satıra çift tıklandığına detail.html sayfasına id'sine göre gidiyor.
        row.addEventListener('dblclick', () => {
            window.location.href = `detail.html?id=${x.id}`;
        });
        table_body.appendChild(row);
    })

}

