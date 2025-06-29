// Estado da aplicação
let currentTheme = "light"
let isAuthenticated = false
let currentUser = null

// Gerenciamento de estado do usuário
function setUserState(userData) {
  currentUser = userData
  isAuthenticated = true
  localStorage.setItem('authToken', userData.token)
  localStorage.setItem('userState', JSON.stringify({
    id: userData.id,
    name: userData.name,
    email: userData.email,
    university: userData.university,
    semester: userData.semester,
    avatar: userData.avatar || null
  }))
}

function clearUserState() {
  currentUser = null
  isAuthenticated = false
  localStorage.removeItem('authToken')
  localStorage.removeItem('userState')
  localStorage.removeItem('userEmail')
}

function loadUserState() {
  const userState = localStorage.getItem('userState')
  if (userState) {
    try {
      currentUser = JSON.parse(userState)
      return validateAuthToken()
        .then(isValid => {
          isAuthenticated = isValid
          if (!isValid) {
            clearUserState()
          }
          return isValid
        })
    } catch (error) {
      console.error('Erro ao carregar estado do usuário:', error)
      clearUserState()
      return Promise.resolve(false)
    }
  }
  return Promise.resolve(false)
}

// Configuração de rotas protegidas
const protectedRoutes = [
  '/index.html',
  '/user.html',
  '/dashboard.html'
]

const publicRoutes = [
  '/login.html',
  '/register.html',
  '/forgot-password.html'
]

// Inicialização
async function initializeApp() {
  try {
    // Inicializar autenticação e preferências
    initializeAuth()
    await userPreferences.loadPreferences()
    
    const currentPath = window.location.pathname
    const isValid = await loadUserState()

    // Verificar rotas protegidas
    if (protectedRoutes.some(route => currentPath.endsWith(route))) {
      if (!isValid) {
        showNotification('Sua sessão expirou. Por favor, faça login novamente.', 'warning')
        window.location.href = '/login.html'
        return
      }
      
      // Atualizar UI e carregar dados do usuário
      updateUIForAuthenticatedUser()
      setupUserPreferences()
    }

    // Verificar rotas públicas
    if (publicRoutes.some(route => currentPath.endsWith(route))) {
      if (isValid) {
        window.location.href = '/index.html'
        return
      }
    }

    // Carregar dados específicos da página
    if (typeof loadPageSpecificData === 'function') {
      await loadPageSpecificData()
    }

    // Configurar listeners de eventos globais
    setupGlobalEventListeners()

  } catch (error) {
    console.error('Erro na inicialização:', error)
    showNotification('Ocorreu um erro ao carregar a página', 'error')
  }
}

// Configurar preferências do usuário na UI
function setupUserPreferences() {
  const themeToggle = document.getElementById('themeToggle')
  const notificationsToggle = document.getElementById('notificationsToggle')
  const emailAlertsToggle = document.getElementById('emailAlertsToggle')
  const languageSelect = document.getElementById('languageSelect')

  if (themeToggle) {
    themeToggle.checked = userPreferences.preferences.theme === 'dark'
    themeToggle.addEventListener('change', (e) => {
      userPreferences.setTheme(e.target.checked ? 'dark' : 'light')
    })
  }

  if (notificationsToggle) {
    notificationsToggle.checked = userPreferences.preferences.notifications
    notificationsToggle.addEventListener('change', (e) => {
      userPreferences.setNotifications(e.target.checked)
    })
  }

  if (emailAlertsToggle) {
    emailAlertsToggle.checked = userPreferences.preferences.emailAlerts
    emailAlertsToggle.addEventListener('change', (e) => {
      userPreferences.setEmailAlerts(e.target.checked)
    })
  }

  if (languageSelect) {
    languageSelect.value = userPreferences.preferences.language
    languageSelect.addEventListener('change', (e) => {
      userPreferences.setLanguage(e.target.value)
    })
  }
}

// Configurar listeners de eventos globais
function setupGlobalEventListeners() {
  // Listener para mudanças de tema via atalho de teclado
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'T') {
      userPreferences.toggleTheme()
    }
  })

  // Listener para logout via atalho de teclado
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'Q' && isAuthenticated) {
      handleLogout()
    }
  })
}

