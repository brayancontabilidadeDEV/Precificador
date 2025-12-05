// modulo-custos.js - Módulo para análise detalhada de custos

class ModuloCustos {
    constructor(app) {
        this.app = app;
        this.custosCalculados = false;
        this.templatesSetor = {
            alimentacao: {
                materiaPrima: 8.50,
                embalagem: 1.20,
                frete: 5.00,
                comissoesPercent: 10,
                impostosVenda: 7,
                taxasPlataforma: 12,
                aluguel: 1500.00,
                salarios: 2000.00,
                contas: 300.00,
                marketing: 300.00,
                das: 70.90,
                manutencao: 100.00,
                softwareGestao: 49.90,
                softwareDesign: 29.90,
                softwareMarketing: 19.90
            },
            moda: {
                materiaPrima: 25.00,
                embalagem: 2.50,
                frete: 8.00,
                comissoesPercent: 12,
                impostosVenda: 7,
                taxasPlataforma: 15,
                aluguel: 800.00,
                salarios: 1800.00,
                contas: 250.00,
                marketing: 400.00,
                das: 70.90,
                manutencao: 80.00,
                softwareGestao: 49.90,
                softwareDesign: 39.90,
                softwareMarketing: 29.90
            },
            artesanato: {
                materiaPrima: 12.00,
                embalagem: 3.00,
                frete: 10.00,
                comissoesPercent: 15,
                impostosVenda: 7,
                taxasPlataforma: 13,
                aluguel: 500.00,
                salarios: 1500.00,
                contas: 200.00,
                marketing: 200.00,
                das: 70.90,
                manutencao: 50.00,
                softwareGestao: 29.90,
                softwareDesign: 24.90,
                softwareMarketing: 14.90
            },
            servicos: {
                materiaPrima: 5.00,
                embalagem: 0.50,
                frete: 0.00,
                comissoesPercent: 8,
                impostosVenda: 5,
                taxasPlataforma: 8,
                aluguel: 600.00,
                salarios: 2500.00,
                contas: 350.00,
                marketing: 500.00,
                das: 70.90,
                manutencao: 120.00,
                softwareGestao: 79.90,
                softwareDesign: 19.90,
                softwareMarketing: 39.90
            }
        };
    }
    
