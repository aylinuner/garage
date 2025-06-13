const grg_ls = JSON.parse(localStorage.getItem('grg_ls'))
var vehicle_model = {
    id: null,
    plate: null,
    km: null,
    brand: null,
    model: null,
    color: null
}
if (!grg_ls.signed_user.id) {
    alert('Lütfen giriş yapınız!!')
    window.location.href = "/user.html"
}
document.getElementById("logout_dropdown_btn").addEventListener('click', (e) => {
    e.preventDefault()
    logout()
})
document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault()
    document.getElementById('vehicle_form').addEventListener('submit', () => {
        saveVehicle()
    })
})


//Fonksiyon
function logout() {
    grg_ls.signed_user = {};
    localStorage.setItem('grg_ls', JSON.stringify(grg_ls))
    alert('Başarıyla çıkış yaptınız')
    window.location.href = "/user.html";
}

function saveVehicle() {
    vehicle_model = {
        id: generateId(grg_ls.db.vehicle),
        plate: document.getElementById('plate').value.trim(),
        km: document.getElementById('km').value,
        brand: document.getElementById('brand').value.trim(),
        model: document.getElementById('model').value.trim(),
        color: document.getElementById('color').value.trim()
    };
    grg_ls.db.vehicle.push(vehicle_model)
    localStorage.setItem('grg_ls', JSON.stringify(grg_ls));
    alert('Kayıt Başarılı')
    window.location.href = "/vehicle/index.html"
}

function generateId(p) {
    return p.reduce((max, u) => Math.max(max, u.id || 0), 0) + 1;
}