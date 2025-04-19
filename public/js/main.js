document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.section-header, .section-content, .card-animation, .fade-in').forEach(element => {
        observer.observe(element);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Voice category filtering with animations
    const categoryButtons = document.querySelectorAll('.category-btn');
    const voiceCards = document.querySelectorAll('.voice-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.dataset.category;

            // Animate cards
            voiceCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, 100);
                } else {
                    card.classList.remove('visible');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Manejo del formulario
    const form = document.getElementById('contactForm');
    const requiredInputs = form.querySelectorAll('input[required]');

    // Agregar clase 'touched' cuando el usuario interactúa con un campo requerido
    requiredInputs.forEach(input => {
        input.addEventListener('blur', () => {
            input.classList.add('touched');
        });
    });

    // Validación al enviar el formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.classList.add('form-submitted');

        // Verificar si hay campos inválidos
        const invalidInputs = form.querySelectorAll('input:invalid');
        
        if (invalidInputs.length === 0) {
            // Aquí iría la lógica para enviar el formulario
            console.log('Formulario válido, enviando...');
            // Resetear el formulario y las clases
            form.reset();
            form.classList.remove('form-submitted');
            requiredInputs.forEach(input => input.classList.remove('touched'));
        } else {
            // Marcar todos los campos como tocados para mostrar todos los errores
            requiredInputs.forEach(input => input.classList.add('touched'));
        }
    });

    // Funcionalidad del menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Cerrar el menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}); 