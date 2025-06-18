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
    document.getElementById('save_btn').addEventListener('click', () => {
        saveVehicle()
    })
    document.getElementById('back_btn').addEventListener('click', () => {
        window.location.href = "index.html"
    })
    const grg_ls = JSON.parse(localStorage.getItem("grg_ls"));
    // Kullanıcı adı varsa HTML içine yerleştir
    if (grg_ls.signed_user.name) {
        document.getElementById("logged_user_name").textContent = grg_ls.signed_user.name;
    }
    updateVehicle()
    deleteVehicle()
});



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
    window.location.href = "index.html"
}
function generateId(p) {
    return p.reduce((max, u) => Math.max(max, u.id || 0), 0) + 1;
}
function updateVehicle() {
    const id = getQueryParam("id");
    const grg_ls = JSON.parse(localStorage.getItem("grg_ls"));
    if (id) {
        document.getElementById("update_btn").classList.remove("d-none");

        const numericId = parseInt(id);
        const vehicle = grg_ls.db.vehicle.find(v => v.id === numericId);
        // Sayfa yüklendiğinde inputlara verileri yerleştir
        document.getElementById("plate").value = vehicle.plate;
        document.getElementById("km").value = vehicle.km;
        document.getElementById("brand").value = vehicle.brand;
        document.getElementById("model").value = vehicle.model;
        document.getElementById("color").value = vehicle.color;
        const updateBtn = document.getElementById("update_btn");
        updateBtn.classList.remove("d-none");
        updateBtn.onclick = () => {
            // Güncelle butonuna basıldığında yeni değerleri kaydet
            document.getElementById("update_btn").addEventListener("click", () => {
                vehicle.plate = document.getElementById("plate").value;
                vehicle.km = document.getElementById("km").value;
                vehicle.brand = document.getElementById("brand").value;
                vehicle.model = document.getElementById("model").value;
                vehicle.color = document.getElementById("color").value;

                localStorage.setItem("grg_ls", JSON.stringify(grg_ls));
                alert("Araç bilgisi başarıyla güncellendi!");
                window.location.href = "index.html";
                return;
            });
        }
    }
}
function deleteVehicle() {
    const id = getQueryParam("id");
    const grg_ls = JSON.parse(localStorage.getItem("grg_ls"));
    const numericId = parseInt(id);
    const vehicleIndex = grg_ls.db.vehicle.findIndex(v => v.id === numericId);

    const vehicle = grg_ls.db.vehicle[vehicleIndex];
    document.getElementById("plate").value = vehicle.plate;
    document.getElementById("km").value = vehicle.km;
    document.getElementById("brand").value = vehicle.brand;
    document.getElementById("model").value = vehicle.model;
    document.getElementById("color").value = vehicle.color;

    const deleteBtn = document.getElementById("delete_btn");
    deleteBtn.classList.remove("d-none");
    deleteBtn.onclick = () => {
        grg_ls.db.vehicle.splice(vehicleIndex, 1);
        localStorage.setItem("grg_ls", JSON.stringify(grg_ls));
        alert("Araç başarıyla silindi.");
        window.location.href = "index.html";
    }
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}