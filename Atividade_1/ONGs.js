// Objeto de configuração do Tailwind CSS
tailwind.config = {
    theme: {
        extend: {
            // Requisito: Paleta de Cores (Mínimo 8 cores)
            colors: {
                'ong-primary': '#10b981',      // Cor primária (Verde Esmeralda): Confiança
                'ong-secondary': '#3b82f6',    // Cor secundária (Azul): Comunicação e Ação
                'ong-neutral-100': '#f3f4f6',  // Neutra clara: Fundo de containers
                'ong-neutral-800': '#1f2937',  // Neutra escura: Texto principal
                'ong-success': '#059669',      // Feedback Positivo
                'ong-warning': '#f59e0b',      // Alerta
                'ong-danger': '#ef4444',       // Ações críticas
                'ong-info': '#6366f1',         // Informação e Links
            },
            // Requisito: Tipografia Hierárquica (Mínimo 5 tamanhos - a escala padrão já atende, mas estendemos)
            fontSize: {
                'xs': '.75rem',     // 12px
                'sm': '.875rem',    // 14px
                'base': '1rem',     // 16px (Padrão)
                'lg': '1.125rem',   // 18px
                'xl': '1.25rem',    // 20px
                '2xl': '1.5rem',
                '3xl': '1.875rem',
                '4xl': '2.25rem',
                '5xl': '3rem',
            },
            // Requisito: Sistema de Espaçamento Modular (8px, 16px, 24px, etc.)
            // Adiciona aliases para espaçamentos específicos da escala de 8px (base 0.25rem/4px do Tailwind)
            spacing: {
                'xs': '8px',
                'sm': '16px',
                'md': '24px',
                'lg': '32px',
                'xl': '48px',
                '2xl': '64px',
            },
            // Requisito: 5 Breakpoints Responsivos (Tailwind já possui sm, md, lg, xl, 2xl)
        }
    }
}
/* ---------------------------------------------------------------------- */
/* JS MODULAR - DADOS E ESTADO DA APLICAÇÃO (MODEL) */
/* ---------------------------------------------------------------------- */
// Dados simulados da aplicação (substituiria o banco de dados/API)
const data = {
    profile: 'doador', // Perfil inicial
    projects: [ // Simulação de Gestão de Projetos
        { id: 1, title: 'Educação para o Futuro', impact: 'Fornce material escolar para 500 crianças. Meta de 150 voluntários.', category: 'Educação', needs: 'Materiais, Tutores', status: 'Ativo' },
        { id: 2, title: 'Saúde Comunitária', impact: 'Campanhas de vacinação e consultas básicas gratuitas. Meta de 50 médicos voluntários.', category: 'Saúde', needs: 'Médicos, Medicamentos', status: 'Ativo' },
        { id: 3, title: 'Inclusão Digital', impact: 'Cursos de informática para 200 jovens e adultos. Meta de 20 computadores.', category: 'Tecnologia', needs: 'Computadores, Instrutores', status: 'Concluído' },
    ],
    volunteers: [ // Simulação de Voluntários cadastrados
        { id: 1, name: 'João Silva', area: 'Tutoria', hours: 45, status: 'Pendente' },
        { id: 2, name: 'Maria Santos', area: 'Saúde', hours: 120, status: 'Aprovado' },
    ],
    donation: { // Simulação de Captação de Recursos
        target: 50000, // Meta de arrecadação
        raised: 12500 // Valor arrecadado atual
    }
};
// Variável de estado global para rastrear o perfil atual
let currentProfile = data.profile;
/* ---------------------------------------------------------------------- */
/* JS MODULAR - FUNÇÕES DE UTILIDADE E ACESSIBILIDADE */
/* ---------------------------------------------------------------------- */
/**
 * Requisito: Desempenho - Simula a barra de carregamento.
 */
