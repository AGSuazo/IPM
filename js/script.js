document.addEventListener('DOMContentLoaded', () => {
    // 1. Menú desplegable responsive (Hamburger)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.main-nav');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Ocultar menú si se hace clic fuera (opcional, pero mejora UX)
        document.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !hamburger.contains(event.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        // Cerrar menú al hacer clic en un enlace (para SPA-like behavior o para single-page anchors)
        document.querySelectorAll('.main-nav ul li a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 767) { // Solo en vista móvil
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        });
    }

    // 2. Carrusel funcional (Solo en la página de inicio)
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        const slides = document.querySelector('.carousel-slides');
        const slideItems = document.querySelectorAll('.carousel-slide');
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        const dotsContainer = document.querySelector('.carousel-dots');
        const playPauseBtn = document.querySelector('.carousel-play-pause');

        let currentIndex = 0;
        let intervalId;
        let isPaused = false;
        const intervalTime = 5000; // 5 segundos

        // Crear los puntos de navegación
        if (dotsContainer) {
            slideItems.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('carousel-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    goToSlide(index);
                    pauseAutoplay(); // Pausa al interactuar manualmente
                });
                dotsContainer.appendChild(dot);
            });
        }
        const dots = document.querySelectorAll('.carousel-dot');

        function goToSlide(index) {
            if (index < 0) {
                currentIndex = slideItems.length - 1;
            } else if (index >= slideItems.length) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            slides.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateDots();
        }

        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        function startAutoplay() {
            if (!isPaused) {
                intervalId = setInterval(nextSlide, intervalTime);
                playPauseBtn.textContent = '⏸️'; // Icono de pausa
                playPauseBtn.setAttribute('aria-label', 'Pausar carrusel');
            }
        }

        function pauseAutoplay() {
            clearInterval(intervalId);
            isPaused = true;
            playPauseBtn.textContent = '▶️'; // Icono de play
            playPauseBtn.setAttribute('aria-label', 'Reproducir carrusel');
        }

        function togglePlayPause() {
            if (isPaused) {
                isPaused = false;
                startAutoplay();
            } else {
                pauseAutoplay();
            }
        }

        // Event Listeners para botones de navegación
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); pauseAutoplay(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); pauseAutoplay(); });
        if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayPause);

        // Iniciar el carrusel
        startAutoplay();
    }

    // 3. Validación y ENVÍO de formulario de contacto (con backend)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const formMessage = document.getElementById('formMessage');

        // Función para mostrar mensajes de validación individuales
        function showValidationMessage(input, message, type = 'error') {
            let errorSpan = input.nextElementSibling;
            if (!errorSpan || !errorSpan.classList.contains('validation-error')) {
                errorSpan = document.createElement('span');
                errorSpan.classList.add('validation-error');
                input.parentNode.insertBefore(errorSpan, input.nextSibling);
            }
            errorSpan.textContent = message;
            errorSpan.style.color = type === 'error' ? '#dc3545' : '#28a745';
            errorSpan.style.fontSize = '0.8em';
            errorSpan.style.display = 'block';
            errorSpan.style.marginTop = '-10px';
            errorSpan.style.marginBottom = '10px';
        }

        function clearValidationMessage(input) {
            const errorSpan = input.nextElementSibling;
            if (errorSpan && errorSpan.classList.contains('validation-error')) {
                errorSpan.remove();
            }
        }

        function validateInput(input) {
            clearValidationMessage(input); // Limpiar mensaje anterior

            if (input.validity.valueMissing) {
                showValidationMessage(input, 'Este campo es requerido.');
                return false;
            }
            if (input.type === 'email' && input.validity.typeMismatch) {
                showValidationMessage(input, 'Por favor, introduce un correo electrónico válido.');
                return false;
            }
            return true;
        }

        // Event listeners para validación en tiempo real (al perder el foco)
        nameInput.addEventListener('blur', () => validateInput(nameInput));
        emailInput.addEventListener('blur', () => validateInput(emailInput));
        messageInput.addEventListener('blur', () => validateInput(messageInput));


        contactForm.addEventListener('submit', async (event) => { // Usamos async para fetch
            event.preventDefault(); // Evitar el envío por defecto del formulario

            formMessage.style.display = 'none'; // Ocultar mensaje anterior
            formMessage.classList.remove('success', 'error'); // Limpiar clases

            // Validar todos los campos en el cliente
            const isNameValid = validateInput(nameInput);
            const isEmailValid = validateInput(emailInput);
            const isMessageValid = validateInput(messageInput);

            if (isNameValid && isEmailValid && isMessageValid) {
                // Si todos los campos son válidos en el cliente, enviamos al servidor
                const formData = new FormData(contactForm); // Recoge los datos del formulario

                try {
                    // Usar fetch para enviar los datos al script PHP
                    const response = await fetch('send_email.php', {
                        method: 'POST',
                        body: formData // FormData se encarga de configurar el Content-Type correctamente
                    });

                    // Verificar si la respuesta del servidor fue exitosa (código 2xx)
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const result = await response.json(); // Esperamos una respuesta JSON del PHP

                    if (result.success) {
                        formMessage.textContent = result.message;
                        formMessage.classList.add('success');
                        
                        // Limpiar formulario y mensajes de validación individuales
                        contactForm.reset();
                        clearValidationMessage(nameInput);
                        clearValidationMessage(emailInput);
                        clearValidationMessage(messageInput);
                    } else {
                        formMessage.textContent = result.message || 'Hubo un error al enviar tu mensaje.';
                        formMessage.classList.add('error');
                    }
                } catch (error) {
                    console.error('Error al enviar el formulario:', error);
                    formMessage.textContent = 'Hubo un problema de conexión con el servidor. Por favor, inténtalo de nuevo.';
                    formMessage.classList.add('error');
                }
                formMessage.style.display = 'block'; // Mostrar el mensaje final
            } else {
                formMessage.textContent = 'Por favor, corrige los errores en el formulario.';
                formMessage.classList.add('error');
                formMessage.style.display = 'block';
            }
        });
    }
});