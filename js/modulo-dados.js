// modulo-dados.js - Módulo para gerenciamento de dados da empresa

class ModuloDados {
    constructor(app) {
        this.app = app;
        this.passoAtual = 1;
        this.dadosValidos = false;
    }
    
    // Gerar conteúdo HTML do módulo
    gerarConteudo() {
        return `
            <div class="animate-fade-in">
                <!-- Cabeçalho -->
                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-gray-900 mb-2">Dados da Empresa</h1>
                    <p class="text-gray-600">Informações fundamentais do seu negócio MEI</p>
                </div>
                
                <!-- Progresso -->
                <div class="card mb-8">
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <div class="text-sm font-medium text-gray-700">Progresso do Cadastro</div>
                            <div class="text-xs text-gray-500">Complete todas as etapas</div>
                        </div>
                        <div class="text-right">
                            <div class="text-2xl font-bold text-blue-600" id="progressoDados">0%</div>
                            <div class="text-xs text-gray-500">Concluído</div>
                        </div>
                    </div>
                    <div class="progresso-financeiro">
                        <div class="progresso-financeiro-fill" id="progressoDadosBar" style="width: 0%"></div>
                    </div>
                </div>
                
                <!-- Navegação por Passos -->
                <div class="flex space-x-4 mb-8 overflow-x-auto pb-4">
                    <button onclick="app.modulos.dados.mostrarPasso(1)" 
                            class="step-navigation px-6 py-3 rounded-lg font-medium whitespace-nowrap"
                            id="stepNav1">
                        <i class="fas fa-building mr-2"></i>Empresa
                    </button>
                    <button onclick="app.modulos.dados.mostrarPasso(2)" 
                            class="step-navigation px-6 py-3 rounded-lg font-medium whitespace-nowrap"
                            id="stepNav2">
                        <i class="fas fa-box mr-2"></i>Produto/Serviço
                    </button>
                    <button onclick="app.modulos.dados.mostrarPasso(3)" 
                            class="step-navigation px-6 py-3 rounded-lg font-medium whitespace-nowrap"
                            id="stepNav3">
                        <i class="fas fa-users mr-2"></i>Público-Alvo
                    </button>
                    <button onclick="app.modulos.dados.mostrarPasso(4)" 
                            class="step-navigation px-6 py-3 rounded-lg font-medium whitespace-nowrap"
                            id="stepNav4">
                        <i class="fas fa-chart-line mr-2"></i>Expectativas
                    </button>
                </div>
                
                <!-- Conteúdo dos Passos -->
                <div id="conteudoPassos"></div>
                
                <!-- Navegação -->
                <div class="flex justify-between mt-8 pt-8 border-t border-gray-200">
                    <button onclick="app.modulos.dados.voltarPasso()" 
                            class="btn-outline px-8 py-3">
                        <i class="fas fa-arrow-left mr-2"></i>Voltar
                    </button>
                    
                    <div class="flex space-x-4">
                        <button onclick="app.modulos.dados.salvarRascunho()" 
                                class="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-300">
                            <i class="fas fa-save mr-2"></i>Salvar Rascunho
                        </button>
                        
                        <button onclick="app.modulos.dados.avancarPasso()" 
                                class="btn-primary px-8 py-3"
                                id="btnAvancarDados">
                            Continuar <i class="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Inicializar componentes do módulo
    inicializarComponentes() {
        this.mostrarPasso(1);
        this.atualizarProgresso();
        this.inicializarEventos();
    }
    
    // Inicializar eventos específicos
    inicializarEventos() {
        // Atualizar progresso ao digitar
        document.querySelectorAll('#conteudoPassos input, #conteudoPassos select').forEach(input => {
            input.addEventListener('input', () => this.atualizarProgresso());
        });
    }
    
    // Mostrar um passo específico
    mostrarPasso(passo) {
        this.passoAtual = passo;
        
        // Atualizar navegação
        this.atualizarNavegacaoPassos();
        
        // Mostrar conteúdo do passo
        this.mostrarConteudoPasso(passo);
        
        // Atualizar botão avançar
        this.atualizarBotaoAvancar();
    }
    
    // Atualizar navegação dos passos
    atualizarNavegacaoPassos() {
        // Resetar todos os botões
        document.querySelectorAll('.step-navigation').forEach(btn => {
            btn.className = 'step-navigation px-6 py-3 rounded-lg font-medium whitespace-nowrap bg-gray-100 text-gray-700';
        });
        
        // Ativar botão atual
        const btnAtual = document.getElementById(`stepNav${this.passoAtual}`);
        if (btnAtual) {
            btnAtual.className = 'step-navigation px-6 py-3 rounded-lg font-medium whitespace-nowrap bg-blue-600 text-white';
        }
        
        // Marcar passos anteriores como concluídos
        for (let i = 1; i < this.passoAtual; i++) {
            const btn = document.getElementById(`stepNav${i}`);
            if (btn) {
                btn.className = 'step-navigation px-6 py-3 rounded-lg font-medium whitespace-nowrap bg-green-100 text-green-700';
            }
        }
    }
    
    // Mostrar conteúdo do passo
    mostrarConteudoPasso(passo) {
        const container = document.getElementById('conteudoPassos');
        if (!container) return;
        
        let conteudoHTML = '';
        
        switch(passo) {
            case 1:
                conteudoHTML = this.gerarPassoEmpresa();
                break;
            case 2:
                conteudoHTML = this.gerarPassoProduto();
                break;
            case 3:
                conteudoHTML = this.gerarPassoPublico();
                break;
            case 4:
                conteudoHTML = this.gerarPassoExpectativas();
                break;
        }
        
        container.innerHTML = conteudoHTML;
        
        // Preencher com dados existentes
        this.preencherDadosExistentes();
    }
    
    // Gerar passo 1: Empresa
    gerarPassoEmpresa() {
        return `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-building text-blue-500"></i>
                        Informações da Empresa
                    </h3>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Nome da Empresa -->
                    <div class="form-group">
                        <label class="form-label">
                            Nome da Empresa *
                            <span class="text-red-500">*</span>
                        </label>
                        <input type="text" 
                               id="empresaNome" 
                               class="form-control-professional"
                               placeholder="Ex: Minha Empresa MEI"
                               required>
                        <div class="text-xs text-gray-500 mt-1">Nome comercial do seu negócio</div>
                    </div>
                    
                    <!-- CNPJ -->
                    <div class="form-group">
                        <label class="form-label">CNPJ/CPF</label>
                        <input type="text" 
                               id="empresaCnpj" 
                               class="form-control-professional"
                               placeholder="00.000.000/0000-00">
                        <div class="text-xs text-gray-500 mt-1">CNPJ do MEI ou CPF se ainda não tiver</div>
                    </div>
                    
                    <!-- Setor -->
                    <div class="form-group">
                        <label class="form-label">
                            Setor de Atuação *
                            <span class="text-red-500">*</span>
                        </label>
                        <select id="setorEmpresa" class="form-control-professional" required>
                            <option value="">Selecione o setor</option>
                            <option value="alimentacao">🍕 Alimentação</option>
                            <option value="moda">👗 Moda/Confecção</option>
                            <option value="artesanato">🎨 Artesanato</option>
                            <option value="servicos">🔧 Serviços Técnicos</option>
                            <option value="tecnologia">💻 Tecnologia</option>
                            <option value="beleza">💄 Beleza & Estética</option>
                            <option value="consultoria">📊 Consultoria</option>
                            <option value="educacao">📚 Educação</option>
                            <option value="saude">🏥 Saúde & Bem-estar</option>
                        </select>
                        <div class="text-xs text-gray-500 mt-1">Área principal do seu negócio</div>
                    </div>
                    
                    <!-- Tempo de Mercado -->
                    <div class="form-group">
                        <label class="form-label">Tempo de Mercado</label>
                        <select id="tempoMercado" class="form-control-professional">
                            <option value="">Selecione</option>
                            <option value="iniciante">🚀 Iniciante (menos de 6 meses)</option>
                            <option value="estabilizando">📈 Estabilizando (6 meses - 2 anos)</option>
                            <option value="consolidado">🏆 Consolidado (2-5 anos)</option>
                            <option value="experiente">💎 Experiente (mais de 5 anos)</option>
                        </select>
                        <div class="text-xs text-gray-500 mt-1">Tempo de atuação no mercado</div>
                    </div>
                </div>
                
                <!-- Dica -->
                <div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div class="flex items-start">
                        <i class="fas fa-lightbulb text-blue-500 mt-1 mr-3"></i>
                        <div>
                            <div class="font-medium text-blue-800">Dica da Brayan Contabilidade</div>
                            <div class="text-sm text-blue-700 mt-1">
                                Informações precisas ajudam na análise financeira e planejamento tributário.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Gerar passo 2: Produto/Serviço
    gerarPassoProduto() {
        return `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-box text-green-500"></i>
                        Produto/Serviço
                    </h3>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Nome do Produto -->
                    <div class="form-group">
                        <label class="form-label">
                            Nome do Produto/Serviço *
                            <span class="text-red-500">*</span>
                        </label>
                        <input type="text" 
                               id="nomeProduto" 
                               class="form-control-professional"
                               placeholder="Ex: Camiseta Personalizada Premium"
                               required>
                        <div class="text-xs text-gray-500 mt-1">Nome comercial do que você vende</div>
                    </div>
                    
                    <!-- Categoria -->
                    <div class="form-group">
                        <label class="form-label">Categoria</label>
                        <select id="categoriaProduto" class="form-control-professional">
                            <option value="">Selecione a categoria</option>
                            <option value="produto_fisico">📦 Produto Físico</option>
                            <option value="servico">🔧 Serviço</option>
                            <option value="digital">💾 Produto Digital</option>
                            <option value="assessoria">📊 Assessoria/Consultoria</option>
                        </select>
                        <div class="text-xs text-gray-500 mt-1">Tipo do seu produto/serviço</div>
                    </div>
                    
                    <!-- Descrição -->
                    <div class="form-group md:col-span-2">
                        <label class="form-label">Descrição Detalhada</label>
                        <textarea id="descricaoProduto" 
                                  rows="3" 
                                  class="form-control-professional"
                                  placeholder="Descreva seu produto/serviço, benefícios, diferenciais..."></textarea>
                        <div class="text-xs text-gray-500 mt-1">Destaque o que torna seu produto único</div>
                    </div>
                    
                    <!-- Unidade de Medida -->
                    <div class="form-group">
                        <label class="form-label">Unidade de Medida</label>
                        <select id="unidadeMedida" class="form-control-professional">
                            <option value="unidade">📦 Unidade</option>
                            <option value="hora">⏰ Hora</option>
                            <option value="pacote">🎁 Pacote/Kit</option>
                            <option value="metro">📏 Metro</option>
                            <option value="kg">⚖️ Quilograma</option>
                            <option value="litro">🧴 Litro</option>
                        </select>
                        <div class="text-xs text-gray-500 mt-1">Como você vende seu produto/serviço</div>
                    </div>
                    
                    <!-- Código/SKU -->
                    <div class="form-group">
                        <label class="form-label">Código/SKU (opcional)</label>
                        <input type="text" 
                               id="codigoProduto" 
                               class="form-control-professional"
                               placeholder="EX: PROD001">
                        <div class="text-xs text-gray-500 mt-1">Código interno para controle</div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Gerar passo 3: Público-Alvo
    gerarPassoPublico() {
        return `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-users text-purple-500"></i>
                        Público-Alvo
                    </h3>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Público Principal -->
                    <div class="form-group">
                        <label class="form-label">
                            Público-Alvo Principal *
                            <span class="text-red-500">*</span>
                        </label>
                        <select id="publicoAlvo" class="form-control-professional" required>
                            <option value="">Selecione seu público</option>
                            <option value="jovens_adultos">👨‍🎓 Jovens e Adultos (18-35)</option>
                            <option value="adultos">👨‍💼 Adultos (26-45)</option>
                            <option value="maduros">👨‍🔬 Maduros (46-65)</option>
                            <option value="familias">👨‍👩‍👧‍👦 Famílias</option>
                            <option value="empresas">🏢 Empresas (B2B)</option>
                            <option value="mulheres">👩 Mulheres</option>
                            <option value="homens">👨 Homens</option>
                        </select>
                        <div class="text-xs text-gray-500 mt-1">Quem são seus principais clientes</div>
                    </div>
                    
                    <!-- Poder de Compra -->
                    <div class="form-group">
                        <label class="form-label">Poder de Compra do Cliente</label>
                        <select id="poderCompra" class="form-control-professional">
                            <option value="">Selecione o poder de compra</option>
                            <option value="baixo">💰 Baixo (até R$ 100)</option>
                            <option value="medio_baixo">💰💰 Médio-baixo (R$ 100-300)</option>
                            <option value="medio">💰💰💰 Médio (R$ 300-800)</option>
                            <option value="medio_alto">💰💰💰💰 Médio-alto (R$ 800-2.000)</option>
                            <option value="alto">💰💰💰💰💰 Alto (acima de R$ 2.000)</option>
                        </select>
                        <div class="text-xs text-gray-500 mt-1">Quanto seu cliente pode pagar</div>
                    </div>
                    
                    <!-- Características -->
                    <div class="form-group md:col-span-2">
                        <label class="form-label">Características do Público-Alvo</label>
                        <textarea id="caracteristicasPublico" 
                                  rows="2" 
                                  class="form-control-professional"
                                  placeholder="Ex: Valorizam qualidade, sustentabilidade, preço justo..."></textarea>
                        <div class="text-xs text-gray-500 mt-1">O que é importante para seus clientes</div>
                    </div>
                    
                    <!-- Localização -->
                    <div class="form-group">
                        <label class="form-label">Localização Principal</label>
                        <select id="localizacaoPublico" class="form-control-professional">
                            <option value="">Selecione a localização</option>
                            <option value="local">📍 Local/Cidade</option>
                            <option value="regional">🗺️ Regional</option>
                            <option value="nacional">🇧🇷 Nacional</option>
                        </select>
                        <div class="text-xs text-gray-500 mt-1">Onde seus clientes estão</div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Gerar passo 4: Expectativas
    gerarPassoExpectativas() {
        return `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-chart-line text-orange-500"></i>
                        Expectativas de Vendas
                    </h3>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Quantidade Mensal -->
                    <div class="form-group">
                        <label class="form-label">
                            Quantidade Mensal Esperada *
                            <span class="text-red-500">*</span>
                        </label>
                        <input type="number" 
                               id="qtdVendaMensal" 
                               class="form-control-professional"
                               value="100"
                               min="1"
                               required>
                        <div class="text-xs text-gray-500 mt-1">Unidades que espera vender por mês</div>
                    </div>
                    
                    <!-- Sazonalidade -->
                    <div class="form-group">
                        <label class="form-label">Sazonalidade</label>
                        <select id="sazonalidade" class="form-control-professional">
                            <option value="constante">📅 Constante o ano todo</option>
                            <option value="alta_natal">🎄 Alta no Natal/Fim de Ano</option>
                            <option value="alta_ferias">🏖️ Alta nas Férias</option>
                            <option value="especifica">🎯 Alta em datas específicas</option>
                        </select>
                        <div class="text-xs text-gray-500 mt-1">Como as vendas variam no ano</div>
                    </div>
                    
                    <!-- Taxa de Crescimento -->
                    <div class="form-group">
                        <label class="form-label">Taxa de Crescimento Esperada (%)</label>
                        <input type="number" 
                               id="taxaCrescimento" 
                               class="form-control-professional"
                               value="10"
                               min="0"
                               max="100"
                               step="1">
                        <div class="text-xs text-gray-500 mt-1">Crescimento mensal esperado</div>
                    </div>
                    
                    <!-- Meta de Faturamento -->
                    <div class="form-group">
                        <label class="form-label">Meta de Faturamento (R$)</label>
                        <input type="number" 
                               id="metaFaturamento" 
                               class="form-control-professional"
                               value="10000"
                               min="0">
                        <div class="text-xs text-gray-500 mt-1">Faturamento mensal desejado</div>
                    </div>
                </div>
                
                <!-- Dica Importante -->
                <div class="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div class="flex items-start">
                        <i class="fas fa-chart-line text-green-500 mt-1 mr-3"></i>
                        <div>
                            <div class="font-medium text-green-800">Planejamento Realista</div>
                            <div class="text-sm text-green-700 mt-1">
                                Baseie suas estimativas em dados de mercado. Comece com números conservadores e ajuste conforme o negócio cresce.
                                A Brayan Contabilidade pode ajudar no seu planejamento financeiro.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Avançar para o próximo passo
    avancarPasso() {
        // Validar passo atual
        if (!this.validarPassoAtual()) {
            this.app.mostrarToast('Preencha os campos obrigatórios', 'warning');
            return;
        }
        
        // Salvar dados do passo atual
        this.salvarPassoAtual();
        
        // Avançar ou finalizar
        if (this.passoAtual < 4) {
            this.mostrarPasso(this.passoAtual + 1);
        } else {
            // Finalizar e ir para custos
            this.finalizarDados();
        }
    }
    
    // Voltar para o passo anterior
    voltarPasso() {
        if (this.passoAtual > 1) {
            this.mostrarPasso(this.passoAtual - 1);
        } else {
            this.app.abrirTab('dashboard');
        }
    }
    
    // Validar passo atual
    validarPassoAtual() {
        const passo = this.passoAtual;
        
        switch(passo) {
            case 1:
                return this.validarPassoEmpresa();
            case 2:
                return this.validarPassoProduto();
            case 3:
                return this.validarPassoPublico();
            case 4:
                return this.validarPassoExpectativas();
            default:
                return true;
        }
    }
    
    // Validar passo empresa
    validarPassoEmpresa() {
        const nome = document.getElementById('empresaNome')?.value;
        const setor = document.getElementById('setorEmpresa')?.value;
        
        if (!nome || nome.trim() === '') {
            this.mostrarErroCampo('empresaNome', 'Nome da empresa é obrigatório');
            return false;
        }
        
        if (!setor) {
            this.mostrarErroCampo('setorEmpresa', 'Setor de atuação é obrigatório');
            return false;
        }
        
        return true;
    }
    
    // Validar passo produto
    validarPassoProduto() {
        const nome = document.getElementById('nomeProduto')?.value;
        
        if (!nome || nome.trim() === '') {
            this.mostrarErroCampo('nomeProduto', 'Nome do produto/serviço é obrigatório');
            return false;
        }
        
        return true;
    }
    
    // Validar passo público
    validarPassoPublico() {
        const publico = document.getElementById('publicoAlvo')?.value;
        
        if (!publico) {
            this.mostrarErroCampo('publicoAlvo', 'Público-alvo é obrigatório');
            return false;
        }
        
        return true;
    }
    
    // Validar passo expectativas
    validarPassoExpectativas() {
        const qtd = document.getElementById('qtdVendaMensal')?.value;
        
        if (!qtd || parseFloat(qtd) <= 0) {
            this.mostrarErroCampo('qtdVendaMensal', 'Quantidade mensal deve ser maior que zero');
            return false;
        }
        
        return true;
    }
    
    // Mostrar erro em campo específico
    mostrarErroCampo(campoId, mensagem) {
        const campo = document.getElementById(campoId);
        if (!campo) return;
        
        // Adicionar classe de erro
        campo.classList.add('border-red-500');
        
        // Mostrar mensagem de erro
        let erroDiv = campo.parentElement.querySelector('.erro-validacao');
        if (!erroDiv) {
            erroDiv = document.createElement('div');
            erroDiv.className = 'erro-validacao text-red-600 text-sm mt-1';
            campo.parentElement.appendChild(erroDiv);
        }
        erroDiv.textContent = mensagem;
        
        // Remover após 5 segundos
        setTimeout(() => {
            campo.classList.remove('border-red-500');
            if (erroDiv.parentElement) {
                erroDiv.parentElement.removeChild(erroDiv);
            }
        }, 5000);
    }
    
    // Salvar dados do passo atual
    salvarPassoAtual() {
        switch(this.passoAtual) {
            case 1:
                this.salvarDadosEmpresa();
                break;
            case 2:
                this.salvarDadosProduto();
                break;
            case 3:
                this.salvarDadosPublico();
                break;
            case 4:
                this.salvarDadosExpectativas();
                break;
        }
        
        this.app.salvarDados();
    }
    
    // Salvar dados da empresa
    salvarDadosEmpresa() {
        this.app.dados.empresa = {
            nome: document.getElementById('empresaNome')?.value || '',
            cnpj: document.getElementById('empresaCnpj')?.value || '',
            setor: document.getElementById('setorEmpresa')?.value || '',
            tempoMercado: document.getElementById('tempoMercado')?.value || ''
        };
    }
    
    // Salvar dados do produto
    salvarDadosProduto() {
        this.app.dados.produto = {
            nome: document.getElementById('nomeProduto')?.value || '',
            categoria: document.getElementById('categoriaProduto')?.value || '',
            descricao: document.getElementById('descricaoProduto')?.value || '',
            unidadeMedida: document.getElementById('unidadeMedida')?.value || 'unidade',
            codigo: document.getElementById('codigoProduto')?.value || ''
        };
    }
    
    // Salvar dados do público
    salvarDadosPublico() {
        this.app.dados.produto.publicoAlvo = document.getElementById('publicoAlvo')?.value || '';
        this.app.dados.produto.poderCompra = document.getElementById('poderCompra')?.value || '';
        this.app.dados.produto.caracteristicasPublico = document.getElementById('caracteristicasPublico')?.value || '';
        this.app.dados.produto.localizacao = document.getElementById('localizacaoPublico')?.value || '';
    }
    
    // Salvar dados de expectativas
    salvarDadosExpectativas() {
        this.app.dados.produto.qtdVendaMensal = parseFloat(document.getElementById('qtdVendaMensal')?.value) || 100;
        this.app.dados.produto.sazonalidade = document.getElementById('sazonalidade')?.value || '';
        this.app.dados.produto.taxaCrescimento = parseFloat(document.getElementById('taxaCrescimento')?.value) || 10;
        this.app.dados.produto.metaFaturamento = parseFloat(document.getElementById('metaFaturamento')?.value) || 10000;
    }
    
    // Coletar todos os dados do módulo
    coletarDados() {
        this.salvarDadosEmpresa();
        this.salvarDadosProduto();
        this.salvarDadosPublico();
        this.salvarDadosExpectativas();
    }
    
    // Preencher dados existentes nos formulários
    preencherDadosExistentes() {
        const dados = this.app.dados;
        
        // Empresa
        if (dados.empresa.nome) {
            document.getElementById('empresaNome').value = dados.empresa.nome;
        }
        if (dados.empresa.cnpj) {
            document.getElementById('empresaCnpj').value = dados.empresa.cnpj;
        }
        if (dados.empresa.setor) {
            document.getElementById('setorEmpresa').value = dados.empresa.setor;
        }
        if (dados.empresa.tempoMercado) {
            document.getElementById('tempoMercado').value = dados.empresa.tempoMercado;
        }
        
        // Produto
        if (dados.produto.nome) {
            document.getElementById('nomeProduto').value = dados.produto.nome;
        }
        if (dados.produto.categoria) {
            document.getElementById('categoriaProduto').value = dados.produto.categoria;
        }
        if (dados.produto.descricao) {
            document.getElementById('descricaoProduto').value = dados.produto.descricao;
        }
        if (dados.produto.unidadeMedida) {
            document.getElementById('unidadeMedida').value = dados.produto.unidadeMedida;
        }
        if (dados.produto.codigo) {
            document.getElementById('codigoProduto').value = dados.produto.codigo;
        }
        
        // Público
        if (dados.produto.publicoAlvo) {
            document.getElementById('publicoAlvo').value = dados.produto.publicoAlvo;
        }
        if (dados.produto.poderCompra) {
            document.getElementById('poderCompra').value = dados.produto.poderCompra;
        }
        if (dados.produto.caracteristicasPublico) {
            document.getElementById('caracteristicasPublico').value = dados.produto.caracteristicasPublico;
        }
        if (dados.produto.localizacao) {
            document.getElementById('localizacaoPublico').value = dados.produto.localizacao;
        }
        
        // Expectativas
        if (dados.produto.qtdVendaMensal) {
            document.getElementById('qtdVendaMensal').value = dados.produto.qtdVendaMensal;
        }
        if (dados.produto.sazonalidade) {
            document.getElementById('sazonalidade').value = dados.produto.sazonalidade;
        }
        if (dados.produto.taxaCrescimento) {
            document.getElementById('taxaCrescimento').value = dados.produto.taxaCrescimento;
        }
        if (dados.produto.metaFaturamento) {
            document.getElementById('metaFaturamento').value = dados.produto.metaFaturamento;
        }
    }
    
    // Atualizar botão avançar
    atualizarBotaoAvancar() {
        const btnAvancar = document.getElementById('btnAvancarDados');
        if (!btnAvancar) return;
        
        if (this.passoAtual === 4) {
            btnAvancar.innerHTML = `
                <i class="fas fa-check mr-2"></i>
                Finalizar e Continuar
            `;
        } else {
            btnAvancar.innerHTML = `
                Continuar 
                <i class="fas fa-arrow-right ml-2"></i>
            `;
        }
    }
    
    // Finalizar dados e ir para próxima etapa
    finalizarDados() {
        // Validar todos os passos
        if (!this.validarTodosPassos()) {
            this.app.mostrarToast('Complete todos os passos corretamente', 'warning');
            return;
        }
        
        // Salvar todos os dados
        this.coletarDados();
        
        // Marcar como válido
        this.dadosValidos = true;
        
        // Ir para próxima etapa (custos)
        this.app.abrirTab('custos');
        
        this.app.mostrarToast('Dados da empresa salvos com sucesso!', 'success');
    }
    
    // Validar todos os passos
    validarTodosPassos() {
        return this.validarPassoEmpresa() &&
               this.validarPassoProduto() &&
               this.validarPassoPublico() &&
               this.validarPassoExpectativas();
    }
    
    // Salvar rascunho
    salvarRascunho() {
        this.coletarDados();
        this.app.salvarDados();
        this.app.mostrarToast('Rascunho salvo com sucesso!', 'success');
    }
    
    // Atualizar progresso visual
    atualizarProgresso() {
        let camposObrigatorios = 0;
        let camposPreenchidos = 0;
        
        // Contar campos obrigatórios e preenchidos
        const campos = document.querySelectorAll('#conteudoPassos [required]');
        camposObrigatorios = campos.length;
        
        campos.forEach(campo => {
            if (campo.value && campo.value.trim() !== '') {
                camposPreenchidos++;
            }
        });
        
        // Calcular porcentagem
        const percentual = camposObrigatorios > 0 
            ? Math.round((camposPreenchidos / camposObrigatorios) * 100)
            : 0;
        
        // Atualizar display
        const display = document.getElementById('progressoDados');
        const barra = document.getElementById('progressoDadosBar');
        
        if (display) display.textContent = `${percentual}%`;
        if (barra) barra.style.width = `${percentual}%`;
        
        return percentual;
    }
}

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModuloDados;
}
