// modulo-precificacao.js - Módulo para estratégias de precificação

class ModuloPrecificacao {
    constructor(app) {
        this.app = app;
        this.metodoSelecionado = 'markup';
        this.precoCalculado = false;
        this.metodosConfig = {
            markup: {
                nome: 'Markup',
                descricao: 'Adiciona uma porcentagem fixa sobre o custo',
                cor: 'blue',
                recomendacao: 'Ideal para produtos físicos com custos bem definidos'
            },
            margem: {
                nome: 'Margem de Lucro',
                descricao: 'Define o lucro como % do preço de venda',
                cor: 'green',
                recomendacao: 'Bom para serviços e produtos com valor percebido alto'
            },
            mercado: {
                nome: 'Preço de Mercado',
                descricao: 'Baseado nos preços da concorrência',
                cor: 'purple',
                recomendacao: 'Recomendado para mercados competitivos'
            },
            valor: {
                nome: 'Valor Percebido',
                descricao: 'Baseado no valor que o cliente percebe',
                cor: 'orange',
                recomendacao: 'Ideal para produtos diferenciados ou nichos'
            },
            psicologico: {
                nome: 'Preço Psicológico',
                descricao: 'Usa preços que parecem mais atrativos',
                cor: 'red',
                recomendacao: 'Excelente para vendas online e e-commerce'
            }
        };
    }
    
