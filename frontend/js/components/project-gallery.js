/**
 * Project Details Modal Handler
 * Maneja la apertura del modal con detalles de proyectos individuales
 */

// Definición de proyectos por complejo
const projectComplexes = {
    villas: {
        title: 'Villas del Este',
        projects: [
            {
                name: 'Villas del Este - Jazmin',
                description: 'Residencias de lujo con diseño moderno, áreas verdes y seguridad 24/7. Incluye habitaciones amplias, cocina integral y espacios para vivir con comodidad.',
                image: './assets/images/properties/villa_1.png',
                whatsapp: '6371-2652',
                location: 'https://share.google/IMzoKbyXPhvJqTmUX'
            },
            {
                name: 'Villas del Este - Lirio',
                description: 'Proyecto exclusivo de viviendas con acabados premium. Cada propiedad cuenta con vista al verde, parqueadero privado y acceso a áreas comunes de recreación.',
                image: './assets/images/properties/villa_2.png',
                whatsapp: '6371-2652',
                location: 'https://share.google/IMzoKbyXPhvJqTmUX'
            }
        ]
    },
    ciudad: {
        title: 'Ciudad del Este',
        projects: [
            {
                name: 'Ciudad del Este - Córdoba',
                description: 'Apartamentos modernos en zona estratégica con fácil acceso a comercios y servicios. Áreas comunes con gimnasio, piscina y zonas de esparcimiento.',
                image: './assets/images/properties/ciudad_1.png',
                whatsapp: '6371-2652',
                location: 'https://share.google/IMzoKbyXPhvJqTmUX'
            },
            {
                name: 'Ciudad del Este - Granada',
                description: 'Proyecto residencial con unidades variadas para todo tipo de familia. Ubicación privilegiada con seguridad perimetral y sistemas de vigilancia modernos.',
                image: './assets/images/properties/ciudad_2.png',
                whatsapp: '6371-2652',
                location: 'https://share.google/IMzoKbyXPhvJqTmUX'
            },
            {
                name: 'Ciudad del Este - Sevilla',
                description: 'Viviendas diseñadas para ofrecer confort y practicidad. Cercano a escuelas, hospitales y centros comerciales, con financiamiento flexible disponible.',
                image: './assets/images/properties/ciudad_3.png',
                whatsapp: '6371-2652',
                location: 'https://share.google/IMzoKbyXPhvJqTmUX'
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
                        <a href="${project.location}" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           class="project-item__btn project-item__btn--location"
                           title="Ver ubicación">
                            <img src="./assets/images/icons/cloud.png" alt="Ubicación" class="project-item__btn-icon">
                        </a>
                        <a href="https://wa.me/507${project.whatsapp.replace('-', '')}" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           class="project-item__btn project-item__btn--whatsapp"
                           title="Contactar por WhatsApp">
                            <img src="./assets/images/icons/phone-message.png" alt="WhatsApp" class="project-item__btn-icon">
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
