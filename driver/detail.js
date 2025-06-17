const grg_ls = JSON.parse(localStorage.getItem('grg_ls'))
var driver_model = {
    id: null,
    name: null,
    surname: null,
    tc: null,
    address: null,
    city: null,
    state: null,
    zip: null,
    driver_file: null,
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
        saveDriver()
    })
    document.getElementById('back_btn').addEventListener('click', () => {
        window.location.href = "index.html"
    })
    const grg_ls = JSON.parse(localStorage.getItem("grg_ls"));
    // Kullanıcı adı varsa HTML içine yerleştir
    if (grg_ls.signed_user.name) {
        document.getElementById("logged_user_name").textContent = grg_ls.signed_user.name;
    }
});

function logout() {
    grg_ls.signed_user = {}
    localStorage.setItem("grg_ls", JSON.stringify(grg_ls))
    alert("Başarıyla çıkış yaptınız")
    window.alert = "/user.html"
}

function saveDriver() {
    driver_model = {
        id: generateId(grg_ls.db.driver),
        name: document.getElementById('name').value.trim(),
        surname: document.getElementById('surname').value.trim(),
        tc: document.getElementById('tc').value.trim(),
        address: document.getElementById('address').value.trim(),
        city: document.getElementById('city').value.trim(),
        state: document.getElementById('state').value.trim(),
        zip: document.getElementById('zip').value.trim(),
        driver_file: document.getElementById("driver_file").value.trim()
    }
    const exist_tc = grg_ls.db.driver.some(x => x.tc === driver_model.tc)

    if (exist_tc) {
        alert("Bu TC kayıtlı !")
        return;
    }
    if (!driver_model.name || !driver_model.surname || !driver_model.tc || !driver_model.address || !driver_model.city || !driver_model.state || !driver_model.zip || !driver_model.driver_file){
        alert("Tüm alanlar zorunlu!!")
        return;
    }
    grg_ls.db.driver.push(driver_model)
    localStorage.setItem("grg_ls",JSON.stringify(grg_ls))
    alert("Kayıt başarılı")
    window.location.href="index.html"
}
function generateId(p) {
    return p.reduce((max, u) => Math.max(max, u.id || 0), 0) + 1;
}