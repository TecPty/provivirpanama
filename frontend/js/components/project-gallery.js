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



// Definición de proyectos por complejo
const DEFAULT_PROJECT_LOCATION = 'https://maps.app.goo.gl/YcTLaREUbRt7VuvT8?g_st=ic';
const VILLAS_DEL_ESTE_LOCATION = 'https://goo.gl/maps/rgRH94BPhwnXBhZGA';

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
    },
    oeste: {
        title: 'Villas del Oeste',
        projects: [
            {
                name: 'Modelo 1',
                description: 'Próximamente',
                image: './assets/images/properties/villas-del-este-modelo-roble.webp',
                whatsapp: '6371-2652',
                location: DEFAULT_PROJECT_LOCATION
            },
            {
                name: 'Modelo 2',
                description: 'Próximamente',
                image: './assets/images/properties/villas-del-este-modelo-cerezo.webp',
                whatsapp: '6371-2652',
                location: DEFAULT_PROJECT_LOCATION
            },
            {
                name: 'Modelo 3',
                description: 'Próximamente',
                image: './assets/images/properties/ciudad-del-este-modelo-cordoba.webp',
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
                            <span class="css-icon css-icon--location" aria-hidden="true"><svg class="pin-svg" width="34" height="42" viewBox="0 0 34 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 1C8.72 1 2 7.72 2 16C2 27.25 17 42 17 42C17 42 32 27.25 32 16C32 7.72 25.28 1 17 1Z" fill="#E53E3E"/><circle cx="17" cy="16" r="6" fill="white" opacity="0.9"/></svg><span class="pin-shadow"></span></span>
                        </a>
                        <a href="${whatsappUrl}" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           class="project-item__btn project-item__btn--whatsapp"
                           title="Contactar por WhatsApp">
                            <span class="css-icon css-icon--chat" aria-hidden="true"><svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="22" cy="22" r="22" fill="#30B2E5"/><path d="M8 14C8 12.9 8.9 12 10 12H34C35.1 12 36 12.9 36 14V26C36 27.1 35.1 28 34 28H25L19 34V28H10C8.9 28 8 27.1 8 26V14Z" fill="white"/><circle class="cdot" cx="16" cy="21" r="2" fill="#30B2E5"/><circle class="cdot" style="animation-delay:.2s" cx="22" cy="21" r="2" fill="#30B2E5"/><circle class="cdot" style="animation-delay:.4s" cx="28" cy="21" r="2" fill="#30B2E5"/></svg></span>
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