    // Gerar conteúdo HTML do módulo
    gerarConteudo() {
        return `
            <div class="animate-fade-in">
                <!-- Cabeçalho -->
                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-gray-900 mb-2">Estratégias de Precificação</h1>
                    <p class="text-gray-600">Escolha o melhor método para definir o preço do seu produto/serviço</p>
                </div>
                
                <!-- Métodos de Precificação -->
                <div class="card mb-8">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-chess-board text-blue-500"></i>
                            Métodos Disponíveis
                        </h3>
                        <p class="text-sm text-gray-600 mt-1">Selecione a estratégia mais adequada para seu negócio</p>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        ${Object.entries(this.metodosConfig).map(([id, metodo]) => `
                            <button onclick="app.modulos.precificacao.selecionarMetodo('${id}')" 
                                    class="metodo-precificacao p-6 rounded-xl border-2 ${this.metodoSelecionado === id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}"
                                    id="metodoBtn-${id}">
                                <div class="flex items-start mb-4">
                                    <div class="p-3 rounded-lg bg-${metodo.cor}-100 mr-3">
                                        <i class="fas fa-${this.getMetodoIcon(id)} text-${metodo.cor}-500"></i>
                                    </div>
                                    <div>
                                        <div class="font-bold text-gray-900">${metodo.nome}</div>
                                        <div class="text-sm text-gray-600 mt-1">${metodo.descricao}</div>
                                    </div>
                                </div>
                                <div class="text-xs text-${metodo.cor}-600 font-medium">${metodo.recomendacao}</div>
                            </button>
                        `).join('')}
                    </div>
                    
                    <!-- Método Selecionado -->
                    <div class="mt-6 p-4 bg-blue-50 rounded-lg">
                        <div class="flex items-center">
                            <i class="fas fa-check-circle text-blue-500 mr-3"></i>
                            <div>
                                <div class="font-medium text-blue-800">
                                    Método Selecionado: 
                                    <span id="metodoSelecionadoNome" class="font-bold">${this.metodosConfig[this.metodoSelecionado].nome}</span>
                                </div>
                                <div class="text-sm text-blue-700 mt-1" id="metodoSelecionadoDesc">
                                    ${this.metodosConfig[this.metodoSelecionado].descricao}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Configuração do Método -->
                <div id="configMetodo"></div>
                
                <!-- Preço Final e Impacto -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    <!-- Preço Final -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">
                                <i class="fas fa-tag text-green-500"></i>
                                Preço Final
                            </h3>
                        </div>
                        
                        <div class="space-y-6">
                            <div>
                                <label class="form-label">Preço de Venda Sugerido</label>
                                <div class="text-4xl font-bold text-green-600 mb-2" id="precoSugerido">R$ 0,00</div>
                                <div class="text-sm text-gray-600">Baseado no método selecionado e custos</div>
                            </div>
                            
                            <div>
                                <label class="form-label">Preço Psicológico</label>
                                <div class="grid grid-cols-2 gap-3">
                                    <button onclick="app.modulos.precificacao.aplicarPrecoPsicologico('99')" 
                                            class="p-4 border rounded-lg hover:bg-gray-50 text-center">
                                        <div class="text-xl font-bold text-purple-600" id="precoPsico99">R$ 0,99</div>
                                        <div class="text-xs text-gray-600">Final .99</div>
                                    </button>
                                    <button onclick="app.modulos.precificacao.aplicarPrecoPsicologico('95')" 
                                            class="p-4 border rounded-lg hover:bg-gray-50 text-center">
                                        <div class="text-xl font-bold text-purple-600" id="precoPsico95">R$ 0,95</div>
                                        <div class="text-xs text-gray-600">Final .95</div>
                                    </button>
                                    <button onclick="app.modulos.precificacao.aplicarPrecoPsicologico('arredondado')" 
                                            class="p-4 border rounded-lg hover:bg-gray-50 text-center">
                                        <div class="text-xl font-bold text-purple-600" id="precoPsicoArred">R$ 0</div>
                                        <div class="text-xs text-gray-600">Arredondado</div>
                                    </button>
                                    <button onclick="app.modulos.precificacao.aplicarPrecoPsicologico('bundle')" 
                                            class="p-4 border rounded-lg hover:bg-gray-50 text-center">
                                        <div class="text-xl font-bold text-purple-600" id="precoPsicoBundle">R$ 0</div>
                                        <div class="text-xs text-gray-600">Pacote</div>
                                    </button>
                                </div>
                            </div>
                            
                            <div>
                                <label class="form-label">
                                    Seu Preço de Venda Final (R$)
                                    <span class="text-red-500">*</span>
                                </label>
                                <input type="number" 
                                       id="precoVendaFinal" 
                                       class="form-control-professional text-2xl font-bold text-center"
                                       step="0.01"
                                       min="0"
                                       placeholder="0,00">
                                <div class="text-xs text-gray-600 mt-1">Preço que você realmente vai cobrar</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Impacto Financeiro -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">
                                <i class="fas fa-chart-line text-blue-500"></i>
                                Impacto Financeiro
                            </h3>
                        </div>
                        
                        <div class="space-y-4">
                            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span class="text-gray-700">Margem de Lucro:</span>
                                <span class="font-bold text-green-600" id="impactoMargem">0%</span>
                            </div>
                            
                            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span class="text-gray-700">Lucro por Unidade:</span>
                                <span class="font-bold" id="impactoLucroUnit">R$ 0,00</span>
                            </div>
                            
                            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span class="text-gray-700">Lucro Mensal:</span>
                                <span class="font-bold text-green-600" id="impactoLucroMensal">R$ 0,00</span>
                            </div>
                            
                            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span class="text-gray-700">Ponto de Equilíbrio:</span>
                                <span class="font-bold text-orange-600" id="impactoPontoEquilibrio">0 unidades</span>
                            </div>
                            
                            <!-- Análise da Margem -->
                            <div class="mt-4 p-4 rounded-lg" id="analiseMargemContainer">
                                <div class="flex items-center mb-2">
                                    <i class="fas fa-analytics mr-2"></i>
                                    <span class="font-medium">Análise da Margem</span>
                                </div>
                                <div class="text-sm" id="analiseMargemTexto">
                                    Defina um preço para ver a análise
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Composição do Preço -->
                <div class="card mt-8">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-pie-chart text-purple-500"></i>
                            Composição do Preço
                        </h3>
                    </div>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <!-- Gráfico -->
                        <div>
                            <div class="chart-container-pro h-64">
                                <canvas id="graficoComposicaoPreco"></canvas>
                            </div>
                        </div>
                        
                        <!-- Detalhamento -->
                        <div>
                            <div class="space-y-3">
                                <div class="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                                    <span class="text-red-700">Custo Variável:</span>
                                    <span class="font-bold" id="compCustoVar">R$ 0,00</span>
                                </div>
                                
                                <div class="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                    <span class="text-blue-700">Custo Fixo (proporcional):</span>
                                    <span class="font-bold" id="compCustoFixo">R$ 0,00</span>
                                </div>
                                
                                <div class="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                                    <span class="text-yellow-700">Impostos e Taxas:</span>
                                    <span class="font-bold" id="compImpostos">R$ 0,00</span>
                                </div>
                                
                                <div class="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                    <span class="text-green-700 font-bold">Lucro:</span>
                                    <span class="font-bold text-green-600" id="compLucro">R$ 0,00</span>
                                </div>
                                
                                <div class="flex justify-between items-center p-3 bg-gray-100 rounded-lg mt-4">
                                    <span class="font-bold text-gray-900">Preço Final:</span>
                                    <span class="text-2xl font-bold text-gray-900" id="compPrecoFinal">R$ 0,00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Navegação -->
                <div class="flex justify-between mt-8 pt-8 border-t border-gray-200">
                    <button onclick="app.abrirTab('custos')" 
                            class="btn-outline px-8 py-3">
                        <i class="fas fa-arrow-left mr-2"></i>Voltar para Custos
                    </button>
                    
                    <div class="flex space-x-4">
                        <button onclick="app.modulos.precificacao.calcularPreco()" 
                                class="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700">
                            <i class="fas fa-calculator mr-2"></i>Calcular Preço
                        </button>
                        
                        <button onclick="app.abrirTab('mercado')" 
                                class="btn-primary px-8 py-3">
                            Continuar para Análise de Mercado
                            <i class="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Inicializar componentes do módulo
    inicializarComponentes() {
        this.mostrarConfigMetodo(this.metodoSelecionado);
        this.preencherDadosExistentes();
        this.inicializarEventos();
        this.calcularPreco();
    }
    
    // Inicializar eventos específicos
    inicializarEventos() {
        // Evento para atualizar preço final
        const precoFinalInput = document.getElementById('precoVendaFinal');
        if (precoFinalInput) {
            precoFinalInput.addEventListener('input', () => {
                this.atualizarImpacto();
                this.atualizarComposicao();
            });
        }
    }
    
    // Preencher dados existentes
    preencherDadosExistentes() {
        const dados = this.app.dados.precificacao;
        
        if (dados.metodo) {
            this.metodoSelecionado = dados.metodo;
        }
        
        if (dados.precoVenda) {
            document.getElementById('precoVendaFinal').value = dados.precoVenda;
        }
        
        if (dados.markup) {
            document.getElementById('markupInput').value = dados.markup;
            document.getElementById('markupSlider').value = dados.markup;
        }
    }
    
    // Selecionar método de precificação
    selecionarMetodo(metodo) {
        this.metodoSelecionado = metodo;
        
        // Atualizar interface
        this.atualizarSelecaoMetodo();
        this.mostrarConfigMetodo(metodo);
        this.calcularPreco();
        
        this.app.mostrarToast(`Método ${this.metodosConfig[metodo].nome} selecionado`, 'success');
    }
    
    // Atualizar seleção visual dos métodos
    atualizarSelecaoMetodo() {
        // Resetar todos os botões
        document.querySelectorAll('.metodo-precificacao').forEach(btn => {
            btn.className = 'metodo-precificacao p-6 rounded-xl border-2 border-gray-200 hover:border-blue-300';
        });
        
        // Ativar botão selecionado
        const btnSelecionado = document.getElementById(`metodoBtn-${this.metodoSelecionado}`);
        if (btnSelecionado) {
            btnSelecionado.className = `metodo-precificacao p-6 rounded-xl border-2 border-blue-500 bg-blue-50`;
        }
        
        // Atualizar texto do método selecionado
        const metodo = this.metodosConfig[this.metodoSelecionado];
        const nomeElement = document.getElementById('metodoSelecionadoNome');
        const descElement = document.getElementById('metodoSelecionadoDesc');
        
        if (nomeElement) nomeElement.textContent = metodo.nome;
        if (descElement) descElement.textContent = metodo.descricao;
    }
    
    // Mostrar configuração do método selecionado
    mostrarConfigMetodo(metodo) {
        const container = document.getElementById('configMetodo');
        if (!container) return;
        
        let configHTML = '';
        
        switch(metodo) {
            case 'markup':
                configHTML = this.gerarConfigMarkup();
                break;
            case 'margem':
                configHTML = this.gerarConfigMargem();
                break;
            case 'mercado':
                configHTML = this.gerarConfigMercado();
                break;
            case 'valor':
                configHTML = this.gerarConfigValor();
                break;
            case 'psicologico':
                configHTML = this.gerarConfigPsicologico();
                break;
            default:
                configHTML = this.gerarConfigMarkup();
        }
        
        container.innerHTML = configHTML;
        
        // Inicializar eventos da configuração
        this.inicializarConfigMetodo(metodo);
    }
    
    // Gerar configuração para método Markup
    gerarConfigMarkup() {
        const markupSugerido = this.app.dados.custos?.markupSugerido || 100;
        
        return `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-percentage text-blue-500"></i>
                        Configuração do Markup
                    </h3>
                </div>
                
                <div class="space-y-6">
                    <div>
                        <label class="form-label">
                            Markup Desejado (%)
                            <span class="text-xs text-gray-500 ml-2">Sugerido: ${markupSugerido}%</span>
                        </label>
                        
                        <div class="flex items-center space-x-6">
                            <div class="flex-1">
                                <input type="range" 
                                       id="markupSlider" 
                                       min="10" 
                                       max="300" 
                                       value="${markupSugerido}"
                                       step="1"
                                       class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-markup">
                                <div class="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>10%</span>
                                    <span>100%</span>
                                    <span>200%</span>
                                    <span>300%</span>
                                </div>
                            </div>
                            
                            <div class="w-32">
                                <div class="relative">
                                    <input type="number" 
                                           id="markupInput" 
                                           class="form-control-professional text-center pr-10"
                                           value="${markupSugerido}"
                                           min="10"
                                           max="300"
                                           step="1">
                                    <span class="absolute right-3 top-3 text-gray-500">%</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="text-xs text-gray-600 mt-2">
                            <strong>Recomendação:</strong> 60-150% para maioria dos produtos. 
                            Setores com maior valor agregado podem usar markups mais altos.
                        </div>
                    </div>
                    
                    <!-- Preços Sugeridos -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="text-center p-4 bg-gray-50 rounded-lg">
                            <div class="text-lg font-bold text-green-600" id="precoMarkupMin">R$ 0,00</div>
                            <div class="text-xs text-gray-600">Markup 60%</div>
                        </div>
                        
                        <div class="text-center p-4 bg-gray-50 rounded-lg">
                            <div class="text-lg font-bold text-blue-600" id="precoMarkupMedio">R$ 0,00</div>
                            <div class="text-xs text-gray-600">Markup 100%</div>
                        </div>
                        
                        <div class="text-center p-4 bg-gray-50 rounded-lg">
                            <div class="text-lg font-bold text-purple-600" id="precoMarkupMax">R$ 0,00</div>
                            <div class="text-xs text-gray-600">Markup 150%</div>
                        </div>
                        
                        <div class="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div class="text-lg font-bold text-blue-700" id="precoMarkupAtual">R$ 0,00</div>
                            <div class="text-xs text-gray-600">Seu Markup</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Gerar configuração para método Margem
    gerarConfigMargem() {
        return `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-chart-pie text-green-500"></i>
                        Configuração da Margem de Lucro
                    </h3>
                </div>
                
                <div class="space-y-6">
                    <div>
                        <label class="form-label">
                            Margem de Lucro Desejada (%)
                            <span class="text-xs text-gray-500 ml-2">Sugerido: 30%</span>
                        </label>
                        
                        <div class="flex items-center space-x-6">
                            <div class="flex-1">
                                <input type="range" 
                                       id="margemSlider" 
                                       min="5" 
                                       max="80" 
                                       value="30"
                                       step="1"
                                       class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-margem">
                                <div class="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>5%</span>
                                    <span>30%</span>
                                    <span>50%</span>
                                    <span>80%</span>
                                </div>
                            </div>
                            
                            <div class="w-32">
                                <div class="relative">
                                    <input type="number" 
                                           id="margemInput" 
                                           class="form-control-professional text-center pr-10"
                                           value="30"
                                           min="5"
                                           max="80"
                                           step="1">
                                    <span class="absolute right-3 top-3 text-gray-500">%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="p-4 bg-green-50 rounded-lg">
                        <div class="flex items-center">
                            <i class="fas fa-info-circle text-green-500 mr-3"></i>
                            <div>
                                <div class="font-medium text-green-800">Como funciona a Margem de Lucro</div>
                                <div class="text-sm text-green-700 mt-1">
                                    A margem é calculada sobre o preço de venda. 
                                    Exemplo: Se você quer 30% de margem, o custo deve representar 70% do preço.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Gerar configuração para método Mercado
    gerarConfigMercado() {
        return `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-balance-scale text-purple-500"></i>
                        Configuração do Preço de Mercado
                    </h3>
                </div>
                
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="form-group">
                            <label class="form-label">Preço Mínimo Concorrente</label>
                            <div class="relative">
                                <span class="absolute left-3 top-3 text-gray-500">R$</span>
                                <input type="number" 
                                       id="precoMinMercado" 
                                       class="form-control-professional pl-10"
                                       step="0.01"
                                       min="0"
                                       placeholder="0,00">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Preço Médio Concorrente</label>
                            <div class="relative">
                                <span class="absolute left-3 top-3 text-gray-500">R$</span>
                                <input type="number" 
                                       id="precoMedioMercado" 
                                       class="form-control-professional pl-10"
                                       step="0.01"
                                       min="0"
                                       placeholder="0,00">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Preço Máximo Concorrente</label>
                            <div class="relative">
                                <span class="absolute left-3 top-3 text-gray-500">R$</span>
                                <input type="number" 
                                       id="precoMaxMercado" 
                                       class="form-control-professional pl-10"
                                       step="0.01"
                                       min="0"
                                       placeholder="0,00">
                            </div>
                        </div>
                    </div>
                    
                    <div class="p-4 bg-purple-50 rounded-lg">
                        <div class="flex items-center">
                            <i class="fas fa-lightbulb text-purple-500 mr-3"></i>
                            <div>
                                <div class="font-medium text-purple-800">Estratégias de Posicionamento</div>
                                <div class="text-sm text-purple-700 mt-1">
                                    <ul class="list-disc pl-4 space-y-1">
                                        <li><strong>Abaixo da média:</strong> Para ganhar market share rapidamente</li>
                                        <li><strong>Na média:</strong> Para competir em igualdade</li>
                                        <li><strong>Acima da média:</strong> Se seu produto tem diferenciais claros</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Gerar configuração para método Valor
    gerarConfigValor() {
        return `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-star text-orange-500"></i>
                        Configuração do Valor Percebido
                    </h3>
                </div>
                
                <div class="space-y-6">
                    <div>
                        <label class="form-label">Fatores de Valor Percebido</label>
                        
                        <div class="space-y-4">
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
                                       class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
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
                                       class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
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
                                       class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
                            </div>
                        </div>
                    </div>
                    
                    <div class="p-4 bg-orange-50 rounded-lg">
                        <div class="text-center">
                            <div class="text-3xl font-bold text-orange-600" id="valorPercebidoTotal">7.5</div>
                            <div class="text-sm text-orange-700">Valor Percebido Total (0-10)</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Gerar configuração para método Psicológico
    gerarConfigPsicologico() {
        return `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-brain text-red-500"></i>
                        Configuração do Preço Psicológico
                    </h3>
                </div>
                
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="form-group">
                            <label class="form-label">Preço Base</label>
                            <div class="relative">
                                <span class="absolute left-3 top-3 text-gray-500">R$</span>
                                <input type="number" 
                                       id="precoBasePsicologico" 
                                       class="form-control-professional pl-10"
                                       step="0.01"
                                       min="0"
                                       placeholder="0,00">
                            </div>
                            <div class="text-xs text-gray-600 mt-1">Preço antes das técnicas psicológicas</div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Estratégia Principal</label>
                            <select id="estrategiaPsicologica" class="form-control-professional">
                                <option value="99">Final .99 (R$ X,99)</option>
                                <option value="95">Final .95 (R$ X,95)</option>
                                <option value="arredondado">Arredondado (R$ X,00)</option>
                                <option value="charm">Preço Charm (R$ X,90)</option>
                                <option value="bundle">Preço Bundle/Pacote</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="p-4 bg-red-50 rounded-lg">
                        <div class="flex items-center">
                            <i class="fas fa-psychology text-red-500 mr-3"></i>
                            <div>
                                <div class="font-medium text-red-800">Como Funciona o Preço Psicológico</div>
                                <div class="text-sm text-red-700 mt-1">
                                    Preços que terminam em .99 são percebidos como mais baratos. 
                                    Preços arredondados transmitem qualidade premium. 
                                    Escolha a estratégia baseada no seu público-alvo.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Inicializar configuração do método
    inicializarConfigMetodo(metodo) {
        switch(metodo) {
            case 'markup':
                this.inicializarConfigMarkup();
                break;
            case 'margem':
                this.inicializarConfigMargem();
                break;
            case 'mercado':
                this.inicializarConfigMercado();
                break;
            case 'valor':
                this.inicializarConfigValor();
                break;
            case 'psicologico':
                this.inicializarConfigPsicologico();
                break;
        }
    }
    
    // Inicializar configuração do markup
    inicializarConfigMarkup() {
        const markupSlider = document.getElementById('markupSlider');
        const markupInput = document.getElementById('markupInput');
        
        if (markupSlider && markupInput) {
            markupSlider.addEventListener('input', (e) => {
                markupInput.value = e.target.value;
                this.calcularPrecoPorMetodo();
            });
            
            markupInput.addEventListener('input', (e) => {
                const value = Math.min(300, Math.max(10, parseInt(e.target.value) || 100));
                markupSlider.value = value;
                markupInput.value = value;
                this.calcularPrecoPorMetodo();
            });
        }
    }
    
    // Inicializar configuração da margem
    inicializarConfigMargem() {
        const margemSlider = document.getElementById('margemSlider');
        const margemInput = document.getElementById('margemInput');
        
        if (margemSlider && margemInput) {
            margemSlider.addEventListener('input', (e) => {
                margemInput.value = e.target.value;
                this.calcularPrecoPorMetodo();
            });
            
            margemInput.addEventListener('input', (e) => {
                const value = Math.min(80, Math.max(5, parseInt(e.target.value) || 30));
                margemSlider.value = value;
                margemInput.value = value;
                this.calcularPrecoPorMetodo();
            });
        }
    }
    
    // Inicializar configuração do mercado
    inicializarConfigMercado() {
        const inputs = ['precoMinMercado', 'precoMedioMercado', 'precoMaxMercado'];
        inputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', () => this.calcularPrecoPorMetodo());
            }
        });
    }
    
