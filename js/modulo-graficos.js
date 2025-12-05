// modulo-graficos.js - Módulo para gerenciamento de gráficos e visualizações

class ModuloGraficos {
    constructor(app) {
        this.app = app;
        this.graficosAtivos = new Map();
        this.config = {
            cores: {
                primaria: '#3b82f6',
                sucesso: '#10b981',
                erro: '#ef4444',
                alerta: '#f59e0b',
                neutra: '#6b7280',
                serie1: '#3b82f6',
                serie2: '#10b981',
                serie3: '#8b5cf6',
                serie4: '#f59e0b',
                serie5: '#ef4444'
            },
            animacao: {
                duracao: 1000,
                easing: 'easeOutQuart'
            }
        };
    }
    
    // Inicializar gráficos do dashboard
    async inicializarGraficosDashboard() {
        try {
            console.log('📊 Inicializando gráficos do dashboard...');
            
            // Inicializar gráficos principais
            await this.inicializarGraficoReceitasCustos();
            await this.inicializarGraficoDistribuicaoCustos();
            
            console.log('✅ Gráficos do dashboard inicializados');
            
        } catch (error) {
            console.error('❌ Erro ao inicializar gráficos:', error);
        }
    }
    
    // Atualizar todos os gráficos do dashboard
    atualizarGraficosDashboard() {
        try {
            this.atualizarGraficoReceitasCustos();
            this.atualizarGraficoDistribuicaoCustos();
            
            // Atualizar outros gráficos se estiverem visíveis
            this.atualizarGraficoProjecoes();
            this.atualizarGraficoComparacaoMercado();
            
        } catch (error) {
            console.error('❌ Erro ao atualizar gráficos:', error);
        }
    }
    
