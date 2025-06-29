// Dados dos estágios
const estagiosData = [
  {
    id: 1,
    instituicao: "Hospital das Clínicas",
    area: "Psicologia Hospitalar",
    cidade: "São Paulo",
    estado: "SP",
    avaliacao: 4.8,
    avaliacoes: 24,
    cargaHoraria: "20h/semana",
    remuneracao: "R$ 800,00",
    descricao: "Acompanhamento psicológico a pacientes internados e familiares",
    requisitos: "A partir do 6º semestre",
    contratacao: true,
    tags: ["Hospitalar", "Clínica", "Remunerado"],
  },
  {
    id: 2,
    instituicao: "Clínica Mente Sã",
    area: "Psicologia Clínica",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    avaliacao: 4.6,
    avaliacoes: 18,
    cargaHoraria: "15h/semana",
    remuneracao: "Não remunerado",
    descricao: "Atendimento clínico supervisionado e grupos terapêuticos",
    requisitos: "A partir do 7º semestre",
    contratacao: false,
    tags: ["Clínica", "Terapia", "Supervisão"],
  },
  {
    id: 3,
    instituicao: "Escola Municipal Santos Dumont",
    area: "Psicologia Escolar",
    cidade: "Belo Horizonte",
    estado: "MG",
    avaliacao: 4.9,
    avaliacoes: 31,
    cargaHoraria: "25h/semana",
    remuneracao: "R$ 600,00",
    descricao: "Orientação educacional e apoio psicopedagógico",
    requisitos: "A partir do 5º semestre",
    contratacao: true,
    tags: ["Escolar", "Educação", "Remunerado"],
  },
  {
    id: 4,
    instituicao: "Tribunal de Justiça",
    area: "Psicologia Jurídica",
    cidade: "Brasília",
    estado: "DF",
    avaliacao: 4.7,
    avaliacoes: 12,
    cargaHoraria: "30h/semana",
    remuneracao: "R$ 1.200,00",
    descricao: "Avaliação psicológica em processos judiciais e elaboração de laudos",
    requisitos: "A partir do 9º semestre",
    contratacao: true,
    tags: ["Jurídica", "Laudos", "Remunerado"],
  },
  {
    id: 5,
    instituicao: "ONG Esperança Viva",
    area: "Psicologia Social",
    cidade: "Salvador",
    estado: "BA",
    avaliacao: 4.5,
    avaliacoes: 8,
    cargaHoraria: "20h/semana",
    remuneracao: "Não remunerado",
    descricao: "Trabalho com comunidades em situação de vulnerabilidade social",
    requisitos: "A partir do 5º semestre",
    contratacao: false,
    tags: ["Social", "Comunidade", "Voluntário"],
  },
  {
    id: 6,
    instituicao: "Empresa Tech Solutions",
    area: "Psicologia Organizacional",
    cidade: "Porto Alegre",
    estado: "RS",
    avaliacao: 4.4,
    avaliacoes: 15,
    cargaHoraria: "40h/semana",
    remuneracao: "R$ 1.000,00",
    descricao: "Recrutamento, seleção e desenvolvimento organizacional",
    requisitos: "A partir do 7º semestre",
    contratacao: true,
    tags: ["Organizacional", "RH", "Remunerado"],
  },
]

// Estado da aplicação
let currentTheme = "light"
let filteredEstagios = [...estagiosData]
let favoriteEstagios = new Set()
let userPreferences = {
  theme: "light",
  notifications: {
    newInternships: true,
    messages: true,
    updates: false
  },
  language: "pt-BR",
  privacy: {
    profilePublic: true,
    showEmail: false
  }
}

// Dados de usuários para demonstração
let users = [
  {
    id: 1,
    name: "Admin Sistema",
    email: "admin@sistema.com",
    role: "admin",
    status: "active"
  },
  {
    id: 2,
    name: "João Coordenador",
    email: "joao@coord.com",
    role: "coordinator",
    status: "active"
  },
  {
    id: 3,
    name: "Maria Estudante",
    email: "maria@estudante.com",
    role: "student",
    status: "active"
  }
]

let currentPage = 1
const itemsPerPage = 10

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

