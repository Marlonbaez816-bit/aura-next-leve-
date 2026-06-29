// ============================================
// AURA APP - Sistema Principal
// ============================================

// Variables Globales
let auraLevel = 1;
let auraPoints = 0;
let currentUser = null;
let loadingProgress = 0;

// Mensajes de carga dinámicos
const loadingMessages = [
    "Preparando tu experiencia...",
    "Conectando con el universo Aura...",
    "Cargando tus ecos...",
    "Personalizando tu feed...",
    "¡Casi listo!",
    "Bienvenido a Aura ✨"
];

const bubbleTexts = [
    "Cargando Aura...",
    "Un momento...",
    "Preparando magia...",
    "¡Casi listo!",
    "Bienvenido 💜"
];

// Inicializar App
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Aura App Iniciada');
    startLoadingSequence();
    setupEventListeners();
});

// Secuencia de Carga con Animaciones
function startLoadingSequence() {
    const progressFill = document.getElementById('progressFill');
    const loadingMessage = document.getElementById('loadingMessage');
    const bubbleText = document.getElementById('bubbleText');
    const auraAvatar = document.getElementById('auraAvatar');
    
    let interval = setInterval(() => {
        loadingProgress += Math.random() * 15;
        
        if (loadingProgress >= 100) {
            loadingProgress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                finishLoading();
            }, 500);
        }
        
        // Actualizar barra de progreso
        progressFill.style.width = loadingProgress + '%';
        
        // Cambiar mensajes según progreso
        const messageIndex = Math.floor((loadingProgress / 100) * loadingMessages.length);
        if (loadingMessages[messageIndex]) {
            loadingMessage.textContent = loadingMessages[messageIndex];
        }
        
        // Cambiar burbujas de pensamiento
        const bubbleIndex = Math.floor((loadingProgress / 100) * bubbleTexts.length);
        if (bubbleTexts[bubbleIndex]) {
            bubbleText.textContent = bubbleTexts[bubbleIndex];
        }
        
        // Cambiar animación del avatar según progreso
        if (loadingProgress < 25) {
            auraAvatar.className = 'aura-avatar running';
        } else if (loadingProgress < 50) {
            auraAvatar.className = 'aura-avatar jumping';
        } else if (loadingProgress < 75) {
            auraAvatar.className = 'aura-avatar thinking';
        } else {
            auraAvatar.className = 'aura-avatar jumping';
        }
        
    }, 300);
}

// Finalizar Carga y Mostrar App
function finishLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainApp = document.getElementById('mainApp');
    
    // Animación de salida
    loadingScreen.style.transition = 'opacity 0.5s ease';
    loadingScreen.style.opacity = '0';
    
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        mainApp.classList.remove('hidden');
        
        // Animación de entrada
        mainApp.style.opacity = '0';
        mainApp.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            mainApp.style.opacity = '1';
            initializeApp();
        }, 100);
        
    }, 500);
}

// Inicializar Aplicación
function initializeApp() {
    console.log('✨ Aura App Lista');
    
    // Cargar datos del usuario (simulado)
    loadUserData();
    
    // Inicializar características
    initializeFeatures();
    
    // Mostrar notificación de bienvenida
    showWelcomeNotification();
}

// Cargar Datos del Usuario
function loadUserData() {
    // Simular carga de datos
    const savedData = localStorage.getItem('auraUserData');
    
    if (savedData) {
        const data = JSON.parse(savedData);
        currentUser = data.user;
        auraLevel = data.level || 1;
        auraPoints = data.points || 0;
    } else {
        // Usuario nuevo
        currentUser = {
            username: 'UsuarioAura',
            joinDate: new Date().toISOString(),
            posts: 0,
            followers: 0,
            following: 0
        };
        auraLevel = 1;
        auraPoints = 0;
        saveUserData();
    }
}

