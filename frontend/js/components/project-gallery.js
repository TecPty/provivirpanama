/**
 * Project Details Modal Handler
 * Maneja la apertura del modal con detalles de proyectos individuales
 */

// Inicializar animaciones Lottie
document.addEventListener('DOMContentLoaded', () => {
    const lottieContainers = document.querySelectorAll('.lottie-animation');
    
    lottieContainers.forEach(container => {
        lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: './assets/images/icons/Hey.json'
        });
    });

    initProjectGallery();
});

// Función para cargar animaciones Lottie en el modal
function loadLottieAnimations() {
    const lottieIcons = document.querySelectorAll('.project-item__lottie-icon');
    
    lottieIcons.forEach(icon => {
        const path = icon.dataset.path;
        lottie.loadAnimation({
            container: icon,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: path
        });
    });
}

// Definición de proyectos por complejo
const projectComplexes = {
    villas: {
        title: 'Villas del Este',
        projects: [
            {
                name: 'Modelo Roble',
                description: 'Terrenos hasta 181m². 2 habitaciones, 1 baño, sala/comedor, cocina, lavandería y estacionamiento. Desde B/. 51.995 - Ingreso familiar desde $750.',
                image: './assets/images/properties/villas-del-este-modelo-roble.webp',
                whatsapp: '6371-2652',
                location: './assets/images/properties/map-provivir.png'
            },
            {
                name: 'Modelo Cerezo',
                description: 'Terrenos hasta 221m². 3 habitaciones, 2 baños, sala/comedor, cocina, lavandería y estacionamiento. Desde B/. 62.995 - Ingreso familiar desde $900.',
                image: './assets/images/properties/villas-del-este-modelo-cerezo.webp',
                whatsapp: '6371-2652',
                location: './assets/images/properties/map-provivir.png'
            }
        ]
    },
    ciudad: {
        title: 'Ciudad del Este',
        projects: [
            {
                name: 'Modelo Córdoba',
                description: 'Terrenos hasta 233m². 3 habitaciones, 1 baño, sala/comedor, cocina, lavandería y estacionamiento. Desde B/. 54.995 - Ingreso familiar desde $800.',
                image: './assets/images/properties/ciudad-del-este-modelo-cordoba.webp',
                whatsapp: '6371-2652',
                location: './assets/images/properties/map-provivir.png'
            },
            {
                name: 'Modelo Granada',
                description: 'Terrenos hasta 135m². 2 habitaciones, 1 baño, sala/comedor, cocina, lavandería y estacionamiento. Desde B/. 45.000 - Ingreso familiar desde $630.',
                image: './assets/images/properties/ciudad-del-este-modelo-granada.webp',
                whatsapp: '6371-2652',
                location: './assets/images/properties/map-provivir.png'
            }
        ]
    }
};

/**
 * Inicializa los event listeners para las tarjetas de proyecto
 */
function initProjectGallery() {
    const projectCards = document.querySelectorAll('.project-card');
    const projectButtons = document.querySelectorAll('.project-card__btn');
    const modal = document.getElementById('projectModal');
    const closeButton = document.querySelector('.project-modal__close');
    const overlay = document.querySelector('.project-modal__overlay');

    // Abrir modal al hacer clic en la tarjeta
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.project-card__btn')) {
                const complexKey = card.dataset.project;
                openProjectModal(complexKey);
            }
        });
    });

    // Abrir modal al hacer clic en el botón
    projectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const complexKey = button.dataset.project;
            openProjectModal(complexKey);
        });
    });

    // Cerrar modal
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            closeProjectModal();
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            closeProjectModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });
}

/**
 * Abre el modal con los proyectos del complejo
 * @param {string} complexKey - La clave del complejo (villas o ciudad)
 */
function openProjectModal(complexKey) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalProjects = document.getElementById('modalProjects');
    const complexData = projectComplexes[complexKey];

    if (!complexData) {
        console.error(`Complejo no encontrado: ${complexKey}`);
        return;
    }

    // Actualizar título
    if (modalTitle) {
        modalTitle.textContent = complexData.title;
    }

    // Limpiar proyectos anteriores
    if (modalProjects) {
        modalProjects.innerHTML = '';
        
        // Agregar clase según tipo de complejo
        modalProjects.className = 'project-modal__projects';
        modalProjects.classList.add(`project-modal__projects--${complexKey}`);

        // Agregar cada proyecto
        complexData.projects.forEach((project) => {
            const projectEl = document.createElement('div');
            projectEl.className = 'project-item';

            const projectHTML = `
                <div class="project-item__content">
                    <h3 class="project-item__name">${project.name}</h3>
                    <p class="project-item__description">${project.description}</p>
                    <div class="project-item__buttons">
                        <button class="project-item__btn project-item__btn--location"
                           data-map="${project.location}"
                           title="Ver ubicación">
                            <div class="project-item__lottie-icon" data-lottie="location" data-path="./assets/images/icons/location.json"></div>
                        </button>
                        <a href="https://wa.me/507${project.whatsapp.replace('-', '')}" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           class="project-item__btn project-item__btn--whatsapp"
                           title="Contactar por WhatsApp">
                            <div class="project-item__lottie-icon" data-lottie="chat" data-path="./assets/images/icons/chat.json"></div>
                        </a>
                    </div>
                </div>
            `;

            projectEl.innerHTML = projectHTML;
            projectEl.style.backgroundImage = `url('${project.image}')`;
            projectEl.style.backgroundSize = 'cover';
            projectEl.style.backgroundPosition = 'center';
            modalProjects.appendChild(projectEl);
        });

        // Cargar animaciones Lottie del modal
        loadLottieAnimations();

        // Agregar event listeners a los botones de ubicación
        const locationButtons = modalProjects.querySelectorAll('.project-item__btn--location');
        locationButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const mapImage = btn.dataset.map;
                openMapModal(mapImage);
            });
        });
    }

    // Mostrar modal
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Abre el modal del mapa
 */
function openMapModal(mapImage) {
    let mapModal = document.getElementById('mapModal');
    
    // Si no existe, crear el modal
    if (!mapModal) {
        mapModal = document.createElement('div');
        mapModal.id = 'mapModal';
        mapModal.className = 'map-modal';
        mapModal.innerHTML = `
            <div class="map-modal__overlay"></div>
            <div class="map-modal__content">
                <button class="map-modal__close" aria-label="Cerrar">&times;</button>
                <img id="mapImage" src="" alt="Mapa de ubicación" class="map-modal__image">
            </div>
        `;
        document.body.appendChild(mapModal);
        
        // Event listeners para cerrar
        mapModal.querySelector('.map-modal__close').addEventListener('click', closeMapModal);
        mapModal.querySelector('.map-modal__overlay').addEventListener('click', closeMapModal);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mapModal.classList.contains('active')) {
                closeMapModal();
            }
        });
    }
    
    // Establecer la imagen y mostrar modal
    document.getElementById('mapImage').src = mapImage;
    mapModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Cierra el modal del mapa
 */
function closeMapModal() {
    const mapModal = document.getElementById('mapModal');
    if (mapModal) {
        mapModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * Cierra el modal
 */
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Inicializar cuando el DOM está listo
document.addEventListener('DOMContentLoaded', initProjectGallery);
