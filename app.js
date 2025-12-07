/*Функция для скрытия отзывов и фото-отзывов в секции reviews*/
function setupToggle(btnId, selector) {
    const btn = document.getElementById(btnId);
    const items = document.querySelectorAll(selector);
    let hidden = true;
    const originalText = btn.textContent;

    btn.addEventListener('click', () => {
        if (hidden) {
            items.forEach(item => item.classList.remove("hidden"));
            btn.textContent = btnId === 'btnImgVisible' ? 'Меньше фото' : 'Скрыть';
        } else {
            items.forEach(item => item.classList.add("hidden"));
            btn.textContent = originalText;
        }
        hidden = !hidden;
    });
}

// Используй
setupToggle('btnImgVisible', '.img_review.hidden');
setupToggle('btnCommentsVisible', '.reviews_comment_card.hidden');