// Atualizar UI para usuário autenticado
function updateUIForAuthenticatedUser() {
  const userNameElement = document.getElementById('userName')
  const userAvatarElement = document.getElementById('userAvatar')

  if (userNameElement && currentUser) {
    userNameElement.textContent = currentUser.name
  }

  if (userAvatarElement && currentUser) {
    if (currentUser.avatar) {
      userAvatarElement.src = currentUser.avatar
    } else {
      userAvatarElement.src = '/images/default-avatar.png'
    }
  }
}

// Iniciar aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initializeApp)

// Validação de token
async function validateAuthToken() {
  const token = localStorage.getItem('authToken')
  if (!token) return false

  try {
    const response = await fetch('/api/auth/verify', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json()
    return data.valid
  } catch (error) {
    console.error('Erro ao validar token:', error)
    return false
  }
}

// Verificação de autenticação
function checkAuthStatus() {
  const authToken = localStorage.getItem('authToken')
  if (!authToken) {
    // Redirecionar para login se estiver em página protegida
    const protectedPages = ['index.html', 'user.html']
    const currentPage = window.location.pathname.split('/').pop()
    if (protectedPages.includes(currentPage)) {
      window.location.href = '/login.html'
    }
    return
  }

  // Verificar validade do token com o backend
  fetch('/api/auth/verify', {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  })
  .then(response => response.json())
  .then(data => {
    isAuthenticated = data.valid
    if (!isAuthenticated) {
      localStorage.removeItem('authToken')
      if (protectedPages.includes(currentPage)) {
        window.location.href = '/login.html'
      }
    }
  })
  .catch(error => {
    console.error('Erro ao verificar autenticação:', error)
    isAuthenticated = false
  })
}

// Função para logout
function handleLogout() {
  clearUserState()
  showNotification('Sessão encerrada com sucesso', 'info')
  window.location.href = '/login.html'
}

function initializeAuth() {
  setupEventListeners()
  loadTheme()
  setupFormValidation()
  loadRememberedUser()
}

function loadRememberedUser() {
  const rememberedEmail = localStorage.getItem('userEmail')
  const emailInput = document.getElementById('email')
  const rememberCheckbox = document.getElementById('remember')
  
  if (rememberedEmail && emailInput && rememberCheckbox) {
    emailInput.value = rememberedEmail
    rememberCheckbox.checked = true
  }
}

function setupLogoutButton() {
  const logoutBtn = document.getElementById('logout-btn')
  if (logoutBtn) {
    if (isAuthenticated) {
      logoutBtn.style.display = 'flex'
      logoutBtn.addEventListener('click', handleLogout)
    } else {
      logoutBtn.style.display = 'none'
    }
  }
}

// Event Listeners
function setupEventListeners() {
  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle")
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme)
  }

  // Form submissions
  const loginForm = document.getElementById("login-form")
  const registerForm = document.getElementById("register-form")
  const forgotForm = document.getElementById("forgot-form")

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }

  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister)
  }

  if (forgotForm) {
    forgotForm.addEventListener("submit", handleForgotPassword)
  }

  // Resend email button
  const resendBtn = document.getElementById("resend-btn")
  if (resendBtn) {
    resendBtn.addEventListener("click", handleResendEmail)
  }
}

// User Preferences Management
class UserPreferences {
  constructor() {
    this.preferences = JSON.parse(localStorage.getItem('userPreferences')) || {
      theme: localStorage.getItem('theme') || 'light',
      notifications: true,
      emailAlerts: true,
      language: 'pt-BR'
    }
    this.applyPreferences()
    
    // Ouvir mudanças de tema em outras páginas
    window.addEventListener('storage', (event) => {
      if (event.key === 'theme') {
        this.preferences.theme = event.newValue
        this.applyPreferences()
      }
    })
  }

