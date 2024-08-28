document.addEventListener("DOMContentLoaded", function() {
    // Mostrar el contenido del primer curso por defecto
    document.getElementById("course-1").classList.add("active");
    document.querySelector('.menu-item[data-course="1"]').classList.add("active");

    // Seleccionar todos los botones del menú
    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach(item => {
        item.addEventListener("click", function() {
            // Remover la clase active de todos los botones y contenidos
            menuItems.forEach(button => button.classList.remove("active"));
            document.querySelectorAll(".course-content").forEach(content => {
                content.classList.remove("active");
            });

            // Agregar la clase active al botón y contenido seleccionados
            const courseNumber = this.getAttribute("data-course");
            this.classList.add("active");
            document.getElementById(`course-${courseNumber}`).classList.add("active"); // Corregido el uso de template literal
        });
    });
});

///////

document.addEventListener('DOMContentLoaded', () => {
    const slideContainer = document.querySelector('.carousel-slide');
    const subtitleContainer = document.querySelector('.subtitulos');
    const slides = document.querySelectorAll('.carousel-slide img');
    const subtitulos = document.querySelectorAll('.subtitulos .capas');
    const dotsContainer = document.querySelector('.dots');
    let currentIndex = 1; // Empezamos en 1 debido a los clones
    let slideInterval;

    // Clonar el primer y último elemento para un bucle infinito
    const firstSlideClone = slides[0].cloneNode(true);
    const lastSlideClone = slides[slides.length - 1].cloneNode(true);
    slideContainer.appendChild(firstSlideClone);
    slideContainer.insertBefore(lastSlideClone, slides[0]);

    const firstSubtitleClone = subtitulos[0].cloneNode(true);
    const lastSubtitleClone = subtitulos[subtitulos.length - 1].cloneNode(true);
    subtitleContainer.appendChild(firstSubtitleClone);
    subtitleContainer.insertBefore(lastSubtitleClone, subtitulos[0]);

    const totalSlides = slides.length + 2; // Incluyendo clones

    // Ajustar el contenedor para los nuevos elementos
    slideContainer.style.width = `${100 * totalSlides}vw`;
    subtitleContainer.style.width = `${100 * totalSlides}vw`;

    // Mover el contenedor al primer slide real
    slideContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;
    subtitleContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;

    // Crear los puntos dinámicamente
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active'); // El primer punto es activo
        dot.addEventListener('click', () => goToSlide(i + 1)); // +1 por el clon inicial
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.dot');

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetInterval(); // Reiniciar el intervalo al cambiar manualmente
    }

    function updateCarousel() {
        slideContainer.style.transition = 'transform 1.0s ease-in-out';
        subtitleContainer.style.transition = 'transform 1.0s ease-in-out';
        slideContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;
        subtitleContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;

        dots.forEach(dot => dot.classList.remove('active'));
        if (currentIndex === 0) {
            dots[dots.length - 1].classList.add('active');
        } else if (currentIndex === slides.length + 1) {
            dots[0].classList.add('active');
        } else {
            dots[currentIndex - 1].classList.add('active');
        }
    }

    function nextSlide() {
        currentIndex++;
        updateCarousel();

        if (currentIndex === slides.length + 1) {
            setTimeout(() => {
                slideContainer.style.transition = 'none'; // Sin transición
                subtitleContainer.style.transition = 'none';
                currentIndex = 1;
                slideContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;
                subtitleContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;
            }, 1000); // Duración de la transición
        }
    }

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 4000); // Cambia automáticamente cada 4 segundos
    }

    slideInterval = setInterval(nextSlide, 4000); // Comienza el carrusel automático

    slideContainer.addEventListener('transitionend', () => {
        if (currentIndex === 0) {
            slideContainer.style.transition = 'none';
            currentIndex = slides.length;
            slideContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;
        } else if (currentIndex === slides.length + 1) {
            slideContainer.style.transition = 'none';
            currentIndex = 1;
            slideContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;
        }
    });
});
