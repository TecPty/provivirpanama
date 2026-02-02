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
                whatsapp: '6371-2652'
            },
            {
                name: 'Villas del Este - Lirio',
                description: 'Proyecto exclusivo de viviendas con acabados premium. Cada propiedad cuenta con vista al verde, parqueadero privado y acceso a áreas comunes de recreación.',
                image: './assets/images/properties/villa_2.png',
                whatsapp: '6371-2652'
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
                whatsapp: '6371-2652'
            },
            {
                name: 'Ciudad del Este - Granada',
                description: 'Proyecto residencial con unidades variadas para todo tipo de familia. Ubicación privilegiada con seguridad perimetral y sistemas de vigilancia modernos.',
                image: './assets/images/properties/ciudad_2.png',
                whatsapp: '6371-2652'
            },
            {
                name: 'Ciudad del Este - Sevilla',
                description: 'Viviendas diseñadas para ofrecer confort y practicidad. Cercano a escuelas, hospitales y centros comerciales, con financiamiento flexible disponible.',
                image: './assets/images/properties/ciudad_3.png',
                whatsapp: '6371-2652'
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

        // Agregar cada proyecto
        complexData.projects.forEach((project) => {
            const projectEl = document.createElement('div');
            projectEl.className = 'project-item';

            const projectHTML = `
                <img src="${project.image}" alt="${project.name}" class="project-item__image" loading="lazy">
                <div class="project-item__content">
                    <h3 class="project-item__name">${project.name}</h3>
                    <p class="project-item__description">${project.description}</p>
                    <a href="https://wa.me/507${project.whatsapp.replace('-', '')}" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       class="project-item__btn">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.023 0-2.031-.323-2.896-.934-.793-.53-1.468-1.274-1.91-2.18-.442-.906-.676-1.889-.677-2.898 0-3.308 2.692-6 6-6 1.604 0 3.111.5 4.369 1.439.991.727 1.77 1.731 2.281 2.876.51 1.144.783 2.386.783 3.685 0 3.308-2.692 6-6 6z"/>
                        </svg>
                        Contactar por WhatsApp
                    </a>
                </div>
            `;

            projectEl.innerHTML = projectHTML;
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
