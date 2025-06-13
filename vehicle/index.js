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
//BU KISIM ÇALIŞMIYOR.  
})


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
    grg_ls.db.vehicle.forEach(vehicle => {
        const row = document.createElement('tr')
        row.innerHTML = `
 <td>${vehicle.id}</td>
<td>${vehicle.plate}</td>
<td>${vehicle.km}</td>
<td>${vehicle.brand}</td>
<td>${vehicle.model}</td>
<td>${vehicle.color}</td>
`;
        table_body.appendChild(row);
    })

}