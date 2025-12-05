// app.js - Módulo principal da aplicação
// Precifica MEI Pro - Brayan Contabilidade

class PrecificaApp {
    constructor() {
        // Dados principais da aplicação
        this.dados = {
            empresa: {},
            produto: {},
            custos: {},
            precificacao: {},
            mercado: {},
            resultados: {},
            projecoes: {},
            recomendacoes: {},
            config: {
                darkMode: localStorage.getItem('darkMode') === 'true',
                moeda: 'BRL',
                unidadeMedida: 'unidade'
            }
        };
        
        this.modulos = {};
        this.tabAtual = 'dashboard';
        this.graficos = null;
        this.initialized = false;
    }
    
    // Inicialização principal
    async init() {
        try {
            console.log('🚀 Iniciando Precifica MEI Pro...');
            
            // 1. Carregar dados salvos
            this.carregarDadosSalvos();
            
            // 2. Aplicar tema (dark/light)
            this.aplicarTema();
            
            // 3. Inicializar módulos
            this.inicializarModulos();
            
            // 4. Configurar navegação
            this.inicializarNavegacao();
            
            // 5. Configurar eventos globais
            this.inicializarEventosGlobais();
            
            // 6. Inicializar dashboard
            await this.inicializarDashboard();
            
            // 7. Verificar se há dados incompletos
            this.verificarDadosIncompletos();
            
            this.initialized = true;
            console.log('✅ Precifica MEI Pro inicializado com sucesso!');
            
        } catch (error) {
            console.error('❌ Erro na inicialização:', error);
            this.mostrarToast('Erro ao inicializar a aplicação', 'error');
        }
    }
    
    // Inicializar todos os módulos
    inicializarModulos() {
        console.log('📦 Inicializando módulos...');
        
        // Ordem de inicialização importante
        this.modulos.dados = new ModuloDados(this);
        this.modulos.custos = new ModuloCustos(this);
        this.modulos.precificacao = new ModuloPrecificacao(this);
        this.modulos.mercado = new ModuloMercado(this);
        this.modulos.resultados = new ModuloResultados(this);
        this.modulos.projecoes = new ModuloProjecoes(this);
        this.modulos.exportacao = new ModuloExportacao(this);
        
        // Inicializar gráficos se Chart.js estiver disponível
        if (typeof Chart !== 'undefined') {
            this.modulos.graficos = new ModuloGraficos(this);
        }
    }
    
    // Carregar dados do localStorage
    carregarDadosSalvos() {
        try {
            const dadosSalvos = localStorage.getItem('precificaMeiDados');
            if (dadosSalvos) {
                const parsed = JSON.parse(dadosSalvos);
                Object.assign(this.dados, parsed);
                console.log('📂 Dados carregados do localStorage');
                return true;
            }
        } catch (error) {
            console.warn('⚠️ Não foi possível carregar dados salvos:', error);
        }
        return false;
    }
    
    // Salvar dados no localStorage
    salvarDados() {
        try {
            // Atualizar timestamp
            this.dados.ultimaAtualizacao = new Date().toISOString();
            this.dados.versao = '2.0.0';
            
            // Salvar no localStorage
            localStorage.setItem('precificaMeiDados', JSON.stringify(this.dados));
            
            console.log('💾 Dados salvos com sucesso');
            return true;
            
        } catch (error) {
            console.error('❌ Erro ao salvar dados:', error);
            return false;
        }
    }
    
    // Aplicar tema (dark/light)
    aplicarTema() {
        if (this.dados.config.darkMode) {
            document.body.classList.add('dark-mode');
            const icon = document.getElementById('darkModeIcon');
            if (icon) icon.className = 'fas fa-sun';
        }
    }
    
