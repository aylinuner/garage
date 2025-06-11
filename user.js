let activeTab = "login";
let grg_ls = {};

//Event Handlers
const tabButtons = document.querySelectorAll('#tab-buttons button');
const tabContents = document.querySelectorAll('.tab-content-box');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        showActiveTabContent(button)
    });
});

document.addEventListener('DOMContentLoaded', () => {
    getLsData()
    document.getElementById('register_form').addEventListener('submit', (e) => {
        e.preventDefault()
        register()

    });
    // const loginForm = document.getElementById('login_form')

});

//Functions
function getLsData() {

    if (!localStorage.getItem('grg_ls')) {
        grg_ls = {
            db: {
                user: [],
                driver: [],
                vehicle: []
            },
            user: {}
        };
        localStorage.setItem('grg_ls', JSON.stringify(grg_ls))
    }else{
        grg_ls=JSON.parse(localStorage.getItem('grg_ls'))
    }
}
function showActiveTabContent(button) {
    const targetId = button.getAttribute('data-target');

    activeTab = targetId;
    // Aktif tab içeriğini göster, diğerlerini gizle
    tabContents.forEach(content => {
        content.classList.toggle('d-none', content.id !== targetId);
    });

    // Aktif butonu belirle
    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}
function register() {
    const registerData = {
        name: document.getElementById('name').value.trim(),
        surname: document.getElementById('surname').value.trim(),
        email: document.getElementById('email_register').value.trim(),
        password: document.getElementById('password_register').value,
        repassword: document.getElementById('repassword_register').value
    };
    if (!registerData.name || !registerData.surname || !registerData.email || !registerData.password || !registerData.repassword) {
        alert('Tüm alanlar zorunlu!');
        return;
    }

    if (registerData.password !== registerData.repassword) {
        alert('Şifreler eşleşmiyor')
        return;
    }

    const grg_ls = JSON.parse(localStorage.getItem('grg_ls'));
    const users = grg_ls.db.user;

    const alreadyExists = users.some(user => user.email === registerData.email)

    if (alreadyExists) {
        alert('Bu e-posta zaten kayıtlı')
        return;
    }

    const newUser = {
        id: generateId(array),
        name: registerData.name,
        surname: registerData.surname,
        email: registerData.email,
        password: registerData.password
    };

    users.push(newUser);
    localStorage.setItem('grg_ls', JSON.stringify(grg_ls));
    alert('Kayıt başarılı, giriş yapabilirsiniz!');
}
function generateId(array) {
    return array.reduce((max, u) => Math.max(max, u.id || 0), 0) + 1;
}

// loginForm?.addEventListener('submit', (e) => {

//     e.preventDefault()

//     const loginData = {
//         email: document.getElementById('email_login').value.trim(),
//         password: document.getElementById('password_login').value
//     };
//     if (!loginData.email || !loginData.password) {
//         alert('Tüm alanlar zorunlu!!!')
//         return;
//     }
//     const grg_ls = JSON.parse(localStorage.getItem('ls'));
//     const users = grg_ls.db.user;
//     const matchedUser = users.find(user => user.email === loginData.email && user.password === loginData.password);

//     if (matchedUser) {
//         grg_ls.user = matchedUser;
//         localStorage.setItem('ls', JSON.stringify(grg_ls));
//         alert('Giriş Başarılı')
//         window.location.href = "index.html"
//     } else {
//         alert("Giriş Başarısız")
//     }
// })