const video = document.getElementById('miVideo');
video.addEventListener('click', function(event) {
    event.preventDefault(); // Evita que se pause
});

///////////////////
window.onscroll = function() {
    var menu = document.getElementById("menu");
    if (menu) {
        if (window.pageYOffset > 0) {
            menu.classList.add("scrolled");
        } else {
            menu.classList.remove("scrolled");
        }
    } else {
        console.error('El elemento con id "menu" no existe.');
    }
};


//////////////

const carrusel = document.querySelector('.carrusel-contenedor');
const contenido = document.querySelectorAll('.contenido');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let indice = 1;
let intervalo = 3000; // Tiempo en milisegundos para el desplazamiento automático
let autoCarrusel;

// Posicionamos el carrusel en el primer contenido (real)
carrusel.style.transform = `translateX(${-indice * 100}%)`;

function mostrarSlide(index) {
    carrusel.style.transition = 'transform 0.5s ease';
    carrusel.style.transform = `translateX(${-index * 100}%)`;
    indice = index;

    // Transición suave al primer/último contenido duplicado
    if (indice >= contenido.length - 1) {
        setTimeout(() => {
            carrusel.style.transition = 'none';
            carrusel.style.transform = `translateX(-100%)`;
            indice = 1;
        }, 500);
    } else if (indice <= 0) {
        setTimeout(() => {
            carrusel.style.transition = 'none';
            carrusel.style.transform = `translateX(${-(contenido.length - 2) * 100}%)`;
            indice = contenido.length - 2;
        }, 500);
    }
}

function iniciarAutoCarrusel() {
    autoCarrusel = setInterval(() => {
        mostrarSlide(indice + 1);
    }, intervalo);
}

function detenerAutoCarrusel() {
    clearInterval(autoCarrusel);
}

// Iniciar carrusel automático al cargar la página
iniciarAutoCarrusel();

prevButton.addEventListener('click', () => {
    mostrarSlide(indice - 1);
    detenerAutoCarrusel(); // Detenemos y reiniciamos el auto-carrusel para un comportamiento consistente
    iniciarAutoCarrusel();
});

nextButton.addEventListener('click', () => {
    mostrarSlide(indice + 1);
    detenerAutoCarrusel(); // Detenemos y reiniciamos el auto-carrusel para un comportamiento consistente
    iniciarAutoCarrusel();
});

// Detener el carrusel cuando el mouse esté sobre un .contenido
contenido.forEach((slide) => {
    slide.addEventListener('mouseenter', detenerAutoCarrusel);
    slide.addEventListener('mouseleave', iniciarAutoCarrusel);
});

