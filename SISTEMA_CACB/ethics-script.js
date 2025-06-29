// Armazenamento local do PDF do Código de Ética
let ethicsDocument = localStorage.getItem('ethicsDocument') || null;

// Função para fazer upload do PDF
function handleEthicsUpload(event) {
    const file = event.target.files[0];
    if (!file || file.type !== 'application/pdf') {
        showNotification('Por favor, selecione um arquivo PDF válido', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        ethicsDocument = e.target.result;
        localStorage.setItem('ethicsDocument', ethicsDocument);
        updateEthicsPreview();
        showNotification('Código de Ética atualizado com sucesso!', 'success');
    };
    reader.readAsDataURL(file);
}

// Função para atualizar a visualização do PDF
function updateEthicsPreview() {
    const previewContainer = document.getElementById('ethics-preview');
    if (!ethicsDocument) {
        previewContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-file-pdf fa-3x"></i>
                <p>Nenhum documento carregado</p>
                <p class="hint">Faça upload do Código de Ética em PDF</p>
            </div>
        `;
        return;
    }

    previewContainer.innerHTML = `
        <iframe src="${ethicsDocument}" type="application/pdf" width="100%" height="600px"></iframe>
    `;
}

// Função para baixar o PDF
function downloadEthicsDocument() {
    if (!ethicsDocument) {
        showNotification('Nenhum documento disponível para download', 'error');
        return;
    }

    const link = document.createElement('a');
    link.href = ethicsDocument;
    link.download = 'codigo_de_etica_psicologia.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    updateEthicsPreview();

    // Configurar o evento de upload apenas para administradores
    const uploadInput = document.getElementById('ethics-upload');
    if (uploadInput) {
        uploadInput.addEventListener('change', handleEthicsUpload);
    }
});