function simulateLoading() {
    const bar = document.getElementById('loading-bar'); // Obtém a barra
    bar.style.width = '100%'; // Move a barra para 100%
    setTimeout(() => {
        bar.style.display = 'none'; // Esconde a barra após o carregamento
    }, 500); // 500ms é o tempo da transição CSS, garantindo rapidez
}
/**
 * Requisito: Acessibilidade - Alterna o modo de alto contraste.
 */
function toggleContrast() {
    // Alterna a classe 'high-contrast' no corpo do documento
    document.body.classList.toggle('high-contrast');
    const isHighContrast = document.body.classList.contains('high-contrast');
    // Define a mensagem do modal
    const message = isHighContrast
        ? 'Modo de Alto Contraste Ativado (WCAG 2.1 AA).'
        : 'Modo de Alto Contraste Desativado.';
    // Exibe feedback no modal
    showModal('Acessibilidade', message, 'ong-info');
}
/**
 * Requisito: Componentes de Feedback - Exibe Modal.
 * @param {string} title - Título da mensagem.
 * @param {string} message - Corpo da mensagem.
 * @param {string} colorClass - Cor de destaque (ex: 'ong-success', 'ong-danger').
 */
function showModal(title, message, colorClass = 'ong-primary') {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-message').textContent = message;
    
    const titleEl = document.getElementById('modal-title');
    const buttonEl = document.querySelector('#modal-feedback button');
    
    // Lógica para limpar e aplicar a cor correta dinamicamente
    ['ong-primary', 'ong-success', 'ong-danger', 'ong-info'].forEach(c => {
        titleEl.classList.remove(`text-${c}`);
        buttonEl.classList.remove(`bg-${c}`, `hover:bg-${c}`);
    });
    titleEl.classList.add(`text-${colorClass}`);
    buttonEl.classList.add(`bg-${colorClass}`, `hover:bg-${colorClass.replace('-500', '-600')}`);
    document.getElementById('modal-feedback').classList.remove('hidden');
    document.getElementById('modal-feedback').classList.add('flex');
    document.getElementById('modal-feedback').focus(); // Foco para leitores de tela
}
/**
 * Fecha o modal de feedback.
 */
function closeModal() {
    document.getElementById('modal-feedback').classList.remove('flex');
    document.getElementById('modal-feedback').classList.add('hidden');
}
/**
 * Altera o perfil de visualização e renderiza o conteúdo.
 * @param {string} profile - O perfil a ser ativado ('doador', 'voluntario', 'admin').
 */
function changeProfile(profile) {
    currentProfile = profile; // Atualiza o estado global
    // Renderiza a página apropriada para o novo perfil
    renderContent(profile === 'doador' ? 'institucional' : profile);
    showModal('Perfil Alterado', `Visualizando a plataforma como: ${profile.toUpperCase()}`, 'ong-info');
}
/* ---------------------------------------------------------------------- */
/* JS MODULAR - MANIPULAÇÃO DO DOM E SPA BÁSICO */
/* ---------------------------------------------------------------------- */
/**
 * Requisito: Implementa sistema SPA Básico - Carrega conteúdo dinamicamente.
 * @param {string} page - A chave da página a ser renderizada.
 */
