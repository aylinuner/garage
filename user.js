let activeTab = "login";

const tabButtons = document.querySelectorAll('#tab-buttons button');
const tabContents = document.querySelectorAll('.tab-content-box');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');

        activeTab = targetId;
        // Aktif tab içeriğini göster, diğerlerini gizle
        tabContents.forEach(content => {
            content.classList.toggle('d-none', content.id !== targetId);
        });

        // Aktif butonu belirle
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login_form')
    const registerForm = document.getElementById('register_form')



    loginForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const email = document.getElementById('email_login').value.trim
        const password = document.getElementById('password_login').value

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const matchedUser = users.find(user => user.email === email && user.password === password);

        if (!email.value || !password.value) {
            alert('Tüm alanlar zorunlu!!!')
            return;

        }
        if (matchedUser) {
            alert('Giriş Başarılı')
            window.location.href = "index.html"
        } else {
            alert("Giriş Başarısız")
        }
    })

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const name = document.getElementById('name').value.trim
        const surname = document.getElementById('surname').value.trim
        const email = document.getElementById('email_register').value.trim
        const password = document.getElementById('password_register').value
        const repassword = document.getElementById('repassword').value


        const users = JSON.parse(localStorage.getItem('users')) || [];
        const alreadyExists = users.some(user => user.email === email)

        if (!name || !surname || !email || !password || !repassword) {
            alert("Tüm alanlar zorunlu!!!")
            return;

        } 
        if(password !== repassword) {
            alert('Şifreler eşleşmiyor')
            return;

        }
         if (alreadyExists) {
            alert('Bu e-posta zaten kayıtlı')
            return;
        }

        users.push({ name, surname, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Kayıt başarılı, giriş yapabilirsiniz!')
    

    })
})



