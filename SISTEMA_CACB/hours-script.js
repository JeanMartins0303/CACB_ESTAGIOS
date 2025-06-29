// Armazenamento local das atividades e informações do aluno
let activities = JSON.parse(localStorage.getItem('internshipActivities')) || [];
let studentInfo = JSON.parse(localStorage.getItem('studentInfo')) || {
    name: '',
    ra: '',
    supervisor: '',
    semester: '',
    location: ''
};

// Função para salvar informações do aluno
function saveStudentInfo() {
    studentInfo = {
        name: document.getElementById('student-name').value,
        ra: document.getElementById('student-ra').value,
        supervisor: document.getElementById('supervisor-name').value,
        semester: document.getElementById('semester').value,
        location: document.getElementById('internship-location').value
    };
    localStorage.setItem('studentInfo', JSON.stringify(studentInfo));
}

// Função para carregar informações do aluno
function loadStudentInfo() {
    document.getElementById('student-name').value = studentInfo.name;
    document.getElementById('student-ra').value = studentInfo.ra;
    document.getElementById('supervisor-name').value = studentInfo.supervisor;
    document.getElementById('semester').value = studentInfo.semester;
    document.getElementById('internship-location').value = studentInfo.location;
}

// Função para adicionar uma nova entrada de atividade
function addActivityEntry() {
    const date = document.getElementById('activity-date').value;
    const description = document.getElementById('activity-description').value;
    const hours = parseFloat(document.getElementById('activity-hours').value);

    if (!date || !description || !hours) {
        showNotification('Por favor, preencha todos os campos', 'error');
        return;
    }

    const activity = {
        id: Date.now(),
        date,
        description,
        hours
    };

    activities.push(activity);
    saveActivities();
    renderActivities();
    updateTotalHours();
    clearForm();

    showNotification('Atividade registrada com sucesso!', 'success');
}

// Função para remover uma atividade
function removeActivity(id) {
    activities = activities.filter(activity => activity.id !== id);
    saveActivities();
    renderActivities();
    updateTotalHours();
    showNotification('Atividade removida com sucesso!', 'info');
}

// Função para editar uma atividade
function editActivity(id) {
    const activity = activities.find(a => a.id === id);
    if (!activity) return;

    document.getElementById('activity-date').value = activity.date;
    document.getElementById('activity-description').value = activity.description;
    document.getElementById('activity-hours').value = activity.hours;

    removeActivity(id);
}

// Função para salvar atividades no localStorage
function saveActivities() {
    localStorage.setItem('internshipActivities', JSON.stringify(activities));
}

