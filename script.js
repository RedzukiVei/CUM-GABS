// Variables globales
let isMusicPlaying = false;
const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

// Efecto de confeti al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar con confeti
    createConfetti();
    
    // Configurar el botón de música
    setupMusic();
    
    // Reproducir música automáticamente (con interacción del usuario)
    document.body.addEventListener('click', startMusicOnInteraction, { once: true });
    
    // Efecto al hacer clic en la tarjeta
    const card = document.querySelector('.birthday-card');
    card.addEventListener('click', createConfetti);
});

// Función para crear confeti
function createConfetti() {
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#1abc9c'];
    const container = document.querySelector('.birthday-card');
    
    // Limpiar confeti anterior
    document.querySelectorAll('.confetti').forEach(el => el.remove());
    
    // Crear nuevo confeti
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = -10 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.opacity = '0.8';
        confetti.style.position = 'absolute';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        container.appendChild(confetti);
        
        // Animación del confeti
        const animation = confetti.animate([
            { top: '-10px', opacity: 0 },
            { top: '10%', opacity: 1 },
            { top: '100%', opacity: 0.5 }
        ], {
            duration: 3000 + Math.random() * 2000,
            easing: 'cubic-bezier(0.1, 0.5, 0.8, 1)',
            fill: 'forwards'
        });
        
        // Eliminar el elemento después de la animación
        animation.onfinish = () => confetti.remove();
    }
}

// Efecto de agitar la vela al pasar el mouse
const candle = document.querySelector('.candle');
candle.addEventListener('mouseover', () => {
    const flame = document.querySelector('.flame');
    flame.style.animation = 'none';
    flame.offsetHeight; // Trigger reflow
    flame.style.animation = 'flame 0.1s infinite alternate';
});

// Mostrar mensaje oculto al hacer doble clic en el pastel
const cake = document.querySelector('.cake');
cake.addEventListener('dblclick', () => {
    const hiddenMessage = document.createElement('div');
    hiddenMessage.textContent = '¡Sopla las velas! 🎂';
    hiddenMessage.style.position = 'absolute';
    hiddenMessage.style.top = '20px';
    hiddenMessage.style.left = '50%';
    hiddenMessage.style.transform = 'translateX(-50%)';
    hiddenMessage.style.background = 'rgba(255, 255, 255, 0.9)';
    hiddenMessage.style.padding = '10px 20px';
    hiddenMessage.style.borderRadius = '20px';
    hiddenMessage.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    hiddenMessage.style.zIndex = '100';
    hiddenMessage.style.animation = 'fadeOut 2s forwards 2s';
    
    document.querySelector('.container').appendChild(hiddenMessage);
    
    // Eliminar el mensaje después de la animación
    setTimeout(() => {
        hiddenMessage.remove();
    }, 4000);
});

// Función para cambiar el fondo aleatoriamente
function setRandomBackground() {
    const backgrounds = [
        'background-purple',
        'background-gradient-1',
        'background-gradient-2',
        'background-gradient-3'
    ];
    
    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    document.body.className = '';
    document.body.classList.add(randomBg);
}

// Función para configurar la música
function setupMusic() {
    // Intentar reproducir música (puede ser bloqueado por el navegador hasta la interacción del usuario)
    const playPromise = music.play();
    
    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // Reproducción exitosa
            isMusicPlaying = true;
            updateMusicButton();
        })
        .catch(error => {
            // Reproducción bloqueada, esperar interacción del usuario
            isMusicPlaying = false;
            updateMusicButton();
        });
    }
    
    // Manejar el botón de música
    musicToggle.addEventListener('click', toggleMusic);
}

// Función para iniciar la música después de la interacción del usuario
function startMusicOnInteraction() {
    if (!isMusicPlaying) {
        const playPromise = music.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                isMusicPlaying = true;
                updateMusicButton();
            });
        }
    }
}

// Función para alternar la música
function toggleMusic() {
    if (isMusicPlaying) {
        music.pause();
    } else {
        music.play();
    }
    isMusicPlaying = !isMusicPlaying;
    updateMusicButton();
}

// Función para actualizar el ícono del botón de música
function updateMusicButton() {
    const icon = musicToggle.querySelector('i');
    if (isMusicPlaying) {
        icon.className = 'fas fa-volume-up';
        musicToggle.querySelector('span').textContent = 'Música';
    } else {
        icon.className = 'fas fa-volume-mute';
        musicToggle.querySelector('span').textContent = 'Silencio';
    }
}

// Agregar estilos para la animación de desvanecimiento
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    }
`;
document.head.appendChild(style);