function renderContent(page) {
    const container = document.getElementById('content-dynamic'); // Container principal
    if (!container) return; // Garante que o container existe
    document.getElementById('mobile-menu').classList.add('hidden'); // Esconde o menu mobile
    let htmlContent = ''; // Variável para armazenar o HTML da view
    // Lógica de roteamento baseada na página e perfil
    switch (page) {
        case 'institucional':
        case 'projetos':
        case 'doacao':
            htmlContent = templates.doador[page](); // Páginas do Doador/Visitante
            break;
        case 'voluntario':
            htmlContent = templates.voluntario(); // Página do Voluntário
            break;
        case 'admin':
            htmlContent = templates.admin(); // Página do Administrador
            break;
        default:
            htmlContent = templates.doador.institucional(); // Fallback
    }
    container.innerHTML = htmlContent; // Injeta o HTML no DOM
    
    // Chamadas de funções pós-renderização
    if (page === 'doacao' || page === 'institucional') updateDonationProgress(); // Atualiza barra de progresso
    if (page === 'admin') renderAdminDashboard(); // Renderiza dados administrativos
    if (page === 'voluntario') renderVolunteerOpportunities(); // Renderiza oportunidades
    
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scrolla para o topo
}
/* ---------------------------------------------------------------------- */
/* JS MODULAR - SISTEMA DE TEMPLATES JAVASCRIPT */
/* ---------------------------------------------------------------------- */
// Objeto que contém todas as funções de template (Requisito: Sistema de templates JavaScript)
const templates = {
    // Templates para Doador/Visitante
    doador: {
        // Template para a página institucional (Home)
        institucional: () => `
            <section id="institucional" class="mb-xl">
                <h2 class="text-4xl font-extrabold text-center mb-lg text-ong-neutral-800">Nossa Missão e Transparência</h2>
                <!-- Requisito: Layouts Específicos - Grid 3 colunas para Info Institucional -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
                    ${templates.components.infoCard('Missão e Valores', 'Promover a educação e a saúde em comunidades carentes, transformando vidas através do acesso a direitos básicos e oportunidades.', 'ong-primary')}
                    ${templates.components.infoCard('Histórico e Conquistas', 'Desde 2010, impactamos mais de 50.000 pessoas e construímos 3 bibliotecas comunitárias. Nossa equipe conta com 15 funcionários e 300 voluntários ativos.', 'ong-secondary')}
                    ${templates.components.infoCard('Central de Documentos', 'Baixe nosso último relatório e veja como seus recursos estão sendo aplicados. Transparência é nosso valor principal.', 'ong-info')}
                </div>
            </section>
            ${templates.doador.projetos()} <!-- Inclui o template de projetos abaixo -->
            <section id="capitacao" class="mb-xl">
                ${templates.doador.doacao()} <!-- Inclui o template de doação -->
            </section>
        `,
        
        // Template para a seção de projetos
        projetos: () => `
            <section id="projetos" class="mb-xl">
                <h2 class="text-4xl font-extrabold text-center mb-lg text-ong-neutral-800">Projetos Atuais</h2>
                <!-- Requisito: Componentes de Interface - Cards Responsivos (Grid) -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
                    ${data.projects.filter(p => p.status === 'Ativo').map(templates.components.projectCard).join('')}
                </div>
                <h3 class="text-2xl font-bold mt-xl mb-md">Comunicação e Transparência (Blog)</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
                    ${templates.components.blogCard('Grande Conquista: Inauguramos a 4ª Biblioteca', '05/09/2025', 'ong-primary')}
                    ${templates.components.blogCard('Convocação: Precisamos de Voluntários para Saúde', '28/10/2025', 'ong-secondary')}
                </div>
            </section>
        `,
        // Template para a seção de doação e captação de recursos
        doacao: () => `
            <section id="doacao" class="text-center p-xl bg-ong-secondary bg-opacity-10 rounded-xl shadow-lg">
                <h2 class="text-3xl font-bold mb-md text-ong-neutral-800">Campanha: Futuro Melhor</h2>
                <p class="text-lg text-gray-700 mb-lg">Acompanhe a meta e faça sua doação online.</p>
                
                <!-- Progresso e Metas em Tempo Real (Simulado) -->
                <div class="max-w-xl mx-auto">
                    <div class="flex justify-between mb-sm text-ong-neutral-800 font-bold">
                        <span id="arrecadado">R$ 0</span>
                        <span id="meta">Meta: R$ ${data.donation.target.toLocaleString('pt-BR')}</span>
                    </div>
                    <div class="w-full bg-gray-300 rounded-full h-3 mb-lg">
                        <!-- Barra de progresso visual -->
                        <div id="progresso-bar" class="bg-ong-primary h-3 rounded-full" style="width: 0%;" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="${data.donation.target}" aria-label="Progresso da Campanha"></div>
                    </div>
                    
                    <!-- Formulário de Doações -->
                    <form onsubmit="handleDonation(event)" class="bg-white p-lg rounded-xl shadow-md space-y-md">
                        <h3 class="text-xl font-semibold mb-sm">Realizar Doação Online</h3>
                        <label for="valor-doacao" class="sr-only">Valor da Doação (R$)</label>
                        <input type="number" id="valor-doacao" placeholder="Valor Mínimo R$ 10" min="10" max="10000" required
                            class="input-styled" aria-required="true" oninput="validateDonation(this)">
                        
                        <!-- Feedback de Validação (Requisito: Aviso de preenchimento incorreto) -->
                        <p id="validation-error" class="text-ong-danger text-sm text-left hidden" role="alert">O valor deve ser entre R$ 10 e R$ 10.000.</p>
                        
                        <!-- Botões de atalho (Usa Flexbox) -->
                        <div class="flex gap-sm">
                            <button type="button" onclick="setDonationValue(25)" class="btn-preset">R$ 25</button>
                            <button type="button" onclick="setDonationValue(50)" class="btn-preset">R$ 50</button>
                            <button type="button" onclick="setDonationValue(100)" class="btn-preset">R$ 100</button>
                        </div>
                        <!-- Botão de Submissão (Inicialmente desabilitado) -->
                        <button type="submit" id="donate-submit-btn" class="btn-primary w-full bg-ong-primary hover:bg-ong-success disabled:opacity-50" disabled>Doar Agora</button>
                    </form>
                </div>
            </section>
        `,
    },
    
    // Template para Voluntário
    voluntario: () => `
        <section id="voluntariado-portal" class="grid lg:grid-cols-3 gap-lg">
            <div class="lg:col-span-2 bg-white p-xl rounded-xl shadow-lg border-t-4 border-ong-secondary">
                <h2 class="text-4xl font-extrabold mb-lg text-ong-secondary">Portal do Voluntário</h2>
                <h3 class="text-2xl font-bold mb-md">Oportunidades de Voluntariado</h3>
                <!-- Lista de oportunidades renderizada dinamicamente -->
                <div id="oportunidades-list" class="space-y-md">
                    ${data.projects.filter(p => p.status === 'Ativo').map(templates.components.opportunityCard).join('')}
                </div>
            </div>
            
            <!-- Painel Lateral do Voluntário (Meu Painel) -->
            <aside class="bg-ong-info bg-opacity-10 p-xl rounded-xl shadow-lg border-l-4 border-ong-info">
                <h3 class="text-2xl font-bold mb-md text-ong-info">Meu Histórico</h3>
                <p class="mb-sm text-gray-700 font-semibold">Total de Horas Contribuídas: <span class="text-3xl font-extrabold text-ong-secondary">${data.volunteers[0].hours}h</span></p>
                
                <div class="mt-lg border-t pt-md border-ong-info">
                    <h4 class="font-bold mb-sm">Certificados Digitais</h4>
                    <ul class="space-y-sm text-sm">
                        <li class="p-sm bg-white rounded-md flex justify-between items-center">
                            Projeto Futuro (45h)
                            <button class="btn-primary bg-ong-info text-xs">Baixar Certificado</button>
                        </li>
                        <li class="p-sm bg-white rounded-md flex justify-between items-center bg-yellow-100/50">
                            Saúde Comunitária
                            <span class="badge bg-ong-warning text-gray-800">Em Curso</span>
                        </li>
                    </ul>
                </div>
            </aside>
        </section>
    `,
    
    // Template para Administrador
    admin: () => `
        <section id="admin-dashboard" class="grid lg:grid-cols-4 gap-lg">
            <!-- Coluna de Métricas e Cadastros (Ocupa 3 colunas em desktop) -->
            <div class="lg:col-span-3 space-y-lg">
                <h2 class="text-4xl font-extrabold mb-lg text-ong-danger">Painel de Administração</h2>
                
                <!-- Grid para Métricas Rápidas -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-md">
                    ${templates.components.metricCard('Voluntários Ativos', data.volunteers.filter(v => v.status === 'Aprovado').length, 'ong-info')}
                    ${templates.components.metricCard('Projetos Ativos', data.projects.filter(p => p.status === 'Ativo').length, 'ong-secondary')}
                    ${templates.components.metricCard('Receita Mês (R$)', data.donation.raised.toLocaleString('pt-BR'), 'ong-primary')}
                    ${templates.components.metricCard('Arrecadação Total', data.donation.raised.toLocaleString('pt-BR'), 'ong-warning')}
                </div>
                <!-- Gestão de Projetos (Cadastrar e editar) -->
                <div class="bg-white p-lg rounded-xl shadow-lg border-t-4 border-ong-danger">
                    <h3 class="text-2xl font-bold mb-md text-ong-danger">Cadastro de Projetos</h3>
                    <form onsubmit="addProject(event)" class="space-y-md">
                        <input type="text" id="admin-project-title" placeholder="Título do Projeto" required class="input-styled">
                        <textarea id="admin-project-impacto" placeholder="Indicadores de Impacto e Resultados" required class="input-styled h-24"></textarea>
                        <select id="admin-project-category" class="input-styled">
                            <option value="">Selecione a Categoria</option>
                            <option value="Educação">Educação</option>
                            <option value="Saúde">Saúde</option>
                            <option value="Tecnologia">Tecnologia</option>
                        </select>
                        <button type="submit" class="btn-primary bg-ong-danger hover:bg-red-600 w-full">Cadastrar Projeto</button>
                    </form>
                </div>
            </div>
            <!-- Gestão de Voluntários (Coluna Lateral, Ocupa 1 coluna em desktop) -->
            <aside class="lg:col-span-1 bg-white p-lg rounded-xl shadow-lg border-l-4 border-ong-danger">
                <h3 class="text-2xl font-bold mb-md text-ong-danger">Aprovação de Voluntários</h3>
                <p class="text-sm text-gray-600 mb-md">Candidatos pendentes de aprovação:</p>
                <div id="admin-volunteer-list" class="space-y-sm">
                    <!-- Lista renderizada dinamicamente por JS (Função renderAdminDashboard) -->
                </div>
            </aside>
        </section>
    `,
    // Componentes reutilizáveis
    components: {
        /** Card de informações institucionais. */
        infoCard: (title, content, color) => `
            <article class="p-md bg-white rounded-xl shadow-lg border-t-4 border-${color} hover:shadow-xl transition-shadow" role="article">
                <h3 class="text-xl font-bold text-${color} mb-sm">${title}</h3>
                <p class="text-gray-600 text-sm">${content}</p>
            </article>
        `,
        
        /** Card de projeto para o Doador/Visitante. */
        projectCard: (project) => `
            <article class="bg-white p-md rounded-xl shadow-lg border-l-4 border-ong-secondary hover:shadow-xl transition-shadow" role="article">
                <div class="flex justify-between items-start mb-sm">
                    <h3 class="text-lg font-bold text-ong-neutral-800">${project.title}</h3>
                    <!-- Requisito: Badges e Tags -->
                    <span class="badge bg-ong-primary text-white">${project.category}</span>
                </div>
                <p class="text-gray-600 text-sm mb-sm">${project.impact}</p>
                <p class="text-xs font-semibold text-ong-info">Necessidades: ${project.needs}</p>
                <a href="#" class="text-ong-secondary hover:text-ong-info mt-sm inline-block text-sm font-semibold">Ver Mais &rarr;</a>
            </article>
        `,
        
        /** Card de notícias/blog. */
        blogCard: (title, date, color) => `
            <article class="bg-white p-md rounded-xl shadow-lg border-l-4 border-${color}" role="article">
                <span class="text-xs text-gray-500 block mb-sm">${date}</span>
                <h3 class="text-lg font-bold mb-sm">${title}</h3>
                <a href="#" class="text-${color} hover:underline text-sm">Leia Mais</a>
            </article>
        `,
        
        /** Card de oportunidade para o Voluntário. */
        opportunityCard: (project) => `
            <div class="p-md border border-gray-200 rounded-lg bg-ong-neutral-100 hover:shadow-md transition-shadow">
                <h4 class="text-xl font-bold text-ong-primary mb-sm">${project.title}</h4>
                <p class="text-sm text-gray-700 mb-sm">Função Principal: ${project.needs.split(',')[0]}</p>
                <button class="btn-primary mt-sm bg-ong-secondary hover:bg-blue-600 text-sm" onclick="applyVolunteer(${project.id})">Candidatar-se Agora</button>
            </div>
        `,
        
        /** Card de métrica para o Admin. */
        metricCard: (title, value, color) => `
            <div class="bg-white p-md rounded-xl shadow-lg border-l-4 border-${color}">
                <p class="text-sm text-gray-500">${title}</p>
                <p class="text-3xl font-bold text-${color} mt-sm">${value}</p>
            </div>
        `
    }
};
/* ---------------------------------------------------------------------- */
/* JS MODULAR - FUNCIONALIDADES ESPECÍFICAS (CONTROLLER) */
/* ---------------------------------------------------------------------- */
/**
 * Requisito: Sistema de verificação de consistência de dados em formulários.
 * Valida o campo de doação em tempo real.
 * @param {HTMLInputElement} input - O elemento input.
 */
