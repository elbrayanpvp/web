document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            alert(`Has seleccionado ${card.querySelector('h3').innerText}`);
        });
    });
});
