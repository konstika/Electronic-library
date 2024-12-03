const parallax = document.querySelector('.parallax');
window.addEventListener('scroll', function() {
    parallax.style.backgroundPositionY = window.pageYOffset * 0.5 + 'px';
});

const reg_link = document.getElementById("reg_link");
const reg = document.getElementById("registration");
const entry_link = document.getElementById("entry_link");
const entry = document.getElementById("entry");
entry.style.display = 'flex';
reg.style.display = 'none';
reg_link.addEventListener("click", function(){
    reg.style.display = 'none';
    entry.style.display = 'flex';
});
entry_link.addEventListener("click", function(){
    reg.style.display = 'flex';
    entry.style.display = 'none';
});
