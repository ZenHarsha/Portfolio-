       document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    let lastScrollTop = 0;
    const animateElements = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const sections = document.querySelectorAll('.section');
        const cards = document.querySelectorAll('.project-card, .course-card');
        
        const isScrollingDown = scrollTop > lastScrollTop;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight * 0.75 && isScrollingDown) {
                section.classList.add('animate');
                section.classList.remove('animate-out');
            } else if (sectionTop > windowHeight * 0.75 && !isScrollingDown) {
                section.classList.remove('animate');
                section.classList.add('animate-out');
            }
        });
        
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (cardTop < windowHeight * 0.75 && isScrollingDown) {
                card.classList.add('animate');
                card.classList.remove('animate-out');
            } else if (cardTop > windowHeight * 0.75 && !isScrollingDown) {
                card.classList.remove('animate');
                card.classList.add('animate-out');
            }
        });
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener('scroll', animateElements);
    window.addEventListener('load', animateElements);

    const resumeBtn = document.querySelector('.resume-btn');

resumeBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const popup = document.createElement('div');
    popup.id = 'popup';
    popup.textContent = 'Will update to you soon Buddy!';

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.add('show');
    }, 10);

    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.remove();
        }, 1000);
    }, 1000);
});