    // Inicializar gráfico de receitas vs custos
    inicializarGraficoReceitasCustos() {
        const canvas = document.getElementById('graficoReceitasCustos');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Criar gráfico inicial
        const grafico = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [
                    {
                        label: 'Receitas',
                        data: [12000, 15000, 18000, 14000, 20000, 22000],
                        backgroundColor: this.config.cores.sucesso + '80',
                        borderColor: this.config.cores.sucesso,
                        borderWidth: 2
                    },
                    {
                        label: 'Custos',
                        data: [8000, 9000, 11000, 8500, 12000, 13000],
                        backgroundColor: this.config.cores.erro + '80',
                        borderColor: this.config.cores.erro,
                        borderWidth: 2
                    },
                    {
                        label: 'Lucro',
                        data: [4000, 6000, 7000, 5500, 8000, 9000],
                        backgroundColor: this.config.cores.primaria + '80',
                        borderColor: this.config.cores.primaria,
                        borderWidth: 2,
                        type: 'line',
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
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => this.app.formatarMoeda(value)
                        }
                    }
                }
            }
        });
        
        this.graficosAtivos.set('receitasCustos', grafico);
    }
    
    // Atualizar gráfico de receitas vs custos com dados reais
    atualizarGraficoReceitasCustos() {
        const grafico = this.graficosAtivos.get('receitasCustos');
        if (!grafico) return;
        
        const resultados = this.app.dados.resultados;
        const custos = this.app.dados.custos;
        
        if (!resultados.receitaMensal || !custos.custoTotalMensal) return;
        
        // Gerar dados dos últimos 6 meses (com projeção)
        const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
        const receitas = [];
        const custosData = [];
        const lucros = [];
        
        let receitaBase = resultados.receitaMensal * 0.7; // Simulando crescimento
        let custoBase = custos.custoTotalMensal * 0.7;
        
        for (let i = 0; i < 6; i++) {
            const crescimento = 1 + (i * 0.05); // 5% de crescimento mensal
            receitas.push(receitaBase * crescimento);
            custosData.push(custoBase * crescimento);
            lucros.push((receitaBase * crescimento) - (custoBase * crescimento));
        }
        
        grafico.data.labels = meses;
        grafico.data.datasets[0].data = receitas;
        grafico.data.datasets[1].data = custosData;
        grafico.data.datasets[2].data = lucros;
        
        grafico.update();
    }
    
    // Inicializar gráfico de distribuição de custos
    inicializarGraficoDistribuicaoCustos() {
        const canvas = document.getElementById('graficoDistribuicaoCustos');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Criar gráfico inicial
        const grafico = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Matéria-Prima', 'Mão de Obra', 'Custos Fixos', 'Impostos', 'Marketing'],
                datasets: [{
                    data: [30, 25, 20, 15, 10],
                    backgroundColor: [
                        this.config.cores.serie1,
                        this.config.cores.serie2,
                        this.config.cores.serie3,
                        this.config.cores.serie4,
                        this.config.cores.serie5
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
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((context.raw / total) * 100);
                                return `${context.label}: ${percentage}%`;
                            }
                        }
                    }
                }
            }
        });
        
        this.graficosAtivos.set('distribuicaoCustos', grafico);
    }
    
    // Atualizar gráfico de distribuição de custos
    atualizarGraficoDistribuicaoCustos() {
        const grafico = this.graficosAtivos.get('distribuicaoCustos');
        if (!grafico) return;
        
        const custos = this.app.dados.custos;
        if (!custos.custoTotalMensal) return;
        
        // Calcular distribuição baseada nos dados
        const materiaPrima = custos.materiaPrima * (this.app.dados.produto.qtdVendaMensal || 100);
        const maoDeObra = custos.salarios || 0;
        const custosFixos = (custos.custoFixoMensal || 0) - maoDeObra;
        const impostos = custos.impostosVenda ? (custos.impostosVenda / 100) * (this.app.dados.resultados.receitaMensal || 0) : 0;
        const marketing = custos.marketing || 0;
        
        grafico.data.datasets[0].data = [
            materiaPrima,
            maoDeObra,
            custosFixos,
            impostos,
            marketing
        ];
        
        grafico.update();
    }
    
    // Criar gráfico de projeções
    criarGraficoProjecoes(dados) {
        const canvas = document.createElement('canvas');
        canvas.id = 'graficoProjecoes';
        
        const ctx = canvas.getContext('2d');
        
        const grafico = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dados.labels || ['Mês 1', 'Mês 2', 'Mês 3', 'Mês 4', 'Mês 5', 'Mês 6'],
                datasets: [
                    {
                        label: 'Receitas Projetadas',
                        data: dados.receitas || [],
                        borderColor: this.config.cores.sucesso,
                        backgroundColor: this.config.cores.sucesso + '20',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Custos Projetados',
                        data: dados.custos || [],
                        borderColor: this.config.cores.erro,
                        backgroundColor: this.config.cores.erro + '20',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Lucro Projetado',
                        data: dados.lucros || [],
                        borderColor: this.config.cores.primaria,
                        backgroundColor: this.config.cores.primaria + '20',
                        fill: true,
                        tension: 0.4
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
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => this.app.formatarMoeda(value)
                        }
                    }
                }
            }
        });
        
        this.graficosAtivos.set('projecoes', grafico);
        return canvas;
    }
    
    // Atualizar gráfico de projeções
    atualizarGraficoProjecoes() {
        const grafico = this.graficosAtivos.get('projecoes');
        if (!grafico) return;
        
        // Implementar lógica de atualização
        grafico.update();
    }
    
    // Criar gráfico de comparação de mercado
    criarGraficoComparacaoMercado(dados) {
        const canvas = document.createElement('canvas');
        canvas.id = 'graficoComparacaoMercado';
        
        const ctx = canvas.getContext('2d');
        
        const grafico = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Preço', 'Qualidade', 'Atendimento', 'Prazo', 'Customização'],
                datasets: [
                    {
                        label: 'Sua Empresa',
                        data: dados.empresa || [8, 7, 9, 6, 8],
                        backgroundColor: this.config.cores.primaria + '40',
                        borderColor: this.config.cores.primaria,
                        borderWidth: 2
                    },
                    {
                        label: 'Concorrente 1',
                        data: dados.concorrente1 || [7, 6, 8, 9, 5],
                        backgroundColor: this.config.cores.serie2 + '40',
                        borderColor: this.config.cores.serie2,
                        borderWidth: 2
                    },
                    {
                        label: 'Concorrente 2',
                        data: dados.concorrente2 || [9, 8, 7, 6, 7],
                        backgroundColor: this.config.cores.serie3 + '40',
                        borderColor: this.config.cores.serie3,
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 10,
                        ticks: {
                            stepSize: 2
                        }
                    }
                }
            }
        });
        
        this.graficosAtivos.set('comparacaoMercado', grafico);
        return canvas;
    }
    
    // Atualizar gráfico de comparação de mercado
    atualizarGraficoComparacaoMercado() {
        const grafico = this.graficosAtivos.get('comparacaoMercado');
        if (!grafico) return;
        
        // Implementar lógica de atualização
        grafico.update();
    }
    
    // Criar gráfico de ponto de equilíbrio
    criarGraficoPontoEquilibrio(dados) {
        const canvas = document.createElement('canvas');
        canvas.id = 'graficoPontoEquilibrio';
        
        const ctx = canvas.getContext('2d');
        
        const grafico = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dados.labels || [],
                datasets: [
                    {
                        label: 'Receita Total',
                        data: dados.receitas || [],
                        borderColor: this.config.cores.sucesso,
                        backgroundColor: 'transparent',
                        borderWidth: 3
                    },
                    {
                        label: 'Custo Total',
                        data: dados.custos || [],
                        borderColor: this.config.cores.erro,
                        backgroundColor: 'transparent',
                        borderWidth: 3
                    },
                    {
                        label: 'Ponto de Equilíbrio',
                        data: dados.pontoEquilibrio || [],
                        borderColor: this.config.cores.alerta,
                        backgroundColor: 'transparent',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        pointRadius: 6,
                        pointBackgroundColor: this.config.cores.alerta
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
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Valor (R$)'
                        },
                        ticks: {
                            callback: (value) => this.app.formatarMoeda(value)
                        }
                    }
                }
            }
        });
        
        this.graficosAtivos.set('pontoEquilibrio', grafico);
        return canvas;
    }
    
    // Criar gráfico de composição do preço
    criarGraficoComposicaoPreco(dados) {
        const canvas = document.createElement('canvas');
        canvas.id = 'graficoComposicaoPreco';
        
        const ctx = canvas.getContext('2d');
        
        const grafico = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: dados.labels || [],
                datasets: [{
                    data: dados.valores || [],
                    backgroundColor: [
                        this.config.cores.serie1,
                        this.config.cores.serie2,
                        this.config.cores.serie3,
                        this.config.cores.serie4,
                        this.config.cores.serie5
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.raw / total) * 100).toFixed(1);
                                return `${context.label}: ${this.app.formatarMoeda(context.raw)} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
        
        this.graficosAtivos.set('composicaoPreco', grafico);
        return canvas;
    }
    
    // Destruir todos os gráficos ativos
    destruirGraficos() {
        this.graficosAtivos.forEach((grafico, key) => {
            try {
                grafico.destroy();
            } catch (error) {
                console.warn(`⚠️ Erro ao destruir gráfico ${key}:`, error);
            }
        });
        this.graficosAtivos.clear();
    }
    
    // Destruir gráfico específico
    destruirGrafico(nome) {
        const grafico = this.graficosAtivos.get(nome);
        if (grafico) {
            grafico.destroy();
            this.graficosAtivos.delete(nome);
        }
    }
    
    // Exportar gráfico como imagem
    exportarGraficoComoImagem(nomeGrafico, formato = 'png') {
        const grafico = this.graficosAtivos.get(nomeGrafico);
        if (!grafico) {
            this.app.mostrarToast('Gráfico não encontrado', 'error');
            return null;
        }
        
        try {
            const canvas = grafico.canvas;
            const imagem = canvas.toDataURL(`image/${formato}`);
            
            // Criar link para download
            const link = document.createElement('a');
            link.href = imagem;
            link.download = `grafico-${nomeGrafico}-${new Date().toISOString().split('T')[0]}.${formato}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            this.app.mostrarToast(`Gráfico exportado como ${formato.toUpperCase()}`, 'success');
            return imagem;
            
        } catch (error) {
            console.error('❌ Erro ao exportar gráfico:', error);
            this.app.mostrarToast('Erro ao exportar gráfico', 'error');
            return null;
        }
    }
    
    // Gerar dados para gráfico de tendência
    gerarDadosTendencia(meses = 12) {
        const dados = {
            labels: [],
            receitas: [],
            custos: [],
            lucros: []
        };
        
        const resultados = this.app.dados.resultados;
        const custos = this.app.dados.custos;
        const taxaCrescimento = this.app.dados.produto.taxaCrescimento || 5;
        
        if (!resultados.receitaMensal || !custos.custoTotalMensal) {
            return dados;
        }
        
        for (let i = 0; i < meses; i++) {
            const mes = new Date();
            mes.setMonth(mes.getMonth() + i);
            dados.labels.push(mes.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' }));
            
            const crescimento = Math.pow(1 + (taxaCrescimento / 100), i);
            
            const receita = resultados.receitaMensal * crescimento;
            const custo = custos.custoTotalMensal * (1 + (i * 0.03)); // Custos crescem 3% ao mês
            const lucro = receita - custo;
            
            dados.receitas.push(receita);
            dados.custos.push(custo);
            dados.lucros.push(lucro);
        }
        
        return dados;
    }
    
    // Gerar gráfico de análise de sensibilidade
    criarGraficoSensibilidade(dados) {
        const canvas = document.createElement('canvas');
        canvas.id = 'graficoSensibilidade';
        
        const ctx = canvas.getContext('2d');
        
        const grafico = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dados.labels || [],
                datasets: [
                    {
                        label: 'Margem de Lucro',
                        data: dados.margens || [],
                        backgroundColor: this.config.cores.primaria,
                        borderColor: this.config.cores.primaria,
                        borderWidth: 1
                    },
                    {
                        label: 'Lucro Total',
                        data: dados.lucros || [],
                        backgroundColor: this.config.cores.sucesso,
                        borderColor: this.config.cores.sucesso,
                        borderWidth: 1,
                        type: 'line',
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
                                if (context.dataset.label === 'Margem de Lucro') {
                                    return `${context.dataset.label}: ${context.raw}%`;
                                }
                                return `${context.dataset.label}: ${this.app.formatarMoeda(context.raw)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => {
                                if (value < 1000) return `${value}%`;
                                return this.app.formatarMoeda(value);
                            }
                        }
                    }
                }
            }
        });
        
        this.graficosAtivos.set('sensibilidade', grafico);
        return canvas;
    }
}

// Exportar módulo para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModuloGraficos;
}
