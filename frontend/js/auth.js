/* ============================================
   MediCare Pro — Système d'Authentification
   Simulé en Frontend (sans backend)
   ============================================ */

// ─────────────────────────────────────────────
// 1. BASE DE DONNÉES SIMULÉE (comptes par défaut)
//    Stockée directement en JS pour le projet académique
// ─────────────────────────────────────────────
const DEFAULT_USERS = [
    {
        id: 1,
        nom: "Admin Principal",
        email: "admin@medicare.ma",
        password: "Admin@123",
        role: "admin",
        avatar: "A"
    },
    {
        id: 2,
        nom: "Dr. Youssef Benali",
        email: "medecin@medicare.ma",
        password: "Med@123",
        role: "medecin",
        avatar: "M",
        specialite: "Médecine Générale"
    },
    {
        id: 3,
        nom: "Fatima Zahra",
        email: "secretaire@medicare.ma",
        password: "Sec@123",
        role: "secretaire",
        avatar: "S"
    },
    {
        id: 4,
        nom: "Mohamed Alami",
        email: "patient@medicare.ma",
        password: "Pat@123",
        role: "patient",
        avatar: "P"
    }
];

// ─────────────────────────────────────────────
// 2. ROUTES PAR RÔLE
//    Chaque rôle → sa page dashboard
// ─────────────────────────────────────────────
const ROLE_DASHBOARDS = {
    admin:      "../HTML/dashboard-admin.html",
    medecin:    "../HTML/dashboard-medecin.html",
    secretaire: "../HTML/dashboard-secretaire.html",
    patient:    "../HTML/dashboard-patient.html"
};

// ─────────────────────────────────────────────
// 3. FONCTIONS UTILITAIRES AUTH
// ─────────────────────────────────────────────

/**
 * Initialise la BD simulée dans localStorage si elle n'existe pas
 */
function initAuthDB() {
    if (!localStorage.getItem("medicare_users")) {
        localStorage.setItem("medicare_users", JSON.stringify(DEFAULT_USERS));
    }
}

/**
 * Récupère tous les utilisateurs depuis localStorage
 */
function getAllUsers() {
    return JSON.parse(localStorage.getItem("medicare_users")) || [];
}

/**
 * Sauvegarde la session de l'utilisateur connecté
 * @param {Object} user - L'objet utilisateur
 */
function saveSession(user) {
    // Ne jamais stocker le mot de passe dans la session !
    const session = {
        id: user.id,
        nom: user.nom,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        specialite: user.specialite || null,
        loginTime: new Date().toISOString()
    };
    sessionStorage.setItem("medicare_session", JSON.stringify(session));
}

/**
 * Récupère la session active
 * @returns {Object|null} - L'utilisateur connecté ou null
 */
function getSession() {
    const session = sessionStorage.getItem("medicare_session");
    return session ? JSON.parse(session) : null;
}

/**
 * Déconnecte l'utilisateur et redirige vers login
 */
function logout() {
    sessionStorage.removeItem("medicare_session");
    window.location.href = "../HTML/login.html";
}

/**
 * Vérifie si l'utilisateur est connecté
 * Redirige vers login si non connecté (à appeler en haut des dashboards)
 */
function requireAuth() {
    const session = getSession();
    if (!session) {
        window.location.href = "../HTML/login.html";
        return null;
    }
    return session;
}

/**
 * Vérifie qu'un rôle spécifique est requis
 * @param {string|string[]} allowedRoles - Rôle(s) autorisé(s)
 */
function requireRole(allowedRoles) {
    const session = requireAuth();
    if (!session) return null;

    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    if (!roles.includes(session.role)) {
        alert("⛔ Accès refusé. Vous n'avez pas les permissions nécessaires.");
        window.location.href = ROLE_DASHBOARDS[session.role];
        return null;
    }
    return session;
}

// ─────────────────────────────────────────────
// 4. LOGIQUE DE CONNEXION (LOGIN)
// ─────────────────────────────────────────────

/**
 * Tente de connecter un utilisateur
 * @param {string} email
 * @param {string} password
 * @returns {{ success: boolean, message: string, user?: Object }}
 */
function login(email, password) {
    const users = getAllUsers();
    const user = users.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
        return { success: false, message: "Email ou mot de passe incorrect." };
    }

    saveSession(user);
    return { success: true, message: "Connexion réussie !", user };
}

// ─────────────────────────────────────────────
// 5. LOGIQUE D'INSCRIPTION (REGISTER)
//    Seuls les patients peuvent s'inscrire eux-mêmes
//    Les autres rôles sont créés par l'admin
// ─────────────────────────────────────────────

/**
 * Inscrit un nouveau patient
 * @param {string} nom
 * @param {string} email
 * @param {string} password
 * @returns {{ success: boolean, message: string }}
 */
function register(nom, email, password) {
    const users = getAllUsers();

    // Vérification : email déjà utilisé ?
    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
        return { success: false, message: "Cet email est déjà utilisé." };
    }

    // Validation basique
    if (nom.trim().length < 3) {
        return { success: false, message: "Le nom doit contenir au moins 3 caractères." };
    }
    if (password.length < 6) {
        return { success: false, message: "Le mot de passe doit contenir au moins 6 caractères." };
    }

    // Création du nouvel utilisateur (rôle = patient par défaut)
    const newUser = {
        id: Date.now(), // ID unique basé sur le timestamp
        nom: nom.trim(),
        email: email.toLowerCase(),
        password: password,
        role: "patient",
        avatar: nom.charAt(0).toUpperCase()
    };

    users.push(newUser);
    localStorage.setItem("medicare_users", JSON.stringify(users));

    return { success: true, message: "Compte créé avec succès ! Vous pouvez maintenant vous connecter." };
}

// ─────────────────────────────────────────────
// 6. INITIALISATION AU CHARGEMENT
// ─────────────────────────────────────────────
initAuthDB();
