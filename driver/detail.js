const grg_ls = JSON.parse(localStorage.getItem('grg_ls'))
var driver_model = {
    img: null,
    img_byte_array: null,
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
    setDriver()
    // deleteDriver()
});


//fonksiyonlar
function logout() {
    grg_ls.signed_user = {}
    localStorage.setItem("grg_ls", JSON.stringify(grg_ls))
    alert("Başarıyla çıkış yaptınız")
    window.location.href = "/user.html"
}

async function saveDriver() {
    const imgBytes = await readFileAsBytes();

    driver_model = {
        id: generateId(grg_ls.db.driver),
        img: document.getElementById('img').value,
        img_byte_array: imgBytes,
        name: document.getElementById('name').value.trim(),
        surname: document.getElementById('surname').value.trim(),
        tc: document.getElementById('tc').value.trim(),
        address: document.getElementById('address').value.trim(),
        city: document.getElementById('city').value.trim(),
        state: document.getElementById('state').value.trim(),
        zip: document.getElementById('zip').value.trim(),
        driver_file: document.getElementById("driver_file").value
    }
    console.log(driver_model)
    const exist_tc = grg_ls.db.driver.some(x => x.tc === driver_model.tc)

    if (exist_tc) {
        alert("Bu TC kayıtlı !")
        return;
    }
    if (!driver_model.name || !driver_model.surname || !driver_model.tc || !driver_model.address || !driver_model.city || !driver_model.state || !driver_model.zip || !driver_model.driver_file) {
        alert("Tüm alanlar zorunlu!!")
        return;
    }
    grg_ls.db.driver.push(driver_model)
    localStorage.setItem("grg_ls", JSON.stringify(grg_ls))
    alert("Kayıt başarılı")
    window.location.href = "index.html"
}
function generateId(p) {
    return p.reduce((max, u) => Math.max(max, u.id || 0), 0) + 1;
}
function setDriver() {

    const id = getQueryParam("id");
    const grg_ls = JSON.parse(localStorage.getItem("grg_ls"));
    if (id) {
        document.getElementById("update_btn").classList.remove("d-none");
        const numericId = parseInt(id);
        const driver = grg_ls.db.driver.find(v => v.id === numericId);
        // Sayfa yüklendiğinde inputlara verileri yerleştir
        // document.getElementById("img").value=driver.img;
        imgByteArrayToImgFile(driver);
        document.getElementById("name").value = driver.name;
        document.getElementById("surname").value = driver.surname;
        document.getElementById("tc").value = driver.tc;
        document.getElementById("address").value = driver.address;
        document.getElementById("city").value = driver.city;
        document.getElementById("state").value = driver.state;
        document.getElementById("zip").value = driver.zip;
        // document.getElementById("driver_img").value = driver.img
        if(driver.img_byte_array && driver.img_byte_array.length >0){
            const byteArray=new Uint8Array(driver.img_byte_array);
            const blob=new Blob([byteArray], {type: "image/jpeg/webp"})
            const imageUrl=URL.createObjectURL(blob);
            document.getElementById("driver_img").src=imageUrl;
        }

        // document.getElementById("driver_file").value = driver.driver_file;

        const updateBtn = document.getElementById("update_btn");
        updateBtn.classList.remove("d-none");
        updateBtn.onclick = async () => {
            // driver.img=document.getElementById("img").value;
            driver.name = document.getElementById("name").value;
            driver.surname = document.getElementById("surname").value;
            driver.tc = document.getElementById("tc").value;
            driver.address = document.getElementById("address").value;
            driver.city = document.getElementById("city").value;
            driver.state = document.getElementById("state").value;
            driver.zip = document.getElementById("zip").value;
            // driver.driver_file = document.getElementById("driver_file").value;
            const imgInput = document.getElementById("img");
            if (imgInput.files.length > 0) {
                driver.img = imgInput.value;
                driver.img_byte_array = await readFileAsBytes();
            }
            localStorage.setItem("grg_ls", JSON.stringify(grg_ls));
            alert("Sürücü bilgisi başarıyla güncellendi!");
            window.location.href = "index.html";
        };
    }
}
function deleteDriver() {
    const id = getQueryParam("id");
    const grg_ls = JSON.parse(localStorage.getItem("grg_ls"));
    const numericId = parseInt(id);
    const driverIndex = grg_ls.db.driver.findIndex(d => d.id === numericId);

    const driver = grg_ls.db.driver[driverIndex];
    document.getElementById("img").value = driver.img;
    // dpocument.getElementById("img_byte_array").value=driver.img_byte_array;
    document.getElementById("name").value = driver.name;
    document.getElementById("surname").value = driver.surname;
    document.getElementById("tc").value = driver.tc;
    document.getElementById("address").value = driver.address;
    document.getElementById("city").value = driver.city;
    document.getElementById("state").value = driver.state;
    document.getElementById("zip").value = driver.zip;
    //aşağıdaki satıra bakılacak(file type için farklı işlem gerekli).
    // document.getElementById("driver_file").value = driver.driver_file;

    const deleteBtn = document.getElementById("delete_btn");
    deleteBtn.classList.remove("d-none");
    deleteBtn.onclick = () => {
        grg_ls.db.driver.splice(driverIndex, 1);
        localStorage.setItem("grg_ls", JSON.stringify(grg_ls));
        alert("Sürücü başarıyla silindi.");
        window.location.href = "index.html";
    }
}
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
function readFileAsBytes() {
    debugger
    return new Promise((resolve, reject) => {

        const input = document.getElementById('img')
        const file = input.files[0];
        if (!file) {
            alert("Lütfen bir dosya seçin")
            return;
        }
        const reader = new FileReader();

        reader.onload = function (event) {
            const arrayBuffer = event.target.result;
            const bytes = new Uint8Array(arrayBuffer);
            console.log("byte Array", bytes);
            resolve(bytes);
        };
        reader.onerror = function (error) {
            reject(error);
        }
        reader.readAsArrayBuffer(file);
    });
}
function imgByteArrayToImgFile(driver_model) {
    if (!driver_model.img_byte_array || driver_model.img_byte_array.length === 0) {
        console.warn("img_byte_array boş");
        return null;
    }

    const byteArray = new Uint8Array(driver_model.img_byte_array);

    const blob = new Blob([byteArray], { type: 'image/jpeg/webp' });

    const imgElement = document.getElementById('driver_img')
    if (imgElement) {
        const imageUrl = URL.createObjectURL(blob);
        imgElement.src = imageUrl;
    } else {
        console.warn("driver_img elementi bulunamadı")
    }
    const file = new File([blob], "driver_photo.jpg", { type: 'image/jpeg/webp' });
    return file;
}