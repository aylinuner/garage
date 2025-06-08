document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(email.value, password.value);
        const userEmail=email.value
        const userPassword=password.value



        

    // Mevcut kullanıcıları al
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // Kullanıcı daha önce kayıt olmuş mu kontrol et
    const existingUser = users.find(user => user.email === userEmail);

    if (existingUser) {
        // Giriş işlemi
        if (existingUser.password === userPassword) {
            alert('Giriş başarılı!');
            window.location.href = 'anasayfa.html'; // yönlendirme
        } else {
            alert('Şifre yanlış!');
        }
    } else {
        // Yeni kullanıcı kaydet
        users.push({ email: userEmail, password: userPassword });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Kayıt başarılı, şimdi giriş yapabilirsiniz.');
    }

    // form.reset(); // istersen inputları sıfırlar
});
});
