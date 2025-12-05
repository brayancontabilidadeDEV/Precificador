// modulo-resultados.js - Módulo para resultados financeiros

class ModuloResultados {
    constructor(app) {
        this.app = app;
        this.resultadosCalculados = false;
        this.graficoResultados = null;
        this.graficoDistribuicao = null;
    }
    
    // Gerar conteúdo HTML do módulo
    gerarConteudo() {
        return `
            <div class="animate-fade-in">
                <!-- Cabeçalho -->
                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-gray-900 mb-2">Resultados Financeiros</h1>
                    <p class="text-gray-600">Análise completa da saúde financeira do seu negócio</p>
                </div>
                
                <!-- KPIs Principais -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div class="kpi-financeiro">
                        <div class="kpi-label">Faturamento Mensal</div>
                        <div class="kpi-valor" id="kpiFaturamentoResult">R$ 0,00</div>
                        <div class="kpi-variacao positivo" id="kpiFaturamentoVar">
                            <i class="fas fa-arrow-up mr-1"></i>0%
                        </div>
                    </div>
                    
                    <div class="kpi-financeiro">
                        <div class="kpi-label">Lucro Mensal</div>
                        <div class="kpi-valor" id="kpiLucroResult">R$ 0,00</div>
                        <div class="kpi-variacao positivo" id="kpiLucroVar">
                            <i class="fas fa-arrow-up mr-1"></i>0%
                        </div>
                    </div>
                    
                    <div class="kpi-financeiro">
                        <div class="kpi-label">Margem de Lucro</div>
                        <div class="kpi-valor" id="kpiMargemResult">0%</div>
                        <div class="kpi-variacao positivo" id="kpiMargemVar">
                            <i class="fas fa-arrow-up mr-1"></i>0%
                        </div>
                    </div>
                    
                    <div class="kpi-financeiro">
                        <div class="kpi-label">Ponto de Equilíbrio</div>
                        <div class="kpi-valor" id="kpiPontoEquilibrioResult">0 unid.</div>
                        <div class="kpi-variacao negativo" id="kpiPontoEquilibrioVar">
                            <i class="fas fa-arrow-down mr-1"></i>0%
                        </div>
                    </div>
                </div>
                
                <!-- Demonstração de Resultados -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <!-- DRE Detalhada -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">
                                <i class="fas fa-file-invoice-dollar text-blue-500"></i>
                                Demonstração de Resultados
                            </h3>
                        </div>
                        
                        <div class="space-y-4">
                            <!-- Receita -->
                            <div class="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                                <div>
                                    <div class="font-medium text-green-800">Receita Bruta Mensal</div>
                                    <div class="text-sm text-green-600">Vendas totais do mês</div>
                                </div>
                                <div class="text-2xl font-bold text-green-600" id="dreReceitaBruta">R$ 0,00</div>
                            </div>
                            
                            <!-- Deduções -->
                            <div class="pl-6 space-y-3">
                                <div class="flex justify-between items-center">
                                    <div class="text-gray-700">(-) Custo das Mercadorias Vendidas</div>
                                    <div class="font-medium" id="dreCustoMercadorias">R$ 0,00</div>
                                </div>
                                
                                <div class="flex justify-between items-center">
                                    <div class="text-gray-700">(-) Custos Variáveis Totais</div>
                                    <div class="font-medium" id="dreCustosVariaveis">R$ 0,00</div>
                                </div>
                                
                                <div class="flex justify-between items-center">
                                    <div class="text-gray-700">(-) Custos Fixos Totais</div>
                                    <div class="font-medium" id="dreCustosFixos">R$ 0,00</div>
                                </div>
                                
                                <div class="flex justify-between items-center">
                                    <div class="text-gray-700">(-) Impostos e Taxas</div>
                                    <div class="font-medium" id="dreImpostos">R$ 0,00</div>
                                </div>
                            </div>
                            
                            <!-- Lucro -->
                            <div class="flex justify-between items-center p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border border-green-200 mt-4">
                                <div>
                                    <div class="font-bold text-green-800">= Lucro Líquido Mensal</div>
                                    <div class="text-sm text-green-700">Resultado final do período</div>
                                </div>
                                <div class="text-3xl font-bold text-green-600" id="dreLucroLiquido">R$ 0,00</div>
                            </div>
                            
                            <!-- Métricas Adicionais -->
                            <div class="grid grid-cols-2 gap-4 mt-6">
                                <div class="p-3 bg-blue-50 rounded-lg">
                                    <div class="text-sm text-blue-700">Margem de Lucro</div>
                                    <div class="text-xl font-bold text-blue-600" id="dreMargemLucro">0%</div>
                                </div>
                                
                                <div class="p-3 bg-purple-50 rounded-lg">
                                    <div class="text-sm text-purple-700">Lucro por Unidade</div>
                                    <div class="text-xl font-bold text-purple-600" id="dreLucroUnitario">R$ 0,00</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Análise de Rentabilidade -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">
                                <i class="fas fa-chart-line text-green-500"></i>
                                Análise de Rentabilidade
                            </h3>
                        </div>
                        
                        <div class="space-y-6">
                            <!-- Gráfico de Distribuição -->
                            <div class="chart-container-pro h-48">
                                <canvas id="graficoDistribuicaoResultados"></canvas>
                            </div>
                            
                            <!-- Métricas de Rentabilidade -->
                            <div class="grid grid-cols-2 gap-4">
                                <div class="p-4 bg-white border rounded-lg text-center">
                                    <div class="text-2xl font-bold text-green-600" id="rentabilidadeROI">0%</div>
                                    <div class="text-sm text-gray-600">ROI Mensal</div>
                                </div>
                                
                                <div class="p-4 bg-white border rounded-lg text-center">
                                    <div class="text-2xl font-bold text-blue-600" id="rentabilidadePayback">0</div>
                                    <div class="text-sm text-gray-600">Payback (meses)</div>
                                </div>
                                
                                <div class="p-4 bg-white border rounded-lg text-center">
                                    <div class="text-2xl font-bold text-purple-600" id="rentabilidadeLucroAnual">R$ 0</div>
                                    <div class="text-sm text-gray-600">Lucro Anual Projetado</div>
                                </div>
                                
                                <div class="p-4 bg-white border rounded-lg text-center">
                                    <div class="text-2xl font-bold text-orange-600" id="rentabilidadeTicketMedio">R$ 0</div>
                                    <div class="text-sm text-gray-600">Ticket Médio</div>
                                </div>
                            </div>
                            
                            <!-- Avaliação de Saúde Financeira -->
                            <div class="p-4 rounded-lg" id="avaliacaoSaudeContainer">
                                <div class="flex items-center mb-3">
                                    <i class="fas fa-heartbeat text-xl mr-3"></i>
                                    <span class="font-bold text-lg">Avaliação de Saúde Financeira</span>
                                </div>
                                <div class="text-sm" id="avaliacaoSaudeTexto">
                                    Calcule os resultados para ver a avaliação
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Ponto de Equilíbrio -->
                <div class="card mb-8">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-balance-scale text-orange-500"></i>
                            Análise de Ponto de Equilíbrio
                        </h3>
                    </div>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <!-- Gráfico de Ponto de Equilíbrio -->
                        <div>
                            <div class="chart-container-pro h-64">
                                <canvas id="graficoPontoEquilibrio"></canvas>
                            </div>
                        </div>
                        
                        <!-- Análise -->
                        <div>
                            <div class="space-y-6">
                                <div class="p-4 bg-orange-50 rounded-lg">
                                    <div class="flex items-center mb-2">
                                        <i class="fas fa-calculator text-orange-500 mr-3"></i>
                                        <div class="font-medium text-orange-800">Cálculo do Ponto de Equilíbrio</div>
                                    </div>
                                    <div class="text-sm text-orange-700">
                                        Ponto de Equilíbrio = Custos Fixos / (Preço - Custos Variáveis Unitários)
                                    </div>
                                </div>
                                
                                <div class="space-y-3">
                                    <div class="flex justify-between items-center">
                                        <span class="text-gray-700">Ponto de Equilíbrio em Unidades:</span>
                                        <span class="font-bold text-orange-600" id="pontoEquilibrioUnidades">0</span>
                                    </div>
                                    
                                    <div class="flex justify-between items-center">
                                        <span class="text-gray-700">Ponto de Equilíbrio em Valor:</span>
                                        <span class="font-bold text-orange-600" id="pontoEquilibrioValor">R$ 0,00</span>
                                    </div>
                                    
                                    <div class="flex justify-between items-center">
                                        <span class="text-gray-700">Margem de Segurança (unidades):</span>
                                        <span class="font-bold text-green-600" id="margemSegurancaUnidades">0</span>
                                    </div>
                                    
                                    <div class="flex justify-between items-center">
                                        <span class="text-gray-700">Margem de Segurança (%):</span>
                                        <span class="font-bold text-green-600" id="margemSegurancaPercentual">0%</span>
                                    </div>
                                </div>
                                
                                <div class="p-3 bg-blue-50 rounded-lg">
                                    <div class="text-sm text-blue-700">
                                        <i class="fas fa-info-circle mr-2"></i>
                                        <span id="analisePontoEquilibrio">
                                            Calcule os resultados para ver a análise do ponto de equilíbrio
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Botão de Contato para Consultoria -->
                <div class="card mb-8">
                    <div class="p-8 text-center">
                        <div class="text-5xl mb-4">📊</div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-3">Precisa de Análise Profissional?</h3>
                        <p class="text-gray-600 mb-6 max-w-2xl mx-auto">
                            Nossos contadores da <span class="font-bold text-blue-600">Brayan Contabilidade</span> 
                            podem analisar seus números detalhadamente e oferecer orientação personalizada.
                        </p>
                        <a href="https://wa.me/5521991577383?text=Olá!%20Acabei%20de%20analisar%20meus%20resultados%20financeiros%20com%20a%20calculadora%20da%20Brayan%20Contabilidade%20e%20gostaria%20de%20uma%20consultoria%20profissional."
                           target="_blank"
                           class="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-lg hover-lift transition">
                            <i class="fab fa-whatsapp text-2xl mr-3"></i>
                            Agendar Consultoria com Contador
                        </a>
                    </div>
                </div>
                
                <!-- Navegação -->
                <div class="flex justify-between pt-8 border-t border-gray-200">
                    <button onclick="app.abrirTab('mercado')" 
                            class="btn-outline px-8 py-3">
                        <i class="fas fa-arrow-left mr-2"></i>Voltar para Mercado
                    </button>
                    
                    <div class="flex space-x-4">
                        <button onclick="app.modulos.resultados.calcular()" 
                                class="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700">
                            <i class="fas fa-calculator mr-2"></i>Calcular Resultados
                        </button>
                        
                        <button onclick="app.abrirTab('projecoes')" 
                                class="btn-primary px-8 py-3">
                            Ver Projeções Futuras
                            <i class="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Inicializar componentes do módulo
    inicializarComponentes() {
        this.inicializarEventos();
        this.preencherDadosExistentes();
        this.calcular();
    }
    
    // Inicializar eventos específicos
    inicializarEventos() {
        // Atualizar resultados quando houver mudanças nos dados
        this.app.dados.onChange = () => {
            if (this.resultadosCalculados) {
                this.calcular();
            }
        };
    }
    
    // Preencher dados existentes
    preencherDadosExistentes() {
        const dados = this.app.dados.resultados;
        
        if (dados.receitaMensal) {
            this.atualizarInterface(dados);
        }
    }
    
    // Coletar dados do módulo
    coletarDados() {
        return this.app.dados.resultados;
    }
    
    // Calcular resultados financeiros
    calcular() {
        try {
            console.log('📈 Calculando resultados financeiros...');
            
            // Verificar dados necessários
            const custos = this.app.dados.custos;
            const precificacao = this.app.dados.precificacao;
            const produto = this.app.dados.produto;
            
            if (!custos.custoTotalUnitario || !precificacao.precoVenda) {
                this.app.mostrarToast('Complete custos e precificação primeiro', 'warning');
                return false;
            }
            
            // Dados básicos
            const precoVenda = precificacao.precoVenda;
            const qtdMensal = produto.qtdVendaMensal || 100;
            const custoUnitario = custos.custoTotalUnitario;
            
            // 1. Receita Bruta Mensal
            const receitaMensal = precoVenda * qtdMensal;
            
            // 2. Custo das Mercadorias Vendidas (CMV)
            const cmv = custos.custoVariavelUnitario * qtdMensal;
            
            // 3. Custos Variáveis Totais
            const custosVariaveisTotais = cmv;
            
            // 4. Custos Fixos Totais
            const custosFixosTotais = custos.custoFixoMensal;
            
            // 5. Impostos e Taxas
            const impostosTaxas = receitaMensal * custos.percentuaisVenda;
            
            // 6. Lucro Líquido Mensal
            const lucroMensal = receitaMensal - custosVariaveisTotais - custosFixosTotais - impostosTaxas;
            
            // 7. Margem de Lucro
            const margemLucro = receitaMensal > 0 ? (lucroMensal / receitaMensal) * 100 : 0;
            
            // 8. Lucro por Unidade
            const lucroUnitario = precoVenda - custoUnitario;
            
            // 9. Ponto de Equilíbrio
            const pontoEquilibrioUnidades = lucroUnitario > 0 
                ? Math.ceil(custosFixosTotais / lucroUnitario)
                : 0;
            
            const pontoEquilibrioValor = pontoEquilibrioUnidades * precoVenda;
            
            // 10. Margem de Segurança
            const margemSegurancaUnidades = Math.max(0, qtdMensal - pontoEquilibrioUnidades);
            const margemSegurancaPercentual = qtdMensal > 0 
                ? (margemSegurancaUnidades / qtdMensal) * 100
                : 0;
            
            // 11. ROI (Return on Investment)
            const investimentoInicial = produto.metaFaturamento || 10000;
            const roiMensal = investimentoInicial > 0 
                ? (lucroMensal / investimentoInicial) * 100
                : 0;
            
            // 12. Payback (meses para recuperar investimento)
            const paybackMeses = lucroMensal > 0 
                ? Math.ceil(investimentoInicial / lucroMensal)
                : 0;
            
            // 13. Lucro Anual Projetado
            const lucroAnual = lucroMensal * 12;
            
            // 14. Ticket Médio
            const ticketMedio = precoVenda;
            
            // Salvar resultados
            this.app.dados.resultados = {
                receitaMensal,
                cmv,
                custosVariaveisTotais,
                custosFixosTotais,
                impostosTaxas,
                lucroMensal,
                margemLucro,
                lucroUnitario,
                pontoEquilibrioUnidades,
                pontoEquilibrioValor,
                margemSegurancaUnidades,
                margemSegurancaPercentual,
                roiMensal,
                paybackMeses,
                lucroAnual,
                ticketMedio,
                dataCalculo: new Date().toISOString()
            };
            
            // Atualizar interface
            this.atualizarInterface(this.app.dados.resultados);
            
            // Atualizar gráficos
            this.atualizarGraficos();
            
            // Atualizar avaliação de saúde
            this.atualizarAvaliacaoSaude();
            
            // Salvar dados
            this.app.salvarDados();
            
            this.resultadosCalculados = true;
            console.log('✅ Resultados calculados com sucesso');
            
            return true;
            
        } catch (error) {
            console.error('❌ Erro ao calcular resultados:', error);
            this.app.mostrarToast('Erro ao calcular resultados', 'error');
            return false;
        }
    }
    
    // Atualizar interface com resultados
    atualizarInterface(resultados) {
        // KPIs Principais
        this.atualizarElemento('kpiFaturamentoResult', this.app.formatarMoeda(resultados.receitaMensal));
        this.atualizarElemento('kpiLucroResult', this.app.formatarMoeda(resultados.lucroMensal));
        this.atualizarElemento('kpiMargemResult', resultados.margemLucro.toFixed(1) + '%');
        this.atualizarElemento('kpiPontoEquilibrioResult', resultados.pontoEquilibrioUnidades + ' unid.');
        
        // DRE Detalhada
        this.atualizarElemento('dreReceitaBruta', this.app.formatarMoeda(resultados.receitaMensal));
        this.atualizarElemento('dreCustoMercadorias', this.app.formatarMoeda(resultados.cmv));
        this.atualizarElemento('dreCustosVariaveis', this.app.formatarMoeda(resultados.custosVariaveisTotais));
        this.atualizarElemento('dreCustosFixos', this.app.formatarMoeda(resultados.custosFixosTotais));
        this.atualizarElemento('dreImpostos', this.app.formatarMoeda(resultados.impostosTaxas));
        this.atualizarElemento('dreLucroLiquido', this.app.formatarMoeda(resultados.lucroMensal));
        this.atualizarElemento('dreMargemLucro', resultados.margemLucro.toFixed(1) + '%');
        this.atualizarElemento('dreLucroUnitario', this.app.formatarMoeda(resultados.lucroUnitario));
        
        // Rentabilidade
        this.atualizarElemento('rentabilidadeROI', resultados.roiMensal.toFixed(1) + '%');
        this.atualizarElemento('rentabilidadePayback', resultados.paybackMeses);
        this.atualizarElemento('rentabilidadeLucroAnual', this.app.formatarMoeda(resultados.lucroAnual));
        this.atualizarElemento('rentabilidadeTicketMedio', this.app.formatarMoeda(resultados.ticketMedio));
        
        // Ponto de Equilíbrio
        this.atualizarElemento('pontoEquilibrioUnidades', resultados.pontoEquilibrioUnidades);
        this.atualizarElemento('pontoEquilibrioValor', this.app.formatarMoeda(resultados.pontoEquilibrioValor));
        this.atualizarElemento('margemSegurancaUnidades', resultados.margemSegurancaUnidades);
        this.atualizarElemento('margemSegurancaPercentual', resultados.margemSegurancaPercentual.toFixed(1) + '%');
        
        // Análise do ponto de equilíbrio
        this.atualizarAnalisePontoEquilibrio(resultados);
    }
    
    // Atualizar análise do ponto de equilíbrio
    atualizarAnalisePontoEquilibrio(resultados) {
        const elemento = document.getElementById('analisePontoEquilibrio');
        if (!elemento) return;
        
        const qtdMensal = this.app.dados.produto.qtdVendaMensal || 100;
        const percentual = (resultados.pontoEquilibrioUnidades / qtdMensal) * 100;
        
        let analise = '';
        
        if (resultados.pontoEquilibrioUnidades <= 0) {
            analise = 'Seu negócio não alcança o ponto de equilíbrio. Ajuste preços ou custos.';
        } else if (percentual <= 30) {
            analise = `Excelente! Você precisa vender apenas ${resultados.pontoEquilibrioUnidades} unidades (${percentual.toFixed(1)}% da capacidade) para cobrir todos os custos.`;
        } else if (percentual <= 60) {
            analise = `Bom. Você precisa vender ${resultados.pontoEquilibrioUnidades} unidades (${percentual.toFixed(1)}% da capacidade) para cobrir custos.`;
        } else if (percentual <= 80) {
            analise = `Atenção. Você precisa vender ${resultados.pontoEquilibrioUnidades} unidades (${percentual.toFixed(1)}% da capacidade) para cobrir custos. Considere otimizar.`;
        } else {
            analise = `Crítico. Você precisa vender ${resultados.pontoEquilibrioUnidades} unidades (${percentual.toFixed(1)}% da capacidade) para cobrir custos. Necessário ajuste urgente.`;
        }
        
        elemento.textContent = analise;
    }
    
    // Atualizar gráficos
    atualizarGraficos() {
        this.atualizarGraficoDistribuicao();
        this.atualizarGraficoPontoEquilibrio();
    }
    
    // Atualizar gráfico de distribuição
    atualizarGraficoDistribuicao() {
        const canvas = document.getElementById('graficoDistribuicaoResultados');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const resultados = this.app.dados.resultados;
        
        // Destruir gráfico anterior se existir
        if (this.graficoDistribuicao) {
            this.graficoDistribuicao.destroy();
        }
        
        // Dados para o gráfico
        const dados = [
            resultados.cmv,
            resultados.custosFixosTotais,
            resultados.impostosTaxas,
            resultados.lucroMensal
        ];
        
        // Criar novo gráfico
        this.graficoDistribuicao = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Custo Mercadorias', 'Custos Fixos', 'Impostos/Taxas', 'Lucro Líquido'],
                datasets: [{
                    data: dados,
                    backgroundColor: [
                        '#ef4444', // Vermelho
                        '#3b82f6', // Azul
                        '#f59e0b', // Amarelo
                        '#10b981'  // Verde
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const value = context.raw;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                return `${context.label}: ${this.app.formatarMoeda(value)} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Atualizar gráfico de ponto de equilíbrio
    atualizarGraficoPontoEquilibrio() {
        const canvas = document.getElementById('graficoPontoEquilibrio');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const resultados = this.app.dados.resultados;
        const qtdMensal = this.app.dados.produto.qtdVendaMensal || 100;
        const precoVenda = this.app.dados.precificacao.precoVenda || 0;
        
        // Gerar dados para o gráfico
        const unidades = [];
        const receitas = [];
        const custosTotais = [];
        const custosFixos = [];
        
        const maxUnidades = Math.max(qtdMensal * 1.5, resultados.pontoEquilibrioUnidades * 1.5);
        const step = Math.ceil(maxUnidades / 10);
        
        for (let i = 0; i <= maxUnidades; i += step) {
            unidades.push(i);
            
            // Receita
            const receita = i * precoVenda;
            receitas.push(receita);
            
            // Custos Fixos
            const custoFixo = resultados.custosFixosTotais;
            custosFixos.push(custoFixo);
            
            // Custos Totais = Fixos + Variáveis
            const custoVariavelUnitario = this.app.dados.custos.custoVariavelUnitario || 0;
            const custoTotal = custoFixo + (i * custoVariavelUnitario);
            custosTotais.push(custoTotal);
        }
        
        // Destruir gráfico anterior se existir
        if (this.graficoPontoEquilibrio) {
            this.graficoPontoEquilibrio.destroy();
        }
        
        // Criar novo gráfico
        this.graficoPontoEquilibrio = new Chart(ctx, {
            type: 'line',
            data: {
                labels: unidades,
                datasets: [
                    {
                        label: 'Receita Total',
                        data: receitas,
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        borderWidth: 3,
                        fill: false
                    },
                    {
                        label: 'Custo Total',
                        data: custosTotais,
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderWidth: 3,
                        fill: false
                    },
                    {
                        label: 'Custo Fixo',
                        data: custosFixos,
                        borderColor: '#3b82f6',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `${context.dataset.label}: ${this.app.formatarMoeda(context.raw)}`;
                            }
                        }
                    },
                    annotation: {
                        annotations: {
                            pontoEquilibrio: {
                                type: 'line',
                                xMin: resultados.pontoEquilibrioUnidades,
                                xMax: resultados.pontoEquilibrioUnidades,
                                borderColor: '#f59e0b',
                                borderWidth: 2,
                                borderDash: [5, 5],
                                label: {
                                    content: `Ponto de Equilíbrio: ${resultados.pontoEquilibrioUnidades} unid.`,
                                    enabled: true,
                                    position: 'end'
                                }
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Quantidade de Unidades'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Valor (R$)'
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Atualizar avaliação de saúde financeira
    atualizarAvaliacaoSaude() {
        const container = document.getElementById('avaliacaoSaudeContainer');
        const texto = document.getElementById('avaliacaoSaudeTexto');
        
        if (!container || !texto) return;
        
        const resultados = this.app.dados.resultados;
        const qtdMensal = this.app.dados.produto.qtdVendaMensal || 100;
        
        // Calcular score de saúde (0-100)
        let score = 0;
        
        // 1. Margem de Lucro (0-30 pontos)
        if (resultados.margemLucro >= 40) score += 30;
        else if (resultados.margemLucro >= 30) score += 25;
        else if (resultados.margemLucro >= 20) score += 20;
        else if (resultados.margemLucro >= 15) score += 15;
        else if (resultados.margemLucro >= 10) score += 10;
        else if (resultados.margemLucro >= 5) score += 5;
        
        // 2. Ponto de Equilíbrio (0-30 pontos)
        const percentualPE = (resultados.pontoEquilibrioUnidades / qtdMensal) * 100;
        if (percentualPE <= 30) score += 30;
        else if (percentualPE <= 50) score += 25;
        else if (percentualPE <= 70) score += 20;
        else if (percentualPE <= 85) score += 10;
        else score += 5;
        
        // 3. Margem de Segurança (0-20 pontos)
        if (resultados.margemSegurancaPercentual >= 50) score += 20;
        else if (resultados.margemSegurancaPercentual >= 30) score += 15;
        else if (resultados.margemSegurancaPercentual >= 20) score += 10;
        else if (resultados.margemSegurancaPercentual >= 10) score += 5;
        
        // 4. ROI (0-20 pontos)
        if (resultados.roiMensal >= 20) score += 20;
        else if (resultados.roiMensal >= 15) score += 15;
        else if (resultados.roiMensal >= 10) score += 10;
        else if (resultados.roiMensal >= 5) score += 5;
        
        // Determinar classificação
        let classificacao = '';
        let cor = '';
        let descricao = '';
        
        if (score >= 85) {
            classificacao = 'Excelente';
            cor = 'bg-gradient-to-r from-green-100 to-emerald-100 border-green-300 text-green-800';
            descricao = 'Seu negócio apresenta saúde financeira excepcional. Continue com o bom trabalho!';
        } else if (score >= 70) {
            classificacao = 'Boa';
            cor = 'bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-300 text-blue-800';
            descricao = 'Saúde financeira sólida. Algumas melhorias podem otimizar ainda mais os resultados.';
        } else if (score >= 55) {
            classificacao = 'Regular';
            cor = 'bg-gradient-to-r from-yellow-100 to-amber-100 border-yellow-300 text-yellow-800';
            descricao = 'Situação estável, mas com pontos de atenção. Recomendamos ajustes para melhorar.';
        } else if (score >= 40) {
            classificacao = 'Preocupante';
            cor = 'bg-gradient-to-r from-orange-100 to-red-100 border-orange-300 text-orange-800';
            descricao = 'Há pontos críticos que necessitam atenção imediata. Considere revisar estratégias.';
        } else {
            classificacao = 'Crítica';
            cor = 'bg-gradient-to-r from-red-100 to-pink-100 border-red-300 text-red-800';
            descricao = 'Situação financeira crítica. Recomendamos consultoria profissional urgente.';
        }
        
        // Atualizar interface
        container.className = `p-4 rounded-lg border ${cor}`;
        texto.innerHTML = `
            <div class="mb-3">
                <div class="flex items-center justify-between">
                    <span class="font-bold">Classificação: ${classificacao}</span>
                    <span class="text-2xl font-bold">${score}/100</span>
                </div>
                <div class="w-full h-2 bg-gray-200 rounded-full mt-2">
                    <div class="h-full rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" 
                         style="width: ${score}%"></div>
                </div>
            </div>
            <div>${descricao}</div>
        `;
    }
    
        // Atualizar elemento HTML com valor
    atualizarElemento(id, valor) {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.textContent = valor;
        }
    }

    // Atualizar variações nos KPIs
    atualizarVariacoes() {
        // Esta função poderia comparar com dados históricos ou metas
        const resultados = this.app.dados.resultados;
        
        // Aqui você implementaria a lógica de variação (comparação com período anterior, metas, etc.)
        // Por enquanto, vamos usar valores de exemplo ou deixar padrão
        
        const elementosVariacao = [
            { id: 'kpiFaturamentoVar', valor: '+12.5%' },
            { id: 'kpiLucroVar', valor: '+8.3%' },
            { id: 'kpiMargemVar', valor: '+2.1%' },
            { id: 'kpiPontoEquilibrioVar', valor: '-5.2%' }
        ];
        
        elementosVariacao.forEach(item => {
            this.atualizarElemento(item.id, item.valor);
        });
    }

    // Exportar resultados para PDF/Excel
    exportarResultados(formato = 'pdf') {
        try {
            console.log(`Exportando resultados no formato: ${formato}`);
            
            // Coletar dados para exportação
            const dadosExportacao = {
                ...this.app.dados.resultados,
                dadosEmpresa: this.app.dados.empresa,
                dadosProduto: this.app.dados.produto,
                dadosCustos: this.app.dados.custos,
                dadosPrecificacao: this.app.dados.precificacao,
                dataExportacao: new Date().toISOString(),
                versaoApp: '1.0.0'
            };
            
            if (formato === 'pdf') {
                this.gerarPDF(dadosExportacao);
            } else if (formato === 'excel') {
                this.gerarExcel(dadosExportacao);
            } else {
                this.gerarRelatorioTexto(dadosExportacao);
            }
            
            this.app.mostrarToast(`Resultados exportados como ${formato.toUpperCase()}`, 'success');
            
        } catch (error) {
            console.error('Erro ao exportar resultados:', error);
            this.app.mostrarToast('Erro ao exportar resultados', 'error');
        }
    }

    // Gerar PDF dos resultados
    gerarPDF(dados) {
        // Implementação simplificada - na prática você usaria uma biblioteca como jsPDF
        const conteudo = `
            RELATÓRIO DE RESULTADOS FINANCEIROS
            =====================================
            
            Empresa: ${dados.dadosEmpresa.nome || 'Não informado'}
            Data: ${new Date().toLocaleDateString('pt-BR')}
            
            RESUMO FINANCEIRO:
            ------------------
            Faturamento Mensal: ${this.app.formatarMoeda(dados.receitaMensal)}
            Lucro Mensal: ${this.app.formatarMoeda(dados.lucroMensal)}
            Margem de Lucro: ${dados.margemLucro.toFixed(2)}%
            Ponto de Equilíbrio: ${dados.pontoEquilibrioUnidades} unidades
            
            DEMONSTRAÇÃO DE RESULTADOS:
            ---------------------------
            Receita Bruta: ${this.app.formatarMoeda(dados.receitaMensal)}
            (-) Custo Mercadorias: ${this.app.formatarMoeda(dados.cmv)}
            (-) Custos Fixos: ${this.app.formatarMoeda(dados.custosFixosTotais)}
            (-) Impostos/Taxas: ${this.app.formatarMoeda(dados.impostosTaxas)}
            (=) Lucro Líquido: ${this.app.formatarMoeda(dados.lucroMensal)}
            
            INDICADORES DE RENTABILIDADE:
            -----------------------------
            ROI Mensal: ${dados.roiMensal.toFixed(2)}%
            Payback: ${dados.paybackMeses} meses
            Lucro Anual Projetado: ${this.app.formatarMoeda(dados.lucroAnual)}
            Ticket Médio: ${this.app.formatarMoeda(dados.ticketMedio)}
            
            ANÁLISE DE PONTO DE EQUILÍBRIO:
            --------------------------------
            Ponto de Equilíbrio (unid.): ${dados.pontoEquilibrioUnidades}
            Ponto de Equilíbrio (R$): ${this.app.formatarMoeda(dados.pontoEquilibrioValor)}
            Margem de Segurança: ${dados.margemSegurancaPercentual.toFixed(2)}%
            
            RECOMENDAÇÕES:
            --------------
            ${this.gerarRecomendacoesTexto(dados)}
            
            ---
            Gerado por Brayan Contabilidade Calculator
            Contato: (21) 99157-7383
        `;
        
        // Criar e baixar arquivo
        const blob = new Blob([conteudo], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `resultados-financeiros-${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    // Gerar Excel
    gerarExcel(dados) {
        // Implementação simplificada
        const csvContent = this.converterParaCSV(dados);
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `resultados-financeiros-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    // Converter dados para CSV
    converterParaCSV(dados) {
        const linhas = [];
        
        // Cabeçalho
        linhas.push('"Relatório de Resultados Financeiros"');
        linhas.push(`"Data","${new Date().toLocaleDateString('pt-BR')}"`);
        linhas.push('');
        
        // Seção de resumo
        linhas.push('"RESUMO FINANCEIRO"');
        linhas.push('"Item","Valor"');
        linhas.push(`"Faturamento Mensal","${this.app.formatarMoeda(dados.receitaMensal)}"`);
        linhas.push(`"Lucro Mensal","${this.app.formatarMoeda(dados.lucroMensal)}"`);
        linhas.push(`"Margem de Lucro","${dados.margemLucro.toFixed(2)}%"`);
        linhas.push(`"Ponto de Equilíbrio","${dados.pontoEquilibrioUnidades} unidades"`);
        linhas.push('');
        
        // Seção DRE
        linhas.push('"DEMONSTRAÇÃO DE RESULTADOS"');
        linhas.push('"Item","Valor"');
        linhas.push(`"Receita Bruta","${this.app.formatarMoeda(dados.receitaMensal)}"`);
        linhas.push(`"Custo Mercadorias","${this.app.formatarMoeda(dados.cmv)}"`);
        linhas.push(`"Custos Fixos","${this.app.formatarMoeda(dados.custosFixosTotais)}"`);
        linhas.push(`"Impostos/Taxas","${this.app.formatarMoeda(dados.impostosTaxas)}"`);
        linhas.push(`"Lucro Líquido","${this.app.formatarMoeda(dados.lucroMensal)}"`);
        linhas.push('');
        
        // Seção indicadores
        linhas.push('"INDICADORES DE RENTABILIDADE"');
        linhas.push('"Item","Valor"');
        linhas.push(`"ROI Mensal","${dados.roiMensal.toFixed(2)}%"`);
        linhas.push(`"Payback","${dados.paybackMeses} meses"`);
        linhas.push(`"Lucro Anual Projetado","${this.app.formatarMoeda(dados.lucroAnual)}"`);
        linhas.push(`"Ticket Médio","${this.app.formatarMoeda(dados.ticketMedio)}"`);
        
        return linhas.join('\n');
    }

    // Gerar relatório em texto
    gerarRelatorioTexto(dados) {
        // Similar ao PDF, mas formato texto simples
        const conteudo = this.gerarConteudoRelatorioTexto(dados);
        
        const blob = new Blob([conteudo], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `resultados-financeiros-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    // Gerar conteúdo do relatório em texto
    gerarConteudoRelatorioTexto(dados) {
        return `
RELATÓRIO DE ANÁLISE FINANCEIRA
===============================

Data da Análise: ${new Date().toLocaleDateString('pt-BR')}
Hora da Análise: ${new Date().toLocaleTimeString('pt-BR')}

${this.gerarRecomendacoesTexto(dados)}

--- DETALHES DA ANÁLISE ---

1. SÍNTESE FINANCEIRA:
   • Faturamento Mensal: ${this.app.formatarMoeda(dados.receitaMensal)}
   • Lucro Líquido: ${this.app.formatarMoeda(dados.lucroMensal)}
   • Margem de Lucro: ${dados.margemLucro.toFixed(2)}%
   • Lucro por Unidade: ${this.app.formatarMoeda(dados.lucroUnitario)}

2. ANÁLISE DE PONTO DE EQUILÍBRIO:
   • Ponto de Equilíbrio: ${dados.pontoEquilibrioUnidades} unidades
   • Valor no P.E.: ${this.app.formatarMoeda(dados.pontoEquilibrioValor)}
   • Margem de Segurança: ${dados.margemSegurancaPercentual.toFixed(2)}%
   • Análise: ${document.getElementById('analisePontoEquilibrio')?.textContent || ''}

3. PROJEÇÕES:
   • ROI Mensal: ${dados.roiMensal.toFixed(2)}%
   • Tempo de Retorno (Payback): ${dados.paybackMeses} meses
   • Lucro Anual Projetado: ${this.app.formatarMoeda(dados.lucroAnual)}
   • Ticket Médio: ${this.app.formatarMoeda(dados.ticketMedio)}

4. SAÚDE FINANCEIRA:
   • Classificação: ${document.querySelector('#avaliacaoSaudeContainer .font-bold')?.textContent?.replace('Classificação: ', '') || 'Não calculada'}
   • Score: ${document.querySelector('#avaliacaoSaudeContainer .text-2xl')?.textContent || '0/100'}
   • Recomendação: ${document.querySelector('#avaliacaoSaudeContainer div:nth-child(2)')?.textContent || ''}

--- FIM DO RELATÓRIO ---

Gerado por: Brayan Contabilidade Calculator
Contato: (21) 99157-7383 | WhatsApp: https://wa.me/5521991577383
        `;
    }

    // Gerar recomendações baseadas nos resultados
    gerarRecomendacoesTexto(dados) {
        const recomendacoes = [];
        
        // Análise da margem de lucro
        if (dados.margemLucro < 10) {
            recomendacoes.push("• Margem de lucro abaixo de 10%: Considere aumentar preços ou reduzir custos");
        } else if (dados.margemLucro < 20) {
            recomendacoes.push("• Margem de lucro moderada: Há espaço para melhorias na eficiência operacional");
        } else {
            recomendacoes.push("• Margem de lucro saudável: Mantenha a estratégia atual");
        }
        
        // Análise do ponto de equilíbrio
        const qtdMensal = this.app.dados.produto.qtdVendaMensal || 100;
        const percentualPE = (dados.pontoEquilibrioUnidades / qtdMensal) * 100;
        
        if (percentualPE > 70) {
            recomendacoes.push("• Ponto de equilíbrio muito alto: Risco elevado, considere reduzir custos fixos");
        } else if (percentualPE > 50) {
            recomendacoes.push("• Ponto de equilíbrio moderado: Foque em aumentar volume de vendas");
        }
        
        // Análise do ROI
        if (dados.roiMensal < 5) {
            recomendacoes.push("• ROI baixo: Avalie a viabilidade do investimento atual");
        } else if (dados.roiMensal > 15) {
            recomendacoes.push("• ROI excelente: Oportunidade para reinvestir e expandir");
        }
        
        // Análise do payback
        if (dados.paybackMeses > 24) {
            recomendacoes.push("• Payback muito longo (>2 anos): Considere estratégias para acelerar retorno");
        }
        
        // Recomendação geral baseada no score
        const score = this.calcularScoreSaude(dados);
        if (score < 40) {
            recomendacoes.push("• ATENÇÃO: Saúde financeira crítica - Recomendamos consultoria profissional urgente");
        } else if (score < 60) {
            recomendacoes.push("• CUIDADO: Pontos críticos identificados - Necessário revisão estratégica");
        }
        
        return recomendacoes.length > 0 ? recomendacoes.join('\n') : "• Nenhuma recomendação específica necessária. Seu negócio está no caminho certo!";
    }

    // Calcular score de saúde (método auxiliar)
    calcularScoreSaude(dados) {
        if (!dados) return 0;
        
        let score = 0;
        const qtdMensal = this.app.dados.produto.qtdVendaMensal || 100;
        
        // Margem de Lucro (0-30)
        if (dados.margemLucro >= 40) score += 30;
        else if (dados.margemLucro >= 30) score += 25;
        else if (dados.margemLucro >= 20) score += 20;
        else if (dados.margemLucro >= 15) score += 15;
        else if (dados.margemLucro >= 10) score += 10;
        else if (dados.margemLucro >= 5) score += 5;
        
        // Ponto de Equilíbrio (0-30)
        const percentualPE = (dados.pontoEquilibrioUnidades / qtdMensal) * 100;
        if (percentualPE <= 30) score += 30;
        else if (percentualPE <= 50) score += 25;
        else if (percentualPE <= 70) score += 20;
        else if (percentualPE <= 85) score += 10;
        else score += 5;
        
        // Margem de Segurança (0-20)
        if (dados.margemSegurancaPercentual >= 50) score += 20;
        else if (dados.margemSegurancaPercentual >= 30) score += 15;
        else if (dados.margemSegurancaPercentual >= 20) score += 10;
        else if (dados.margemSegurancaPercentual >= 10) score += 5;
        
        // ROI (0-20)
        if (dados.roiMensal >= 20) score += 20;
        else if (dados.roiMensal >= 15) score += 15;
        else if (dados.roiMensal >= 10) score += 10;
        else if (dados.roiMensal >= 5) score += 5;
        
        return score;
    }

    // Resetar resultados
    resetar() {
        if (confirm('Tem certeza que deseja resetar todos os resultados calculados?')) {
            this.app.dados.resultados = {};
            this.resultadosCalculados = false;
            
            // Resetar interface
            this.atualizarInterface({
                receitaMensal: 0,
                cmv: 0,
                custosVariaveisTotais: 0,
                custosFixosTotais: 0,
                impostosTaxas: 0,
                lucroMensal: 0,
                margemLucro: 0,
                lucroUnitario: 0,
                pontoEquilibrioUnidades: 0,
                pontoEquilibrioValor: 0,
                margemSegurancaUnidades: 0,
                margemSegurancaPercentual: 0,
                roiMensal: 0,
                paybackMeses: 0,
                lucroAnual: 0,
                ticketMedio: 0
            });
            
            // Resetar gráficos
            if (this.graficoDistribuicao) {
                this.graficoDistribuicao.destroy();
                this.graficoDistribuicao = null;
            }
            
            if (this.graficoPontoEquilibrio) {
                this.graficoPontoEquilibrio.destroy();
                this.graficoPontoEquilibrio = null;
            }
            
            // Resetar avaliação de saúde
            const container = document.getElementById('avaliacaoSaudeContainer');
            const texto = document.getElementById('avaliacaoSaudeTexto');
            if (container && texto) {
                container.className = 'p-4 rounded-lg';
                texto.textContent = 'Calcule os resultados para ver a avaliação';
            }
            
            this.app.mostrarToast('Resultados resetados com sucesso', 'success');
        }
    }

    // Validar dados antes do cálculo
    validarDados() {
        const custos = this.app.dados.custos;
        const precificacao = this.app.dados.precificacao;
        const produto = this.app.dados.produto;
        
        const erros = [];
        
        if (!custos.custoTotalUnitario || custos.custoTotalUnitario <= 0) {
            erros.push('Custo total unitário não definido');
        }
        
        if (!precificacao.precoVenda || precificacao.precoVenda <= 0) {
            erros.push('Preço de venda não definido');
        }
        
        if (!produto.qtdVendaMensal || produto.qtdVendaMensal <= 0) {
            erros.push('Quantidade de vendas mensal não definida');
        }
        
        if (erros.length > 0) {
            this.app.mostrarToast(`Corrija os seguintes campos: ${erros.join(', ')}`, 'warning');
            return false;
        }
        
        return true;
    }

    // Comparar com cenários anteriores
    compararCenarios() {
        // Esta função permitiria comparar resultados com diferentes cenários
        // (otimista, pessimista, realista)
        console.log('Funcionalidade de comparação de cenários');
        this.app.mostrarToast('Funcionalidade em desenvolvimento', 'info');
    }

    // Destruir módulo (limpeza)
    destruir() {
        if (this.graficoDistribuicao) {
            this.graficoDistribuicao.destroy();
        }
        
        if (this.graficoPontoEquilibrio) {
            this.graficoPontoEquilibrio.destroy();
        }
        
        console.log('Módulo de resultados destruído');
    }
}

// Exportar módulo para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModuloResultados;
}