function validateDonation(input) {
    const value = parseFloat(input.value); // Converte o valor para número
    const min = 10;
    const max = 10000;
    const errorElement = document.getElementById('validation-error');
    const submitBtn = document.getElementById('donate-submit-btn');
    // Verifica se o valor está fora do intervalo ou não é um número válido
    if (isNaN(value) || value < min || value > max) {
        errorElement.classList.remove('hidden'); // Mostra a mensagem de erro
        input.classList.add('border-ong-danger'); // Adiciona destaque visual de erro
        submitBtn.disabled = true; // Desabilita o botão
    } else {
        errorElement.classList.add('hidden'); // Esconde a mensagem de erro
        input.classList.remove('border-ong-danger'); // Remove destaque visual
        submitBtn.disabled = false; // Habilita o botão
    }
}
/**
 * Lida com o envio do formulário de doação.
 */
function handleDonation(event) {
    event.preventDefault(); // Impede o recarregamento da página
    const input = document.getElementById('valor-doacao');
    const value = parseFloat(input.value);
    // Revalidação final
    if (value >= 10 && value <= 10000) {
        data.donation.raised += value; // Atualiza o valor arrecadado
        updateDonationProgress(); // Atualiza o display visual
        showModal('Doação Confirmada', `Obrigado! Sua doação de R$ ${value.toFixed(2)} foi um sucesso e será aplicada em nossos projetos.`, 'ong-success');
        input.value = ''; // Limpa o campo
        document.getElementById('donate-submit-btn').disabled = true; // Desabilita o botão
    } else {
        showModal('Erro na Doação', 'Por favor, insira um valor válido entre R$ 10 e R$ 10.000.', 'ong-danger');
    }
}
/**
 * Atualiza a barra de progresso da doação.
 */
