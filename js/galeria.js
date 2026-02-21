// ============ GALERÍA TENDEDERO ============
document.addEventListener('DOMContentLoaded', function() {
    // Agregar animación escalonada a las polaroids
    const polaroids = document.querySelectorAll('.foto-polaroid');
    polaroids.forEach((polaroid, index) => {
        polaroid.style.setProperty('--index', index);
    });
});

// ============ LIGHTBOX ============
const imagenesLight = document.querySelector('.agregar-imagen');
const contenedorLight = document.querySelector('.image-light');
const closeBtn = document.querySelector('.close');
const todasLasImagenes = document.querySelectorAll('.polaroid-img');

// Abrir imagen en lightbox
const aparecerImagen = (imagenSrc) => {
    imagenesLight.src = imagenSrc;
    contenedorLight.classList.add('show');
    imagenesLight.classList.add('showImage');
}

// Cerrar lightbox
const cerrarImagen = () => {
    contenedorLight.classList.remove('show');
    imagenesLight.classList.remove('showImage');
}

// Event listeners para cada imagen
todasLasImagenes.forEach(img => {
    img.addEventListener('click', function() {
        aparecerImagen(this.src);
    });
});

// Cerrar al hacer click en el fondo
contenedorLight.addEventListener('click', (e) => {
    if (e.target === contenedorLight) {
        cerrarImagen();
    }
});

// Cerrar al hacer click en la X
closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    cerrarImagen();
});

// Cerrar con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contenedorLight.classList.contains('show')) {
        cerrarImagen();
    }
});

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