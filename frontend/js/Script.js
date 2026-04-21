/* ============================================
   MediCare Pro — JavaScript
   ============================================ */

/* ---- Navbar: scroll effect + active link ---- */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    // Sticky style
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Highlight active nav link
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/* ---- Mobile hamburger ---- */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksEl.classList.toggle('open');
});

// Close menu on link click
navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinksEl.classList.remove('open');
    });
});

/* ---- Animated counter (hero stats) ---- */
function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current);
    }, 16);
}

// Trigger counters when hero is in view
const statNums = document.querySelectorAll('.stat-num');
let countersStarted = false;

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            statNums.forEach(el => animateCounter(el));
        }
    });
}, { threshold: 0.5 });

const heroSection = document.getElementById('accueil');
if (heroSection) heroObserver.observe(heroSection);

/* ---- Service cards: fade-in on scroll ---- */
const serviceCards = document.querySelectorAll('.service-card');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

serviceCards.forEach(card => cardObserver.observe(card));

/* ---- Smooth scroll for anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ---- Contact form "send" ---- */
function handleFormSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('sendBtn');
    const success = document.getElementById('formSuccess');

    // Loading state
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Envoi en cours...';
    btn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Envoyer le message';
        btn.disabled = false;
        success.classList.add('show');

        // Clear form fields
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
            el.value = '';
        });

        // Hide success after 5s
        setTimeout(() => success.classList.remove('show'), 5000);
    }, 1800);
}

/* ---- Floating pills entrance animation ---- */
document.querySelectorAll('.floating-pill').forEach((pill, i) => {
    pill.style.opacity = '0';
    pill.style.transform = 'translateY(10px)';
    setTimeout(() => {
        pill.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        pill.style.opacity = '1';
        pill.style.transform = 'translateY(0)';
    }, 900 + i * 300);
});

/* ---- Generic fade-in-up for sections ---- */
const fadeEls = document.querySelectorAll('.testi-card, .about-content, .about-visual');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.15 });

fadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

/* ============================================
   CHATBOT LOGIC
   ============================================ */

const chatbotWrapper = document.getElementById('chatbotWrapper');
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotCloseBtn = document.getElementById('chatbotCloseBtn');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSendBtn = document.getElementById('chatbotSendBtn');
const quickQuestions = document.querySelectorAll('.quick-question');
const welcomeTime = document.getElementById('welcomeTime');

// Init welcome time
if (welcomeTime) {
    const now = new Date();
    welcomeTime.textContent = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
}

// Toggle Chat
chatbotToggle.addEventListener('click', () => {
    chatbotWrapper.classList.toggle('open');
    if (chatbotWrapper.classList.contains('open')) {
        chatbotInput.focus();
        // Clear badge if opening for first time
        document.getElementById('chatbotBadge').style.display = 'none';
    }
});

chatbotCloseBtn.addEventListener('click', () => {
    chatbotWrapper.classList.remove('open');
});

// Bot Responses Data
const botResponses = {
    horaires: "Nous sommes ouverts du lundi au vendredi de 08h30 à 18h30, et le samedi matin de 09h00 à 13h00.",
    rdv: "Vous pouvez prendre rendez-vous directement via le bouton 'Prendre rendez-vous' sur notre site, ou en nous appelant au +212 5 22 00 00 00.",
    contact: "Vous pouvez nous joindre par téléphone au +212 5 22 00 00 00 ou par email à contact@medicare-pro.ma.",
    tarifs: "Nous proposons plusieurs formules adaptées à la taille de votre cabinet. Nos tarifs débutent à partir de 299 DH/mois. Souhaitez-vous recevoir notre brochure ?",
    essai: "Bien sûr ! Vous pouvez essayer MediCare Pro gratuitement pendant 30 jours, sans engagement et sans carte bancaire.",
    securite: "La sécurité est notre priorité. Vos données sont hébergées sur des serveurs certifiés HDS (Hébergeur de Données de Santé) et sont cryptées de bout en bout."
};

// Helper: Add Message
function addMessage(text, isUser = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${isUser ? 'user-msg' : 'bot-msg'}`;

    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

    if (isUser) {
        msgDiv.innerHTML = `
            <div class="chat-bubble user-bubble">
                <p>${text}</p>
                <span class="chat-time">${timeStr}</span>
            </div>
        `;
    } else {
        msgDiv.innerHTML = `
            <div class="chat-avatar-bot"><i class="fa-solid fa-robot"></i></div>
            <div class="chat-bubble bot-bubble">
                <p>${text}</p>
                <span class="chat-time">${timeStr}</span>
            </div>
        `;
    }

    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Helper: Typing Indicator
function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'chat-msg bot-msg typing-indicator-wrapper';
    indicator.id = 'typingIndicator';
    indicator.innerHTML = `
        <div class="chat-avatar-bot"><i class="fa-solid fa-robot"></i></div>
        <div class="typing-dots">
            <span></span><span></span><span></span>
        </div>
    `;
    chatbotMessages.appendChild(indicator);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    return indicator;
}

// Handle Bot Reply
function botReply(keyOrText) {
    const indicator = showTypingIndicator();
    
    setTimeout(() => {
        indicator.remove();
        const response = botResponses[keyOrText] || "Désolé, je n'ai pas compris votre demande. Souhaitez-vous être mis en relation avec un conseiller ?";
        addMessage(response, false);
    }, 1500);
}

// Quick Questions Clicks
quickQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
        const text = btn.textContent.trim();
        const key = btn.dataset.key;
        addMessage(text, true);
        botReply(key);
    });
});

// Input Submit
function handleSend() {
    const text = chatbotInput.value.trim();
    if (text === "") return;

    addMessage(text, true);
    chatbotInput.value = "";
    
    // Simple keyword detection or default fallback
    let found = false;
    for (let key in botResponses) {
        if (text.toLowerCase().includes(key) || (key === 'rdv' && text.toLowerCase().includes('rendez-vous'))) {
            botReply(key);
            found = true;
            break;
        }
    }
    
    if (!found) botReply(text);
}

chatbotSendBtn.addEventListener('click', handleSend);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});