const forumData = {
    topics: [
        {
            id: 1,
            title: "Dicas para primeira entrevista de estágio em Psicologia Clínica",
            category: "dicas",
            author: "Maria Silva",
            date: "2024-01-15",
            replies: 12,
            views: 145,
            avatar: "https://i.pravatar.cc/32?img=1"
        },
        {
            id: 2,
            title: "Como equilibrar estágio em hospital e faculdade?",
            category: "duvidas",
            author: "João Santos",
            date: "2024-01-14",
            replies: 18,
            views: 232,
            avatar: "https://i.pravatar.cc/32?img=2"
        },
        {
            id: 3,
            title: "Experiências no estágio de Psicologia Organizacional",
            category: "experiencias",
            author: "Ana Oliveira",
            date: "2024-01-13",
            replies: 25,
            views: 310,
            avatar: "https://i.pravatar.cc/32?img=3"
        },
        {
            id: 4,
            title: "Vaga de estágio em Psicologia Escolar - São Paulo",
            category: "vagas",
            author: "Carlos Mendes",
            date: "2024-01-12",
            replies: 5,
            views: 180,
            avatar: "https://i.pravatar.cc/32?img=4"
        },
        {
            id: 5,
            title: "Supervisão em Psicanálise: Compartilhando aprendizados",
            category: "experiencias",
            author: "Paula Costa",
            date: "2024-01-11",
            replies: 30,
            views: 425,
            avatar: "https://i.pravatar.cc/32?img=5"
        }
    ],
    currentPage: 1,
    totalPages: 5,
    itemsPerPage: 10
};

// Função para formatar a data
function formatDate(dateString) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

// Função para formatar números grandes
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num;
}

function initializeApp() {
    setupEventListeners();
    loadTheme();
    loadUserPreferences();
    setupForumFilters();
    loadFavorites();

    // Identificar a página atual
    const currentPage = window.location.pathname.split('/').pop();

    // Inicializar funcionalidades específicas da página
    switch(currentPage) {
        case 'forum.html':
            setupForum();
            break;
        case 'guias.html':
            setupGuides();
            setupGuidesFilters();
            break;
        case 'index.html':
        case '':
            renderEstagios();
            setupTabs();
            break;
    }
}

// Event Listeners
function setupEventListeners() {
  // Event listeners do tema
  const themeToggle = document.getElementById("theme-toggle")
  themeToggle.addEventListener("click", toggleTheme)

  // Event listeners específicos da página
  const currentPage = window.location.pathname.split('/').pop();

  if (currentPage === 'forum.html') {
      setupForumEventListeners();
  } else if (currentPage === 'guias.html') {
      setupGuidesEventListeners();
  } else {
      // Event listeners da página principal
      document.querySelectorAll('.tab-button').forEach(button => {
          button.addEventListener('click', () => switchTab(button.dataset.tab));
      });
  }

  // Tab navigation
  const tabButtons = document.querySelectorAll(".tab-button")
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => switchTab(button.dataset.tab))
  })

  // Event listeners do fórum
  const forumSearch = document.getElementById('forum-search');
  const forumCategory = document.getElementById('forum-category');
  const newTopicBtn = document.getElementById('new-topic-btn');
  const prevPageBtn = document.getElementById('prev-page');
  const nextPageBtn = document.getElementById('next-page');

  if (forumSearch) forumSearch.addEventListener('input', filterTopics);
  if (forumCategory) forumCategory.addEventListener('change', filterTopics);
  if (newTopicBtn) newTopicBtn.addEventListener('click', showNewTopicModal);
  if (prevPageBtn) prevPageBtn.addEventListener('click', () => changePage(-1));
  if (nextPageBtn) nextPageBtn.addEventListener('click', () => changePage(1));

  // Configurações
  const configForm = document.getElementById("config-form")
  if (configForm) {
    configForm.addEventListener("submit", handleConfigSubmit)
    loadUserPreferences()
  }

  // Usuários
  const addUserBtn = document.getElementById("add-user-btn")
  if (addUserBtn) {
    addUserBtn.addEventListener("click", showAddUserModal)
  }

  const userSearch = document.getElementById("user-search")
  if (userSearch) {
    userSearch.addEventListener("input", debounce(filterUsers, 300))
  }

  const userRoleFilter = document.getElementById("user-role-filter")
  if (userRoleFilter) {
    userRoleFilter.addEventListener("change", filterUsers)
  }

  const userStatusFilter = document.getElementById("user-status-filter")
  if (userStatusFilter) {
    userStatusFilter.addEventListener("change", filterUsers)
  }

  const prevPage = document.getElementById("prev-page")
  const nextPage = document.getElementById("next-page")
  if (prevPage && nextPage) {
    prevPage.addEventListener("click", () => changePage(-1))
    nextPage.addEventListener("click", () => changePage(1))
  }

  // Search and filters
  const searchInput = document.getElementById("search-input")
  const areaSelect = document.getElementById("area-select")
  const citySelect = document.getElementById("city-select")

  searchInput.addEventListener("input", debounce(filterEstagios, 300))
  areaSelect.addEventListener("change", filterEstagios)
  citySelect.addEventListener("change", filterEstagios)

  // Form submission
  const cadastroForm = document.getElementById("cadastro-form")
  cadastroForm.addEventListener("submit", handleFormSubmit)
}