// Função para renderizar a lista de atividades
function renderActivities() {
    const container = document.getElementById('activities-list');
    if (!container) return;

    container.innerHTML = '';
    
    const sortedActivities = [...activities].sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedActivities.forEach(activity => {
        const entry = document.createElement('div');
        entry.className = 'activity-entry';
        entry.innerHTML = `
            <div class="activity-date">${formatDate(activity.date)}</div>
            <div class="activity-description">${activity.description}</div>
            <div class="activity-hours">${activity.hours}h</div>
            <div class="activity-actions">
                <button class="btn btn-icon" onclick="editActivity(${activity.id})" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-icon btn-danger" onclick="removeActivity(${activity.id})" title="Remover">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        container.appendChild(entry);
    });
}

// Função para atualizar o total de horas
function updateTotalHours() {
    const totalHours = activities.reduce((sum, activity) => sum + activity.hours, 0);
    const totalElement = document.getElementById('total-hours');
    const progressElement = document.getElementById('hours-progress');

    if (totalElement) {
        totalElement.textContent = totalHours.toFixed(1);
    }

    if (progressElement) {
        const percentage = Math.min((totalHours / 80) * 100, 100);
        progressElement.style.width = `${percentage}%`;
    }
}

// Função para limpar o formulário
function clearForm() {
    document.getElementById('activity-date').value = '';
    document.getElementById('activity-description').value = '';
    document.getElementById('activity-hours').value = '';
}

// Função para formatar a data
function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

// Função para gerar relatório em PDF
function generateHoursReport() {
    const totalHours = activities.reduce((sum, a) => sum + a.hours, 0);
    const content = document.createElement('div');
    content.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="margin: 0;">PRONTUÁRIO ATENDIMENTO PSICOLÓGICO</h2>
            <h3 style="margin: 10px 0;">REGISTRO SIMPLIFICADO DOS ATENDIMENTOS</h3>
        </div>
        
        <div style="margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <div>Nome do Aluno: <strong>${studentInfo.name || '_________________________________'}</strong></div>
                <div>RA: <strong>${studentInfo.ra || '_______________'}</strong></div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <div>Supervisor: <strong>${studentInfo.supervisor || '_________________________________'}</strong></div>
                <div>Semestre: <strong>${studentInfo.semester || '_______________'}</strong></div>
            </div>
            <div style="margin-bottom: 10px;">
                <div>Local de Estágio: <strong>${studentInfo.location || '________________________________________________________'}</strong></div>
            </div>
        </div>

        <div style="margin-bottom: 20px;">
            <p style="margin-bottom: 10px;"><strong>Total de Horas Realizadas:</strong> ${totalHours.toFixed(1)} / 80 horas</p>
            <div style="width: 100%; height: 20px; background-color: #f0f0f0; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
                <div style="width: ${Math.min((totalHours / 80) * 100, 100)}%; height: 100%; background-color: #4CAF50;"></div>
            </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <thead>
                <tr>
                    <th style="border: 1px solid #000; padding: 8px; text-align: center; background-color: #f5f5f5;">Nº da Sessão</th>
                    <th style="border: 1px solid #000; padding: 8px; text-align: center; background-color: #f5f5f5;">Data</th>
                    <th style="border: 1px solid #000; padding: 8px; text-align: center; background-color: #f5f5f5;">Atividade realizada</th>
                    <th style="border: 1px solid #000; padding: 8px; text-align: center; background-color: #f5f5f5;">Horas</th>
                    <th style="border: 1px solid #000; padding: 8px; text-align: center; background-color: #f5f5f5;">Obs:</th>
                </tr>
            </thead>
            <tbody>
                ${activities.map((a, index) => `
                    <tr>
                        <td style="border: 1px solid #000; padding: 8px; text-align: center;">${index + 1}</td>
                        <td style="border: 1px solid #000; padding: 8px; text-align: center;">${formatDate(a.date)}</td>
                        <td style="border: 1px solid #000; padding: 8px;">${a.description}</td>
                        <td style="border: 1px solid #000; padding: 8px; text-align: center;">${a.hours}h</td>
                        <td style="border: 1px solid #000; padding: 8px;"></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>

        <div style="display: flex; justify-content: space-between; margin-top: 50px;">
            <div style="text-align: center; flex: 1;">
                <p style="border-top: 1px solid #000; padding-top: 10px; margin: 0 20px;">Assinatura do(a) Aluno(a)</p>
            </div>
            <div style="text-align: center; flex: 1;">
                <p style="border-top: 1px solid #000; padding-top: 10px; margin: 0 20px;">Assinatura do(a) Professor(a)</p>
            </div>
        </div>
    `;

    const style = `
        <style>
            body { font-family: Arial, sans-serif; }
            h2 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f5f5f5; }
        </style>
    `;

    const win = window.open('', '_blank');
    win.document.write(`<html><head>${style}</head><body>${content.innerHTML}</body></html>`);
    win.document.close();
    win.print();
}

// Função para imprimir relatório
function printHoursReport() {
    generateHoursReport();
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderActivities();
    updateTotalHours();
    loadStudentInfo();

    // Definir a data atual como padrão no campo de data
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('activity-date').value = today;

    // Adicionar eventos para salvar informações do aluno
    const studentInfoInputs = ['student-name', 'student-ra', 'supervisor-name', 'semester', 'internship-location'];
    studentInfoInputs.forEach(id => {
        document.getElementById(id).addEventListener('change', saveStudentInfo);
    });
});