  async savePreferences() {
    try {
      const response = await fetch('/api/user/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(this.preferences)
      })

      if (response.ok) {
        localStorage.setItem('userPreferences', JSON.stringify(this.preferences))
        showNotification('Preferências salvas com sucesso!', 'success')
        return true
      } else {
        const data = await response.json()
        showNotification(data.message || 'Erro ao salvar preferências', 'error')
        return false
      }
    } catch (error) {
      console.error('Erro ao salvar preferências:', error)
      showNotification('Erro ao conectar com o servidor', 'error')
      return false
    }
  }

  async loadPreferences() {
    try {
      const response = await fetch('/api/user/preferences', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        this.preferences = data.preferences
        localStorage.setItem('userPreferences', JSON.stringify(this.preferences))
        this.applyPreferences()
        return true
      }
      return false
    } catch (error) {
      console.error('Erro ao carregar preferências:', error)
      return false
    }
  }

  applyPreferences() {
    // Aplicar tema
    document.documentElement.setAttribute('data-theme', this.preferences.theme)
    const themeIcon = document.getElementById('theme-icon')
    if (themeIcon) {
      themeIcon.className = this.preferences.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'
    }
    
    // Aplicar idioma
    document.documentElement.setAttribute('lang', this.preferences.language)
    
    // Sincronizar tema com localStorage para outras páginas
    localStorage.setItem('theme', this.preferences.theme)
    
    // Disparar evento para outras páginas
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'theme',
      newValue: this.preferences.theme
    }))
  }

  setTheme(theme) {
    this.preferences.theme = theme
    this.applyPreferences()
    this.savePreferences()
  }

  toggleTheme() {
    const newTheme = this.preferences.theme === 'light' ? 'dark' : 'light'
    this.setTheme(newTheme)
  }

  setNotifications(enabled) {
    this.preferences.notifications = enabled
    this.savePreferences()
  }

  setEmailAlerts(enabled) {
    this.preferences.emailAlerts = enabled
    this.savePreferences()
  }

  setLanguage(language) {
    this.preferences.language = language
    this.applyPreferences()
    this.savePreferences()
  }
}

// Instância global das preferências do usuário
const userPreferences = new UserPreferences()

function toggleTheme() {
  const userPrefs = new UserPreferences()
  userPrefs.toggleTheme()
}

function applyTheme() {
  const savedTheme = localStorage.getItem("theme") || "light"
  document.documentElement.setAttribute("data-theme", savedTheme)
  const themeIcon = document.getElementById("theme-icon")
  if (themeIcon) {
    themeIcon.className = savedTheme === "light" ? "fas fa-moon" : "fas fa-sun"
  }
}

function loadTheme() {
  applyTheme()
  
  // Ouvir mudanças de tema em outras páginas
  window.addEventListener('storage', (event) => {
    if (event.key === 'theme') {
      applyTheme()
    }
  })
}

// Password Toggle
function togglePassword(inputId) {
  const input = document.getElementById(inputId)
  const button = input.parentElement.querySelector(".password-toggle")
  const icon = button.querySelector("i")

  if (input.type === "password") {
    input.type = "text"
    icon.className = "fas fa-eye-slash"
  } else {
    input.type = "password"
    icon.className = "fas fa-eye"
  }
}

// Form Validation
function setupFormValidation() {
  // Real-time validation for register form
  const registerForm = document.getElementById("register-form")
  if (registerForm) {
    const passwordInput = registerForm.querySelector("#password")
    const confirmPasswordInput = registerForm.querySelector("#confirm-password")

    if (passwordInput) {
      passwordInput.addEventListener("input", validatePassword)
    }

    if (confirmPasswordInput) {
      confirmPasswordInput.addEventListener("input", validatePasswordMatch)
    }
  }
}

function validatePassword() {
  const password = document.getElementById("password").value
  const formGroup = document.getElementById("password").closest(".form-group")

  // Remove existing validation classes
  formGroup.classList.remove("error", "success")

  // Remove existing error message
  const existingError = formGroup.querySelector(".error-message")
  if (existingError) {
    existingError.remove()
  }

  if (password.length === 0) return

  if (password.length < 8) {
    showFieldError(formGroup, "A senha deve ter pelo menos 8 caracteres")
    return false
  }

  if (!/(?=.*[a-z])/.test(password)) {
    showFieldError(formGroup, "A senha deve conter pelo menos uma letra minúscula")
    return false
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    showFieldError(formGroup, "A senha deve conter pelo menos uma letra maiúscula")
    return false
  }

  if (!/(?=.*\d)/.test(password)) {
    showFieldError(formGroup, "A senha deve conter pelo menos um número")
    return false
  }

  formGroup.classList.add("success")
  return true
}