// Theme Management
function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light"
  applyTheme()
  saveTheme()
  // Atualizar tema em todas as páginas abertas
  window.dispatchEvent(new StorageEvent('storage', {
    key: 'theme',
    newValue: currentTheme
  }))
}

function applyTheme() {
  document.documentElement.setAttribute("data-theme", currentTheme)
  const themeIcon = document.getElementById("theme-icon")
  if (themeIcon) {
    themeIcon.className = currentTheme === "light" ? "fas fa-moon" : "fas fa-sun"
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    currentTheme = savedTheme
  }
  applyTheme()
  
  // Ouvir mudanças de tema em outras páginas
  window.addEventListener('storage', (event) => {
    if (event.key === 'theme') {
      currentTheme = event.newValue
      applyTheme()
    }
  })
}

function saveTheme() {
  localStorage.setItem("theme", currentTheme)
  // Atualizar preferências do usuário
  userPreferences.theme = currentTheme
  saveUserPreferences()
}

// Tab Management
function setupTabs() {
  // Ativar primeira tab por padrão
  switchTab("buscar")
}

function switchTab(tabName) {
  // Remove active class from all tabs and contents
  document.querySelectorAll(".tab-button").forEach((btn) => btn.classList.remove("active"))
  document.querySelectorAll(".tab-content").forEach((content) => content.classList.remove("active"))

  // Add active class to selected tab and content
  document.querySelector(`[data-tab="${tabName}"]`).classList.add("active")
  document.getElementById(tabName).classList.add("active")

  // Carregar dados específicos da tab
  if (tabName === "usuarios") {
    renderUsers()
  } else if (tabName === "forum") {
    renderForumTopics()
  }
}

// Funções do Fórum
function setupForum() {
    renderForumTopics();
    setupForumFilters();
    updatePagination();
}

function setupForumFilters() {
    const searchInput = document.getElementById('forum-search');
    const categorySelect = document.getElementById('forum-category');
    const sortSelect = document.getElementById('forum-sort');

    if (!searchInput || !categorySelect || !sortSelect) return;

    const updateTopics = () => {
        const filteredTopics = filterTopics();
        const topicsContainer = document.querySelector('.forum-topics');
        if (!topicsContainer) return;

        topicsContainer.innerHTML = filteredTopics.map(topic => `
            <div class="topic-item" data-id="${topic.id}">
                <div class="topic-info">
                    <h4>${topic.title}</h4>
                    <div class="topic-meta">
                        <span class="topic-category">${topic.category.charAt(0).toUpperCase() + topic.category.slice(1)}</span>
                        <span class="topic-author">
                            <img src="${topic.avatar}" alt="${topic.author}" style="width: 24px; height: 24px; border-radius: 50%; margin-right: 8px;">
                            ${topic.author}
                        </span>
                        <span class="topic-date">
                            <i class="far fa-calendar-alt"></i>
                            ${formatDate(topic.date)}
                        </span>
                    </div>
                </div>
                <div class="topic-stats">
                    <span title="Respostas">
                        <i class="fas fa-comments"></i>
                        ${formatNumber(topic.replies)}
                    </span>
                    <span title="Visualizações">
                        <i class="fas fa-eye"></i>
                        ${formatNumber(topic.views)}
                    </span>
                </div>
            </div>
        `).join('');

        // Reaplica os event listeners
        document.querySelectorAll('.topic-item').forEach(item => {
            item.addEventListener('click', () => {
                const topicId = item.dataset.id;
                showTopicDetails(topicId);
            });
        });
    };

    const debouncedUpdate = debounce(updateTopics, 300);

    searchInput.addEventListener('input', debouncedUpdate);
    categorySelect.addEventListener('change', updateTopics);
    sortSelect.addEventListener('change', updateTopics);

    // Inicializa com os tópicos filtrados
    updateTopics();
}

