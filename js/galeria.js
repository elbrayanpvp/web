document.addEventListener('DOMContentLoaded', function () {
    // Cargar la primera categoría por defecto
    cargarContenido('/html/Categorias/categoria1.html');

    // Agregar evento a los botones de categoría
    document.querySelectorAll('.categoria').forEach(function (button) {
        button.addEventListener('click', function () {
            // Remover la clase activa de todos los botones
            document.querySelectorAll('.categoria').forEach(function (btn) {
                btn.classList.remove('categoria-activa');
            });

            // Añadir la clase activa al botón seleccionado
            this.classList.add('categoria-activa');

            // Cargar el archivo HTML correspondiente
            var archivo = this.getAttribute('data-archivo');
            cargarContenido(archivo);
        });
    });

    // Cargar el menú y el pie de página
    cargarSeccion('menu.html', 'menu-container');
    cargarSeccion('footer.html', 'footer-container');

    // Manejo de scroll para el menú
    window.onscroll = function() {
        var menu = document.getElementById("menu");
        if (menu) {
            if (window.pageYOffset > 0) {
                menu.classList.add("scrolled");
            } else {
                menu.classList.remove("scrolled");
            }
        }
    };
});

function cargarContenido(archivo) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', archivo, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const contenidoGaleria = document.getElementById('contenido-galeria');
            contenidoGaleria.innerHTML = xhr.responseText;
            ejecutarScripts(contenidoGaleria);
            inicializarModal(); // Re-inicializar modales después de cargar el contenido
        }
    };
    xhr.send();
}

function inicializarModal() {
    // Obtener todos los elementos de imagen
    const images = document.querySelectorAll('.categorys .maquinas img');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('fullImage');
    const closeBtn = document.getElementsByClassName('close')[0];

    // Verificar si los elementos existen antes de asignar eventos
    if (images.length > 0 && modal && modalImg && closeBtn) {
        images.forEach(img => {
            img.addEventListener('click', () => {
                modal.style.display = 'block';
                modalImg.src = img.src; // Mostrar la imagen seleccionada en el modal
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    } else {
        console.error('No se pudieron inicializar los modales correctamente.');
    }
}

function ejecutarScripts(elemento) {
    // Encontrar y ejecutar los scripts en el contenido cargado
    const scripts = elemento.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
        const nuevoScript = document.createElement('script');
        nuevoScript.text = scripts[i].text;
        document.body.appendChild(nuevoScript);
    }
}

function cargarSeccion(archivo, contenedorId) {
    fetch(archivo)
        .then(response => response.text())
        .then(data => {
            const contenedor = document.getElementById(contenedorId);
            if (contenedor) {
                contenedor.innerHTML = data;
            } else {
                console.error(`Contenedor con id "${contenedorId}" no encontrado.`);
            }
        })
        .catch(error => {
            console.error(`Error al cargar "${archivo}":`, error);
        });
}
