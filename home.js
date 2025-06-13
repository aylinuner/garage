//Event
document.getElementById("user_dropdown_btn").addEventListener('click', (e) => {
    e.preventDefault()
    userDropdownBtn()
})

document.getElementById("logout_dropdown_btn").addEventListener('click',(e)=>{
    e.preventDefault()
    logoutDropdownBtn()
})

//Fonksiyon
function userDropdownBtn() {
    window.location.href = "/customer.html"
}
function logoutDropdownBtn() {
    localStorage.removeItem("token");
    window.location.href = "user.html";
}