    // Alternar modo escuro
    toggleDarkMode() {
        this.dados.config.darkMode = !this.dados.config.darkMode;
        
        if (this.dados.config.darkMode) {
            document.body.classList.add('dark-mode');
            const icon = document.getElementById('darkModeIcon');
            if (icon) icon.className = 'fas fa-sun';
        } else {
            document.body.classList.remove('dark-mode');
            const icon = document.getElementById('darkModeIcon');
            if (icon) icon.className = 'fas fa-moon';
        }
        
        localStorage.setItem('darkMode', this.dados.config.darkMode);
        this.salvarDados();
        
        this.mostrarToast(
            this.dados.config.darkMode ? 'Modo escuro ativado' : 'Modo claro ativado',
            'success'
        );
    }
    
    // Inicializar navegação por tabs
    inicializarNavegacao() {
        // Definir tab inicial
        this.abrirTab('dashboard');
        
        // Configurar botões de navegação
        document.querySelectorAll('[onclick^="openTab"]').forEach(btn => {
            const tab = btn.getAttribute('onclick').match(/'([^']+)'/)[1];
            btn.addEventListener('click', () => this.abrirTab(tab));
        });
    }
    
    // Abrir uma tab específica
    abrirTab(tabNome) {
        // Atualizar tab atual
        this.tabAtual = tabNome;
        
        // Atualizar navegação
        this.atualizarNavegacao();
        
        // Atualizar conteúdo
        this.atualizarConteudoTab(tabNome);
        
        // Atualizar progresso
        this.atualizarProgresso();
    }
    
    // Atualizar navegação visual
    atualizarNavegacao() {
        // Remover classe ativa de todas as tabs
        document.querySelectorAll('.corporate-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Adicionar classe ativa à tab atual
        const tabAtual = document.querySelector(`[onclick*="${this.tabAtual}"]`);
        if (tabAtual) {
            tabAtual.classList.add('active');
        }
        
        // Atualizar progresso na timeline
        this.atualizarTimelineProgresso();
    }
    
    // Atualizar conteúdo da tab
    atualizarConteudoTab(tabNome) {
        const container = document.getElementById('conteudoPrincipal');
        if (!container) return;
        
        // Limpar conteúdo atual
        container.innerHTML = '';
        
        // Carregar conteúdo da tab
        let conteudoHTML = '';
        
        switch(tabNome) {
            case 'dashboard':
                conteudoHTML = this.gerarConteudoDashboard();
                break;
            case 'dados':
                conteudoHTML = this.modulos.dados.gerarConteudo();
                break;
            case 'custos':
                conteudoHTML = this.modulos.custos.gerarConteudo();
                break;
            case 'precificacao':
                conteudoHTML = this.modulos.precificacao.gerarConteudo();
                break;
            case 'mercado':
                conteudoHTML = this.modulos.mercado.gerarConteudo();
                break;
            case 'resultados':
                conteudoHTML = this.modulos.resultados.gerarConteudo();
                break;
            case 'projecoes':
                conteudoHTML = this.modulos.projecoes.gerarConteudo();
                break;
            case 'relatorio':
                conteudoHTML = this.modulos.exportacao.gerarConteudo();
                break;
            default:
                conteudoHTML = this.gerarConteudoDashboard();
        }
        
        container.innerHTML = conteudoHTML;
        
        // Inicializar componentes específicos da tab
        setTimeout(() => this.inicializarComponentesTab(tabNome), 100);
    }
    
    // Gerar conteúdo do dashboard
    gerarConteudoDashboard() {
        return `
            <div class="animate-fade-in">
                <!-- Cabeçalho do Dashboard -->
                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-gray-900 mb-2">Dashboard Financeiro</h1>
                    <p class="text-gray-600">Visão completa da saúde financeira do seu negócio MEI</p>
                </div>
                
                <!-- KPIs Principais -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="kpi-financeiro">
                        <div class="kpi-label">Faturamento Mensal</div>
                        <div class="kpi-valor" id="kpiFaturamento">R$ 0,00</div>
                        <div class="kpi-variacao positivo" id="kpiFaturamentoVar">
                            <i class="fas fa-arrow-up"></i> 0%
                        </div>
                    </div>
                    
                    <div class="kpi-financeiro">
                        <div class="kpi-label">Lucro Mensal</div>
                        <div class="kpi-valor" id="kpiLucro">R$ 0,00</div>
                        <div class="kpi-variacao positivo" id="kpiLucroVar">
                            <i class="fas fa-arrow-up"></i> 0%
                        </div>
                    </div>
                    
                    <div class="kpi-financeiro">
                        <div class="kpi-label">Margem de Lucro</div>
                        <div class="kpi-valor" id="kpiMargem">0%</div>
                        <div class="kpi-variacao positivo" id="kpiMargemVar">
                            <i class="fas fa-arrow-up"></i> 0%
                        </div>
                    </div>
                    
                    <div class="kpi-financeiro">
                        <div class="kpi-label">Ponto de Equilíbrio</div>
                        <div class="kpi-valor" id="kpiPontoEquilibrio">0 unid.</div>
                        <div class="kpi-variacao negativo" id="kpiPontoEquilibrioVar">
                            <i class="fas fa-arrow-down"></i> 0%
                        </div>
                    </div>
                </div>
                
                <!-- Gráficos e Análises -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <!-- Gráfico de Receitas vs Custos -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">
                                <i class="fas fa-chart-bar text-blue-500"></i>
                                Receitas vs Custos
                            </h3>
                        </div>
                        <div class="chart-container-pro h-64">
                            <canvas id="graficoReceitasCustos"></canvas>
                        </div>
                    </div>
                    
                    <!-- Distribuição de Custos -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">
                                <i class="fas fa-chart-pie text-green-500"></i>
                                Distribuição de Custos
                            </h3>
                        </div>
                        <div class="chart-container-pro h-64">
                            <canvas id="graficoDistribuicaoCustos"></canvas>
                        </div>
                    </div>
                </div>
                
                <!-- Ações Rápidas -->
                <div class="card mb-8">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-bolt text-yellow-500"></i>
                            Ações Rápidas
                        </h3>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button onclick="app.abrirTab('dados')" class="btn-outline flex items-center justify-center py-4">
                            <i class="fas fa-building text-xl mr-3"></i>
                            <div class="text-left">
                                <div class="font-semibold">Dados da Empresa</div>
                                <div class="text-sm text-gray-600">Preencher informações básicas</div>
                            </div>
                        </button>
                        
                        <button onclick="app.abrirTab('custos')" class="btn-outline flex items-center justify-center py-4">
                            <i class="fas fa-calculator text-xl mr-3"></i>
                            <div class="text-left">
                                <div class="font-semibold">Análise de Custos</div>
                                <div class="text-sm text-gray-600">Configurar custos do produto</div>
                            </div>
                        </button>
                        
                        <button onclick="app.abrirTab('precificacao')" class="btn-outline flex items-center justify-center py-4">
                            <i class="fas fa-tag text-xl mr-3"></i>
                            <div class="text-left">
                                <div class="font-semibold">Precificação</div>
                                <div class="text-sm text-gray-600">Definir preço de venda</div>
                            </div>
                        </button>
                    </div>
                </div>
                
                <!-- Alertas e Recomendações -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-bell text-red-500"></i>
                            Alertas Financeiros
                        </h3>
                    </div>
                    <div id="alertasDashboard"></div>
                </div>
            </div>
        `;
    }
    
    // Inicializar componentes específicos da tab
    inicializarComponentesTab(tabNome) {
        switch(tabNome) {
            case 'dashboard':
                this.atualizarDashboard();
                break;
            case 'dados':
                this.modulos.dados.inicializarComponentes();
                break;
            case 'custos':
                this.modulos.custos.inicializarComponentes();
                break;
            case 'precificacao':
                this.modulos.precificacao.inicializarComponentes();
                break;
            case 'mercado':
                this.modulos.mercado.inicializarComponentes();
                break;
            case 'resultados':
                this.modulos.resultados.inicializarComponentes();
                break;
            case 'projecoes':
                this.modulos.projecoes.inicializarComponentes();
                break;
            case 'relatorio':
                this.modulos.exportacao.inicializarComponentes();
                break;
        }
    }
    
    // Inicializar dashboard
    async inicializarDashboard() {
        // Atualizar KPIs
        this.atualizarKPIs();
        
        // Inicializar gráficos do dashboard
        if (this.modulos.graficos) {
            await this.modulos.graficos.inicializarGraficosDashboard();
        }
        
        // Atualizar alertas
        this.atualizarAlertas();
    }
    
    // Atualizar KPIs do dashboard
    atualizarKPIs() {
        const resultados = this.dados.resultados;
        
        // Faturamento
        const kpiFaturamento = document.getElementById('kpiFaturamento');
        if (kpiFaturamento && resultados.receitaMensal) {
            kpiFaturamento.textContent = this.formatarMoeda(resultados.receitaMensal);
        }
        
        // Lucro
        const kpiLucro = document.getElementById('kpiLucro');
        if (kpiLucro && resultados.lucroMensal) {
            kpiLucro.textContent = this.formatarMoeda(resultados.lucroMensal);
        }
        
        // Margem
        const kpiMargem = document.getElementById('kpiMargem');
        if (kpiMargem && resultados.margemLucro) {
            kpiMargem.textContent = resultados.margemLucro.toFixed(1) + '%';
        }
        
        // Ponto de equilíbrio
        const kpiPontoEquilibrio = document.getElementById('kpiPontoEquilibrio');
        if (kpiPontoEquilibrio && resultados.pontoEquilibrioUnidades) {
            kpiPontoEquilibrio.textContent = resultados.pontoEquilibrioUnidades + ' unid.';
        }
    }
    
    // Atualizar alertas do dashboard
    atualizarAlertas() {
        const container = document.getElementById('alertasDashboard');
        if (!container) return;
        
        let alertasHTML = '';
        const custos = this.dados.custos;
        const resultados = this.dados.resultados;
        
        // Verificar se há dados básicos
        if (!this.dados.empresa.nome) {
            alertasHTML += `
                <div class="alerta-financeiro alerta-alerta">
                    <div class="alerta-icon">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <div class="alerta-conteudo">
                        <div class="alerta-titulo">Dados da Empresa Incompletos</div>
                        <div class="alerta-mensagem">
                            Complete as informações da sua empresa para uma análise precisa.
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Verificar margem de lucro
        if (resultados.margemLucro && resultados.margemLucro < 10) {
            alertasHTML += `
                <div class="alerta-financeiro alerta-erro">
                    <div class="alerta-icon">
                        <i class="fas fa-exclamation-circle"></i>
                    </div>
                    <div class="alerta-conteudo">
                        <div class="alerta-titulo">Margem de Lucro Baixa</div>
                        <div class="alerta-mensagem">
                            Sua margem de lucro está abaixo de 10%. Considere ajustar preços ou reduzir custos.
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Verificar custos fixos altos
        if (custos.fixoMensal && resultados.receitaMensal) {
            const proporcao = (custos.fixoMensal / resultados.receitaMensal) * 100;
            if (proporcao > 40) {
                alertasHTML += `
                    <div class="alerta-financeiro alerta-alerta">
                        <div class="alerta-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="alerta-conteudo">
                            <div class="alerta-titulo">Custos Fixos Elevados</div>
                            <div class="alerta-mensagem">
                                Custos fixos representam ${proporcao.toFixed(1)}% da receita. Considere reduções.
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        
        // Se não houver alertas
        if (!alertasHTML) {
            alertasHTML = `
                <div class="alerta-financeiro alerta-sucesso">
                    <div class="alerta-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="alerta-conteudo">
                        <div class="alerta-titulo">Tudo em Ordem!</div>
                        <div class="alerta-mensagem">
                            Não há alertas críticos no momento. Continue monitorando seus indicadores.
                        </div>
                    </div>
                </div>
            `;
        }
        
        container.innerHTML = alertasHTML;
    }
    
    // Atualizar timeline de progresso
    atualizarTimelineProgresso() {
        const steps = ['dados', 'custos', 'precificacao', 'mercado', 'resultados'];
        const currentIndex = steps.indexOf(this.tabAtual);
        
        document.querySelectorAll('.timeline-step').forEach((step, index) => {
            const icon = step.querySelector('.step-icon');
            if (icon) {
                icon.classList.remove('active', 'completed');
                
                if (index < currentIndex) {
                    icon.classList.add('completed');
                } else if (index === currentIndex) {
                    icon.classList.add('active');
                }
            }
        });
    }
    
    // Calcular tudo (função principal)
    calcularTudo() {
        console.log('🔄 Calculando todos os dados...');
        
        try {
            // 1. Atualizar dados do formulário
            this.atualizarDadosFormulario();
            
            // 2. Calcular custos
            this.modulos.custos.calcular();
            
            // 3. Calcular precificação
            this.modulos.precificacao.calcular();
            
            // 4. Calcular mercado
            this.modulos.mercado.calcular();
            
            // 5. Calcular resultados
            this.modulos.resultados.calcular();
            
            // 6. Calcular projeções
            this.modulos.projecoes.calcular();
            
            // 7. Atualizar dashboard
            this.atualizarDashboard();
            
            // 8. Salvar dados
            this.salvarDados();
            
            this.mostrarToast('Análise completa realizada com sucesso!', 'success');
            
        } catch (error) {
            console.error('❌ Erro ao calcular tudo:', error);
            this.mostrarToast('Erro ao realizar cálculos', 'error');
        }
    }
    
    // Atualizar dados do formulário
    atualizarDadosFormulario() {
        // Coletar dados de todos os formulários
        this.modulos.dados.coletarDados();
        this.modulos.custos.coletarDados();
        this.modulos.precificacao.coletarDados();
        this.modulos.mercado.coletarDados();
    }
    
    // Atualizar progresso geral
    atualizarProgresso() {
        const etapas = ['empresa', 'produto', 'custos', 'precificacao', 'mercado', 'resultados'];
        let completas = 0;
        
        if (this.dados.empresa.nome) completas++;
        if (this.dados.produto.nome) completas++;
        if (this.dados.custos.totalUnitario) completas++;
        if (this.dados.precificacao.precoVenda) completas++;
        if (this.dados.mercado.precoMedio) completas++;
        if (this.dados.resultados.lucroMensal) completas++;
        
        const percentual = Math.round((completas / etapas.length) * 100);
        
        // Atualizar barra de progresso (se existir)
        const progressBar = document.querySelector('.progresso-financeiro-fill');
        if (progressBar) {
            progressBar.style.width = `${percentual}%`;
        }
        
        return percentual;
    }
    
    // Verificar dados incompletos
    verificarDadosIncompletos() {
        const progresso = this.atualizarProgresso();
        
        if (progresso < 50 && this.tabAtual === 'dashboard') {
            setTimeout(() => {
                this.mostrarToast(
                    `Complete ${100 - progresso}% dos dados para uma análise precisa`,
                    'warning'
                );
            }, 2000);
        }
    }
    
    // Atualizar dashboard completo
    atualizarDashboard() {
        this.atualizarKPIs();
        this.atualizarAlertas();
        
        if (this.modulos.graficos) {
            this.modulos.graficos.atualizarGraficosDashboard();
        }
    }
    
    // Inicializar eventos globais
    inicializarEventosGlobais() {
        // Botão salvar
        const btnSalvar = document.querySelector('[onclick="saveProgress()"]');
        if (btnSalvar) {
            btnSalvar.addEventListener('click', () => this.salvarDados());
        }
        
        // Botão calcular tudo
        const btnCalcularTudo = document.querySelector('[onclick="calcularTudo()"]');
        if (btnCalcularTudo) {
            btnCalcularTudo.addEventListener('click', () => this.calcularTudo());
        }
        
        // Botão modo escuro
        const btnDarkMode = document.querySelector('[onclick="toggleDarkMode()"]');
        if (btnDarkMode) {
            btnDarkMode.addEventListener('click', () => this.toggleDarkMode());
        }
        
        // Evento de beforeunload para salvar dados
        window.addEventListener('beforeunload', () => {
            if (this.initialized) {
                this.salvarDados();
            }
        });
    }
    
    // ==================== FUNÇÕES UTILITÁRIAS ====================
    
    // Formatar moeda
    formatarMoeda(valor) {
        if (valor === null || valor === undefined || isNaN(valor)) {
            return 'R$ 0,00';
        }
        
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
    
    // Formar porcentagem
    formatarPorcentagem(valor) {
        if (valor === null || valor === undefined || isNaN(valor)) {
            return '0%';
        }
        
        return valor.toLocaleString('pt-BR', {
            style: 'percent',
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        });
    }
    
    // Mostrar toast notification
    mostrarToast(mensagem, tipo = 'info') {
        const container = document.getElementById('toastContainer') || this.criarToastContainer();
        
        const toast = document.createElement('div');
        toast.className = `toast-notification animate-slide-up`;
        
        const cores = {
            success: 'alerta-sucesso',
            error: 'alerta-erro',
            warning: 'alerta-alerta',
            info: 'alerta-info'
        };
        
        const icones = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        
        toast.innerHTML = `
            <div class="${cores[tipo]} p-4 rounded-lg shadow-lg">
                <div class="flex items-center">
                    <i class="fas fa-${icones[tipo]} mr-3"></i>
                    <span>${mensagem}</span>
                </div>
            </div>
        `;
        
        container.insertBefore(toast, container.firstChild);
        
        // Remover após 5 segundos
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }
    
    // Criar container para toasts
    criarToastContainer() {
        const container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'fixed top-6 right-6 z-50 space-y-3';
        document.body.appendChild(container);
        return container;
    }
    
    // Abrir modal
    abrirModal(titulo, conteudo) {
        const modal = document.getElementById('modalGraficos');
        const tituloModal = document.getElementById('modalTitulo');
        const conteudoModal = document.getElementById('modalCanvas').parentElement;
        
        if (modal && tituloModal && conteudoModal) {
            tituloModal.textContent = titulo;
            conteudoModal.innerHTML = conteudo;
            modal.style.display = 'flex';
        }
    }
    
    // Fechar modal
    fecharModal() {
        const modal = document.getElementById('modalGraficos');
        if (modal) {
            modal.style.display = 'none';
        }
    }
    
    // Exportar relatório PDF
    async exportarRelatorioPDF() {
        try {
            this.mostrarToast('Gerando relatório PDF...', 'info');
            
            // Usar o módulo de exportação
            if (this.modulos.exportacao) {
                await this.modulos.exportacao.gerarPDF();
            } else {
                this.mostrarToast('Módulo de exportação não disponível', 'error');
            }
            
        } catch (error) {
            console.error('❌ Erro ao exportar PDF:', error);
            this.mostrarToast('Erro ao gerar relatório', 'error');
        }
    }
    
    // Resetar calculadora
    resetarCalculadora() {
        if (confirm('Tem certeza que deseja resetar todos os dados? Esta ação não pode ser desfeita.')) {
            localStorage.removeItem('precificaMeiDados');
            location.reload();
        }
    }
}

// Tornar a aplicação globalmente acessível
window.PrecificaApp = PrecificaApp;

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.app = new PrecificaApp();
    window.app.init();
    
    // Expor funções globais
    window.openTab = (tab) => window.app.abrirTab(tab);
    window.toggleDarkMode = () => window.app.toggleDarkMode();
    window.saveProgress = () => window.app.salvarDados();
    window.calcularTudo = () => window.app.calcularTudo();
    window.gerarRelatorioCompleto = () => window.app.exportarRelatorioPDF();
    window.fecharModal = () => window.app.fecharModal();
});