// Guardar Datos del Usuario
function saveUserData() {
    const data = {
        user: currentUser,
        level: auraLevel,
        points: auraPoints
    };
    localStorage.setItem('auraUserData', JSON.stringify(data));
}

// Inicializar Características
function initializeFeatures() {
    // Configurar navegación
    setupNavigation();
    
    // Configurar interacciones
    setupInteractions();
    
    // Cargar feed inicial
    loadInitialFeed();
}

// Configurar Navegación
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remover active de todos
            navItems.forEach(nav => nav.classList.remove('active'));
            // Agregar active al actual
            this.classList.add('active');
            
            // Navegar (simulado)
            const index = Array.from(navItems).indexOf(this);
            navigateToSection(index);
        });
    });
}

// Navegar a Sección
function navigateToSection(index) {
    const sections = ['home', 'search', 'create', 'messages', 'profile'];
    const section = sections[index];
    
    console.log(`📍 Navegando a: ${section}`);
    
    // Aquí iría la lógica real de navegación
    switch(section) {
        case 'home':
            loadHomeFeed();
            break;
        case 'search':
            openSearch();
            break;
        case 'create':
            openCreatePost();
            break;
        case 'messages':
            openMessages();
            break;
        case 'profile':
            openProfile();
            break;
    }
}

// Configurar Event Listeners
function setupEventListeners() {
    // Botones de header
    const notificationBtn = document.querySelector('.header-actions .icon-btn:first-child');
    const settingsBtn = document.querySelector('.header-actions .icon-btn:last-child');
    
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            showNotifications();
        });
    }
    
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            openSettings();
        });
    }
    
    // Tarjetas de características
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            handleFeatureClick(index);
        });
        
        // Efecto de vibración háptica
        card.addEventListener('touchstart', function() {
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
            this.style.transform = 'scale(0.95)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Pull to refresh (simulado)
    let touchStartY = 0;
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchEndY - touchStartY;
        
        if (diff > 100 && window.scrollY === 0) {
            // Pull down detectado
            refreshFeed();
        }
    });
}

// Configurar Interacciones
function setupInteractions() {
    // Doble tap en header
    const header = document.querySelector('.app-header');
    let lastTap = 0;
    
    header.addEventListener('touchend', (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < 300 && tapLength > 0) {
            // Doble tap
            scrollToTop();
            e.preventDefault();
        }
        lastTap = currentTime;
    });
}

// Manejar Click en Características
function handleFeatureClick(index) {
    const features = ['ecos', 'chat', 'ranking', 'assistant'];
    const feature = features[index];
    
    console.log(`🎯 Feature clicked: ${feature}`);
    
    // Vibración háptica
    if (navigator.vibrate) {
        navigator.vibrate([10, 30, 10]);
    }
    
    switch(feature) {
        case 'ecos':
            openEcos();
            break;
        case 'chat':
            openChat();
            break;
        case 'ranking':
            openRanking();
            break;
        case 'assistant':
            openAssistant();
            break;
    }
}

// Cargar Feed Inicial
function loadInitialFeed() {
    console.log('📥 Cargando feed inicial...');
    // Aquí iría la conexión con Supabase
}

// Cargar Home Feed
function loadHomeFeed() {
    console.log('🏠 Cargando home feed...');
    // Simular carga de ecos
    setTimeout(() => {
        console.log('✅ Feed cargado');
    }, 500);
}

// Abrir Búsqueda
function openSearch() {
    console.log('🔍 Abriendo búsqueda...');
    // Implementar búsqueda
}

// Abrir Crear Post
function openCreatePost() {
    console.log('➕ Abriendo creador de posts...');
    // Implementar cámara y creación
}

// Abrir Mensajes
function openMessages() {
    console.log('💬 Abriendo mensajes...');
    // Implementar chat
}

// Abrir Perfil
function openProfile() {
    console.log('👤 Abriendo perfil...');
    // Mostrar datos del usuario
}

// Abrir Ecos
function openEcos() {
    console.log('📸 Abriendo Ecos...');
    // Navegar a sección de ecos
}

