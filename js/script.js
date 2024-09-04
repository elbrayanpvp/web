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
    const dotsContainer = document.querySelector('.dots');
    let currentIndex = 1;
    let slideInterval;

    const largeImages = ['img/img1.jpg', 'img/img2.jpg', 'img/img3.jpg', 'img/img4.jpg'];
    const smallImages = ['img/cambio1.jpg', 'img/cambio2.jpg', 'img/cambio3.jpg','img/cambio4.jpg'];

    // Actualizar imágenes según tamaño de pantalla
    function updateImages() {
        const imagesToUse = window.innerWidth <= 680 ? smallImages : largeImages;
        slides.forEach((slide, index) => {
            slide.src = imagesToUse[index % imagesToUse.length]; // Para asegurar que no exceda la longitud del array
        });
    }

    // Clonar imágenes para bucle infinito
    function cloneSlides() {
        const firstSlideClone = slides[0].cloneNode(true);
        const lastSlideClone = slides[slides.length - 1].cloneNode(true);
        slideContainer.appendChild(firstSlideClone);
        slideContainer.insertBefore(lastSlideClone, slides[0]);
    }

    // Ajustar ancho del carrusel
    function adjustCarouselWidth() {
        const totalSlides = slides.length + 2;
        slideContainer.style.width = `${100 * totalSlides}vw`;
        subtitleContainer.style.width = `${100 * totalSlides}vw`;
        slideContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;
        subtitleContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;
    }

    // Crear puntos de navegación
    function createDots() {
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i + 1));
            dotsContainer.appendChild(dot);
        });
    }

    // Ir a una diapositiva específica
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetInterval();
    }

    // Actualizar carrusel
    function updateCarousel() {
        slideContainer.style.transition = 'transform 1.0s ease-in-out';
        subtitleContainer.style.transition = 'transform 1.0s ease-in-out';
        slideContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;
        subtitleContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;

        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[(currentIndex - 1 + dots.length) % dots.length].classList.add('active');
    }

    // Siguiente diapositiva
    function nextSlide() {
        currentIndex++;
        updateCarousel();

        if (currentIndex === slides.length + 1) {
            setTimeout(() => {
                slideContainer.style.transition = 'none';
                subtitleContainer.style.transition = 'none';
                currentIndex = 1;
                slideContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;
                subtitleContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;
            }, 1000);
        }
    }

    // Reiniciar intervalo de carrusel
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 4000);
    }

    // Inicialización
    updateImages();
    cloneSlides();
    adjustCarouselWidth();
    createDots();
    resetInterval();

    window.addEventListener('resize', () => {
        updateImages();
        adjustCarouselWidth();
    });

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



////////////script imagenes