function renderForumTopics() {
    const topicsContainer = document.querySelector('.forum-topics');
    if (!topicsContainer) return;

    const topics = forumData.topics;
    topicsContainer.innerHTML = topics.map(topic => `
        <div class="topic-item" data-id="${topic.id}">
            <div class="topic-info">
                <h4>${topic.title}</h4>
                <div class="topic-meta">
                    <span class="topic-category">${topic.category.charAt(0).toUpperCase() + topic.category.slice(1)}</span>
                    <span class="topic-author">
                        <img src="${topic.avatar}" alt="${topic.author}" style="width: 24px; height: 24px; border-radius: 50%; margin-right: 8px;">
                        ${topic.author}
                    </span>
                    <span class="topic-date">
                        <i class="far fa-calendar-alt"></i>
                        ${formatDate(topic.date)}
                    </span>
                </div>
            </div>
            <div class="topic-stats">
                <span title="Respostas">
                    <i class="fas fa-comments"></i>
                    ${formatNumber(topic.replies)}
                </span>
                <span title="Visualizações">
                    <i class="fas fa-eye"></i>
                    ${formatNumber(topic.views)}
                </span>
            </div>
        </div>
    `).join('');

    // Adiciona evento de clique aos tópicos
    document.querySelectorAll('.topic-item').forEach(item => {
        item.addEventListener('click', () => {
            const topicId = item.dataset.id;
            showTopicDetails(topicId);
        });
    });
}

function showTopicDetails(topicId) {
    // Placeholder para futura implementação da visualização detalhada do tópico
    console.log(`Visualizando tópico ${topicId}`);
}

function filterTopics() {
    const searchTerm = document.getElementById('forum-search')?.value.toLowerCase() || '';
    const selectedCategory = document.getElementById('forum-category')?.value || '';
    const sortBy = document.getElementById('forum-sort')?.value || 'recent';

    let filteredTopics = forumData.topics.filter(topic => {
        const matchesSearch = topic.title.toLowerCase().includes(searchTerm) ||
                            topic.author.toLowerCase().includes(searchTerm);
        const matchesCategory = !selectedCategory || topic.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Ordenação dos tópicos
    filteredTopics.sort((a, b) => {
        switch (sortBy) {
            case 'recent':
                return new Date(b.date) - new Date(a.date);
            case 'popular':
                return b.views - a.views;
            case 'unanswered':
                return a.replies - b.replies;
            default:
                return new Date(b.date) - new Date(a.date);
        }
    });

    return filteredTopics;
}

// Gerenciamento de Configurações
function handleConfigSubmit(event) {
  event.preventDefault()
  
  const newTheme = document.getElementById("theme-select").value
  const themeChanged = newTheme !== userPreferences.theme
  
  userPreferences = {
    theme: newTheme,
    notifications: {
      newInternships: document.getElementById("notify-new-internships").checked,
      messages: document.getElementById("notify-messages").checked,
      updates: document.getElementById("notify-updates").checked
    },
    language: document.getElementById("language-select").value,
    privacy: {
      profilePublic: document.getElementById("profile-public").checked,
      showEmail: document.getElementById("show-email").checked
    }
  }

  saveUserPreferences()
  
  // Se o tema mudou, atualizar em todas as páginas
  if (themeChanged) {
    currentTheme = newTheme
    applyTheme()
    saveTheme()
    
    // Disparar evento para outras páginas
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'theme',
      newValue: newTheme
    }))
  }
  
  showNotification("Configurações salvas com sucesso!", "success")
}

