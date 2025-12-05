// modulo-projecoes.js - Módulo para projeções financeiras

class ModuloProjecoes {
    constructor(app) {
        this.app = app;
        this.projecoesCalculadas = false;
        this.cenarios = {
            pessimista: { crescimento: -10, nome: 'Pessimista' },
            realista: { crescimento: 0, nome: 'Realista' },
            otimista: { crescimento: 15, nome: 'Otimista' }
        };
        this.graficoProjecao = null;
        this.graficoFluxoCaixa = null;
    }
    
    // Gerar conteúdo HTML do módulo
    gerarConteudo() {
        return `
            <div class="animate-fade-in">
                <!-- Cabeçalho -->
                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-gray-900 mb-2">Projeções Financeiras</h1>
                    <p class="text-gray-600">Visualize o futuro do seu negócio com diferentes cenários</p>
                </div>
                
                <!-- Configurações de Projeção -->
                <div class="card mb-8">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-sliders-h text-blue-500"></i>
                            Configurações de Projeção
                        </h3>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <!-- Período -->
                        <div class="form-group">
                            <label class="form-label">Período de Projeção</label>
                            <select id="periodoProjecao" class="form-control-professional">
                                <option value="6">6 meses</option>
                                <option value="12" selected>12 meses</option>
                                <option value="24">24 meses (2 anos)</option>
                                <option value="36">36 meses (3 anos)</option>
                            </select>
                        </div>
                        
                        <!-- Taxa de Crescimento -->
                        <div class="form-group">
                            <label class="form-label">Taxa de Crescimento Mensal (%)</label>
                            <div class="relative">
                                <input type="number" 
                                       id="taxaCrescimentoProjecao" 
                                       class="form-control-professional pr-10"
                                       value="5"
                                       min="-50"
                                       max="100"
                                       step="1">
                                <span class="absolute right-3 top-3 text-gray-500">%</span>
                            </div>
                        </div>
                        
                        <!-- Inflação Estimada -->
                        <div class="form-group">
                            <label class="form-label">Inflação Anual Estimada (%)</label>
                            <div class="relative">
                                <input type="number" 
                                       id="inflacaoEstimada" 
                                       class="form-control-professional pr-10"
                                       value="4.5"
                                       min="0"
                                       max="50"
                                       step="0.1">
                                <span class="absolute right-3 top-3 text-gray-500">%</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-6 flex justify-end">
                        <button onclick="app.modulos.projecoes.calcular()" 
                                class="btn-primary px-8 py-3">
                            <i class="fas fa-calculator mr-2"></i>
                            Gerar Projeções
                        </button>
                    </div>
                </div>
                
                <!-- Cenários de Projeção -->
                <div class="card mb-8">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-layer-group text-purple-500"></i>
                            Análise de Cenários
                        </h3>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <!-- Cenário Pessimista -->
                        <div class="p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-200">
                            <div class="flex items-center mb-4">
                                <div class="p-3 bg-red-100 rounded-lg mr-3">
                                    <i class="fas fa-arrow-down text-red-600"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-red-800">Cenário Pessimista</h4>
                                    <div class="text-sm text-red-600">Redução de 10% nas vendas</div>
                                </div>
                            </div>
                            
                            <div class="space-y-3">
                                <div class="flex justify-between">
                                    <span class="text-gray-700">Faturamento (12 meses):</span>
                                    <span class="font-bold text-red-700" id="faturamentoPessimista">R$ 0</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-700">Lucro Estimado:</span>
                                    <span class="font-bold text-red-700" id="lucroPessimista">R$ 0</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-700">Margem:</span>
                                    <span class="font-bold text-red-700" id="margemPessimista">0%</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Cenário Realista -->
                        <div class="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-300">
                            <div class="flex items-center mb-4">
                                <div class="p-3 bg-blue-100 rounded-lg mr-3">
                                    <i class="fas fa-minus text-blue-600"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-blue-800">Cenário Realista</h4>
                                    <div class="text-sm text-blue-600">Mantém padrão atual</div>
                                </div>
                            </div>
                            
                            <div class="space-y-3">
                                <div class="flex justify-between">
                                    <span class="text-gray-700">Faturamento (12 meses):</span>
                                    <span class="font-bold text-blue-700" id="faturamentoRealista">R$ 0</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-700">Lucro Estimado:</span>
                                    <span class="font-bold text-blue-700" id="lucroRealista">R$ 0</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-700">Margem:</span>
                                    <span class="font-bold text-blue-700" id="margemRealista">0%</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Cenário Otimista -->
                        <div class="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                            <div class="flex items-center mb-4">
                                <div class="p-3 bg-green-100 rounded-lg mr-3">
                                    <i class="fas fa-arrow-up text-green-600"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-green-800">Cenário Otimista</h4>
                                    <div class="text-sm text-green-600">Crescimento de 15%</div>
                                </div>
                            </div>
                            
                            <div class="space-y-3">
                                <div class="flex justify-between">
                                    <span class="text-gray-700">Faturamento (12 meses):</span>
                                    <span class="font-bold text-green-700" id="faturamentoOtimista">R$ 0</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-700">Lucro Estimado:</span>
                                    <span class="font-bold text-green-700" id="lucroOtimista">R$ 0</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-700">Margem:</span>
                                    <span class="font-bold text-green-700" id="margemOtimista">0%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Gráficos de Projeção -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <!-- Projeção de Receita -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">
                                <i class="fas fa-chart-line text-green-500"></i>
                                Projeção de Receita
                            </h3>
                        </div>
                        <div class="chart-container-pro h-80">
                            <canvas id="graficoProjecaoReceita"></canvas>
                        </div>
                    </div>
                    
                    <!-- Fluxo de Caixa Projetado -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">
                                <i class="fas fa-money-bill-wave text-blue-500"></i>
                                Fluxo de Caixa Projetado
                            </h3>
                        </div>
                        <div class="chart-container-pro h-80">
                            <canvas id="graficoFluxoCaixa"></canvas>
                        </div>
                    </div>
                </div>
                
                <!-- Análise de Viabilidade -->
                <div class="card mb-8">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-check-circle text-green-500"></i>
                            Análise de Viabilidade
                        </h3>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div class="text-center p-4 bg-gray-50 rounded-lg">
                            <div class="text-3xl font-bold text-blue-600" id="viabilidadeROI">0%</div>
                            <div class="text-sm text-gray-600 mt-1">ROI Acumulado (12 meses)</div>
                        </div>
                        
                        <div class="text-center p-4 bg-gray-50 rounded-lg">
                            <div class="text-3xl font-bold text-green-600" id="viabilidadeVPL">R$ 0</div>
                            <div class="text-sm text-gray-600 mt-1">VPL (Valor Presente Líquido)</div>
                        </div>
                        
                        <div class="text-center p-4 bg-gray-50 rounded-lg">
                            <div class="text-3xl font-bold text-purple-600" id="viabilidadeTIR">0%</div>
                            <div class="text-sm text-gray-600 mt-1">TIR (Taxa Interna de Retorno)</div>
                        </div>
                        
                        <div class="text-center p-4 bg-gray-50 rounded-lg">
                            <div class="text-3xl font-bold text-orange-600" id="viabilidadePayback">0</div>
                            <div class="text-sm text-gray-600 mt-1">Payback (meses)</div>
                        </div>
                    </div>
                    
                    <!-- Indicador de Viabilidade -->
                    <div class="mt-6 p-4 rounded-lg" id="indicadorViabilidade">
                        <div class="flex items-center mb-3">
                            <i class="fas fa-thumbs-up text-2xl mr-3"></i>
                            <div class="font-bold text-lg">Avaliação de Viabilidade</div>
                        </div>
                        <div class="text-sm" id="textoViabilidade">
                            Calcule as projeções para ver a análise de viabilidade
                        </div>
                    </div>
                </div>
                
                <!-- Tabela de Projeção Detalhada -->
                <div class="card mb-8">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-table text-blue-500"></i>
                            Projeção Detalhada Mês a Mês
                        </h3>
                    </div>
                    
                    <div class="overflow-x-auto">
                        <table class="tabela-financeira">
                            <thead>
                                <tr>
                                    <th>Mês</th>
                                    <th>Receita</th>
                                    <th>Custos</th>
                                    <th>Lucro</th>
                                    <th>Margem</th>
                                    <th>Acumulado</th>
                                </tr>
                            </thead>
                            <tbody id="tabelaProjecaoDetalhada">
                                <tr>
                                    <td colspan="6" class="text-center text-gray-500 py-8">
                                        Gere as projeções para ver os detalhes mês a mês
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- Recomendações Estratégicas -->
                <div class="card mb-8">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-lightbulb text-yellow-500"></i>
                            Recomendações Estratégicas
                        </h3>
                    </div>
                    
                    <div id="recomendacoesEstrategicas">
                        <div class="text-center text-gray-500 py-8">
                            Calcule as projeções para ver recomendações personalizadas
                        </div>
                    </div>
                </div>
                
                <!-- Navegação -->
                <div class="flex justify-between pt-8 border-t border-gray-200">
                    <button onclick="app.abrirTab('resultados')" 
                            class="btn-outline px-8 py-3">
                        <i class="fas fa-arrow-left mr-2"></i>Voltar para Resultados
                    </button>
                    
                    <div class="flex space-x-4">
                        <button onclick="app.modulos.projecoes.exportarProjecoes()" 
                                class="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700">
                            <i class="fas fa-file-excel mr-2"></i>Exportar Projeções
                        </button>
                        
                        <button onclick="app.abrirTab('relatorio')" 
                                class="btn-primary px-8 py-3">
                            Gerar Relatório Final
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
        
        // Calcular automaticamente se houver dados
        if (this.app.dados.resultados.lucroMensal) {
            this.calcular();
        }
    }
    
    // Inicializar eventos
    inicializarEventos() {
        const inputs = ['periodoProjecao', 'taxaCrescimentoProjecao', 'inflacaoEstimada'];
        inputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('change', () => {
                    if (this.projecoesCalculadas) {
                        this.calcular();
                    }
                });
            }
        });
    }
    
    // Preencher dados existentes
    preencherDadosExistentes() {
        const dados = this.app.dados.projecoes;
        
        if (dados.periodo) {
            document.getElementById('periodoProjecao').value = dados.periodo;
        }
        if (dados.taxaCrescimento) {
            document.getElementById('taxaCrescimentoProjecao').value = dados.taxaCrescimento;
        }
        if (dados.inflacao) {
            document.getElementById('inflacaoEstimada').value = dados.inflacao;
        }
    }
    
    // Calcular projeções
    calcular() {
        try {
            console.log('📊 Calculando projeções...');
            
            // Verificar dados necessários
            const resultados = this.app.dados.resultados;
            if (!resultados.receitaMensal || !resultados.lucroMensal) {
                this.app.mostrarToast('Calcule os resultados primeiro', 'warning');
                return false;
            }
            
            // Coletar parâmetros
            const periodo = parseInt(document.getElementById('periodoProjecao')?.value) || 12;
            const taxaCrescimento = parseFloat(document.getElementById('taxaCrescimentoProjecao')?.value) || 5;
            const inflacao = parseFloat(document.getElementById('inflacaoEstimada')?.value) || 4.5;
            
            // Dados base
            const receitaBase = resultados.receitaMensal;
            const lucroBase = resultados.lucroMensal;
            const custoBase = resultados.custoTotalUnitario;
            const margemBase = resultados.margemLucro;
            
            // Calcular projeções para cada cenário
            const projecoes = {
                pessimista: this.calcularCenario(receitaBase, lucroBase, custoBase, periodo, -10, inflacao),
                realista: this.calcularCenario(receitaBase, lucroBase, custoBase, periodo, taxaCrescimento, inflacao),
                otimista: this.calcularCenario(receitaBase, lucroBase, custoBase, periodo, taxaCrescimento + 10, inflacao)
            };
            
            // Salvar dados
            this.app.dados.projecoes = {
                periodo,
                taxaCrescimento,
                inflacao,
                cenarios: projecoes,
                dataCalculo: new Date().toISOString()
            };
            
            // Atualizar interface
            this.atualizarCenarios(projecoes);
            this.atualizarGraficos(projecoes);
            this.atualizarTabelaDetalhada(projecoes.realista);
            this.atualizarViabilidade(projecoes.realista);
            this.gerarRecomendacoes(projecoes);
            
            // Salvar dados
            this.app.salvarDados();
            
            this.projecoesCalculadas = true;
            console.log('✅ Projeções calculadas com sucesso');
            
            this.app.mostrarToast('Projeções calculadas com sucesso!', 'success');
            return true;
            
        } catch (error) {
            console.error('❌ Erro ao calcular projeções:', error);
            this.app.mostrarToast('Erro ao calcular projeções', 'error');
            return false;
        }
    }
    
    // Calcular cenário específico
    calcularCenario(receitaBase, lucroBase, custoBase, periodo, crescimento, inflacao) {
        const meses = [];
        let receitaAcumulada = 0;
        let lucroAcumulado = 0;
        
        for (let mes = 1; mes <= periodo; mes++) {
            // Calcular crescimento composto
            const fatorCrescimento = Math.pow(1 + (crescimento / 100), mes - 1);
            const fatorInflacao = Math.pow(1 + (inflacao / 1200), mes - 1); // Inflação mensal
            
            // Receita projetada
            const receita = receitaBase * fatorCrescimento;
            
            // Custos projetados (consideram inflação)
            const custos = custoBase * fatorInflacao * (receita / receitaBase);
            
            // Lucro projetado
            const lucro = receita - custos;
            
            // Margem
            const margem = receita > 0 ? (lucro / receita) * 100 : 0;
            
            // Acumular
            receitaAcumulada += receita;
            lucroAcumulado += lucro;
            
            meses.push({
                mes,
                receita,
                custos,
                lucro,
                margem,
                receitaAcumulada,
                lucroAcumulado
            });
        }
        
        return {
            meses,
            totais: {
                receita: receitaAcumulada,
                lucro: lucroAcumulado,
                margem: receitaAcumulada > 0 ? (lucroAcumulado / receitaAcumulada) * 100 : 0
            }
        };
    }
    
    // Atualizar cards de cenários
    atualizarCenarios(projecoes) {
        // Pessimista
        this.atualizarElemento('faturamentoPessimista', this.app.formatarMoeda(projecoes.pessimista.totais.receita));
        this.atualizarElemento('lucroPessimista', this.app.formatarMoeda(projecoes.pessimista.totais.lucro));
        this.atualizarElemento('margemPessimista', projecoes.pessimista.totais.margem.toFixed(1) + '%');
        
        // Realista
        this.atualizarElemento('faturamentoRealista', this.app.formatarMoeda(projecoes.realista.totais.receita));
        this.atualizarElemento('lucroRealista', this.app.formatarMoeda(projecoes.realista.totais.lucro));
        this.atualizarElemento('margemRealista', projecoes.realista.totais.margem.toFixed(1) + '%');
        
        // Otimista
        this.atualizarElemento('faturamentoOtimista', this.app.formatarMoeda(projecoes.otimista.totais.receita));
        this.atualizarElemento('lucroOtimista', this.app.formatarMoeda(projecoes.otimista.totais.lucro));
        this.atualizarElemento('margemOtimista', projecoes.otimista.totais.margem.toFixed(1) + '%');
    }
    
    // Atualizar gráficos
    atualizarGraficos(projecoes) {
        this.atualizarGraficoProjecaoReceita(projecoes);
        this.atualizarGraficoFluxoCaixa(projecoes);
    }
    
    // Atualizar gráfico de projeção de receita
    atualizarGraficoProjecaoReceita(projecoes) {
        const canvas = document.getElementById('graficoProjecaoReceita');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Destruir gráfico anterior
        if (this.graficoProjecao) {
            this.graficoProjecao.destroy();
        }
        
        // Preparar dados
        const labels = projecoes.realista.meses.map(m => `Mês ${m.mes}`);
        
        // Criar gráfico
        this.graficoProjecao = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Pessimista',
                        data: projecoes.pessimista.meses.map(m => m.receita),
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderWidth: 2,
                        tension: 0.4
                    },
                    {
                        label: 'Realista',
                        data: projecoes.realista.meses.map(m => m.receita),
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 3,
                        tension: 0.4
                    },
                    {
                        label: 'Otimista',
                        data: projecoes.otimista.meses.map(m => m.receita),
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        borderWidth: 2,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `${context.dataset.label}: ${this.app.formatarMoeda(context.raw)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Receita (R$)'
                        }
                    }
                }
            }
        });
    }
    
    // Atualizar gráfico de fluxo de caixa
    atualizarGraficoFluxoCaixa(projecoes) {
        const canvas = document.getElementById('graficoFluxoCaixa');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Destruir gráfico anterior
        if (this.graficoFluxoCaixa) {
            this.graficoFluxoCaixa.destroy();
        }
        
        // Preparar dados (cenário realista)
        const labels = projecoes.realista.meses.map(m => `Mês ${m.mes}`);
        
        // Criar gráfico
        this.graficoFluxoCaixa = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Receitas',
                        data: projecoes.realista.meses.map(m => m.receita),
                        backgroundColor: '#10b981',
                        borderWidth: 0
                    },
                    {
                        label: 'Custos',
                        data: projecoes.realista.meses.map(m => -m.custos),
                        backgroundColor: '#ef4444',
                        borderWidth: 0
                    },
                    {
                        label: 'Lucro',
                        data: projecoes.realista.meses.map(m => m.lucro),
                        backgroundColor: '#3b82f6',
                        type: 'line',
                        borderColor: '#3b82f6',
                        borderWidth: 3,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const value = Math.abs(context.raw);
                                return `${context.dataset.label}: ${this.app.formatarMoeda(value)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Valor (R$)'
                        }
                    }
                }
            }
        });
    }
    
    // Atualizar tabela detalhada
    atualizarTabelaDetalhada(projecao) {
        const tbody = document.getElementById('tabelaProjecaoDetalhada');
        if (!tbody) return;
        
        let html = '';
        
        projecao.meses.forEach(mes => {
            html += `
                <tr>
                    <td class="font-medium">Mês ${mes.mes}</td>
                    <td class="text-green-600 font-medium">${this.app.formatarMoeda(mes.receita)}</td>
                    <td class="text-red-600">${this.app.formatarMoeda(mes.custos)}</td>
                    <td class="text-blue-600 font-medium">${this.app.formatarMoeda(mes.lucro)}</td>
                    <td>${mes.margem.toFixed(1)}%</td>
                    <td class="font-medium">${this.app.formatarMoeda(mes.lucroAcumulado)}</td>
                </tr>
            `;
        });
        
        tbody.innerHTML = html;
    }
    
    // Atualizar análise de viabilidade
    atualizarViabilidade(projecao) {
        const investimentoInicial = this.app.dados.produto.metaFaturamento || 10000;
        const taxaDesconto = 0.01; // 1% ao mês
        
        // ROI Acumulado
        const roiAcumulado = ((projecao.totais.lucro / investimentoInicial) * 100);
        
        // VPL (Valor Presente Líquido)
        let vpl = -investimentoInicial;
        projecao.meses.forEach((mes, index) => {
            vpl += mes.lucro / Math.pow(1 + taxaDesconto, index + 1);
        });
        
        // TIR (aproximação simplificada)
        const tir = this.calcularTIR(investimentoInicial, projecao.meses);
        
        // Payback
        let payback = 0;
        let acumulado = -investimentoInicial;
        for (let i = 0; i < projecao.meses.length; i++) {
            acumulado += projecao.meses[i].lucro;
            if (acumulado >= 0) {
                payback = i + 1;
                break;
            }
        }
        
        // Atualizar interface
        this.atualizarElemento('viabilidadeROI', roiAcumulado.toFixed(1) + '%');
        this.atualizarElemento('viabilidadeVPL', this.app.formatarMoeda(vpl));
        this.atualizarElemento('viabilidadeTIR', tir.toFixed(1) + '%');
        this.atualizarElemento('viabilidadePayback', payback || 'N/A');
        
        // Avaliar viabilidade
        this.avaliarViabilidade(roiAcumulado, vpl, tir, payback);
    }
    
    // Calcular TIR (Taxa Interna de Retorno) - método simplificado
    calcularTIR(investimento, meses) {
        // Método de aproximação por tentativa e erro
        let taxaMin = -0.5;
        let taxaMax = 0.5;
        let tir = 0;
        
        for (let i = 0; i < 100; i++) {
            tir = (taxaMin + taxaMax) / 2;
            let vpl = -investimento;
            
            meses.forEach((mes, index) => {
                vpl += mes.lucro / Math.pow(1 + tir, index + 1);
            });
            
            if (Math.abs(vpl) < 0.01) break;
            
            if (vpl > 0) {
                taxaMin = tir;
            } else {
                taxaMax = tir;
            }
        }
        
        return tir * 100 * 12; // Converter para taxa anual
    }
    
    // Avaliar viabilidade do negócio
    avaliarViabilidade(roi, vpl, tir, payback) {
        const container = document.getElementById('indicadorViabilidade');
        const texto = document.getElementById('textoViabilidade');
        
        if (!container || !texto) return;
        
        let avaliacao = '';
        let cor = '';
        let icone = '';
        
        // Determinar viabilidade
        if (vpl > 0 && tir > 12 && payback <= 18) {
            avaliacao = 'Negócio Altamente Viável';
            cor = 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 text-green-800';
            icone = 'fa-thumbs-up text-green-600';
        } else if (vpl > 0 && tir > 6 && payback <= 24) {
            avaliacao = 'Negócio Viável';
            cor = 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-300 text-blue-800';
            icone = 'fa-check-circle text-blue-600';
        } else if (vpl > 0) {
            avaliacao = 'Viabilidade Moderada';
            cor = 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-300 text-yellow-800';
            icone = 'fa-exclamation-circle text-yellow-600';
        } else {
            avaliacao = 'Viabilidade Questionável';
            cor = 'bg-gradient-to-r from-red-50 to-orange-50 border-red-300 text-red-800';
            icone = 'fa-times-circle text-red-600';
        }
        
        let descricao = '';
        if (vpl > 0) {
            descricao = `O VPL positivo de ${this.app.formatarMoeda(vpl)} indica que o investimento é lucrativo. `;
        } else {
            descricao = `O VPL negativo de ${this.app.formatarMoeda(vpl)} indica que o investimento pode não ser viável. `;
        }
        
        if (tir > 12) {
            descricao += `A TIR de ${tir.toFixed(1)}% demonstra ótimo retorno sobre investimento. `;
        } else if (tir > 6) {
            descricao += `A TIR de ${tir.toFixed(1)}% é aceitável. `;
        } else {
            descricao += `A TIR de ${tir.toFixed(1)}% está abaixo do esperado. `;
        }
        
        if (payback && payback <= 12) {
            descricao += `O payback de ${payback} meses é excelente.`;
        } else if (payback && payback <= 24) {
            descricao += `O payback de ${payback} meses é razoável.`;
        } else {
            descricao += `O payback pode ser muito longo para viabilidade.`;
        }
        
        container.className = `mt-6 p-4 rounded-lg border ${cor}`;
        
        const iconElement = container.querySelector('i');
        if (iconElement) {
            iconElement.className = `fas ${icone} text-2xl mr-3`;
        }
        
        const titleElement = container.querySelector('.font-bold');
        if (titleElement) {
            titleElement.textContent = avaliacao;
        }
        
        texto.textContent = descricao;
    }
    
    // Gerar recomendações estratégicas
    gerarRecomendacoes(projecoes) {
        const container = document.getElementById('recomendacoesEstrategicas');
        if (!container) return;
        
        const recomendacoes = [];
        const realista = projecoes.realista;
        
        // Análise de margem
        if (realista.totais.margem < 20) {
            recomendacoes.push({
                tipo: 'alerta',
                titulo: 'Margem de Lucro Baixa',
                descricao: `A margem projetada de ${realista.totais.margem.toFixed(1)}% está abaixo do ideal.`,
                acao: 'Considere aumentar preços ou reduzir custos operacionais.'
            });
        }
        
        // Análise de crescimento
        const taxaCrescimento = parseFloat(document.getElementById('taxaCrescimentoProjecao')?.value) || 5;
        if (taxaCrescimento < 5) {
            recomendacoes.push({
                tipo: 'info',
                titulo: 'Potencial de Crescimento',
                descricao: 'Seu crescimento projetado está conservador.',
                acao: 'Invista em marketing e vendas para acelerar o crescimento.'
            });
        }
        
        // Comparação de cenários
        const diferenca = ((projecoes.otimista.totais.lucro - projecoes.pessimista.totais.lucro) / projecoes.pessimista.totais.lucro) * 100;
        if (diferenca > 100) {
            recomendacoes.push({
                tipo: 'sucesso',
                titulo: 'Grande Potencial de Melhoria',
                descricao: `Há ${diferenca.toFixed(0)}% de diferença entre o melhor e pior cenário.`,
                acao: 'Foque em estratégias que o aproximem do cenário otimista.'
            });
        }
        
        // Análise de payback
        const investimento = this.app.dados.produto.metaFaturamento || 10000;
        let payback = 0;
        let acumulado = -investimento;
        for (let i = 0; i < realista.meses.length; i++) {
            acumulado += realista.meses[i].lucro;
            if (acumulado >= 0) {
                payback = i + 1;
                break;
            }
        }
        
        if (payback > 24) {
            recomendacoes.push({
                tipo: 'alerta',
                titulo: 'Retorno Demorado',
                descricao: `O investimento levará ${payback} meses para retornar.`,
                acao: 'Busque formas de acelerar o retorno reduzindo custos iniciais.'
            });
        }
        
        // Recomendação de consultoria
        recomendacoes.push({
            tipo: 'consultoria',
            titulo: 'Consultoria Profissional',
            descricao: 'Estas projeções são estimativas. Para um planejamento mais preciso...',
            acao: 'Agende uma consultoria com a Brayan Contabilidade para análise detalhada.'
        });
        
        // Renderizar recomendações
        let html = '<div class="space-y-4">';
        
        recomendacoes.forEach(rec => {
            const cores = {
                sucesso: 'alerta-sucesso',
                alerta: 'alerta-alerta',
                info: 'alerta-info',
                consultoria: 'alerta-info'
            };
            
            html += `
                <div class="alerta-financeiro ${cores[rec.tipo]}">
                    <div class="alerta-icon">
                        <i class="fas fa-${rec.tipo === 'sucesso' ? 'check-circle' : rec.tipo === 'alerta' ? 'exclamation-triangle' : 'info-circle'}"></i>
                    </div>
                    <div class="alerta-conteudo">
                        <div class="alerta-titulo">${rec.titulo}</div>
                        <div class="alerta-mensagem">${rec.descricao}</div>
                        <div class="mt-2 text-sm font-medium">${rec.acao}</div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
    }
    
    // Exportar projeções
    exportarProjecoes() {
        if (!this.projecoesCalculadas) {
            this.app.mostrarToast('Calcule as projeções primeiro', 'warning');
            return;
        }
        
        try {
            const projecoes = this.app.dados.projecoes;
            
            // Criar CSV
            let csv = 'Projeções Financeiras - Brayan Contabilidade\n\n';
            csv += 'Mês,Receita,Custos,Lucro,Margem,Lucro Acumulado\n';
            
            projecoes.cenarios.realista.meses.forEach(mes => {
                csv += `${mes.mes},${mes.receita.toFixed(2)},${mes.custos.toFixed(2)},${mes.lucro.toFixed(2)},${mes.margem.toFixed(2)},${mes.lucroAcumulado.toFixed(2)}\n`;
            });
            
            csv += '\n\nResumo dos Cenários\n';
            csv += 'Cenário,Receita Total,Lucro Total,Margem\n';
            csv += `Pessimista,${projecoes.cenarios.pessimista.totais.receita.toFixed(2)},${projecoes.cenarios.pessimista.totais.lucro.toFixed(2)},${projecoes.cenarios.pessimista.totais.margem.toFixed(2)}\n`;
            csv += `Realista,${projecoes.cenarios.realista.totais.receita.toFixed(2)},${projecoes.cenarios.realista.totais.lucro.toFixed(2)},${projecoes.cenarios.realista.totais.margem.toFixed(2)}\n`;
            csv += `Otimista,${projecoes.cenarios.otimista.totais.receita.toFixed(2)},${projecoes.cenarios.otimista.totais.lucro.toFixed(2)},${projecoes.cenarios.otimista.totais.margem.toFixed(2)}\n`;
            
            // Download
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `projecoes-financeiras-${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            this.app.mostrarToast('Projeções exportadas com sucesso!', 'success');
            
        } catch (error) {
            console.error('Erro ao exportar projeções:', error);
            this.app.mostrarToast('Erro ao exportar projeções', 'error');
        }
    }
    
    // Atualizar elemento por ID
    atualizarElemento(id, valor) {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.textContent = valor;
        }
    }
    
    // Coletar dados do módulo
    coletarDados() {
        return this.app.dados.projecoes;
    }
}

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModuloProjecoes;
}
