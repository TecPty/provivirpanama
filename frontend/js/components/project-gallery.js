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
            path: './assets/images/icons/Login.json'
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
const DEFAULT_PROJECT_LOCATION = 'https://maps.app.goo.gl/YcTLaREUbRt7VuvT8?g_st=ic';
const VILLAS_DEL_ESTE_LOCATION = DEFAULT_PROJECT_LOCATION;

const projectComplexes = {
    villas: {
        title: 'Villas del Este',
        projects: [
            {
                name: 'Modelo Roble',
                description: 'Terrenos hasta 181m². 2 hab, baño.',
                image: './assets/images/properties/villas-del-este-modelo-roble.webp',
                whatsapp: '6371-2652',
                location: VILLAS_DEL_ESTE_LOCATION
            },
            {
                name: 'Modelo Cerezo',
                description: 'Terrenos hasta 221m². 3 hab, 2 baños.',
                image: './assets/images/properties/villas-del-este-modelo-cerezo.webp',
                whatsapp: '6371-2652',
                location: VILLAS_DEL_ESTE_LOCATION
            }
        ]
    },
    ciudad: {
        title: 'Ciudad del Este',
        projects: [
            {
                name: 'Modelo Córdoba',
                description: 'Terrenos hasta 233m². 3 hab, baño.',
                image: './assets/images/properties/ciudad-del-este-modelo-cordoba.webp',
                whatsapp: '6371-2652',
                location: DEFAULT_PROJECT_LOCATION
            },
            {
                name: 'Modelo Granada',
                description: 'Terrenos hasta 135m². 2 hab, baño.',
                image: './assets/images/properties/ciudad-del-este-modelo-granada.webp',
                whatsapp: '6371-2652',
                location: DEFAULT_PROJECT_LOCATION
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

            const whatsappMessage = encodeURIComponent(`Hola, estoy interesado/a en el ${project.name}. Me gustaría recibir más información.`);
            const whatsappUrl = `https://wa.me/507${project.whatsapp.replace('-', '')}?text=${whatsappMessage}`;

            const projectHTML = `
                <div class="project-item__content">
                    <h3 class="project-item__name">${project.name}</h3>
                    <p class="project-item__description">${project.description}</p>
                    <div class="project-item__buttons">
                        <a href="${project.location}"
                           target="_blank" 
                           rel="noopener noreferrer"
                           class="project-item__btn project-item__btn--location"
                           title="Ver ubicación">
                            <div class="project-item__lottie-icon" data-lottie="location" data-path="./assets/images/icons/Location-v2.json"></div>
                        </a>
                        <a href="${whatsappUrl}" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           class="project-item__btn project-item__btn--whatsapp"
                           title="Contactar por WhatsApp">
                            <div class="project-item__lottie-icon" data-lottie="chat" data-path="./assets/images/icons/Chat-v2.json"></div>
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
    }

    // Mostrar modal
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('project-modal-open');
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
        document.body.classList.remove('project-modal-open');
    }
}

// Inicializar cuando el DOM está listo
document.addEventListener('DOMContentLoaded', initProjectGallery);
