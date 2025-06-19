//Event
const grg_ls = JSON.parse(localStorage.getItem('grg_ls'))

if (!grg_ls.signed_user.id) {
    window.location.href = "/user.html"
}

document.getElementById("logout_dropdown_btn").addEventListener('click', (e) => {
    e.preventDefault()
    logout()
})
// Kullanıcı adı varsa HTML içine yerleştir
if (grg_ls.signed_user.name) {
    document.getElementById("logged_user_name").textContent = grg_ls.signed_user.name;
}

//Fonksiyon
function logout() {
    grg_ls.signed_user = {};
    localStorage.setItem('grg_ls', JSON.stringify(grg_ls))

    alert('Başarıyla çıkış yaptınız')
    window.location.href = "user.html";
}
