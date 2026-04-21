const navbar = document.querySelector('.app-navbar');
const alertBox = document.getElementById('formAlert');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const registerPasswordFeedback = document.getElementById('registerPasswordFeedback');
const loginPasswordFeedback = document.getElementById('loginPasswordFeedback');

window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('shadow-sm', window.scrollY > 20);
});

document.querySelectorAll('.password-toggle').forEach((button) => {
    button.addEventListener('click', () => {
        const input = document.getElementById(button.dataset.target);
        if (!input) return;

        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        button.textContent = isPassword ? 'Masquer' : 'Afficher';
    });
});

function showAlert(message) {
    if (!alertBox) return;
    alertBox.textContent = message;
    alertBox.classList.remove('d-none');
}

function validateLoginForm() {
    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    let isValid = true;

    if (!email.checkValidity()) {
        email.classList.add('is-invalid');
        isValid = false;
    } else {
        email.classList.remove('is-invalid');
    }

    if (!password.checkValidity()) {
        password.classList.add('is-invalid');
        loginPasswordFeedback.classList.add('show');
        isValid = false;
    } else {
        password.classList.remove('is-invalid');
        loginPasswordFeedback.classList.remove('show');
    }

    return isValid;
}

function validateRegisterForm() {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('registerEmail');
    const password = document.getElementById('registerPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const termsCheck = document.getElementById('termsCheck');

    const fields = [firstName, lastName, email, password, confirmPassword, termsCheck];
    let isValid = true;

    fields.forEach((field) => {
        if (!field.checkValidity()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });

    const passwordsMatch = password.value.trim() !== '' && password.value === confirmPassword.value;
    if (!passwordsMatch || password.value.length < 6) {
        password.classList.add('is-invalid');
        confirmPassword.classList.add('is-invalid');
        registerPasswordFeedback.classList.add('show');
        isValid = false;
    } else {
        password.classList.remove('is-invalid');
        confirmPassword.classList.remove('is-invalid');
        registerPasswordFeedback.classList.remove('show');
    }

    return isValid;
}

if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alertBox.classList.add('d-none');

        if (!validateLoginForm()) return;

        showAlert('Connexion reussie. Tu peux maintenant relier ce formulaire a ton backend.');
        loginForm.reset();
        loginPasswordFeedback.classList.remove('show');
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alertBox.classList.add('d-none');

        if (!validateRegisterForm()) return;

        showAlert('Inscription reussie. Le compte est pret a etre envoye vers ta base de donnees.');
        registerForm.reset();
        registerPasswordFeedback.classList.remove('show');
    });
}

document.querySelectorAll('input').forEach((input) => {
    input.addEventListener('input', () => {
        input.classList.remove('is-invalid');
        if (input.id === 'loginPassword') {
            loginPasswordFeedback.classList.remove('show');
        }
        if (input.id === 'registerPassword' || input.id === 'confirmPassword') {
            registerPasswordFeedback.classList.remove('show');
        }
    });
});