function loadUserPreferences() {
  const savedPreferences = localStorage.getItem("userPreferences")
  if (savedPreferences) {
    userPreferences = JSON.parse(savedPreferences)
    
    // Atualizar tema global
    if (userPreferences.theme) {
      currentTheme = userPreferences.theme
      applyTheme()
    }
    
    // Atualizar campos do formulário se estiver na página de configurações
    const themeSelect = document.getElementById("theme-select")
    const notifyNewInternships = document.getElementById("notify-new-internships")
    const notifyMessages = document.getElementById("notify-messages")
    const notifyUpdates = document.getElementById("notify-updates")
    const languageSelect = document.getElementById("language-select")
    const profilePublic = document.getElementById("profile-public")
    const showEmail = document.getElementById("show-email")
    
    if (themeSelect) themeSelect.value = userPreferences.theme
    if (notifyNewInternships) notifyNewInternships.checked = userPreferences.notifications.newInternships
    if (notifyMessages) notifyMessages.checked = userPreferences.notifications.messages
    if (notifyUpdates) notifyUpdates.checked = userPreferences.notifications.updates
    if (languageSelect) languageSelect.value = userPreferences.language
    if (profilePublic) profilePublic.checked = userPreferences.privacy.profilePublic
    if (showEmail) showEmail.checked = userPreferences.privacy.showEmail
  }
  
  // Ouvir mudanças nas preferências em outras páginas
  window.addEventListener('storage', (event) => {
    if (event.key === 'userPreferences') {
      const newPreferences = JSON.parse(event.newValue)
      userPreferences = newPreferences
      
      // Atualizar tema se mudou
      if (newPreferences.theme !== currentTheme) {
        currentTheme = newPreferences.theme
        applyTheme()
      }
    }
  })
}

function saveUserPreferences() {
  localStorage.setItem("userPreferences", JSON.stringify(userPreferences))
}