    // Gerar conteúdo HTML do módulo
    gerarConteudo() {
        return `
            <div class="animate-fade-in">
                <!-- Cabeçalho -->
                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-gray-900 mb-2">Análise de Custos</h1>
                    <p class="text-gray-600">Mapeamento completo dos custos do seu negócio MEI</p>
                </div>
                
                <!-- Templates por Setor -->
                <div class="card mb-8">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-magic text-purple-500"></i>
                            Templates por Setor
                        </h3>
                        <p class="text-sm text-gray-600 mt-1">Selecione seu setor para carregar custos pré-configurados</p>
                    </div>
                    
                    <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <button onclick="app.modulos.custos.aplicarTemplate('alimentacao')" 
                                class="template-setor p-4 rounded-xl border-2 border-orange-200 hover:border-orange-400 transition">
                            <div class="text-3xl mb-2">🍕</div>
                            <div class="font-medium">Alimentação</div>
                            <div class="text-xs text-gray-500 mt-1">Restaurantes, lanchonetes</div>
                        </button>
                        
                        <button onclick="app.modulos.custos.aplicarTemplate('moda')" 
                                class="template-setor p-4 rounded-xl border-2 border-pink-200 hover:border-pink-400 transition">
                            <div class="text-3xl mb-2">👗</div>
                            <div class="font-medium">Moda</div>
                            <div class="text-xs text-gray-500 mt-1">Roupas, acessórios</div>
                        </button>
                        
                        <button onclick="app.modulos.custos.aplicarTemplate('artesanato')" 
                                class="template-setor p-4 rounded-xl border-2 border-yellow-200 hover:border-yellow-400 transition">
                            <div class="text-3xl mb-2">🎨</div>
                            <div class="font-medium">Artesanato</div>
                            <div class="text-xs text-gray-500 mt-1">Produtos artesanais</div>
                        </button>
                        
                        <button onclick="app.modulos.custos.aplicarTemplate('servicos')" 
                                class="template-setor p-4 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition">
                            <div class="text-3xl mb-2">🔧</div>
                            <div class="font-medium">Serviços</div>
                            <div class="text-xs text-gray-500 mt-1">Consultoria, manutenção</div>
                        </button>
                        
                        <button onclick="app.modulos.custos.aplicarTemplate('tecnologia')" 
                                class="template-setor p-4 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition">
                            <div class="text-3xl mb-2">💻</div>
                            <div class="font-medium">Tecnologia</div>
                            <div class="text-xs text-gray-500 mt-1">Software, apps</div>
                        </button>
                    </div>
                </div>
                
                <!-- Resumo dos Custos -->
                <div class="card mb-8">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-chart-bar text-green-500"></i>
                            Resumo dos Custos
                        </h3>
                    </div>
                    
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div class="text-center">
                            <div class="text-2xl font-bold text-blue-600" id="resumoCustoUnitario">R$ 0,00</div>
                            <div class="text-sm text-gray-600 mt-1">Custo por Unidade</div>
                        </div>
                        
                        <div class="text-center">
                            <div class="text-2xl font-bold text-red-600" id="resumoCustoFixo">R$ 0,00</div>
                            <div class="text-sm text-gray-600 mt-1">Custos Fixos Mensais</div>
                        </div>
                        
                        <div class="text-center">
                            <div class="text-2xl font-bold text-purple-600" id="resumoCustoTotal">R$ 0,00</div>
                            <div class="text-sm text-gray-600 mt-1">Custo Total Mensal</div>
                        </div>
                        
                        <div class="text-center">
                            <div class="text-2xl font-bold text-green-600" id="resumoMarkupSugerido">100%</div>
                            <div class="text-sm text-gray-600 mt-1">Markup Sugerido</div>
                        </div>
                    </div>
                    
                    <!-- Análise de Custo-Benefício -->
                    <div class="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                        <div class="flex items-center mb-3">
                            <i class="fas fa-chart-line text-green-500 mr-3"></i>
                            <div class="font-medium text-green-800">Análise de Custo-Benefício</div>
                        </div>
                        
                        <div class="space-y-2">
                            <div class="flex justify-between items-center">
                                <span class="text-gray-700">Eficiência de Custos:</span>
                                <div class="flex items-center">
                                    <div class="w-32 h-2 bg-gray-200 rounded-full overflow-hidden mr-3">
                                        <div id="eficienciaCustosBar" class="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" style="width: 75%"></div>
                                    </div>
                                    <span id="eficienciaCustosTexto" class="font-bold text-green-600">Boa</span>
                                </div>
                            </div>
                            
                            <div class="flex justify-between items-center">
                                <span class="text-gray-700">Oportunidade de Redução:</span>
                                <span id="oportunidadeReducao" class="font-bold text-red-600">15%</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Formulário de Custos -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Custos Variáveis -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">
                                <i class="fas fa-chart-line text-red-500"></i>
                                Custos Variáveis (por unidade)
                            </h3>
                            <div class="corporate-tooltip ml-2">
                                <i class="fas fa-question-circle text-gray-400"></i>
                                <div class="tooltip-texto">
                                    Custos que variam conforme o volume de produção/vendas.
                                    Exemplos: matéria-prima, embalagem, comissões.
                                </div>
                            </div>
                        </div>
                        
                        <div class="space-y-4">
                            <div class="form-group">
                                <label class="form-label">
                                    Matéria-Prima/Insumos
                                    <span class="text-red-500">*</span>
                                </label>
                                <div class="relative">
                                    <span class="absolute left-3 top-3 text-gray-500">R$</span>
                                    <input type="number" 
                                           id="materiaPrima" 
                                           class="form-control-professional pl-10"
                                           value="15.00"
                                           step="0.01"
                                           min="0">
                                </div>
                                <div class="text-xs text-gray-500 mt-1">Custo dos materiais para produzir UMA unidade</div>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Embalagem/Acabamento</label>
                                <div class="relative">
                                    <span class="absolute left-3 top-3 text-gray-500">R$</span>
                                    <input type="number" 
                                           id="embalagem" 
                                           class="form-control-professional pl-10"
                                           value="2.50"
                                           step="0.01"
                                           min="0">
                                </div>
                                <div class="text-xs text-gray-500 mt-1">Custo de embalagem por unidade vendida</div>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Frete/Entrega</label>
                                <div class="relative">
                                    <span class="absolute left-3 top-3 text-gray-500">R$</span>
                                    <input type="number" 
                                           id="frete" 
                                           class="form-control-professional pl-10"
                                           value="8.00"
                                           step="0.01"
                                           min="0">
                                </div>
                                <div class="text-xs text-gray-500 mt-1">Custo de envio para o cliente</div>
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="form-group">
                                    <label class="form-label">Comissões (%)</label>
                                    <div class="relative">
                                        <input type="number" 
                                               id="comissoesPercent" 
                                               class="form-control-professional pr-10"
                                               value="10"
                                               step="0.1"
                                               min="0"
                                               max="100">
                                        <span class="absolute right-3 top-3 text-gray-500">%</span>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Impostos (%)</label>
                                    <div class="relative">
                                        <input type="number" 
                                               id="impostosVenda" 
                                               class="form-control-professional pr-10"
                                               value="7"
                                               step="0.1"
                                               min="0"
                                               max="100">
                                        <span class="absolute right-3 top-3 text-gray-500">%</span>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Taxas Plataforma (%)</label>
                                    <div class="relative">
                                        <input type="number" 
                                               id="taxasPlataforma" 
                                               class="form-control-professional pr-10"
                                               value="12"
                                               step="0.1"
                                               min="0"
                                               max="100">
                                        <span class="absolute right-3 top-3 text-gray-500">%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Custos Fixos -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">
                                <i class="fas fa-home text-blue-500"></i>
                                Custos Fixos Mensais
                            </h3>
                            <div class="corporate-tooltip ml-2">
                                <i class="fas fa-question-circle text-gray-400"></i>
                                <div class="tooltip-texto">
                                    Custos que não variam com o volume de produção/vendas.
                                    Exemplos: aluguel, salários, internet.
                                </div>
                            </div>
                        </div>
                        
                        <div class="space-y-4">
                            <div class="form-group">
                                <label class="form-label">Aluguel/Financiamento</label>
                                <div class="relative">
                                    <span class="absolute left-3 top-3 text-gray-500">R$</span>
                                    <input type="number" 
                                           id="aluguel" 
                                           class="form-control-professional pl-10"
                                           value="800.00"
                                           step="0.01"
                                           min="0">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Salário/Pró-labore</label>
                                <div class="relative">
                                    <span class="absolute left-3 top-3 text-gray-500">R$</span>
                                    <input type="number" 
                                           id="salarios" 
                                           class="form-control-professional pl-10"
                                           value="1500.00"
                                           step="0.01"
                                           min="0">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Contas (Luz/Água/Internet)</label>
                                <div class="relative">
                                    <span class="absolute left-3 top-3 text-gray-500">R$</span>
                                    <input type="number" 
                                           id="contas" 
                                           class="form-control-professional pl-10"
                                           value="300.00"
                                           step="0.01"
                                           min="0">
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="form-group">
                                    <label class="form-label">Marketing/Publicidade</label>
                                    <div class="relative">
                                        <span class="absolute left-3 top-3 text-gray-500">R$</span>
                                        <input type="number" 
                                               id="marketing" 
                                               class="form-control-professional pl-10"
                                               value="200.00"
                                               step="0.01"
                                               min="0">
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">DAS (Imposto MEI)</label>
                                    <div class="relative">
                                        <span class="absolute left-3 top-3 text-gray-500">R$</span>
                                        <input type="number" 
                                               id="das" 
                                               class="form-control-professional pl-10"
                                               value="70.90"
                                               step="0.01"
                                               min="0">
                                    </div>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Outros Custos Fixos</label>
                                <div class="relative">
                                    <span class="absolute left-3 top-3 text-gray-500">R$</span>
                                    <input type="number" 
                                           id="outrosFixos" 
                                           class="form-control-professional pl-10"
                                           value="0"
                                           step="0.01"
                                           min="0">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Custos de Software -->
                <div class="card mt-8">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-laptop-code text-purple-500"></i>
                            Custos de Software & Ferramentas
                        </h3>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div class="form-group">
                            <label class="form-label">Gestão/Contabilidade</label>
                            <div class="relative">
                                <span class="absolute left-3 top-3 text-gray-500">R$</span>
                                <input type="number" 
                                       id="softwareGestao" 
                                       class="form-control-professional pl-10"
                                       value="49.90"
                                       step="0.01"
                                       min="0">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Design/Criativo</label>
                            <div class="relative">
                                <span class="absolute left-3 top-3 text-gray-500">R$</span>
                                <input type="number" 
                                       id="softwareDesign" 
                                       class="form-control-professional pl-10"
                                       value="29.90"
                                       step="0.01"
                                       min="0">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Marketing</label>
                            <div class="relative">
                                <span class="absolute left-3 top-3 text-gray-500">R$</span>
                                <input type="number" 
                                       id="softwareMarketing" 
                                       class="form-control-professional pl-10"
                                       value="19.90"
                                       step="0.01"
                                       min="0">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Outros Softwares</label>
                            <div class="relative">
                                <span class="absolute left-3 top-3 text-gray-500">R$</span>
                                <input type="number" 
                                       id="softwareOutros" 
                                       class="form-control-professional pl-10"
                                       value="0"
                                       step="0.01"
                                       min="0">
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Navegação -->
                <div class="flex justify-between mt-8 pt-8 border-t border-gray-200">
                    <button onclick="app.abrirTab('dados')" 
                            class="btn-outline px-8 py-3">
                        <i class="fas fa-arrow-left mr-2"></i>Voltar para Dados
                    </button>
                    
                    <div class="flex space-x-4">
                        <button onclick="app.modulos.custos.recalcular()" 
                                class="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700">
                            <i class="fas fa-calculator mr-2"></i>Recalcular Custos
                        </button>
                        
                        <button onclick="app.abrirTab('precificacao')" 
                                class="btn-primary px-8 py-3">
                            Continuar para Precificação
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
        // Eventos para recalcular custos ao modificar inputs
        const inputsCustos = [
            'materiaPrima', 'embalagem', 'frete', 'comissoesPercent',
            'impostosVenda', 'taxasPlataforma', 'aluguel', 'salarios',
            'contas', 'marketing', 'das', 'outrosFixos',
            'softwareGestao', 'softwareDesign', 'softwareMarketing', 'softwareOutros'
        ];
        
        inputsCustos.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', () => this.calcular());
            }
        });
    }
    
    // Preencher dados existentes
    preencherDadosExistentes() {
        const dados = this.app.dados.custos;
        
        if (dados.materiaPrima) {
            document.getElementById('materiaPrima').value = dados.materiaPrima;
        }
        if (dados.embalagem) {
            document.getElementById('embalagem').value = dados.embalagem;
        }
        if (dados.frete) {
            document.getElementById('frete').value = dados.frete;
        }
        if (dados.comissoesPercent) {
            document.getElementById('comissoesPercent').value = dados.comissoesPercent;
        }
        if (dados.impostosVenda) {
            document.getElementById('impostosVenda').value = dados.impostosVenda;
        }
        if (dados.taxasPlataforma) {
            document.getElementById('taxasPlataforma').value = dados.taxasPlataforma;
        }
        if (dados.aluguel) {
            document.getElementById('aluguel').value = dados.aluguel;
        }
        if (dados.salarios) {
            document.getElementById('salarios').value = dados.salarios;
        }
        if (dados.contas) {
            document.getElementById('contas').value = dados.contas;
        }
        if (dados.marketing) {
            document.getElementById('marketing').value = dados.marketing;
        }
        if (dados.das) {
            document.getElementById('das').value = dados.das;
        }
        if (dados.outrosFixos) {
            document.getElementById('outrosFixos').value = dados.outrosFixos;
        }
        if (dados.softwareGestao) {
            document.getElementById('softwareGestao').value = dados.softwareGestao;
        }
        if (dados.softwareDesign) {
            document.getElementById('softwareDesign').value = dados.softwareDesign;
        }
        if (dados.softwareMarketing) {
            document.getElementById('softwareMarketing').value = dados.softwareMarketing;
        }
        if (dados.softwareOutros) {
            document.getElementById('softwareOutros').value = dados.softwareOutros;
        }
    }
    
    // Coletar dados do formulário
    coletarDados() {
        const dados = {
            materiaPrima: parseFloat(document.getElementById('materiaPrima')?.value) || 0,
            embalagem: parseFloat(document.getElementById('embalagem')?.value) || 0,
            frete: parseFloat(document.getElementById('frete')?.value) || 0,
            comissoesPercent: parseFloat(document.getElementById('comissoesPercent')?.value) || 0,
            impostosVenda: parseFloat(document.getElementById('impostosVenda')?.value) || 0,
            taxasPlataforma: parseFloat(document.getElementById('taxasPlataforma')?.value) || 0,
            aluguel: parseFloat(document.getElementById('aluguel')?.value) || 0,
            salarios: parseFloat(document.getElementById('salarios')?.value) || 0,
            contas: parseFloat(document.getElementById('contas')?.value) || 0,
            marketing: parseFloat(document.getElementById('marketing')?.value) || 0,
            das: parseFloat(document.getElementById('das')?.value) || 70.90,
            outrosFixos: parseFloat(document.getElementById('outrosFixos')?.value) || 0,
            softwareGestao: parseFloat(document.getElementById('softwareGestao')?.value) || 0,
            softwareDesign: parseFloat(document.getElementById('softwareDesign')?.value) || 0,
            softwareMarketing: parseFloat(document.getElementById('softwareMarketing')?.value) || 0,
            softwareOutros: parseFloat(document.getElementById('softwareOutros')?.value) || 0
        };
        
        return dados;
    }
    
    // Calcular custos
    calcular() {
        try {
            console.log('🧮 Calculando custos...');
            
            // Coletar dados do formulário
            const dadosForm = this.coletarDados();
            
            // Quantidade mensal esperada
            const qtdMensal = this.app.dados.produto.qtdVendaMensal || 100;
            
            // 1. Calcular custos variáveis unitários
            const custoVariavelUnitario = dadosForm.materiaPrima + dadosForm.embalagem + dadosForm.frete;
            
            // 2. Calcular custos fixos mensais
            const custoFixoMensal = 
                dadosForm.aluguel +
                dadosForm.salarios +
                dadosForm.contas +
                dadosForm.marketing +
                dadosForm.das +
                dadosForm.outrosFixos +
                dadosForm.softwareGestao +
                dadosForm.softwareDesign +
                dadosForm.softwareMarketing +
                dadosForm.softwareOutros;
            
            // 3. Calcular custo fixo por unidade
            const custoFixoUnitario = qtdMensal > 0 ? custoFixoMensal / qtdMensal : 0;
            
            // 4. Calcular custo total unitário
            const custoTotalUnitario = custoVariavelUnitario + custoFixoUnitario;
            
            // 5. Calcular custo total mensal
            const custoTotalMensal = custoTotalUnitario * qtdMensal;
            
            // 6. Calcular percentuais sobre venda
            const percentuaisVenda = 
                (dadosForm.comissoesPercent + dadosForm.impostosVenda + dadosForm.taxasPlataforma) / 100;
            
            // 7. Sugerir markup baseado no setor
            const markupSugerido = this.calcularMarkupSugerido();
            
            // Salvar dados calculados
            this.app.dados.custos = {
                ...dadosForm,
                custoVariavelUnitario,
                custoFixoMensal,
                custoFixoUnitario,
                custoTotalUnitario,
                custoTotalMensal,
                percentuaisVenda,
                markupSugerido,
                qtdMensal
            };
            
            // Atualizar interface
            this.atualizarResumo();
            this.atualizarAnaliseCustoBeneficio();
            
            // Marcar como calculado
            this.custosCalculados = true;
            
            // Atualizar aplicação principal
            this.app.atualizarProgresso();
            
            console.log('✅ Custos calculados com sucesso');
            return true;
            
        } catch (error) {
            console.error('❌ Erro ao calcular custos:', error);
            this.app.mostrarToast('Erro ao calcular custos', 'error');
            return false;
        }
    }
    
    // Recalcular (alias para calcular)
    recalcular() {
        this.calcular();
        this.app.mostrarToast('Custos recalculados', 'success');
    }
    
    // Calcular markup sugerido baseado no setor
    calcularMarkupSugerido() {
        const setor = this.app.dados.empresa.setor;
        const markups = {
            'alimentacao': 60,
            'moda': 80,
            'artesanato': 120,
            'servicos': 100,
            'tecnologia': 150,
            'beleza': 90,
            'consultoria': 200,
            'educacao': 100,
            'saude': 80,
            'construcao': 70
        };
        
        return markups[setor] || 100;
    }
    
    // Atualizar resumo dos custos
    atualizarResumo() {
        const dados = this.app.dados.custos;
        
        // Custo unitário
        const custoUnitarioEl = document.getElementById('resumoCustoUnitario');
        if (custoUnitarioEl && dados.custoTotalUnitario) {
            custoUnitarioEl.textContent = this.app.formatarMoeda(dados.custoTotalUnitario);
        }
        
        // Custo fixo mensal
        const custoFixoEl = document.getElementById('resumoCustoFixo');
        if (custoFixoEl && dados.custoFixoMensal) {
            custoFixoEl.textContent = this.app.formatarMoeda(dados.custoFixoMensal);
        }
        
        // Custo total mensal
        const custoTotalEl = document.getElementById('resumoCustoTotal');
        if (custoTotalEl && dados.custoTotalMensal) {
            custoTotalEl.textContent = this.app.formatarMoeda(dados.custoTotalMensal);
        }
        
        // Markup sugerido
        const markupEl = document.getElementById('resumoMarkupSugerido');
        if (markupEl && dados.markupSugerido) {
            markupEl.textContent = dados.markupSugerido + '%';
        }
    }
    
    // Atualizar análise de custo-benefício
    atualizarAnaliseCustoBeneficio() {
        const dados = this.app.dados.custos;
        const produto = this.app.dados.produto;
        
        if (!dados.custoTotalUnitario || !produto.metaFaturamento) return;
        
        // Calcular eficiência
        const custoPorUnidade = dados.custoTotalUnitario;
        const metaPorUnidade = produto.metaFaturamento / (produto.qtdVendaMensal || 100);
        const eficiencia = (metaPorUnidade / custoPorUnidade) * 100;
        
        // Atualizar barra de eficiência
        const eficienciaBar = document.getElementById('eficienciaCustosBar');
        if (eficienciaBar) {
            const width = Math.min(100, Math.max(0, eficiencia / 2));
            eficienciaBar.style.width = `${width}%`;
        }
        
        // Atualizar texto
        const eficienciaTexto = document.getElementById('eficienciaCustosTexto');
        if (eficienciaTexto) {
            let texto = '';
            let cor = '';
            
            if (eficiencia > 200) {
                texto = 'Excelente';
                cor = 'text-green-600';
            } else if (eficiencia > 150) {
                texto = 'Boa';
                cor = 'text-green-500';
            } else if (eficiencia > 100) {
                texto = 'Adequada';
                cor = 'text-yellow-500';
            } else {
                texto = 'Precisa melhorar';
                cor = 'text-red-500';
            }
            
            eficienciaTexto.textContent = texto;
            eficienciaTexto.className = `font-bold ${cor}`;
        }
        
        // Calcular oportunidade de redução
        const oportunidadeReducao = document.getElementById('oportunidadeReducao');
        if (oportunidadeReducao) {
            const reducao = eficiencia < 150 ? '15-20%' : '5-10%';
            oportunidadeReducao.textContent = reducao;
        }
    }
    
    // Aplicar template por setor
    aplicarTemplate(setor) {
        const template = this.templatesSetor[setor];
        if (!template) {
            this.app.mostrarToast('Template não encontrado para este setor', 'warning');
            return;
        }
        
        // Aplicar valores do template
        document.getElementById('materiaPrima').value = template.materiaPrima;
        document.getElementById('embalagem').value = template.embalagem;
        document.getElementById('frete').value = template.frete;
        document.getElementById('comissoesPercent').value = template.comissoesPercent;
        document.getElementById('impostosVenda').value = template.impostosVenda;
        document.getElementById('taxasPlataforma').value = template.taxasPlataforma;
        document.getElementById('aluguel').value = template.aluguel;
        document.getElementById('salarios').value = template.salarios;
        document.getElementById('contas').value = template.contas;
        document.getElementById('marketing').value = template.marketing;
        document.getElementById('das').value = template.das;
        document.getElementById('softwareGestao').value = template.softwareGestao;
        document.getElementById('softwareDesign').value = template.softwareDesign;
        document.getElementById('softwareMarketing').value = template.softwareMarketing;
        
        // Atualizar setor se necessário
        if (!this.app.dados.empresa.setor) {
            document.getElementById('setorEmpresa').value = setor;
        }
        
        // Recalcular custos
        this.calcular();
        
        this.app.mostrarToast(`Template do setor ${setor} aplicado com sucesso!`, 'success');
    }
    
    // Gerar relatório de custos
    gerarRelatorio() {
        const dados = this.app.dados.custos;
        
        return {
            resumo: {
                custoUnitario: dados.custoTotalUnitario,
                custoFixoMensal: dados.custoFixoMensal,
                custoTotalMensal: dados.custoTotalMensal,
                markupSugerido: dados.markupSugerido
            },
            detalhado: {
                variaveis: {
                    materiaPrima: dados.materiaPrima,
                    embalagem: dados.embalagem,
                    frete: dados.frete
                },
                percentuais: {
                    comissoes: dados.comissoesPercent,
                    impostos: dados.impostosVenda,
                    taxasPlataforma: dados.taxasPlataforma
                },
                fixos: {
                    aluguel: dados.aluguel,
                    salarios: dados.salarios,
                    contas: dados.contas,
                    marketing: dados.marketing,
                    das: dados.das,
                    outros: dados.outrosFixos
                },
                software: {
                    gestao: dados.softwareGestao,
                    design: dados.softwareDesign,
                    marketing: dados.softwareMarketing,
                    outros: dados.softwareOutros
                }
            },
            analise: {
                proporcaoFixosVariaveis: dados.custoFixoMensal / (dados.custoTotalMensal || 1),
                custoPorUnidade: dados.custoTotalUnitario,
                eficiencia: this.calcularEficiencia()
            }
        };
    }
    
    // Calcular eficiência dos custos
    calcularEficiencia() {
        const dados = this.app.dados.custos;
        const meta = this.app.dados.produto.metaFaturamento || 10000;
        const custoMensal = dados.custoTotalMensal || 0;
        
        if (custoMensal === 0) return 0;
        
        return (meta / custoMensal) * 100;
    }
    
    // Verificar se custos estão completos
    verificarCompletude() {
        const dados = this.app.dados.custos;
        return dados.custoTotalUnitario > 0 && dados.custoFixoMensal > 0;
    }
    
    // Obter recomendações baseadas nos custos
    obterRecomendacoes() {
        const dados = this.app.dados.custos;
        const recomendacoes = [];
        
        // Verificar custos fixos altos
        const proporcaoFixos = dados.custoFixoMensal / (dados.custoTotalMensal || 1);
        if (proporcaoFixos > 0.4) {
            recomendacoes.push({
                tipo: 'alta',
                titulo: 'Custos Fixos Elevados',
                descricao: `Seus custos fixos representam ${(proporcaoFixos * 100).toFixed(1)}% do custo total.`,
                acao: 'Considere reduzir aluguel, renegociar contratos ou otimizar estrutura.'
            });
        }
        
        // Verificar matéria-prima cara
        if (dados.materiaPrima > dados.custoTotalUnitario * 0.5) {
            recomendacoes.push({
                tipo: 'media',
                titulo: 'Matéria-Prima Muito Cara',
                descricao: 'A matéria-prima representa mais de 50% do custo unitário.',
                acao: 'Pesquise novos fornecedores ou otimize o uso de materiais.'
            });
        }
        
        // Verificar taxa de plataforma alta
        if (dados.taxasPlataforma > 15) {
            recomendacoes.push({
                tipo: 'media',
                titulo: 'Taxas de Plataforma Altas',
                descricao: `Taxas de ${dados.taxasPlataforma}% podem comprometer a rentabilidade.`,
                acao: 'Diversifique canais de venda ou negocie taxas menores.'
            });
        }
        
        return recomendacoes;
    }
}

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModuloCustos;
}
