// Gerenciamento dos termos de estágio
const termsContent = `
    <h2>TERMO DE COMPROMISSO DE ESTÁGIO</h2>
    <p>Eu, ____________________________________________</p>
    <p>CPF: _______________________</p>
    <p>RA: _________________ acadêmico do Curso de Psicologia do Centro Universitário UniCuritiba, regularmente matriculado na disciplina de ________________________________________, assumo o compromisso de cumprir as condições abaixo referentes à realização das atividades de estágio.</p>
`;

// Função para carregar o conteúdo do termo
function loadTermsContent() {
    const termsPreview = document.getElementById('terms-preview');
    if (termsPreview) {
        termsPreview.innerHTML = termsContent;
    }
}

// Função para imprimir o termo
function printTerms() {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Termo de Compromisso de Estágio</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; padding: 40px; }
                    h2 { text-align: center; margin-bottom: 30px; }
                </style>
            </head>
            <body>
                ${termsContent}
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Função para baixar o termo em PDF
function downloadTerms() {
    // Aqui você pode implementar a geração do PDF usando uma biblioteca como jsPDF
    alert('Funcionalidade de download em PDF será implementada em breve.');
}

// Função para editar o termo
function editTerms() {
    const termsPreview = document.getElementById('terms-preview');
    const toolbar = document.getElementById('terms-toolbar');
    if (termsPreview && toolbar) {
        termsPreview.contentEditable = !termsPreview.isContentEditable;
        toolbar.style.display = termsPreview.isContentEditable ? 'flex' : 'none';
        const editButton = document.getElementById('edit-terms-btn');
        if (editButton) {
            if (termsPreview.isContentEditable) {
                editButton.innerHTML = '<i class="fas fa-save"></i> Salvar Alterações';
                editButton.style.backgroundColor = '#dc2626';
            } else {
                editButton.innerHTML = '<i class="fas fa-edit"></i> Editar Termo';
                editButton.style.backgroundColor = '';
                saveTermsChanges(termsPreview.innerHTML);
            }
        }
    }
}

// Função para formatar o texto
function formatText(command) {
    const termsPreview = document.getElementById('terms-preview');
    if (!termsPreview || !termsPreview.isContentEditable) return;

    switch (command) {
        case 'bold':
            document.execCommand('bold', false, null);
            break;
        case 'italic':
            document.execCommand('italic', false, null);
            break;
        case 'underline':
            document.execCommand('underline', false, null);
            break;
        case 'alignLeft':
            document.execCommand('justifyLeft', false, null);
            break;
        case 'alignCenter':
            document.execCommand('justifyCenter', false, null);
            break;
        case 'alignRight':
            document.execCommand('justifyRight', false, null);
            break;
        case 'alignJustify':
            document.execCommand('justifyFull', false, null);
            break;
        case 'indent':
            document.execCommand('indent', false, null);
            break;
        case 'outdent':
            document.execCommand('outdent', false, null);
            break;
    }

    // Atualiza o estado do botão
    const button = document.querySelector(`button[onclick="formatText('${command}')"]`);
    if (button) {
        const isActive = document.queryCommandState(command);
        button.classList.toggle('active', isActive);
    }
}

// Função para salvar as alterações do termo
function saveTermsChanges(content) {
    // Aqui você pode implementar o salvamento do conteúdo em um backend
    console.log('Alterações salvas:', content);
}

// Carregar o conteúdo do termo quando a página carregar
document.addEventListener('DOMContentLoaded', loadTermsContent);