function validatePasswordMatch() {
  const password = document.getElementById("password").value
  const confirmPassword = document.getElementById("confirm-password").value
  const formGroup = document.getElementById("confirm-password").closest(".form-group")

  // Remove existing validation classes
  formGroup.classList.remove("error", "success")

  // Remove existing error message
  const existingError = formGroup.querySelector(".error-message")
  if (existingError) {
    existingError.remove()
  }

  if (confirmPassword.length === 0) return

  if (password !== confirmPassword) {
    showFieldError(formGroup, "As senhas não coincidem")
    return false
  }

  formGroup.classList.add("success")
  return true
}

function showFieldError(formGroup, message) {
  formGroup.classList.add("error")

  const errorDiv = document.createElement("div")
  errorDiv.className = "error-message"
  errorDiv.textContent = message
  formGroup.appendChild(errorDiv)
}

// Form Handlers
async function handleLogin(event) {
  event.preventDefault()

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  const remember = document.getElementById('remember').checked

  // Validação de e-mail acadêmico
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)?(?:edu|edu\.br|universidade\.br|faculdade\.br)$/
  if (!emailRegex.test(email)) {
    showNotification('Por favor, utilize seu e-mail acadêmico!', 'error')
    return
  }

  // Validação de senha
  if (!password) {
    showNotification('Por favor, preencha sua senha!', 'error')
    return
  }

  // Mostrar loading
  const button = document.getElementById('login-btn')
  setButtonLoading(button, true)

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        remember
      })
    })

    const data = await response.json()

    if (data.success) {
      if (remember) {
        localStorage.setItem('userEmail', email)
      }
      setUserState(data.user)
      showNotification('Login realizado com sucesso!', 'success')
      window.location.href = '/index.html'
    } else {
      showNotification(data.message || 'Erro ao fazer login. Tente novamente.', 'error')
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error)
    showNotification('Erro de conexão. Verifique sua internet e tente novamente.', 'error')
  } finally {
    setButtonLoading(button, false)
  }

    // Simular sucesso/erro
    if (email.includes("@") && password.length >= 6) {
      showNotification("Login realizado com sucesso!", "success")

      // Salvar dados se "lembrar de mim" estiver marcado
      if (remember) {
        localStorage.setItem("rememberedEmail", email)
      }

      // Redirecionar após 1 segundo
      setTimeout(() => {
        window.location.href = "index.html"
      }, 1000)
    } else {
      showNotification("E-mail ou senha incorretos!", "error")
    }
  } 2000;


function showNotification(message, type = 'info') {
  return notificationSystem.show(message, type)
}

function handleRegister(event) {
  event.preventDefault()

  const name = document.getElementById('name').value.trim()
  const email = document.getElementById('email').value.trim()
  const university = document.getElementById('university').value.trim()
  const semester = document.getElementById('semester').value
  const password = document.getElementById('password').value
  const confirmPassword = document.getElementById('confirm-password').value
  const terms = document.getElementById('terms').checked

  // Validação
  if (!name || !email || !university || !semester || !password || !confirmPassword) {
    showNotification("Por favor, preencha todos os campos obrigatórios!", "error")
    return
  }

  if (!terms) {
    showNotification("Você deve aceitar os termos de uso!", "error")
    return
  }

  if (password !== confirmPassword) {
    showNotification("As senhas não coincidem!", "error")
    return
  }

  if (!validatePassword()) {
    showNotification("A senha não atende aos requisitos mínimos!", "error")
    return
  }

  // Mostrar loading
  const button = document.getElementById("register-btn")
  setButtonLoading(button, true)

  // Simular registro
  setTimeout(() => {
    setButtonLoading(button, false)
    showNotification("Conta criada com sucesso! Verifique seu e-mail.", "success")

    // Redirecionar para login após 2 segundos
    setTimeout(() => {
      window.location.href = "login.html"
    }, 2000)
  }, 2000)
}

