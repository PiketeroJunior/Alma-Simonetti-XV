// ============ FLIPBOOK CON TURN.JS ============
$(document).ready(function() {
    // Configuración del flipbook
    const flipbookConfig = {
        width: 800,
        height: 600,
        autoCenter: true,
        display: 'double',
        acceleration: true,
        elevation: 50,
        gradients: true,
        when: {
            turning: function(event, page, view) {
                // Bloquear página 1 (invisible)
                if (page === 1) {
                    event.preventDefault();
                    return false;
                }
            },
            turned: function(event, page) {
                console.log('Página actual:', page);
                updateArrows(page);
            }
        }
    };

    // Detectar si es móvil
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
        // Configuración para móvil (una página a la vez)
        flipbookConfig.width = Math.min(window.innerWidth - 40, 400);
        flipbookConfig.height = Math.min(window.innerHeight * 0.7, 600);
        flipbookConfig.display = 'single';
    } else {
        // Configuración para PC (libro abierto)
        flipbookConfig.width = Math.min(window.innerWidth * 0.8, 800);
        flipbookConfig.height = Math.min(window.innerHeight * 0.8, 600);
    }

    // Inicializar el flipbook
    $('#flipbook').turn(flipbookConfig);
    
    // Forzar inicio en página 2 (portada visible)
    // La página 1 es invisible y solo sirve para el modo double de Turn.js
    $('#flipbook').turn('page', 2);

    // ============ FUNCIONES DE DETECCIÓN ============
    function esPortada(page) {
        return page === 2;
    }

    function esContraportada(page) {
        return page === 9; // Última página real del libro
    }

    function esPaginaConFoto(page) {
        return page >= 3 && page <= 8;
    }

    // ============ NAVEGACIÓN CON FLECHAS ============
    $('#prev-btn').on('click', function() {
        const currentPage = $('#flipbook').turn('page');
        
        // No permitir retroceder si estamos en la portada
        if (esPortada(currentPage)) {
            return false;
        }
        
        $('#flipbook').turn('previous');
    });

    $('#next-btn').on('click', function() {
        const currentPage = $('#flipbook').turn('page');
        
        // No permitir avanzar si estamos en la contraportada
        if (esContraportada(currentPage)) {
            return false;
        }
        
        // En PC modo double, también bloquear en página 8 (porque se ven 8 y 9 juntas)
        const isMobileNow = window.innerWidth < 768;
        if (!isMobileNow && currentPage === 8) {
            return false;
        }
        
        $('#flipbook').turn('next');
    });

    // Actualizar visibilidad de flechas
    function updateArrows(page) {
        const isMobileNow = window.innerWidth < 768;
        
        // ========== MOBILE ==========
        if (isMobileNow) {
            // Ocultar flecha izquierda solo en portada
            if (esPortada(page)) {
                $('#prev-btn').hide();
            } else {
                $('#prev-btn').show();
            }
            
            // Ocultar flecha derecha solo en contraportada
            if (esContraportada(page)) {
                $('#next-btn').hide();
            } else {
                $('#next-btn').show();
            }
            return;
        }
        
        // ========== PC ==========
        // Ocultar flecha izquierda si estamos en portada
        if (esPortada(page)) {
            $('#prev-btn').css('display', 'none');
        } else {
            $('#prev-btn').css('display', 'flex');
        }
        
        // Ocultar flecha derecha si estamos en página 8 o 9
        // (en modo double, página 8 ya muestra contraportada)
        if (page >= 8) {
            $('#next-btn').css('display', 'none');
        } else {
            $('#next-btn').css('display', 'flex');
        }
    }
    
    // Inicializar visibilidad de flechas
    updateArrows(2);

    // Responsive: actualizar tamaño al cambiar ventana
    $(window).on('resize', function() {
        const newIsMobile = window.innerWidth < 768;
        
        if (newIsMobile) {
            $('#flipbook').turn('size', 
                Math.min(window.innerWidth - 40, 400), 
                Math.min(window.innerHeight * 0.7, 600)
            );
            $('#flipbook').turn('display', 'single');
        } else {
            $('#flipbook').turn('size', 
                Math.min(window.innerWidth * 0.8, 800), 
                Math.min(window.innerHeight * 0.8, 600)
            );
            $('#flipbook').turn('display', 'double');
        }
    });
});

// ============ LIGHTBOX (DESACTIVADO) ============
// El lightbox está desactivado para que las flechas funcionen sin interferencia
// Si se quiere reactivar, descomentar este código y ajustar el CSS (pointer-events)

/*
const imagenesLight = document.querySelector('.agregar-imagen');
const contenedorLight = document.querySelector('.image-light');
const closeBtn = document.querySelector('.close');

const aparecerImagen = (imagen) => {
    imagenesLight.src = imagen;
    contenedorLight.classList.add('show');
    imagenesLight.classList.add('showImage');
}

const cerrarImagen = () => {
    contenedorLight.classList.remove('show');
    imagenesLight.classList.remove('showImage');
}

contenedorLight.addEventListener('click', (e) => {
    if (e.target === contenedorLight) {
        cerrarImagen();
    }
});

closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    cerrarImagen();
});
*/

//COUNTDOWN
// Contador regresivo
const countdown = () => {
  const fechaEvento = new Date("2026-04-10T21:00:00").getTime(); // tu fecha
  const intervalo = setInterval(() => {
    const ahora = new Date().getTime();
    const distancia = fechaEvento - ahora;

    if (distancia < 0) {
      clearInterval(intervalo);
      document.getElementById("countdown").innerHTML = "<h2>¡Hoy es el gran día! 🎉</h2>";
      return;
    }

    const days = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distancia % (1000 * 60)) / 1000);

    document.getElementById("dias").textContent = days;
    document.getElementById("horas").textContent = hours;
    document.getElementById("minutos").textContent = minutes;
    document.getElementById("segundos").textContent = seconds;
  }, 1000);
};

countdown();