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

setupToggle('btnImgVisible', '.img_review.hidden');
setupToggle('btnCommentsVisible', '.reviews_comment_card.hidden');
setupToggle('showMoreBtn', '.product_card_item.hidden');
setupToggle('checkboxBtn1', '.filter_checkbox1.hidden');
setupToggle('checkboxBtn2', '.filter_checkbox2.hidden');

/*сортировка*/

const cardsContainer = document.querySelector('.product_cards_items');
const cards = Array.from(document.querySelectorAll('.product_card_item'));
const links = document.querySelectorAll('.product_cards_sorter button');

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const sortType = link.textContent;
        const sortedCards = [...cards];

        if (sortType === 'Цена по возрастанию') {
            sortedCards.sort((a, b) => {
                const priceA = parseInt(a.querySelector('span').textContent);
                const priceB = parseInt(b.querySelector('span').textContent);
                return priceA - priceB;
            });
        }
        else if (sortType === 'Цена по убыванию') {
            sortedCards.sort((a, b) => {
                const priceA = parseInt(a.querySelector('span').textContent);
                const priceB = parseInt(b.querySelector('span').textContent);
                return priceB - priceA;
            });
        }

        // Очистить и добавить отсортированные
        cardsContainer.innerHTML = '';
        sortedCards.forEach(card => cardsContainer.appendChild(card));
    });
});

/*фильтры*/

const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const selectedPrices = Array.from(
            document.querySelectorAll('input[name="price[]"]:checked')
        ).map(cb => cb.value);

        // Если выбраны цены
        if (selectedPrices.length > 0) {
            cards.forEach(card => {
                const priceText = card.querySelector('span').textContent;
                const price = parseInt(priceText);
                let matches = false;

                selectedPrices.forEach(priceRange => {
                    if (priceRange === '0-2500' && price <= 2500) matches = true;
                    if (priceRange === '2500-4000' && price > 2500 && price <= 4000) matches = true;
                    if (priceRange === '4000-6000' && price > 4000 && price <= 6000) matches = true;
                    if (priceRange === '6000+' && price > 6000) matches = true;
                });

                card.style.display = matches ? '' : 'none';
            });
        } else {
            // Если фильтры сброшены - показать все
            cards.forEach(card => card.style.display = '');
        }
    });
});

/*смена валюты*/

// currency-converter.js
document.addEventListener('DOMContentLoaded', function() {
    const EXCHANGE_RATE = 80;
    const toggleBtn = document.getElementById('currencyToggle');
    const priceSpans = document.querySelectorAll('.product_card_item div span');

    let isRub = true;

    // Сохраняем оригинальные цены
    priceSpans.forEach(span => {
        const priceText = span.textContent.trim();
        const priceNum = parseFloat(priceText);
        span.dataset.originalPrice = priceNum;
    });

    toggleBtn.addEventListener('click', function() {
        if (isRub) {
            // Конвертируем в доллары
            priceSpans.forEach(span => {
                const originalPrice = span.dataset.originalPrice;
                const priceUSD = (originalPrice / EXCHANGE_RATE).toFixed(2);
                span.textContent = `${priceUSD} $`;
            });
            toggleBtn.textContent = 'ДОЛ.';
        } else {
            // Возвращаем рубли
            priceSpans.forEach(span => {
                const originalPrice = span.dataset.originalPrice;
                span.textContent = `${originalPrice} руб.`;
            });
            toggleBtn.textContent = 'РУБ.';
        }

        isRub = !isRub;
    });
});