// Password Management
async function changePassword(currentPassword, newPassword, confirmPassword) {
  if (!validatePassword(newPassword)) {
    showNotification('A nova senha não atende aos requisitos mínimos', 'error')
    return false
  }

  if (newPassword !== confirmPassword) {
    showNotification('As senhas não coincidem', 'error')
    return false
  }

  try {
    const response = await fetch('/api/user/change-password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({
        currentPassword,
        newPassword
      })
    })

    const data = await response.json()

    if (response.ok) {
      showNotification('Senha alterada com sucesso!', 'success')
      return true
    } else {
      showNotification(data.message || 'Erro ao alterar senha', 'error')
      return false
    }
  } catch (error) {
    console.error('Erro ao alterar senha:', error)
    showNotification('Erro ao conectar com o servidor', 'error')
    return false
  }
}

function handleForgotPassword(event) {
  event.preventDefault()

  const email = document.getElementById('email').value.trim()
  const forgotFormContainer = document.getElementById('forgot-form-container')
  const successContainer = document.getElementById('success-container')
  const sentEmailSpan = document.getElementById('sent-email')

  // Validação de e-mail
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)?(?:edu|edu\.br|universidade\.br|faculdade\.br)$/
  if (!emailRegex.test(email)) {
    showNotification('Por favor, utilize seu e-mail acadêmico.', 'error')
    return
  }

  // Mostrar loading
  const button = document.getElementById('forgot-btn')
  setButtonLoading(button, true)

  // Enviar solicitação para o backend
  fetch('/api/auth/forgot-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  })
  .then(response => response.json())
  .then(data => {
    setButtonLoading(button, false)
    if (data.success) {
      // Mostrar mensagem de sucesso
      forgotFormContainer.style.display = 'none'
      successContainer.style.display = 'block'
      sentEmailSpan.textContent = email

      // Configurar botão de reenvio
      const resendBtn = document.getElementById('resend-btn')
      if (resendBtn) {
        resendBtn.addEventListener('click', () => handleResendEmail(email))
      }
    } else {
      showNotification(data.message || 'Erro ao enviar e-mail. Tente novamente.', 'error')
    }
  })
  .catch(error => {
    setButtonLoading(button, false)
    showNotification('Erro de conexão. Verifique sua internet e tente novamente.', 'error')
    console.error('Erro na recuperação de senha:', error)
  })
}

function handleResendEmail() {
  const button = document.getElementById("resend-btn")
  setButtonLoading(button, true)

  setTimeout(() => {
    setButtonLoading(button, false)
    showNotification("E-mail reenviado com sucesso!", "success")
  }, 1000)
}

// Profile Management
async function updateUserProfile(profileData) {
  const token = localStorage.getItem('authToken')
  if (!token) {
    showNotification('Você precisa estar logado para atualizar seu perfil', 'error')
    return false
  }

  try {
    const response = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    })

    const data = await response.json()

    if (response.ok) {
      // Atualizar estado do usuário
      const updatedUser = { ...currentUser, ...data.user }
      setUserState(updatedUser)
      showNotification('Perfil atualizado com sucesso!', 'success')
      return true
    } else {
      showNotification(data.message || 'Erro ao atualizar perfil', 'error')
      return false
    }
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error)
    showNotification('Erro ao conectar com o servidor', 'error')
    return false
  }
}

async function updateUserAvatar(file) {
  if (!file || !file.type.startsWith('image/')) {
    showNotification('Por favor, selecione uma imagem válida', 'error')
    return false
  }

  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    showNotification('A imagem deve ter no máximo 5MB', 'error')
    return false
  }

  const formData = new FormData()
  formData.append('avatar', file)

  try {
    const response = await fetch('/api/user/avatar', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: formData
    })

    const data = await response.json()

    if (response.ok) {
      const updatedUser = { ...currentUser, avatar: data.avatarUrl }
      setUserState(updatedUser)
      showNotification('Foto de perfil atualizada com sucesso!', 'success')
      return true
    } else {
      showNotification(data.message || 'Erro ao atualizar foto de perfil', 'error')
      return false
    }
  } catch (error) {
    console.error('Erro ao atualizar avatar:', error)
    showNotification('Erro ao enviar imagem', 'error')
    return false
  }
}