function updateDonationProgress() {
    const { raised, target } = data.donation;
    const percentage = Math.min((raised / target) * 100, 100); // Calcula a porcentagem
    const progBar = document.getElementById('progresso-bar');
    const arrecadadoEl = document.getElementById('arrecadado');
    
    if (progBar) {
        progBar.style.width = `${percentage.toFixed(2)}%`; // Aplica a largura na barra CSS
        progBar.setAttribute('aria-valuenow', raised); // Atualiza o valor para acessibilidade
    }
    if (arrecadadoEl) {
        arrecadadoEl.textContent = `R$ ${raised.toLocaleString('pt-BR')}`; // Atualiza o texto
    }
}
/**
 * Define o valor de doação predefinido.
 */
function setDonationValue(value) {
    const input = document.getElementById('valor-doacao');
    input.value = value; // Define o valor
    validateDonation(input); // Valida e habilita o botão
}
/**
 * Lida com o cadastro de um novo projeto (Admin).
 */
function addProject(event) {
    event.preventDefault();
    // Coleta os dados do formulário
    const title = document.getElementById('admin-project-title').value;
    const impact = document.getElementById('admin-project-impacto').value;
    const category = document.getElementById('admin-project-category').value;
    if (title && impact && category) {
        // Cria o novo objeto de projeto
        const newProject = {
            id: data.projects.length + 1,
            title: title,
            impact: impact,
            category: category,
            needs: 'Defina as necessidades',
            status: 'Ativo'
        };
        data.projects.push(newProject); // Adiciona ao modelo de dados
        showModal('Sucesso!', `Projeto "${title}" cadastrado.`, 'ong-success');
        
        event.target.reset(); // Limpa o formulário
        renderAdminDashboard(); // Re-renderiza o painel para refletir a mudança
    } else {
        showModal('Erro de Cadastro', 'Por favor, preencha todos os campos do projeto.', 'ong-danger');
    }
}
/**
 * Lida com a aplicação de um voluntário a um projeto.
 */
