// Base de dados de modelos atualizados por marca
const phoneModels = {
    "Apple (iPhone)": [
        "iPhone 16 / 16 Plus / 16 Pro / 16 Pro Max",
        "iPhone 15 / 15 Plus / 15 Pro / 15 Pro Max",
        "iPhone 14 / 14 Plus / 14 Pro / 14 Pro Max",
        "iPhone 13 / 13 mini / 13 Pro / 13 Pro Max",
        "iPhone 12 / 12 Pro / 12 Pro Max",
        "iPhone 11 / 11 Pro / 11 Pro Max",
        "iPhone XR / XS / XS Max / X",
        "iPhone 7 / 8 / SE (2ª e 3ª Geração)",
        "Outro modelo de iPhone"
    ],
    "Samsung": [
        "Galaxy S25 / S25+ / S25 Ultra",
        "Galaxy S24 / S24+ / S24 Ultra / S24 FE",
        "Galaxy S23 / S23+ / S23 Ultra / S23 FE",
        "Galaxy S22 / S21 / S20 (Linha S)",
        "Galaxy Z Fold 6 / Z Flip 6",
        "Galaxy Z Fold 5 / Z Flip 5",
        "Galaxy A55 / A54 / A35 / A25 (Linha A)",
        "Galaxy M55 / M54 / M34 (Linha M)",
        "Outro modelo Samsung"
    ],
    "Motorola": [
        "Motorola Edge 50 Ultra / Pro / Fusion / Neo",
        "Motorola Edge 40 / Edge 30",
        "Moto G85 / G54 / G34 / G24 / G14",
        "Moto G200 / G100 / G84",
        "Razr 50 / Razr 40 Ultra",
        "Moto E13 / E22 / E32",
        "Outro modelo Motorola"
    ],
    "Xiaomi": [
        "Xiaomi 14 / 14 Ultra / 13 / 13T",
        "Redmi Note 13 Pro / Note 13 5G / 13 4G",
        "Redmi Note 12 / Note 12 Pro",
        "POCO X6 Pro / POCO X6 / POCO X5 Pro",
        "POCO F6 Pro / POCO F5",
        "Redmi 13C / 12 / 10C",
        "Outro modelo Xiaomi"
    ],
    "Outra Marca": [
        "Asus Zenfone / ROG Phone",
        "Realme (Linha GT / C / Pro)",
        "Infinix",
        "LG / Nokia / Sony",
        "Outro modelo não listado"
    ]
};

// Inicializar Ícones Lucide
document.addEventListener('DOMContentLoaded', function() {
    if (window.lucide) {
        lucide.createIcons();
    }
});

// Elementos do Formulário
const brandSelect = document.getElementById('brandSelect');
const modelSelect = document.getElementById('modelSelect');
const problemSelect = document.getElementById('problemSelect');
const calcForm = document.getElementById('calcForm');

// Evento de Mudança na Marca -> Carrega os Modelos Dinamicamente
if (brandSelect && modelSelect) {
    brandSelect.addEventListener('change', function() {
        const selectedBrand = this.value;
        const models = phoneModels[selectedBrand] || [];

        // Limpa opções antigas
        modelSelect.innerHTML = '<option value="" disabled selected>Selecione o modelo...</option>';

        if (models.length > 0) {
            models.forEach(model => {
                const option = document.createElement('option');
                option.value = model;
                option.textContent = model;
                modelSelect.appendChild(option);
            });

            // Habilita o select de modelo
            modelSelect.disabled = false;
            modelSelect.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            modelSelect.disabled = true;
            modelSelect.classList.add('opacity-50', 'cursor-not-allowed');
        }
    });
}

// Envio Personalizado para o WhatsApp
if (calcForm) {
    calcForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const brand = brandSelect ? brandSelect.value || 'Não informada' : 'Não informada';
        const model = modelSelect ? modelSelect.value || 'Não informado' : 'Não informado';
        const problem = problemSelect ? problemSelect.value || 'Não informado' : 'Não informado';
        const userName = document.getElementById('userName').value.trim();
        const userPhone = document.getElementById('userPhone').value.trim();

        if (!userName || !userPhone) {
            alert('Por favor, preencha seu nome e número de telefone.');
            return;
        }

        if (!brand || !model || model === 'Selecione a marca primeiro...') {
            alert('Por favor, selecione a marca e o modelo do seu aparelho.');
            return;
        }

        if (!problem) {
            alert('Por favor, selecione o problema do seu aparelho.');
            return;
        }

        // Construção da mensagem estruturada para o WhatsApp
        const message = `🛠️ *SOLICITAÇÃO DE ORÇAMENTO - TECHFIX PRO*\n\n` +
                        `👤 *Cliente:* ${userName}\n` +
                        `📱 *Contato:* ${userPhone}\n` +
                        `🏷️ *Marca:* ${brand}\n` +
                        `📲 *Modelo:* ${model}\n` +
                        `🔧 *Problema:* ${problem}\n\n` +
                        `Olá! Enviei a minha solicitação e aguardo o orçamento. Obrigado!`;

        const whatsappNumber = "5511987488840";
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Redireciona para o WhatsApp em uma nova aba
        window.open(whatsappURL, '_blank');
    });
}