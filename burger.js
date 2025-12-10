/*бургер меню*/

let modal = document.getElementById('modal_nav');
let burgerBtn = document.getElementById('burger');

burgerBtn.addEventListener('click', function() {
    if (modal.classList.contains('active')) {
        // Закрываем с анимацией
        modal.classList.add('closing');
        setTimeout(() => {
            modal.classList.remove('active', 'closing');
        }, 200);
    } else {
        // Открываем
        modal.classList.add('active');
    }
});