// Gerenciamento de Usuários
function renderUsers() {
  const usersList = document.getElementById("users-list")
  if (!usersList) return

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedUsers = users.slice(startIndex, endIndex)

  usersList.innerHTML = paginatedUsers.map(user => `
    <tr>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td><span class="badge badge-${user.status}">${user.status}</span></td>
      <td>
        <div class="action-buttons">
          <button class="btn-action edit" onclick="editUser(${user.id})">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn-action delete" onclick="deleteUser(${user.id})">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join("")

  updatePagination()
}

function filterUsers() {
  const searchTerm = document.getElementById("user-search").value.toLowerCase()
  const roleFilter = document.getElementById("user-role-filter").value
  const statusFilter = document.getElementById("user-status-filter").value

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm) ||
                         user.email.toLowerCase().includes(searchTerm)
    const matchesRole = !roleFilter || user.role === roleFilter
    const matchesStatus = !statusFilter || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  users = filteredUsers
  currentPage = 1
  renderUsers()
}

function changePage(delta) {
  const maxPage = Math.ceil(users.length / itemsPerPage)
  currentPage = Math.max(1, Math.min(currentPage + delta, maxPage))
  renderUsers()
}

function updatePagination() {
    const pageInfo = document.getElementById('page-info');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');

    if (!pageInfo || !prevBtn || !nextBtn) return;

    const filteredTopics = filterTopics();
    const totalPages = Math.ceil(filteredTopics.length / forumData.itemsPerPage);

    pageInfo.textContent = `Página ${forumData.currentPage} de ${totalPages}`;
    prevBtn.disabled = forumData.currentPage === 1;
    nextBtn.disabled = forumData.currentPage === totalPages || totalPages === 0;

    // Atualiza a exibição dos tópicos com base na página atual
    const startIndex = (forumData.currentPage - 1) * forumData.itemsPerPage;
    const endIndex = startIndex + forumData.itemsPerPage;
    const topicsToShow = filteredTopics.slice(startIndex, endIndex);

    const topicsContainer = document.querySelector('.forum-topics');
    if (!topicsContainer) return;

    topicsContainer.innerHTML = topicsToShow.map(topic => `
        <div class="topic-item" data-id="${topic.id}">
            <div class="topic-info">
                <h4>${topic.title}</h4>
                <div class="topic-meta">
                    <span class="topic-category">${topic.category.charAt(0).toUpperCase() + topic.category.slice(1)}</span>
                    <span class="topic-author">
                        <img src="${topic.avatar}" alt="${topic.author}" style="width: 24px; height: 24px; border-radius: 50%; margin-right: 8px;">
                        ${topic.author}
                    </span>
                    <span class="topic-date">
                        <i class="far fa-calendar-alt"></i>
                        ${formatDate(topic.date)}
                    </span>
                </div>
            </div>
            <div class="topic-stats">
                <span title="Respostas">
                    <i class="fas fa-comments"></i>
                    ${formatNumber(topic.replies)}
                </span>
                <span title="Visualizações">
                    <i class="fas fa-eye"></i>
                    ${formatNumber(topic.views)}
                </span>
            </div>
        </div>
    `).join('');

    // Reaplica os event listeners
    document.querySelectorAll('.topic-item').forEach(item => {
        item.addEventListener('click', () => {
            const topicId = item.dataset.id;
            showTopicDetails(topicId);
        });
    });
}

function changePage(delta) {
    const filteredTopics = filterTopics();
    const totalPages = Math.ceil(filteredTopics.length / forumData.itemsPerPage);
    const newPage = forumData.currentPage + delta;

    if (newPage >= 1 && newPage <= totalPages) {
        forumData.currentPage = newPage;
        updatePagination();
    }
}

function showAddUserModal() {
  // Implementar modal de adição de usuário
  console.log("Adicionar novo usuário")
}

function editUser(userId) {
  // Implementar edição de usuário
  console.log(`Editar usuário ${userId}`)
}

function deleteUser(userId) {
  if (confirm("Tem certeza que deseja excluir este usuário?")) {
    users = users.filter(user => user.id !== userId)
    renderUsers()
    showNotification("Usuário excluído com sucesso!", "success")
  }
}

// Sistema de Notificações
function showNotification(message, type = "info") {
  const notificationContainer = document.querySelector(".notification-container") || createNotificationContainer()
  
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  
  const icon = getNotificationIcon(type)
  
  notification.innerHTML = `
    <i class="${icon}"></i>
    <span class="notification-message">${message}</span>
    <button class="notification-close">
      <i class="fas fa-times"></i>
    </button>
  `
  
  notification.querySelector(".notification-close").addEventListener("click", () => {
    notification.classList.add("fade-out")
    setTimeout(() => notification.remove(), 300)
  })
  
  notificationContainer.appendChild(notification)
  
  setTimeout(() => {
    notification.classList.add("fade-out")
    setTimeout(() => notification.remove(), 300)
  }, 5000)
}

function createNotificationContainer() {
  const container = document.createElement("div")
  container.className = "notification-container"
  document.body.appendChild(container)
  return container
}

function getNotificationIcon(type) {
  const icons = {
    success: "fas fa-check-circle",
    error: "fas fa-exclamation-circle",
    warning: "fas fa-exclamation-triangle",
    info: "fas fa-info-circle"
  }
  return icons[type] || icons.info
}

// Estágios Management
function renderEstagios() {
  const container = document.getElementById("estagios-list")
  container.innerHTML = ""

  if (filteredEstagios.length === 0) {
    container.innerHTML = `
            <div class="card">
                <div class="card-content" style="text-align: center; padding: 3rem;">
                    <i class="fas fa-search" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--text-secondary); margin-bottom: 0.5rem;">Nenhum estágio encontrado</h3>
                    <p style="color: var(--text-muted);">Tente ajustar os filtros de busca</p>
                </div>
            </div>
        `
    return
  }

  filteredEstagios.forEach((estagio) => {
    const estagioCard = createEstagioCard(estagio)
    container.appendChild(estagioCard)
  })
}

function createEstagioCard(estagio) {
  const card = document.createElement("div")
  card.className = "estagio-card"

  const isFavorite = favoriteEstagios.has(estagio.id)
  const heartClass = isFavorite ? "heart-btn active" : "heart-btn"
  const heartIcon = isFavorite ? "fas fa-heart" : "far fa-heart"

  card.innerHTML = `
        <div class="estagio-header">
            <div class="estagio-title">
                <div class="estagio-info">
                    <h3>${estagio.instituicao}</h3>
                    <p class="estagio-area">${estagio.area}</p>
                </div>
                <div class="estagio-actions">
                    <button class="${heartClass}" onclick="toggleFavorite(${estagio.id})">
                        <i class="${heartIcon}"></i>
                    </button>
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        <span>${estagio.avaliacao}</span>
                        <span style="color: var(--text-muted); font-size: 0.875rem;">(${estagio.avaliacoes})</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="estagio-content">
            <p class="estagio-description">${estagio.descricao}</p>
            
            <div class="estagio-tags">
                ${estagio.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
            </div>
            
            <div class="estagio-details">
                <div class="estagio-detail">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${estagio.cidade}, ${estagio.estado}</span>
                </div>
                <div class="estagio-detail">
                    <i class="fas fa-clock"></i>
                    <span>${estagio.cargaHoraria}</span>
                </div>
                <div class="estagio-detail">
                    <i class="fas fa-dollar-sign"></i>
                    <span>${estagio.remuneracao}</span>
                </div>
                <div class="estagio-detail">
                    <i class="fas fa-graduation-cap"></i>
                    <span>${estagio.requisitos}</span>
                </div>
            </div>
            
            <div class="estagio-footer">
                <div>
                    ${estagio.contratacao ? '<span class="badge badge-success"><i class="fas fa-award"></i> Possível contratação</span>' : ""}
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn btn-secondary">Ver Detalhes</button>
                    <button class="btn btn-primary">Entrar em Contato</button>
                </div>
            </div>
        </div>
    `

  return card
}

function toggleFavorite(estagioId) {
  if (favoriteEstagios.has(estagioId)) {
    favoriteEstagios.delete(estagioId)
  } else {
    favoriteEstagios.add(estagioId)
  }

  // Salvar favoritos no localStorage
  localStorage.setItem("favoriteEstagios", JSON.stringify([...favoriteEstagios]))

  // Re-render apenas o card específico
  renderEstagios()

  // Mostrar feedback
  showNotification(
    favoriteEstagios.has(estagioId) ? "Estágio adicionado aos favoritos!" : "Estágio removido dos favoritos!",
  )
}

// Filtering
function filterEstagios() {
  const searchTerm = document.getElementById("search-input").value.toLowerCase()
  const selectedArea = document.getElementById("area-select").value
  const selectedCity = document.getElementById("city-select").value

  filteredEstagios = estagiosData.filter((estagio) => {
    const matchesSearch =
      estagio.instituicao.toLowerCase().includes(searchTerm) ||
      estagio.area.toLowerCase().includes(searchTerm) ||
      estagio.descricao.toLowerCase().includes(searchTerm)

    const matchesArea = !selectedArea || estagio.area.toLowerCase().includes(selectedArea)
    const matchesCity = !selectedCity || estagio.cidade.toLowerCase().includes(selectedCity.replace("-", " "))

    return matchesSearch && matchesArea && matchesCity
  })

  renderEstagios()
}

function buscarEstagios() {
  // Adicionar loading state
  const button = event.target
  const originalText = button.innerHTML
  button.innerHTML = '<i class="spinner"></i> Buscando...'
  button.disabled = true

  // Simular busca
  setTimeout(() => {
    filterEstagios()
    button.innerHTML = originalText
    button.disabled = false
    showNotification(`${filteredEstagios.length} estágios encontrados!`)
  }, 1000)
}

// Form Handling
function handleFormSubmit(event) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const data = Object.fromEntries(formData.entries())

  // Validação básica
  if (!data.instituicao || !data.area || !data.cidade || !data.cargaHoraria || !data.descricao) {
    showNotification("Por favor, preencha todos os campos obrigatórios!", "error")
    return
  }

  // Simular envio
  const submitButton = event.target.querySelector('button[type="submit"]')
  const originalText = submitButton.innerHTML
  submitButton.innerHTML = '<i class="spinner"></i> Cadastrando...'
  submitButton.disabled = true

  setTimeout(() => {
    showNotification("Estágio cadastrado com sucesso!", "success")
    event.target.reset()
    submitButton.innerHTML = originalText
    submitButton.disabled = false
    switchTab("buscar")
  }, 2000)
}

// Utility Functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function showNotification(message, type = "info") {
  // Criar elemento de notificação
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: var(--radius-lg);
        padding: 1rem 1.5rem;
        box-shadow: var(--shadow-lg);
        backdrop-filter: blur(12px);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `

  // Definir cor baseada no tipo
  if (type === "success") {
    notification.style.borderColor = "var(--primary-emerald)"
    notification.style.color = "var(--primary-emerald)"
  } else if (type === "error") {
    notification.style.borderColor = "#ef4444"
    notification.style.color = "#ef4444"
  } else {
    notification.style.borderColor = "var(--primary-teal)"
    notification.style.color = "var(--primary-teal)"
  }

  notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
            <span>${message}</span>
        </div>
    `

  document.body.appendChild(notification)

  // Animar entrada
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remover após 3 segundos
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Load favorites from localStorage
function loadFavorites() {
  const saved = localStorage.getItem("favoriteEstagios")
  if (saved) {
    favoriteEstagios = new Set(JSON.parse(saved))
  }
}

// Initialize favorites
loadFavorites()

const guidesData = [
    {
        id: 1,
        title: "Como se Candidatar",
        description: "Aprenda o passo a passo para se candidatar a uma vaga de estágio, desde a preparação do currículo até o envio da candidatura.",
        category: "Candidatura",
        icon: "fa-solid fa-file-lines",
        tag: "Iniciante",
        readTime: "5 min",
        lastUpdate: "2024-01-15",
        author: "João Silva"
    },
    {
        id: 2,
        title: "Preparação para Entrevista",
        description: "Dicas e truques essenciais para se destacar em entrevistas de estágio, incluindo as perguntas mais comuns e como respondê-las.",
        category: "Entrevista",
        icon: "fa-solid fa-comments",
        tag: "Intermediário",
        readTime: "8 min",
        lastUpdate: "2024-01-18",
        author: "Maria Santos"
    },
    {
        id: 3,
        title: "Documentos Necessários",
        description: "Lista completa e atualizada de todos os documentos necessários para formalizar seu estágio, com modelos e exemplos.",
        category: "Documentação",
        icon: "fa-solid fa-folder-open",
        tag: "Essencial",
        readTime: "6 min",
        lastUpdate: "2024-01-20",
        author: "Pedro Costa"
    },
    {
        id: 4,
        title: "Direitos do Estagiário",
        description: "Conheça todos os seus direitos como estagiário, incluindo remuneração, férias e benefícios previstos em lei.",
        category: "Legislação",
        icon: "fa-solid fa-scale-balanced",
        tag: "Importante",
        readTime: "10 min",
        lastUpdate: "2024-01-22",
        author: "Ana Oliveira"
    },
    {
        id: 5,
        title: "Networking Profissional",
        description: "Aprenda a construir e manter uma rede de contatos profissionais durante seu estágio para impulsionar sua carreira.",
        category: "Desenvolvimento",
        icon: "fa-solid fa-network-wired",
        tag: "Avançado",
        readTime: "7 min",
        lastUpdate: "2024-01-25",
        author: "Lucas Mendes"
    }
];

function renderGuides(guides = guidesData) {
    const guidesContainer = document.querySelector('.guides-grid');
    if (!guidesContainer) return;

    guidesContainer.innerHTML = guides.map(guide => `
        <div class="guide-card" data-category="${guide.category}">
            <div class="guide-icon">
                <i class="${guide.icon}"></i>
            </div>
            <div class="guide-content">
                <span class="guide-tag">${guide.tag}</span>
                <h4>${guide.title}</h4>
                <p>${guide.description}</p>
                <div class="guide-meta">
                    <span><i class="fa-regular fa-clock"></i>${guide.readTime}</span>
                    <span><i class="fa-regular fa-calendar"></i>${formatDate(guide.lastUpdate)}</span>
                    <span><i class="fa-regular fa-user"></i>${guide.author}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function setupGuidesFilters() {
    const searchInput = document.querySelector('.guides-search input');
    const categoryButtons = document.querySelectorAll('.category-btn');
    if (!searchInput || !categoryButtons.length) return;

    let activeCategory = 'Todos';

    const filterGuides = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredGuides = guidesData.filter(guide => {
            const matchesSearch = guide.title.toLowerCase().includes(searchTerm) ||
                                guide.description.toLowerCase().includes(searchTerm) ||
                                guide.author.toLowerCase().includes(searchTerm);
            const matchesCategory = activeCategory === 'Todos' || guide.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
        renderGuides(filteredGuides);
    };

    const debouncedFilter = debounce(filterGuides, 300);

    searchInput.addEventListener('input', debouncedFilter);

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            activeCategory = button.textContent.trim();
            filterGuides();
        });
    });

    // Initial render
    renderGuides();
}

// Smooth scrolling for internal links
document.addEventListener("click", (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }
})

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  // Ctrl/Cmd + K para focar na busca
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault()
    document.getElementById("search-input").focus()
  }

  // Esc para limpar busca
  if (e.key === "Escape") {
    const searchInput = document.getElementById("search-input")
    if (document.activeElement === searchInput) {
      searchInput.value = ""
      filterEstagios()
    }
  }
})

// Performance: Intersection Observer para lazy loading
const observerOptions = {
  root: null,
  rootMargin: "50px",
  threshold: 0.1,
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Observe all cards for animations
function observeCards() {
  document.querySelectorAll(".card, .estagio-card").forEach((card) => {
    observer.observe(card)
  })
}

// Call after rendering
setTimeout(observeCards, 100)