    // Inicializar configuração do valor
    inicializarConfigValor() {
        const sliders = ['valorQualidade', 'valorAtendimento', 'valorMarca'];
        sliders.forEach(id => {
            const slider = document.getElementById(id);
            const score = document.getElementById(`${id}Score`);
            
            if (slider && score) {
                slider.addEventListener('input', (e) => {
                    score.textContent = `${e.target.value}/10`;
                    this.calcularPrecoPorMetodo();
                });
            }
        });
    }
    
    // Inicializar configuração psicológica
    inicializarConfigPsicologico() {
        const inputs = ['precoBasePsicologico', 'estrategiaPsicologica'];
        inputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', () => this.calcularPrecoPorMetodo());
            }
        });
    }
    
    // Calcular preço baseado no método selecionado
    calcularPreco() {
        try {
            console.log('💰 Calculando preço...');
            
            const custos = this.app.dados.custos;
            if (!custos.custoTotalUnitario) {
                this.app.mostrarToast('Calcule os custos primeiro', 'warning');
                return;
            }
            
            // Calcular preço pelo método selecionado
            const precoCalculado = this.calcularPrecoPorMetodo();
            
            // Atualizar preço sugerido
            const precoSugeridoEl = document.getElementById('precoSugerido');
            if (precoSugeridoEl && precoCalculado) {
                precoSugeridoEl.textContent = this.app.formatarMoeda(precoCalculado);
                
                // Preencher preço final se vazio
                const precoFinalEl = document.getElementById('precoVendaFinal');
                if (precoFinalEl && !precoFinalEl.value) {
                    precoFinalEl.value = precoCalculado.toFixed(2);
                }
            }
            
            // Atualizar preços psicológicos
            this.atualizarPrecosPsicologicos(precoCalculado);
            
            // Atualizar impacto
            this.atualizarImpacto();
            
            // Atualizar composição
            this.atualizarComposicao();
            
            // Salvar dados
            this.salvarDadosPrecificacao();
            
            this.precoCalculado = true;
            console.log('✅ Preço calculado com sucesso');
            
        } catch (error) {
            console.error('❌ Erro ao calcular preço:', error);
            this.app.mostrarToast('Erro ao calcular preço', 'error');
        }
    }
    
    // Calcular preço por método específico
    calcularPrecoPorMetodo() {
        const custos = this.app.dados.custos;
        const custoTotal = custos.custoTotalUnitario || 0;
        
        let preco = 0;
        
        switch(this.metodoSelecionado) {
            case 'markup':
                preco = this.calcularPorMarkup(custoTotal);
                break;
            case 'margem':
                preco = this.calcularPorMargem(custoTotal);
                break;
            case 'mercado':
                preco = this.calcularPorMercado();
                break;
            case 'valor':
                preco = this.calcularPorValor(custoTotal);
                break;
            case 'psicologico':
                preco = this.calcularPorPsicologico(custoTotal);
                break;
            default:
                preco = this.calcularPorMarkup(custoTotal);
        }
        
        // Garantir que preço cubra custos
        preco = Math.max(preco, custoTotal * 1.1);
        
        // Atualizar preços com diferentes markups
        if (this.metodoSelecionado === 'markup') {
            this.atualizarPrecosMarkup(custoTotal);
        }
        
        return preco;
    }
    
    // Calcular preço por markup
    calcularPorMarkup(custoTotal) {
        const markupInput = document.getElementById('markupInput');
        const markup = markupInput ? parseFloat(markupInput.value) || 100 : 100;
        
        return custoTotal * (1 + markup/100);
    }
    
    // Calcular preço por margem
    calcularPorMargem(custoTotal) {
        const margemInput = document.getElementById('margemInput');
        const margem = margemInput ? parseFloat(margemInput.value) || 30 : 30;
        
        // Fórmula: Preço = Custo / (1 - Margem)
        // Onde Margem é expressa em decimal (ex: 30% = 0.3)
        return custoTotal / (1 - (margem/100));
    }
    
    // Calcular preço por mercado
    calcularPorMercado() {
        const precoMedio = document.getElementById('precoMedioMercado');
        const valor = precoMedio ? parseFloat(precoMedio.value) : 0;
        
        if (valor > 0) return valor;
        
        // Se não houver preço de mercado, usar markup padrão
        const custos = this.app.dados.custos;
        return custos.custoTotalUnitario * 2; // Markup 100%
    }
    
    // Calcular preço por valor
    calcularPorValor(custoTotal) {
        // Calcular score do valor percebido
        const sliders = ['valorQualidade', 'valorAtendimento', 'valorMarca'];
        let totalScore = 0;
        
        sliders.forEach(id => {
            const slider = document.getElementById(id);
            if (slider) {
                totalScore += parseFloat(slider.value) || 5;
            }
        });
        
        const scoreMedio = totalScore / sliders.length;
        
        // Atualizar display do score
        const scoreTotalEl = document.getElementById('valorPercebidoTotal');
        if (scoreTotalEl) {
            scoreTotalEl.textContent = scoreMedio.toFixed(1);
        }
        
        // Multiplicador baseado no score (1x a 2.5x)
        const multiplicador = 1 + (scoreMedio / 10) * 1.5;
        
        return custoTotal * multiplicador;
    }
    
    // Calcular preço psicológico
    calcularPorPsicologico(custoTotal) {
        const precoBaseEl = document.getElementById('precoBasePsicologico');
        let precoBase = precoBaseEl ? parseFloat(precoBaseEl.value) : 0;
        
        if (precoBase <= 0) {
            precoBase = custoTotal * 2; // Markup 100% como base
        }
        
        const estrategiaEl = document.getElementById('estrategiaPsicologica');
        const estrategia = estrategiaEl ? estrategiaEl.value : '99';
        
        let precoFinal = precoBase;
        
        switch(estrategia) {
            case '99':
                precoFinal = Math.floor(precoBase) + 0.99;
                break;
            case '95':
                precoFinal = Math.floor(precoBase) + 0.95;
                break;
            case 'arredondado':
                precoFinal = Math.round(precoBase);
                break;
            case 'charm':
                precoFinal = Math.floor(precoBase) + 0.90;
                break;
            case 'bundle':
                // Preço de pacote (3x o preço por 2.5x)
                precoFinal = precoBase * 2.5;
                break;
        }
        
        return precoFinal;
    }
    
    // Atualizar preços com diferentes markups
    atualizarPrecosMarkup(custoTotal) {
        const precos = {
            'precoMarkupMin': custoTotal * 1.6,    // Markup 60%
            'precoMarkupMedio': custoTotal * 2.0,  // Markup 100%
            'precoMarkupMax': custoTotal * 2.5,    // Markup 150%
            'precoMarkupAtual': this.calcularPorMarkup(custoTotal)
        };
        
        Object.entries(precos).forEach(([id, valor]) => {
            const elemento = document.getElementById(id);
            if (elemento) {
                elemento.textContent = this.app.formatarMoeda(valor);
            }
        });
    }
    
    // Atualizar preços psicológicos
    atualizarPrecosPsicologicos(precoBase) {
        const precosPsico = {
            'precoPsico99': Math.floor(precoBase) + 0.99,
            'precoPsico95': Math.floor(precoBase) + 0.95,
            'precoPsicoArred': Math.round(precoBase),
            'precoPsicoBundle': precoBase * 2.5 // Preço para pacote de 3 unidades
        };
        
        Object.entries(precosPsico).forEach(([id, valor]) => {
            const elemento = document.getElementById(id);
            if (elemento) {
                elemento.textContent = this.app.formatarMoeda(valor);
            }
        });
    }
    
    // Aplicar preço psicológico
    aplicarPrecoPsicologico(tipo) {
        const precoFinalEl = document.getElementById('precoVendaFinal');
        if (!precoFinalEl) return;
        
        let precoAtual = parseFloat(precoFinalEl.value) || 0;
        let novoPreco = precoAtual;
        
        switch(tipo) {
            case '99':
                novoPreco = Math.floor(precoAtual) + 0.99;
                break;
            case '95':
                novoPreco = Math.floor(precoAtual) + 0.95;
                break;
            case 'arredondado':
                novoPreco = Math.round(precoAtual);
                break;
            case 'bundle':
                // Pacote de 3 pelo preço de 2.5
                novoPreco = precoAtual * 2.5;
                break;
        }
        
        precoFinalEl.value = novoPreco.toFixed(2);
        this.atualizarImpacto();
        this.atualizarComposicao();
        
        this.app.mostrarToast(`Preço psicológico aplicado: ${this.app.formatarMoeda(novoPreco)}`, 'success');
    }
    
    // Atualizar impacto financeiro
    atualizarImpacto() {
        const precoFinalEl = document.getElementById('precoVendaFinal');
        const preco = precoFinalEl ? parseFloat(precoFinalEl.value) : 0;
        
        if (preco <= 0) return;
        
        const custos = this.app.dados.custos;
        const produto = this.app.dados.produto;
        
        // Cálculos
        const custoUnitario = custos.custoTotalUnitario || 0;
        const lucroUnitario = preco - custoUnitario;
        const margem = custoUnitario > 0 ? (lucroUnitario / preco) * 100 : 0;
        const qtdMensal = produto.qtdVendaMensal || 100;
        const lucroMensal = lucroUnitario * qtdMensal;
        const pontoEquilibrio = custos.custoFixoMensal > 0 && lucroUnitario > 0 
            ? Math.ceil(custos.custoFixoMensal / lucroUnitario)
            : 0;
        
        // Atualizar elementos
        this.atualizarElemento('impactoMargem', `${margem.toFixed(1)}%`);
        this.atualizarElemento('impactoLucroUnit', this.app.formatarMoeda(lucroUnitario));
        this.atualizarElemento('impactoLucroMensal', this.app.formatarMoeda(lucroMensal));
        this.atualizarElemento('impactoPontoEquilibrio', `${pontoEquilibrio} unidades`);
        
        // Atualizar análise da margem
        this.atualizarAnaliseMargem(margem);
    }
    
    // Atualizar análise da margem
    atualizarAnaliseMargem(margem) {
        const container = document.getElementById('analiseMargemContainer');
        const texto = document.getElementById('analiseMargemTexto');
        
        if (!container || !texto) return;
        
        let analise = '';
        let cor = '';
        
        if (margem < 10) {
            analise = '⚠️ Margem crítica! Seu preço está muito baixo. Aumente para evitar prejuízos.';
            cor = 'bg-red-50 border-red-200 text-red-800';
        } else if (margem < 20) {
            analise = '📊 Margem apertada. Considere aumentar o preço ou reduzir custos para melhorar rentabilidade.';
            cor = 'bg-yellow-50 border-yellow-200 text-yellow-800';
        } else if (margem < 40) {
            analise = '✅ Margem saudável! Seu negócio tem boa rentabilidade. Continue assim!';
            cor = 'bg-green-50 border-green-200 text-green-800';
        } else {
            analise = '🎯 Margem excelente! Você tem alta rentabilidade. Pode considerar reinvestir os lucros.';
            cor = 'bg-blue-50 border-blue-200 text-blue-800';
        }
        
        container.className = `mt-4 p-4 rounded-lg border ${cor}`;
        texto.textContent = analise;
    }
    
    // Atualizar composição do preço
    atualizarComposicao() {
        const precoFinalEl = document.getElementById('precoVendaFinal');
        const preco = precoFinalEl ? parseFloat(precoFinalEl.value) : 0;
        
        if (preco <= 0) return;
        
        const custos = this.app.dados.custos;
        
        // Calcular componentes
        const custoVar = custos.custoVariavelUnitario || 0;
        const custoFixoProp = custos.custoFixoUnitario || 0;
        const impostosTaxas = preco * custos.percentuaisVenda || 0;
        const lucro = preco - custoVar - custoFixoProp - impostosTaxas;
        
        // Atualizar elementos
        this.atualizarElemento('compCustoVar', this.app.formatarMoeda(custoVar));
        this.atualizarElemento('compCustoFixo', this.app.formatarMoeda(custoFixoProp));
        this.atualizarElemento('compImpostos', this.app.formatarMoeda(impostosTaxas));
        this.atualizarElemento('compLucro', this.app.formatarMoeda(lucro));
        this.atualizarElemento('compPrecoFinal', this.app.formatarMoeda(preco));
        
        // Atualizar gráfico
        this.atualizarGraficoComposicao(custoVar, custoFixoProp, impostosTaxas, lucro);
    }
    
    // Atualizar gráfico de composição
    atualizarGraficoComposicao(custoVar, custoFixo, impostos, lucro) {
        const canvas = document.getElementById('graficoComposicaoPreco');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Destruir gráfico anterior se existir
        if (this.graficoComposicao) {
            this.graficoComposicao.destroy();
        }
        
        // Criar novo gráfico
        this.graficoComposicao = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Custo Variável', 'Custo Fixo', 'Impostos/Taxas', 'Lucro'],
                datasets: [{
                    data: [custoVar, custoFixo, impostos, lucro],
                    backgroundColor: [
                        '#ef4444', // Vermelho para custo variável
                        '#3b82f6', // Azul para custo fixo
                        '#f59e0b', // Amarelo para impostos
                        '#10b981'  // Verde para lucro
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
    
    // Atualizar elemento por ID
    atualizarElemento(id, valor) {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.textContent = valor;
        }
    }
    
    // Salvar dados de precificação
    salvarDadosPrecificacao() {
        const precoFinalEl = document.getElementById('precoVendaFinal');
        const precoVenda = precoFinalEl ? parseFloat(precoFinalEl.value) : 0;
        
        this.app.dados.precificacao = {
            metodo: this.metodoSelecionado,
            precoVenda: precoVenda,
            markup: document.getElementById('markupInput')?.value || 100,
            margem: document.getElementById('margemInput')?.value || 30,
            dataCalculo: new Date().toISOString()
        };
    }
    
    // Coletar dados do módulo
    coletarDados() {
        this.salvarDadosPrecificacao();
    }
    
    // Obter ícone do método
    getMetodoIcon(metodo) {
        const icones = {
            markup: 'percentage',
            margem: 'chart-pie',
            mercado: 'balance-scale',
            valor: 'star',
            psicologico: 'brain'
        };
        return icones[metodo] || 'calculator';
    }
    
    // Verificar se precificação está completa
    verificarCompletude() {
        const dados = this.app.dados.precificacao;
        return dados.precoVenda > 0;
    }
    
    // Obter recomendações baseadas na precificação
    obterRecomendacoes() {
        const dados = this.app.dados.precificacao;
        const custos = this.app.dados.custos;
        const recomendacoes = [];
        
        if (!dados.precoVenda || !custos.custoTotalUnitario) return recomendacoes;
        
        const margem = ((dados.precoVenda - custos.custoTotalUnitario) / dados.precoVenda) * 100;
        
        if (margem < 15) {
            recomendacoes.push({
                tipo: 'alta',
                titulo: 'Margem de Lucro Baixa',
                descricao: `Sua margem atual é de ${margem.toFixed(1)}%, abaixo do recomendado.`,
                acao: 'Considere aumentar o preço em pelo menos 20% ou reduzir custos.'
            });
        }
        
        if (margem > 60) {
            recomendacoes.push({
                tipo: 'media',
                titulo: 'Margem Muito Alta',
                descricao: `Margem de ${margem.toFixed(1)}% pode limitar vendas.`,
                acao: 'Avalie se há espaço para redução de preço para ganhar market share.'
            });
        }
        
        return recomendacoes;
    }
}

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModuloPrecificacao;
}