function applyVolunteer(projectId) {
    const project = data.projects.find(p => p.id === projectId);
    showModal('Candidatura Enviada', `Você se candidatou ao projeto: ${project.title}. Agradecemos seu interesse!`, 'ong-info');
}
/**
 * Renderiza a lista de voluntários pendentes no Painel do Administrador.
 */
function renderAdminDashboard() {
    const list = document.getElementById('admin-volunteer-list');
    if (!list) return;
    // Filtra e mapeia os voluntários para o HTML de exibição
    list.innerHTML = data.volunteers.map(volunteer => `
        <div class="p-sm bg-ong-neutral-100 rounded-lg flex justify-between items-center text-sm">
            <span>${volunteer.name} (${volunteer.area})</span>
            ${volunteer.status === 'Pendente' 
                // Botão para aprovar (simulado)
                ? `<button class="btn-primary bg-ong-danger hover:bg-red-600 text-xs" onclick="updateVolunteerStatus(${volunteer.id}, 'Aprovado')">Aprovar</button>`
                // Badge para voluntários já aprovados
                : `<span class="badge bg-ong-success text-white">Aprovado</span>`
            }
        </div>
    `).join('');
    
    // Atualiza a métrica de voluntários ativos no painel
    const activeVolunteersCount = data.volunteers.filter(v => v.status === 'Aprovado').length;
    document.querySelector('#admin-dashboard .grid-cols-4 div:first-child p:last-child').textContent = activeVolunteersCount;
}
/**
 * Simula a aprovação de um voluntário (apenas alterando o modelo de dados).
 */
function updateVolunteerStatus(volunteerId, newStatus) {
    const volunteer = data.volunteers.find(v => v.id === volunteerId);
    if (volunteer) {
        volunteer.status = newStatus; // Atualiza o status
        renderAdminDashboard(); // Re-renderiza a lista
        showModal('Ação Administrativa', `Voluntário ${volunteer.name} foi ${newStatus.toLowerCase()}.`, 'ong-success');
    }
}
/* ---------------------------------------------------------------------- */
/* JS MODULAR - FUNÇÃO DE INICIALIZAÇÃO */
/* ---------------------------------------------------------------------- */
/**
 * Inicializa o aplicativo após o carregamento do DOM.
 */
function initApp() {
    simulateLoading(); // Executa a simulação de carregamento
    renderContent('institucional'); // Carrega a view inicial (Institucional)
    // Listener para o menu hamburguer (navegação mobile)
    document.getElementById('menu-button').addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    });
    
    // Requisito: Acessibilidade - Fechar modal com tecla ESC
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('modal-feedback');
        // Verifica se a tecla é ESC e se o modal está visível
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}