// Utility Functions
function setButtonLoading(button, loading) {
  if (!button) return

  const btnText = button.querySelector('.btn-text')
  const btnLoading = button.querySelector('.btn-loading')

  if (loading) {
    button.classList.add('btn-loading-state')
    btnText.style.display = 'none'
    btnLoading.style.display = 'flex'
    button.disabled = true
  } else {
    button.classList.remove('btn-loading-state')
    btnText.style.display = 'block'
    btnLoading.style.display = 'none'
    button.disabled = false
  }
}


// Notification System
class NotificationSystem {
  constructor() {
    this.container = null
    this.notifications = new Set()
    this.maxNotifications = 5
    this.setupContainer()
  }

  setupContainer() {
    this.container = document.createElement('div')
    this.container.id = 'notificationContainer'
    document.body.appendChild(this.container)
  }

  show(message, type = 'info', duration = 5000) {
    if (!userPreferences.preferences.notifications) return

    // Limitar número de notificações
    if (this.notifications.size >= this.maxNotifications) {
      const oldestNotification = this.container.firstChild
      if (oldestNotification) {
        this.removeNotification(oldestNotification)
      }
    }

    const notification = this.createNotification(message, type)
    this.container.appendChild(notification)
    this.notifications.add(notification)

    // Auto remove
    if (duration > 0) {
      setTimeout(() => this.fadeOutNotification(notification), duration)
    }

    return notification
  }

  createNotification(message, type) {
    const notification = document.createElement('div')
    notification.className = `notification notification-${type}`
    
    const icon = this.getNotificationIcon(type)
    notification.innerHTML = `
      ${icon}
      <span class="notification-message">${message}</span>
      <button class="notification-close" aria-label="Fechar notificação">
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
    `

    // Adicionar event listeners
    const closeButton = notification.querySelector('.notification-close')
    closeButton.addEventListener('click', () => this.removeNotification(notification))

    // Adicionar suporte a gestos de toque para fechar
    let touchStartX = 0
    let touchEndX = 0

    notification.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX
    })

    notification.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX
      if (touchStartX - touchEndX > 50) { // Swipe left
        this.fadeOutNotification(notification)
      }
    })

    return notification
  }

  fadeOutNotification(notification) {
    notification.classList.add('notification-fade-out')
    setTimeout(() => this.removeNotification(notification), 300)
  }

  removeNotification(notification) {
    this.notifications.delete(notification)
    notification.remove()
  }

  getNotificationIcon(type) {
    const icons = {
      success: '<svg class="notification-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
      error: '<svg class="notification-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
      warning: '<svg class="notification-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',
      info: '<svg class="notification-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>'
    }
    return icons[type] || icons.info
  }

  clear() {
    this.notifications.forEach(notification => this.removeNotification(notification))
  }
}

// Instância global do sistema de notificações
const notificationSystem = new NotificationSystem()

// Função auxiliar para manter compatibilidade com código existente
function showNotification(message, type = 'info', duration = 5000) {
  return notificationSystem.show(message, type, duration)
}

// Auto-fill remembered email
function loadRememberedEmail() {
  const emailInput = document.getElementById("email")
  const rememberedEmail = localStorage.getItem("rememberedEmail")

  if (emailInput && rememberedEmail) {
    emailInput.value = rememberedEmail
    document.getElementById("remember").checked = true
  }
}

// Load remembered email on login page
if (window.location.pathname.includes("login.html")) {
  document.addEventListener("DOMContentLoaded", loadRememberedEmail)
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Enter para submeter formulário quando focado em input
  if (e.key === "Enter" && e.target.tagName === "INPUT") {
    const form = e.target.closest("form")
    if (form) {
      const submitButton = form.querySelector('button[type="submit"]')
      if (submitButton && !submitButton.disabled) {
        submitButton.click()
      }
    }
  }
})

// Prevent form submission on disabled buttons
document.addEventListener("submit", (e) => {
  const submitButton = e.target.querySelector('button[type="submit"]')
  if (submitButton && submitButton.disabled) {
    e.preventDefault()
  }
})
