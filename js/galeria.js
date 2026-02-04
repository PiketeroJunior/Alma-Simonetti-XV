const imagenes = document.querySelectorAll('.img-galeria');
const imagenesLight = document.querySelector('.agregar-imagen');
const contenedorLight = document.querySelector('.image-light');
const closeBtn = document.querySelector('.close'); // La "X"

// Función para mostrar la imagen en grande
imagenes.forEach(imagen => {
    imagen.addEventListener('click', () => {
        aparecerImagen(imagen.getAttribute('src'));
    });
});

// Permite cerrar la imagen al hacer clic fuera de ella
contenedorLight.addEventListener('click', (e) => {
    if (e.target === contenedorLight) { // Solo se cierra si se hace clic fuera de la imagen
        cerrarImagen();
    }
});

// Evento para cerrar imagen al hacer clic en la "X"
closeBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita conflictos con otros eventos
    cerrarImagen();
});

const aparecerImagen = (imagen) => {
    imagenesLight.src = imagen;
    contenedorLight.classList.add('show');
    imagenesLight.classList.add('showImage');

    // Ocultar el menú hamburguesa y desactivar eventos
    hamburger1.style.opacity = '0';
    hamburger1.style.pointerEvents = 'none';
}

const cerrarImagen = () => {
    contenedorLight.classList.remove('show');
    imagenesLight.classList.remove('showImage');
}

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