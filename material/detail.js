
document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault()
    document.getElementById('save_btn').addEventListener('click', () => {
        saveMaterial()
    })

})
function saveMaterial() {
    debugger
    const material_model = {
        name: document.getElementById('name').value.trim()
    };
    if (!material_model.name) {
        alert("Tüm alanlar zorunlu!");
        return;
    }

    fetch("http://localhost:5265/api/Material/AddMaterial", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(material_model)
    })
        .then(res => {
            if (!res.ok) throw new Error("Kayıt yapılamadı");
            return res.json();
        })
        .then(data => {
            alert("Kayıt başarılı");
            window.location.href = "index.html";
        })
        .catch(err => {
            console.error(err);
            alert("Hata oluştu: " + err.message);
        });
}