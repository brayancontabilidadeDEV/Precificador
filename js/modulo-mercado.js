// modulo-mercado.js - Módulo para análise de mercado

class ModuloMercado {
    constructor(app) {
        this.app = app;
        this.dadosConcorrencia = null;
        this.valorPercebido = 7.5;
        this.canaisVenda = {
            diretas: { percentual: 40, taxa: 5 },
            marketplaces: { percentual: 35, taxa: 15 },
            redesSociais: { percentual: 25, taxa: 10 }
        };
    }
    
    // Gerar conteúdo HTML do módulo
    gerarConteudo() {
        return `
            <div class="animate-fade-in">
                <!-- Cabeçalho -->
                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-gray-900 mb-2">Análise de Mercado</h1>
                    <p class="text-gray-600">Posicione seu produto no mercado e entenda a concorrência</p>
                </div>
                
                <!-- Pesquisa de Concorrência -->
                <div class="card mb-8">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-search text-blue-500"></i>
                            Pesquisa de Concorrência
                        </h3>
                        <p class="text-sm text-gray-600 mt-1">Compare seu preço com os principais concorrentes</p>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="form-group">
                            <label class="form-label">Preço Mínimo da Concorrência</label>
                            <div class="relative">
                                <span class="absolute left-3 top-3 text-gray-500">R$</span>
                                <input type="number" 
                                       id="precoMinConcorrencia" 
                                       class="form-control-professional pl-10"
                                       step="0.01"
                                       min="0"
                                       placeholder="0,00">
                            </div>
                            <div class="text-xs text-gray-600 mt-1">Menor preço encontrado no mercado</div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Preço Médio da Concorrência</label>
                            <div class="relative">
                                <span class="absolute left-3 top-3 text-gray-500">R$</span>
                                <input type="number" 
                                       id="precoMedioConcorrencia" 
                                       class="form-control-professional pl-10"
                                       step="0.01"
                                       min="0"
                                       placeholder="0,00">
                            </div>
                            <div class="text-xs text-gray-600 mt-1">Preço médio praticado pelos concorrentes</div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Preço Máximo da Concorrência</label>
                            <div class="relative">
                                <span class="absolute left-3 top-3 text-gray-500">R$</span>
                                <input type="number" 
                                       id="precoMaxConcorrencia" 
                                       class="form-control-professional pl-10"
                                       step="0.01"
                                       min="0"
                                       placeholder="0,00">
                            </div>
                            <div class="text-xs text-gray-600 mt-1">Maior preço encontrado no mercado</div>
                        </div>
                    </div>
                    
                    <div class="mt-6">
                        <button onclick="app.modulos.mercado.analisarConcorrencia()" 
                                class="btn-primary px-8 py-3">
                            <i class="fas fa-chart-line mr-2"></i>
                            Analisar Posicionamento
                        </button>
                    </div>
                </div>
                
                <!-- Posicionamento no Mercado -->
                <div id="resultadoPosicionamento" class="hidden">
                    <div class="card mb-8">
                        <div class="card-header">
                            <h3 class="card-title">
                                <i class="fas fa-bullseye text-green-500"></i>
                                Posicionamento no Mercado
                            </h3>
                        </div>
                        
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <!-- Análise Visual -->
                            <div>
                                <div class="mb-6">
                                    <div class="flex justify-between mb-2">
                                        <span class="text-gray-700">Sua Posição:</span>
                                        <span id="posicaoMercado" class="font-bold text-green-600">No preço médio</span>
                                    </div>
                                    
                                    <div class="relative h-6 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full overflow-hidden mb-1">
                                        <div id="marcadorPosicao" class="absolute top-0 bottom-0 w-2 bg-blue-600 transform -translate-x-1/2"></div>
                                    </div>
                                    
                                    <div class="flex justify-between text-xs text-gray-600">
                                        <span>Mais Barato</span>
                                        <span>Médio</span>
                                        <span>Premium</span>
                                    </div>
                                </div>
                                
                                <!-- Métricas -->
                                <div class="space-y-4">
                                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span class="text-gray-700">Diferença para Média:</span>
                                        <span id="diferencaMedia" class="font-bold text-blue-600">+0%</span>
                                    </div>
                                    
                                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span class="text-gray-700">Vantagem Competitiva:</span>
                                        <span id="vantagemCompetitiva" class="font-bold text-green-600">Boa</span>
                                    </div>
                                    
                                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span class="text-gray-700">Espaço para Aumento:</span>
                                        <span id="espacoAumento" class="font-bold text-orange-600">0%</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Gráfico de Comparação -->
                            <div>
                                <div class="chart-container-pro h-64">
                                    <canvas id="graficoComparacaoConcorrencia"></canvas>
                                </div>
                                
                                <div class="mt-4 p-4 bg-blue-50 rounded-lg">
                                    <div class="flex items-start">
                                        <i class="fas fa-lightbulb text-blue-500 mt-1 mr-3"></i>
                                        <div>
                                            <div class="font-medium text-blue-800">Recomendação da Brayan Contabilidade</div>
                                            <div class="text-sm text-blue-700 mt-1" id="recomendacaoPosicionamento">
                                                Analise a concorrência primeiro para ver recomendações.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Análise de Valor Percebido -->
                <div class="card mb-8">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-star text-purple-500"></i>
                            Análise de Valor Percebido
                        </h3>
                        <p class="text-sm text-gray-600 mt-1">Avalie como seu cliente percebe o valor do seu produto</p>
                    </div>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <!-- Fatores de Valor -->
                        <div>
                            <div class="space-y-6">
                                <div>
                                    <div class="flex justify-between mb-2">
                                        <span class="text-gray-700">Qualidade do Produto/Serviço</span>
                                        <span id="valorQualidadeScore" class="font-bold">8/10</span>
                                    </div>
                                    <input type="range" 
                                           id="valorQualidade" 
                                           min="1" 
                                           max="10" 
                                           value="8"
                                           class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-valor">
                                    <div class="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>Baixa</span>
                                        <span>Alta</span>
                                    </div>
                                </div>
                                
                                <div>
                                    <div class="flex justify-between mb-2">
                                        <span class="text-gray-700">Atendimento/Suporte</span>
                                        <span id="valorAtendimentoScore" class="font-bold">7/10</span>
                                    </div>
                                    <input type="range" 
                                           id="valorAtendimento" 
                                           min="1" 
                                           max="10" 
                                           value="7"
                                           class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-valor">
                                    <div class="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>Baixo</span>
                                        <span>Alto</span>
                                    </div>
                                </div>
                                
                                <div>
                                    <div class="flex justify-between mb-2">
                                        <span class="text-gray-700">Marca/Reputação</span>
                                        <span id="valorMarcaScore" class="font-bold">6/10</span>
                                    </div>
                                    <input type="range" 
                                           id="valorMarca" 
                                           min="1" 
                                           max="10" 
                                           value="6"
                                           class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-valor">
                                    <div class="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>Baixa</span>
                                        <span>Alta</span>
                                    </div>
                                </div>
                                
                                <div>
                                    <div class="flex justify-between mb-2">
                                        <span class="text-gray-700">Exclusividade/Diferenciais</span>
                                        <span id="valorExclusividadeScore" class="font-bold">5/10</span>
                                    </div>
                                    <input type="range" 
                                           id="valorExclusividade" 
                                           min="1" 
                                           max="10" 
                                           value="5"
                                           class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-valor">
                                    <div class="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>Comum</span>
                                        <span>Exclusivo</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Score e Análise -->
                        <div>
                            <div class="flex flex-col items-center justify-center h-full">
                                <!-- Gráfico Circular -->
                                <div class="relative w-48 h-48 mb-6">
                                    <svg class="progress-ring" width="192" height="192">
                                        <circle class="progress-ring__circle" 
                                                stroke="#8b5cf6" 
                                                stroke-width="12" 
                                                fill="transparent" 
                                                r="90" 
                                                cx="96" 
                                                cy="96"/>
                                    </svg>
                                    <div class="absolute inset-0 flex items-center justify-center">
                                        <div class="text-center">
                                            <div id="valorPercebidoScore" class="text-4xl font-bold text-purple-600">7.5</div>
                                            <div class="text-sm text-gray-600">/10 pontos</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="text-center">
                                    <div id="nivelValorPercebido" class="text-xl font-bold text-purple-700 mb-2">Valor Alto</div>
                                    <div class="text-sm text-gray-600 mb-4">Seu produto/serviço é bem valorizado</div>
                                    
                                    <div class="p-3 bg-purple-50 rounded-lg">
                                        <div class="text-sm text-purple-700">
                                            <i class="fas fa-chart-line mr-2"></i>
                                            Premium Permitido: <span id="premiumPermitido" class="font-bold">15-20%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                        <div class="flex items-start">
                            <i class="fas fa-lightbulb text-purple-500 mt-1 mr-3"></i>
                            <div>
                                <div class="font-medium text-purple-800">Como usar o Valor Percebido</div>
                                <div class="text-sm text-purple-700 mt-1">
                                    Quanto maior o valor percebido, maior o preço premium que você pode cobrar. 
                                    Diferenciais claros permitem preços até 50% acima da média.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Análise de Canais de Venda -->
                <div class="card mb-8">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-shopping-cart text-green-500"></i>
                            Análise de Canais de Venda
                        </h3>
                        <p class="text-sm text-gray-600 mt-1">Distribuição de vendas e custos por canal</p>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <!-- Vendas Diretas -->
                        <div class="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                            <div class="flex items-center mb-3">
                                <div class="p-3 bg-green-100 rounded-lg mr-3">
                                    <i class="fas fa-store text-green-600"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-green-800">Vendas Diretas</h4>
                                    <div class="text-xs text-green-600">Loja física, WhatsApp, telefone</div>
                                </div>
                            </div>
                            
                            <div class="text-3xl font-bold text-green-600 mb-2" id="percentualDiretas">40%</div>
                            
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-gray-700 mb-1">Participação nas Vendas</label>
                                <input type="range" 
                                       id="participacaoDiretas" 
                                       min="0" 
                                       max="100" 
                                       value="40"
                                       class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Taxa Média (%)</label>
                                <div class="relative">
                                    <input type="number" 
                                           id="taxaDiretas" 
                                           class="form-control-professional pr-10"
                                           value="5"
                                           min="0"
                                           max="100"
                                           step="0.1">
                                    <span class="absolute right-3 top-3 text-gray-500">%</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Marketplaces -->
                        <div class="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                            <div class="flex items-center mb-3">
                                <div class="p-3 bg-blue-100 rounded-lg mr-3">
                                    <i class="fas fa-globe text-blue-600"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-blue-800">Marketplaces</h4>
                                    <div class="text-xs text-blue-600">Mercado Livre, Amazon, Shopee</div>
                                </div>
                            </div>
                            
                            <div class="text-3xl font-bold text-blue-600 mb-2" id="percentualMarketplaces">35%</div>
                            
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-gray-700 mb-1">Participação nas Vendas</label>
                                <input type="range" 
                                       id="participacaoMarketplaces" 
                                       min="0" 
                                       max="100" 
                                       value="35"
                                       class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Taxa Média (%)</label>
                                <div class="relative">
                                    <input type="number" 
                                           id="taxaMarketplaces" 
                                           class="form-control-professional pr-10"
                                           value="15"
                                           min="0"
                                           max="100"
                                           step="0.1">
                                    <span class="absolute right-3 top-3 text-gray-500">%</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Redes Sociais -->
                        <div class="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                            <div class="flex items-center mb-3">
                                <div class="p-3 bg-purple-100 rounded-lg mr-3">
                                    <i class="fas fa-hashtag text-purple-600"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-purple-800">Redes Sociais</h4>
                                    <div class="text-xs text-purple-600">Instagram, Facebook, TikTok</div>
                                </div>
                            </div>
                            
                            <div class="text-3xl font-bold text-purple-600 mb-2" id="percentualRedesSociais">25%</div>
                            
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-gray-700 mb-1">Participação nas Vendas</label>
                                <input type="range" 
                                       id="participacaoRedesSociais" 
                                       min="0" 
                                       max="100" 
                                       value="25"
                                       class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Taxa Média (%)</label>
                                <div class="relative">
                                    <input type="number" 
                                           id="taxaRedesSociais" 
                                           class="form-control-professional pr-10"
                                           value="10"
                                           min="0"
                                           max="100"
                                           step="0.1">
                                    <span class="absolute right-3 top-3 text-gray-500">%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-6">
                        <div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                            <div>
                                <div class="font-medium text-gray-800">Taxa Média Ponderada</div>
                                <div class="text-sm text-gray-600">Considerando a distribuição por canal</div>
                            </div>
                            <div id="taxaMediaPonderada" class="text-2xl font-bold text-blue-600">9.25%</div>
                        </div>
                    </div>
                </div>
                
                <!-- Navegação -->
                <div class="flex justify-between mt-8 pt-8 border-t border-gray-200">
                    <button onclick="app.abrirTab('precificacao')" 
                            class="btn-outline px-8 py-3">
                        <i class="fas fa-arrow-left mr-2"></i>Voltar para Precificação
                    </button>
                    
                    <div class="flex space-x-4">
                        <button onclick="app.modulos.mercado.calcularTudo()" 
                                class="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700">
                            <i class="fas fa-sync-alt mr-2"></i>Atualizar Análise
                        </button>
                        
                        <button onclick="app.abrirTab('resultados')" 
                                class="btn-primary px-8 py-3">
                            Ver Resultados Financeiros
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
        this.calcularValorPercebido();
        this.calcularTaxaMedia();
        
        // Mostrar resultados se já houver dados
        if (this.app.dados.mercado.precoMedio) {
            this.mostrarResultados();
        }
    }
    
    // Inicializar eventos específicos
    inicializarEventos() {
        // Eventos para valor percebido
        const slidersValor = ['valorQualidade', 'valorAtendimento', 'valorMarca', 'valorExclusividade'];
        slidersValor.forEach(id => {
            const slider = document.getElementById(id);
            const score = document.getElementById(`${id}Score`);
            
            if (slider && score) {
                slider.addEventListener('input', (e) => {
                    score.textContent = `${e.target.value}/10`;
                    this.calcularValorPercebido();
                });
            }
        });
        
        // Eventos para canais de venda
        const inputsCanais = [
            'participacaoDiretas', 'taxaDiretas',
            'participacaoMarketplaces', 'taxaMarketplaces',
            'participacaoRedesSociais', 'taxaRedesSociais'
        ];
        
        inputsCanais.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', () => {
                    this.atualizarPercentuaisCanais();
                    this.calcularTaxaMedia();
                });
            }
        });
        
        // Eventos para concorrência
        const inputsConcorrencia = ['precoMinConcorrencia', 'precoMedioConcorrencia', 'precoMaxConcorrencia'];
        inputsConcorrencia.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', () => {
                    // Atualizar em tempo real se todos estiverem preenchidos
                    const todosPreenchidos = inputsConcorrencia.every(inputId => {
                        const val = document.getElementById(inputId)?.value;
                        return val && parseFloat(val) > 0;
                    });
                    
                    if (todosPreenchidos) {
                        this.analisarConcorrencia();
                    }
                });
            }
        });
    }
    
    // Preencher dados existentes
    preencherDadosExistentes() {
        const dados = this.app.dados.mercado;
        
        // Concorrência
        if (dados.precoMin) {
            document.getElementById('precoMinConcorrencia').value = dados.precoMin;
        }
        if (dados.precoMedio) {
            document.getElementById('precoMedioConcorrencia').value = dados.precoMedio;
        }
        if (dados.precoMax) {
            document.getElementById('precoMaxConcorrencia').value = dados.precoMax;
        }
        
        // Valor percebido
        if (dados.valorQualidade) {
            document.getElementById('valorQualidade').value = dados.valorQualidade;
            document.getElementById('valorQualidadeScore').textContent = `${dados.valorQualidade}/10`;
        }
        if (dados.valorAtendimento) {
            document.getElementById('valorAtendimento').value = dados.valorAtendimento;
            document.getElementById('valorAtendimentoScore').textContent = `${dados.valorAtendimento}/10`;
        }
        if (dados.valorMarca) {
            document.getElementById('valorMarca').value = dados.valorMarca;
            document.getElementById('valorMarcaScore').textContent = `${dados.valorMarca}/10`;
        }
        if (dados.valorExclusividade) {
            document.getElementById('valorExclusividade').value = dados.valorExclusividade;
            document.getElementById('valorExclusividadeScore').textContent = `${dados.valorExclusividade}/10`;
        }
        
        // Canais de venda
        if (dados.canaisVenda) {
            const canais = dados.canaisVenda;
            
            if (canais.diretas) {
                document.getElementById('participacaoDiretas').value = canais.diretas.percentual || 40;
                document.getElementById('taxaDiretas').value = canais.diretas.taxa || 5;
            }
            if (canais.marketplaces) {
                document.getElementById('participacaoMarketplaces').value = canais.marketplaces.percentual || 35;
                document.getElementById('taxaMarketplaces').value = canais.marketplaces.taxa || 15;
            }
            if (canais.redesSociais) {
                document.getElementById('participacaoRedesSociais').value = canais.redesSociais.percentual || 25;
                document.getElementById('taxaRedesSociais').value = canais.redesSociais.taxa || 10;
            }
            
            this.atualizarPercentuaisCanais();
            this.calcularTaxaMedia();
        }
    }
    
    // Coletar dados do módulo
    coletarDados() {
        const dados = {
            precoMin: parseFloat(document.getElementById('precoMinConcorrencia')?.value) || 0,
            precoMedio: parseFloat(document.getElementById('precoMedioConcorrencia')?.value) || 0,
            precoMax: parseFloat(document.getElementById('precoMaxConcorrencia')?.value) || 0,
            valorQualidade: parseFloat(document.getElementById('valorQualidade')?.value) || 8,
            valorAtendimento: parseFloat(document.getElementById('valorAtendimento')?.value) || 7,
            valorMarca: parseFloat(document.getElementById('valorMarca')?.value) || 6,
            valorExclusividade: parseFloat(document.getElementById('valorExclusividade')?.value) || 5,
            canaisVenda: {
                diretas: {
                    percentual: parseFloat(document.getElementById('participacaoDiretas')?.value) || 40,
                    taxa: parseFloat(document.getElementById('taxaDiretas')?.value) || 5
                },
                marketplaces: {
                    percentual: parseFloat(document.getElementById('participacaoMarketplaces')?.value) || 35,
                    taxa: parseFloat(document.getElementById('taxaMarketplaces')?.value) || 15
                },
                redesSociais: {
                    percentual: parseFloat(document.getElementById('participacaoRedesSociais')?.value) || 25,
                    taxa: parseFloat(document.getElementById('taxaRedesSociais')?.value) || 10
                }
            }
        };
        
        return dados;
    }
    
    // Analisar concorrência
    analisarConcorrencia() {
        try {
            console.log('🔍 Analisando concorrência...');
            
            // Coletar dados
            const dados = this.coletarDados();
            
            if (!dados.precoMin || !dados.precoMedio || !dados.precoMax) {
                this.app.mostrarToast('Preencha todos os preços da concorrência', 'warning');
                return;
            }
            
            // Preço do usuário
            const precoUsuario = this.app.dados.precificacao.precoVenda || 0;
            
            if (precoUsuario <= 0) {
                this.app.mostrarToast('Defina seu preço de venda primeiro', 'warning');
                return;
            }
            
            // Calcular posicionamento
            const posicionamento = this.calcularPosicionamento(precoUsuario, dados);
            
            // Salvar dados
            this.dadosConcorrencia = {
                ...dados,
                precoUsuario: precoUsuario,
                posicionamento: posicionamento
            };
            
            this.app.dados.mercado = this.dadosConcorrencia;
            
            // Atualizar interface
            this.mostrarResultados();
            this.atualizarGraficoConcorrencia();
            
            // Salvar dados na aplicação
            this.app.salvarDados();
            
            this.app.mostrarToast('Análise de concorrência concluída!', 'success');
            
        } catch (error) {
            console.error('❌ Erro ao analisar concorrência:', error);
            this.app.mostrarToast('Erro ao analisar concorrência', 'error');
        }
    }
    
    // Calcular posicionamento
    calcularPosicionamento(precoUsuario, dadosConcorrencia) {
        const { precoMin, precoMedio, precoMax } = dadosConcorrencia;
        
        // Calcular diferença percentual para média
        const diferencaMedia = ((precoUsuario - precoMedio) / precoMedio) * 100;
        
        // Determinar posição
        let posicao = '';
        let cor = '';
        let posicaoPercentual = 0;
        
        if (precoUsuario <= precoMin) {
            posicao = 'Muito abaixo da média';
            cor = 'text-red-600';
            posicaoPercentual = 10;
        } else if (precoUsuario <= precoMin * 1.2) {
            posicao = 'Abaixo da média';
            cor = 'text-orange-600';
            posicaoPercentual = 30;
        } else if (precoUsuario <= precoMedio) {
            posicao = 'Próximo da média (abaixo)';
            cor = 'text-yellow-600';
            posicaoPercentual = 45;
        } else if (precoUsuario <= precoMedio * 1.1) {
            posicao = 'No preço médio';
            cor = 'text-green-600';
            posicaoPercentual = 50;
        } else if (precoUsuario <= precoMax * 0.9) {
            posicao = 'Acima da média';
            cor = 'text-blue-600';
            posicaoPercentual = 70;
        } else if (precoUsuario <= precoMax) {
            posicao = 'Próximo do máximo';
            cor = 'text-purple-600';
            posicaoPercentual = 85;
        } else {
            posicao = 'Acima do máximo';
            cor = 'text-purple-700';
            posicaoPercentual = 95;
        }
        
        // Calcular espaço para aumento
        const espacoAumento = precoMax > precoUsuario 
            ? ((precoMax - precoUsuario) / precoUsuario) * 100
            : 0;
        
        // Determinar vantagem competitiva
        let vantagem = '';
        let vantagemCor = '';
        
        if (diferencaMedia < -20) {
            vantagem = 'Baixa (preço muito baixo)';
            vantagemCor = 'text-red-600';
        } else if (diferencaMedia < -5) {
            vantagem = 'Moderada (preço competitivo)';
            vantagemCor = 'text-yellow-600';
        } else if (diferencaMedia <= 10) {
            vantagem = 'Boa (preço adequado)';
            vantagemCor = 'text-green-600';
        } else if (diferencaMedia <= 30) {
            vantagem = 'Alta (diferenciação)';
            vantagemCor = 'text-blue-600';
        } else {
            vantagem = 'Muito alta (premium)';
            vantagemCor = 'text-purple-600';
        }
        
        return {
            posicao,
            posicaoCor: cor,
            posicaoPercentual,
            diferencaMedia,
            vantagem,
            vantagemCor,
            espacoAumento
        };
    }
    
    // Mostrar resultados da análise
    mostrarResultados() {
        const container = document.getElementById('resultadoPosicionamento');
        if (container) {
            container.classList.remove('hidden');
        }
        
        const dados = this.dadosConcorrencia;
        if (!dados || !dados.posicionamento) return;
        
        const pos = dados.posicionamento;
        
        // Atualizar elementos
        this.atualizarElemento('posicaoMercado', pos.posicao);
        this.atualizarElemento('diferencaMedia', 
            (pos.diferencaMedia >= 0 ? '+' : '') + pos.diferencaMedia.toFixed(1) + '%');
        this.atualizarElemento('vantagemCompetitiva', pos.vantagem);
        this.atualizarElemento('espacoAumento', pos.espacoAumento.toFixed(1) + '%');
        
        // Atualizar cores
        const posicaoEl = document.getElementById('posicaoMercado');
        if (posicaoEl) {
            posicaoEl.className = `font-bold ${pos.posicaoCor}`;
        }
        
        const vantagemEl = document.getElementById('vantagemCompetitiva');
        if (vantagemEl) {
            vantagemEl.className = `font-bold ${pos.vantagemCor}`;
        }
        
        // Atualizar marcador
        const marcador = document.getElementById('marcadorPosicao');
        if (marcador) {
            marcador.style.left = `${pos.posicaoPercentual}%`;
        }
        
        // Atualizar recomendação
        this.atualizarRecomendacaoPosicionamento(pos);
    }
    
    // Atualizar recomendação de posicionamento
    atualizarRecomendacaoPosicionamento(posicionamento) {
        const elemento = document.getElementById('recomendacaoPosicionamento');
        if (!elemento) return;
        
        let recomendacao = '';
        
        if (posicionamento.diferencaMedia < -20) {
            recomendacao = 'Seu preço está muito abaixo do mercado. Isso pode desvalorizar seu produto. Considere aumentar para se alinhar à concorrência.';
        } else if (posicionamento.diferencaMedia < -5) {
            recomendacao = 'Preço competitivo. Você está na faixa baixa do mercado, o que pode ajudar a ganhar clientes. Mantenha se essa for sua estratégia.';
        } else if (posicionamento.diferencaMedia <= 10) {
            recomendacao = 'Posição ideal! Seu preço está bem alinhado com o mercado. Continue destacando seus diferenciais para manter essa posição.';
        } else if (posicionamento.diferencaMedia <= 30) {
            recomendacao = 'Posição premium. Seu preço acima da média exige diferenciais claros. Certifique-se de comunicar bem o valor agregado do seu produto.';
        } else {
            recomendacao = 'Posição muito premium. Avalie se há espaço para redução ou se seu produto realmente justifica esse valor premium.';
        }
        
        elemento.textContent = recomendacao;
    }
    
    // Atualizar gráfico de comparação
    atualizarGraficoConcorrencia() {
        const canvas = document.getElementById('graficoComparacaoConcorrencia');
        if (!canvas || !this.dadosConcorrencia) return;
        
        const ctx = canvas.getContext('2d');
        const dados = this.dadosConcorrencia;
        
        // Destruir gráfico anterior se existir
        if (this.graficoConcorrencia) {
            this.graficoConcorrencia.destroy();
        }
        
        // Criar novo gráfico
        this.graficoConcorrencia = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Preço Mínimo', 'Preço Médio', 'Preço Máximo', 'Seu Preço'],
                datasets: [{
                    label: 'Valor (R$)',
                    data: [
                        dados.precoMin,
                        dados.precoMedio,
                        dados.precoMax,
                        dados.precoUsuario
                    ],
                    backgroundColor: [
                        '#ef4444', // Vermelho para mínimo
                        '#f59e0b', // Amarelo para médio
                        '#10b981', // Verde para máximo
                        '#3b82f6'  // Azul para usuário
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `R$ ${context.raw.toFixed(2)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Preço (R$)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Comparação de Preços'
                        }
                    }
                }
            }
        });
    }
    
    // Calcular valor percebido
    calcularValorPercebido() {
        const sliders = ['valorQualidade', 'valorAtendimento', 'valorMarca', 'valorExclusividade'];
        let total = 0;
        
        sliders.forEach(id => {
            const slider = document.getElementById(id);
            if (slider) {
                total += parseFloat(slider.value) || 5;
            }
        });
        
        const media = total / sliders.length;
        this.valorPercebido = media;
        
        // Atualizar interface
        const scoreEl = document.getElementById('valorPercebidoScore');
        if (scoreEl) {
            scoreEl.textContent = media.toFixed(1);
        }
        
        // Atualizar nível
        const nivelEl = document.getElementById('nivelValorPercebido');
        if (nivelEl) {
            let nivel = '';
            let cor = '';
            
            if (media >= 8) {
                nivel = 'Valor Muito Alto';
                cor = 'text-green-700';
            } else if (media >= 7) {
                nivel = 'Valor Alto';
                cor = 'text-green-600';
            } else if (media >= 6) {
                nivel = 'Valor Médio';
                cor = 'text-yellow-600';
            } else if (media >= 5) {
                nivel = 'Valor Baixo';
                cor = 'text-orange-600';
            } else {
                nivel = 'Valor Muito Baixo';
                cor = 'text-red-600';
            }
            
            nivelEl.textContent = nivel;
            nivelEl.className = `text-xl font-bold ${cor} mb-2`;
        }
        
        // Atualizar premium permitido
        const premiumEl = document.getElementById('premiumPermitido');
        if (premiumEl) {
            let premium = '';
            
            if (media >= 8) {
                premium = '30-50%';
            } else if (media >= 7) {
                premium = '20-30%';
            } else if (media >= 6) {
                premium = '10-20%';
            } else if (media >= 5) {
                premium = '0-10%';
            } else {
                premium = '0% (abaixo da média)';
            }
            
            premiumEl.textContent = premium;
        }
        
        // Atualizar círculo de progresso
        this.atualizarCirculoValorPercebido(media);
    }
    
    // Atualizar círculo de valor percebido
    atualizarCirculoValorPercebido(score) {
        const circle = document.querySelector('.progress-ring__circle');
        if (!circle) return;
        
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        
        // Calcular offset (0-10 para 0-100%)
        const percent = (score / 10) * 100;
        const offset = circumference - (percent / 100) * circumference;
        
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = offset;
        circle.style.transition = 'stroke-dashoffset 0.5s ease';
    }
    
    // Atualizar percentuais dos canais
    atualizarPercentuaisCanais() {
        const inputs = [
            'participacaoDiretas',
            'participacaoMarketplaces',
            'participacaoRedesSociais'
        ];
        
        let total = 0;
        const valores = {};
        
        inputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                const valor = parseFloat(input.value) || 0;
                valores[id] = valor;
                total += valor;
            }
        });
        
        // Normalizar para 100%
        if (total !== 100) {
            const fator = 100 / total;
            
            inputs.forEach(id => {
                const input = document.getElementById(id);
                if (input) {
                    const novoValor = Math.round(valores[id] * fator);
                    input.value = novoValor;
                    
                    // Atualizar display
                    const displayId = id.replace('participacao', 'percentual');
                    const displayEl = document.getElementById(displayId);
                    if (displayEl) {
                        displayEl.textContent = `${novoValor}%`;
                    }
                }
            });
        } else {
            // Atualizar displays
            inputs.forEach(id => {
                const displayId = id.replace('participacao', 'percentual');
                const displayEl = document.getElementById(displayId);
                if (displayEl) {
                    displayEl.textContent = `${valores[id]}%`;
                }
            });
        }
    }
    
    // Calcular taxa média ponderada
    calcularTaxaMedia() {
        const canais = [
            { id: 'taxaDiretas', participacao: 'participacaoDiretas' },
            { id: 'taxaMarketplaces', participacao: 'participacaoMarketplaces' },
            { id: 'taxaRedesSociais', participacao: 'participacaoRedesSociais' }
        ];
        
        let totalPonderado = 0;
        let totalParticipacao = 0;
        
        canais.forEach(canal => {
            const taxa = parseFloat(document.getElementById(canal.id)?.value) || 0;
            const participacao = parseFloat(document.getElementById(canal.participacao)?.value) || 0;
            
            totalPonderado += taxa * (participacao / 100);
            totalParticipacao += participacao;
        });
        
        // Normalizar se necessário
        const taxaMedia = totalParticipacao > 0 ? totalPonderado * (100 / totalParticipacao) : totalPonderado;
        
        // Atualizar display
        const taxaMediaEl = document.getElementById('taxaMediaPonderada');
        if (taxaMediaEl) {
            taxaMediaEl.textContent = `${taxaMedia.toFixed(2)}%`;
        }
        
        return taxaMedia;
    }
    
    // Calcular tudo (função principal)
    calcularTudo() {
        this.analisarConcorrencia();
        this.calcularValorPercebido();
        this.calcularTaxaMedia();
        this.app.mostrarToast('Análise de mercado atualizada!', 'success');
    }
    
    // Atualizar elemento por ID
    atualizarElemento(id, valor) {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.textContent = valor;
        }
    }
    
    // Verificar se análise de mercado está completa
    verificarCompletude() {
        const dados = this.app.dados.mercado;
        return dados.precoMedio > 0 && dados.valorQualidade > 0;
    }
    
    // Obter recomendações baseadas no mercado
    obterRecomendacoes() {
        const dados = this.app.dados.mercado;
        const recomendacoes = [];
        
        if (!dados.posicionamento) return recomendacoes;
        
        const pos = dados.posicionamento;
        
        if (pos.diferencaMedia < -20) {
            recomendacoes.push({
                tipo: 'alta',
                titulo: 'Preço Muito Abaixo do Mercado',
                descricao: 'Seu preço está mais de 20% abaixo da média.',
                acao: 'Aumente gradualmente o preço para se alinhar à concorrência.'
            });
        }
        
        if (this.valorPercebido < 6) {
            recomendacoes.push({
                tipo: 'media',
                titulo: 'Valor Percebido Baixo',
                descricao: `Seu produto tem valor percebido de ${this.valorPercebido.toFixed(1)}/10.`,
                acao: 'Invista em diferenciação, qualidade e comunicação de valor.'
            });
        }
        
        // Verificar taxa média ponderada
        const taxaMedia = this.calcularTaxaMedia();
        if (taxaMedia > 15) {
            recomendacoes.push({
                tipo: 'media',
                titulo: 'Taxas de Venda Altas',
                descricao: `Taxa média ponderada de ${taxaMedia.toFixed(1)}%.`,
                acao: 'Diversifique canais de venda para reduzir dependência de plataformas caras.'
            });
        }
        
        return recomendacoes;
    }
}

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModuloMercado;
}