// Abrir Chat
function openChat() {
    console.log('💬 Abriendo chat...');
    // Navegar a chat
}

// Abrir Ranking
function openRanking() {
    console.log('🏆 Abriendo ranking...');
    // Mostrar rankings de usuarios
}

// Abrir Asistente
function openAssistant() {
    console.log('🤖 Abriendo asistente Aura...');
    // Mostrar asistente 3D
    showAssistantModal();
}

// Mostrar Asistente Modal
function showAssistantModal() {
    // Crear modal del asistente
    const modal = document.createElement('div');
    modal.className = 'assistant-modal';
    modal.innerHTML = `
        <div class="modal-content glass">
            <div class="modal-header">
                <h3>🤖 Aura Assistant</h3>
                <button class="close-btn" onclick="this.closest('.assistant-modal').remove()">✕</button>
            </div>
            <div class="modal-body">
                <div class="assistant-avatar">
                    <div class="aura-sphere-small"></div>
                </div>
                <div class="assistant-message">
                    <p>¡Hola! Soy Aura, tu asistente personal. ¿En qué puedo ayudarte hoy?</p>
                </div>
                <div class="quick-actions">
                    <button class="action-btn">📸 Subir Eco</button>
                    <button class="action-btn">🏆 Ver Ranking</button>
                    <button class="action-btn">⚙️ Configuración</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animación de entrada
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 100);
}

// Mostrar Notificaciones
function showNotifications() {
    console.log('🔔 Mostrando notificaciones...');
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

// Abrir Configuración
function openSettings() {
    console.log('⚙️ Abriendo configuración...');
}

// Refresh Feed
function refreshFeed() {
    console.log('🔄 Refrescando feed...');
    
    // Mostrar indicador de carga
    const bubbleText = document.getElementById('bubbleText');
    if (bubbleText) {
        bubbleText.textContent = 'Actualizando...';
    }
    
    // Simular refresh
    setTimeout(() => {
        if (bubbleText) {
            bubbleText.textContent = '¡Actualizado! ✨';
        }
        
        setTimeout(() => {
            if (bubbleText) {
                bubbleText.textContent = 'Bienvenido 💜';
            }
        }, 1000);
    }, 1500);
}

// Scroll to Top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log('⬆️ Scroll to top');
}

// Mostrar Notificación de Bienvenida
function showWelcomeNotification() {
    const notification = document.createElement('div');
    notification.className = 'welcome-notification';
    notification.innerHTML = `
        <div class="notification-content glass">
            <span class="notification-icon">✨</span>
            <div class="notification-text">
                <strong>¡Bienvenido a Aura!</strong>
                <p>Tu nivel actual: ${auraLevel}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animación
    notification.style.transform = 'translateY(-100px)';
    notification.style.transition = 'transform 0.5s ease';
    
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateY(-100px)';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Utilidades - Agregar Aura Points
function addAuraPoints(points, reason) {
    auraPoints += points;
    
    // Verificar si sube de nivel
    const newLevel = Math.floor(auraPoints / 1000) + 1;
    
    if (newLevel > auraLevel) {
        auraLevel = newLevel;
        showLevelUpNotification(auraLevel);
    }
    
    saveUserData();
    console.log(`➕ +${points} Aura Points (${reason})`);
}

// Notificación de Subida de Nivel
function showLevelUpNotification(level) {
    const notification = document.createElement('div');
    notification.className = 'levelup-notification';
    notification.innerHTML = `
        <div class="levelup-content">
            <div class="levelup-icon">🎉</div>
            <h3>¡Nivel ${level}!</h3>
            <p>Tu Aura está creciendo ✨</p>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animación
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Exportar funciones globales
window.Aura = {
    addPoints: addAuraPoints,
    getLevel: () => auraLevel,
    getPoints: () => auraPoints,
    getUser: () => currentUser
};

console.log('✅ Aura App JavaScript Cargado');