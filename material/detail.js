let material_model = {
    id: 0,
    name: null,
    property: null,
    description: null,
    qrCode: null
}
document.addEventListener('DOMContentLoaded', () => {
    loginPlease();
    setupEventHandlers();
    loadMaterialForEdit();
    userName();
});

function loginPlease() {
    const grg_ls = JSON.parse(localStorage.getItem('grg_ls'));
    if (!grg_ls?.signed_user?.id) {
        alert('Lütfen giriş yapınız!');
        window.location.href = "/user.html";
    }
}

function logout() {
    const grg_ls = JSON.parse(localStorage.getItem("grg_ls"));
    grg_ls.signed_user = {};
    localStorage.setItem("grg_ls", JSON.stringify(grg_ls));
    alert('Başarıyla çıkış yaptınız');
    window.location.href = "/user.html";
}

function userName() {
    const grg_ls = JSON.parse(localStorage.getItem("grg_ls"));
    if (grg_ls?.signed_user?.name) {
        document.getElementById("logged_user_name").textContent = grg_ls.signed_user.name;
    }
}

function setupEventHandlers() {
    document.getElementById("logout_dropdown_btn").addEventListener("click", logout);
    document.getElementById("back_btn").addEventListener("click", () => {
        window.location.href = "index.html";
    });

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const actionBtn = document.getElementById("action_btn");

    const deleteBtn = document.getElementById("delete_btn");
    if (id) {
        actionBtn.textContent = "Güncelle";
        actionBtn.classList.remove("btn-primary");
        actionBtn.classList.add("btn-dark");
        deleteBtn.classList.remove("d-none");

        actionBtn.onclick = (e) => {
            e.preventDefault();
            updateMaterial();
        };

        deleteBtn.onclick = (e) => {
            e.preventDefault();
            deleteMaterial();
        };
    } else {
        actionBtn.textContent = "Kaydet";
        actionBtn.classList.remove("btn-dark");
        actionBtn.classList.add("btn-primary");
        deleteBtn.classList.add("d-none");

        actionBtn.onclick = (e) => {
            e.preventDefault();
            saveMaterial();
        };
    }
}
function saveMaterial() {
    debugger
    bindModel();
    if (!validateMaterial())
        return;
    debugger
    fetch("http://localhost:5265/api/Material/AddMaterial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(material_model)
    })
        .then(res => res.ok ? res.json() : Promise.reject("Kayıt yapılamadı"))
        .then(() => {
            alert("Kayıt başarılı");
            window.location.href = "index.html";
        })
        .catch(err => alert("Hata oluştu: " + err));
}

function updateMaterial() {
    const id = document.getElementById("id").value;
    const model = bindModel();
    if (!validateMaterial(model)) return;

    fetch(`http://localhost:5265/api/Material/UpdateMaterial?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(model)
    })
        .then(res => res.ok ? res.json() : Promise.reject("Güncelleme başarısız"))
        .then(() => {
            alert("Güncelleme başarılı");
            window.location.href = "index.html";
        })
        .catch(err => alert("Hata: " + err));
}

function loadMaterialForEdit() {
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) return;

    fetch(`http://localhost:5265/api/Material/GetById/${id}`)
        .then(res => res.ok ? res.json() : Promise.reject("Bulunamadı"))
        .then(material => {
            document.getElementById("id").value = material.id;
            document.getElementById("name").value = material.name;
            document.getElementById("propertySearch").value = material.property;
            document.getElementById("descriptionSearch").value = material.description;
            document.getElementById("qrCode").value = material.qrCode;
        })
        .catch(err => console.error("Getirme hatası:", err));
}

function bindModel() {
    debugger
    material_model.name = document.getElementById("name").value.trim(),
        material_model.property = document.getElementById("propertySearch").value.trim(),
        material_model.description = document.getElementById("descriptionSearch").value.trim(),
        material_model.qrCode = document.getElementById("qrCode").value.trim()
}

function validateMaterial() {
    debugger
    let msg = '';
    if (!material_model.name) {
        msg = 'Malzeme ismi giriniz!'
    }
    else if (!material_model.property) {
        msg = 'Özellik giriniz!'
    }
    else if (!material_model.description) {
        msg = 'Açıklama giriniz!'
    }
    else if (!material_model.qrCode) {
        msg = 'Barkod numarası giriniz!'
    }
    if (msg) {
        alert(msg)
        return false;
    }
    return true;
}
function deleteMaterial() {
    debugger
    const id = document.getElementById("id").value;

    if (!confirm("Bu malzemeyi silmek istediğinizden emin misiniz?"))
        return;

    fetch(`http://localhost:5265/api/Material/DeleteMaterial?id=${id}`, {
        method: "DELETE"
    })
        .then(res => {
            if (!res.ok) throw new Error("Silme işlemi başarısız");
            return res.json();
        })
        .then(() => {
            alert("Malzeme başarıyla silindi.");
            window.location.href = "index.html";
        })
        .catch(err => {
            console.error("Silme hatası:", err);
            alert("Silme sırasında bir hata oluştu: " + err.message);
        });
}

