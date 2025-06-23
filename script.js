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

// resumeBtn.addEventListener('click', (e) => {
//     e.preventDefault();

//     const popup = document.createElement('div');
//     popup.id = 'popup';
//     popup.textContent = 'Will update to you soon Buddy!';

//     document.body.appendChild(popup);

//     setTimeout(() => {
//         popup.classList.add('show');
//     }, 10);

//     setTimeout(() => {
//         popup.classList.remove('show');
//         setTimeout(() => {
//             popup.remove();
//         }, 1000);
//     }, 1000);
// });

// Eneanced Three.js animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), alpha: true });
renderer.setSize(400, 400);

const geometry = new THREE.IcosahedronGeometry(1, 0);
const material = new THREE.MeshPhongMaterial({ 
    color: 0x9333EA,
    wireframe: true,
    wireframeLinewidth: 2
});
const icosahedron = new THREE.Mesh(geometry, material);
scene.add(icosahedron);

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 10);
scene.add(light);

camera.position.z = 5;

const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python','mongoDB'];
const skillTags = [];

skills.forEach((skill, index) => {
    const tag = document.createElement('div');
    tag.className = 'skill-tag';
    tag.textContent = skill;
    tag.style.opacity = '0';
    document.querySelector('.about-3d').appendChild(tag);
    skillTags.push(tag);
});

let mouseX = 0;
let mouseY = 0;

document.getElementById('three-canvas').addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
    requestAnimationFrame(animate);

    icosahedron.rotation.x += 0.01;
    icosahedron.rotation.y += 0.01;

    icosahedron.rotation.x += mouseY * 0.05;
    icosahedron.rotation.y += mouseX * 0.05;
  
    const time = Date.now() * 0.001;

    skillTags.forEach((tag, index) => {
        const t = (time + index * 0.5) % skills.length;
        const scale = (Math.sin(t * Math.PI * 2) + 1) * 0.5;
        
        tag.style.opacity = scale.toString();
        
        const theta = (index / skills.length) * Math.PI * 2;
        const radius = 2;
        const x = Math.cos(theta + time) * radius;
        const y = Math.sin(theta + time) * radius;
        
        tag.style.transform = `translate(${x * 50 + 200}px, ${y * 50 + 200}px)`;
    });

    renderer.render(scene, camera);
}

animate();

const aboutSection = document.querySelector('#about');
const aboutText = document.querySelector('.about-text');
const about3D = document.querySelector('.about-3d');

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            aboutText.classList.add('animate');
            about3D.classList.add('animate');
        } else {
            aboutText.classList.remove('animate');
            about3D.classList.remove('animate');
        }
    });
}, { threshold: 0.5 });

aboutObserver.observe(aboutSection);

document.addEventListener("scroll", () => {
    const scrollProgress = document.querySelector(".scroll-progress");
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    scrollProgress.style.width = scrollPercent + "%";
});

const scrollProgressBar = document.createElement("div");
scrollProgressBar.classList.add("scroll-progress");
document.body.prepend(scrollProgressBar);


// Auto-hide welcome message after animation completes
document.addEventListener('DOMContentLoaded', function() {
    const welcomeOverlay = document.querySelector('.welcome-overlay');
    
    // Remove the overlay from DOM after animation completes
    setTimeout(() => {
        if (welcomeOverlay) {
            welcomeOverlay.style.display = 'none';
        }
    }, 4000); // 4 seconds, matching the animation duration
});
