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
    document.getElementById('back_btn').addEventListener('click', () => {
        window.location.href = "index.html"
    })
    document.getElementById('update_btn').classList.add('d-none', () => {
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
    const exist_plate = grg_ls.db.vehicle.some(x => x.plate === vehicle_model.plate)
    if (exist_plate) {
        alert('Bu plaka kayıtlı!')
        return;
    }
    if (!vehicle_model.id || !vehicle_model.plate || !vehicle_model.km || !vehicle_model.brand || !vehicle_model.model || !vehicle_model.color) {
        alert("Tüm alanlar zorunlu !!!")
        return;
    }
    grg_ls.db.vehicle.push(vehicle_model)
    localStorage.setItem('grg_ls', JSON.stringify(grg_ls));
    alert('Kayıt Başarılı')
    window.location.href = "/vehicle/index.html"
}

function generateId(p) {
    return p.reduce((max, u) => Math.max(max, u.id || 0), 0) + 1;
}
function updateBtn() {

}