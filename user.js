let activeTab = "login";
let grg_ls = {};
let grg_ls_default = {
    db: {
        user: [],
        driver: [],
        vehicle: []
    },
    signed_user: {}
};

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

    document.getElementById('login_form').addEventListener('submit', (e) => {
        e.preventDefault()
        login()
    })
});
//Functions
function getLsData() {

    if (!localStorage.getItem('grg_ls')) {
        grg_ls = grg_ls_default;
        localStorage.setItem('grg_ls', JSON.stringify(grg_ls))
    } else {
        grg_ls = JSON.parse(localStorage.getItem('grg_ls'))
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
        repassword: document.getElementById('repassword').value
    };

    const users = grg_ls.db.user;

    const alreadyExists = users.some(user => user.email === registerData.email);

    if (!registerData.name || !registerData.surname || !registerData.email || !registerData.password || !registerData.repassword) {
        alert('Tüm alanlar zorunlu!');
        return;
    }

    if (registerData.password !== registerData.repassword) {
        alert('Şifreler eşleşmiyor')
        return;
    }
    if (!isValidEmail(registerData.email)) {
        return;
    }
    if (alreadyExists) {
        alert('Bu e-posta zaten kayıtlı')
        return;
    }
    if (registerData.password.length < 6) {
        alert("Şifre 6 karakterden az olamaz!")
        return;
    }

    const newUser = {
        id: generateId(users),
        name: registerData.name,
        surname: registerData.surname,
        email: registerData.email,
        password: registerData.password
    };
    console.log(newUser.name)
    users.push(newUser);
    grg_ls.db.user = users;
    localStorage.setItem('grg_ls', JSON.stringify(grg_ls));
    alert('Kayıt başarılı, giriş yapabilirsiniz!');
    window.location.href = "user.html"
    return;
}
function login() {

    const loginData = {
        email: document.getElementById('email_login').value.trim(),
        password: document.getElementById('password_login').value
    };
    const grg_ls = JSON.parse(localStorage.getItem('grg_ls'));
    const users = grg_ls.db.user;
    const matchedUser = users.find(user => user.email === loginData.email && user.password === loginData.password);

    if (!loginData.email || !loginData.password) {
        alert('Tüm alanlar zorunlu!!!')
        return;
    }
    if (matchedUser) {
        //id,email, name ataması yaptık.
        grg_ls.signed_user = {
            id: matchedUser.id,
            name: matchedUser.name,
            email: matchedUser.email
        };
        localStorage.setItem('grg_ls', JSON.stringify(grg_ls));
        alert('Giriş Başarılı')
        window.location.href = "index.html"
    } else {
        alert("Giriş Başarısız")
    }
}
function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(email)) {
        alert("Lütfen geçerli bir e-posta adresi girin.");
        return false;
    }
    return true;
}
function generateId(users) {
    return users.reduce((max, u) => Math.max(max, u.id || 0), 0) + 1;
}

