// modulo-exportacao.js - Módulo para exportação de relatórios e dados

class ModuloExportacao {
    constructor(app) {
        this.app = app;
        this.formatosSuportados = {
            pdf: 'PDF (Portable Document Format)',
            excel: 'Excel (XLSX)',
            csv: 'CSV (Comma Separated Values)',
            json: 'JSON (JavaScript Object Notation)',
            html: 'HTML (Web Page)'
        };
        
        this.templatesRelatorio = {
            completo: 'Relatório Completo',
            financeiro: 'Análise Financeira',
            precificacao: 'Estratégia de Precificação',
            mercado: 'Análise de Mercado',
            resumo: 'Resumo Executivo'
        };
    }
    
    // Gerar conteúdo HTML do módulo
    gerarConteudo() {
        return `
            <div class="animate-fade-in">
                <!-- Cabeçalho -->
                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-gray-900 mb-2">Exportação de Relatórios</h1>
                    <p class="text-gray-600">Gere relatórios profissionais para análise e compartilhamento</p>
                </div>
                
                <!-- Opções de Exportação -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <!-- Seleção de Formato -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">
                                <i class="fas fa-file-export text-blue-500"></i>
                                Formato do Relatório
                            </h3>
                        </div>
                        
                        <div class="space-y-4">
                            ${Object.entries(this.formatosSuportados).map(([id, nome]) => `
                                <div class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer formato-relatorio"
                                     onclick="app.modulos.exportacao.selecionarFormato('${id}')"
                                     id="formato-${id}">
                                    <div class="p-2 rounded-lg mr-3 bg-gray-100">
                                        <i class="fas fa-file-${this.getIconFormato(id)} text-gray-600"></i>
                                    </div>
                                    <div class="flex-1">
                                        <div class="font-medium">${nome}</div>
                                        <div class="text-xs text-gray-500">${this.getDescricaoFormato(id)}</div>
                                    </div>
                                    <i class="fas fa-check text-green-500 hidden" id="check-${id}"></i>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Seleção de Template -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">
                                <i class="fas fa-layer-group text-purple-500"></i>
                                Template do Relatório
                            </h3>
                        </div>
                        
                        <div class="space-y-4">
                            ${Object.entries(this.templatesRelatorio).map(([id, nome]) => `
                                <div class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer template-relatorio"
                                     onclick="app.modulos.exportacao.selecionarTemplate('${id}')"
                                     id="template-${id}">
                                    <div class="p-2 rounded-lg mr-3 bg-${this.getCorTemplate(id)}-100">
                                        <i class="fas fa-${this.getIconTemplate(id)} text-${this.getCorTemplate(id)}-600"></i>
                                    </div>
                                    <div class="flex-1">
                                        <div class="font-medium">${nome}</div>
                                        <div class="text-xs text-gray-500">${this.getDescricaoTemplate(id)}</div>
                                    </div>
                                    <i class="fas fa-check text-green-500 hidden" id="check-template-${id}"></i>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <!-- Configurações Avançadas -->
                <div class="card mb-8">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-cogs text-orange-500"></i>
                            Configurações do Relatório
                        </h3>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <!-- Incluir Logotipo -->
                        <div class="form-group">
                            <label class="form-label flex items-center">
                                <input type="checkbox" 
                                       id="incluirLogo" 
                                       class="mr-2 h-5 w-5 text-blue-600">
                                Incluir Logotipo
                            </label>
                            <div class="text-xs text-gray-500 mt-1">Adiciona logotipo da empresa</div>
                        </div>
                        
                        <!-- Incluir Gráficos -->
                        <div class="form-group">
                            <label class="form-label flex items-center">
                                <input type="checkbox" 
                                       id="incluirGraficos" 
                                       class="mr-2 h-5 w-5 text-blue-600"
                                       checked>
                                Incluir Gráficos
                            </label>
                            <div class="text-xs text-gray-500 mt-1">Adiciona gráficos ao relatório</div>
                        </div>
                        
                        <!-- Incluir Recomendações -->
                        <div class="form-group">
                            <label class="form-label flex items-center">
                                <input type="checkbox" 
                                       id="incluirRecomendacoes" 
                                       class="mr-2 h-5 w-5 text-blue-600"
                                       checked>
                                Incluir Recomendações
                            </label>
                            <div class="text-xs text-gray-500 mt-1">Adiciona recomendações personalizadas</div>
                        </div>
                    </div>
                    
                    <!-- Nome do Arquivo -->
                    <div class="mt-6">
                        <label class="form-label">Nome do Arquivo</label>
                        <input type="text" 
                               id="nomeArquivo" 
                               class="form-control-professional"
                               value="relatorio-precificacao-mei">
                        <div class="text-xs text-gray-500 mt-1">Nome personalizado para o arquivo exportado</div>
                    </div>
                </div>
                
                <!-- Pré-visualização -->
                <div class="card mb-8">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-eye text-green-500"></i>
                            Pré-visualização do Relatório
                        </h3>
                    </div>
                    
                    <div class="preview-container p-6 bg-gray-50 rounded-lg overflow-auto max-h-96">
                        <div id="previewConteudo" class="preview-content">
                            <div class="text-center text-gray-500 py-12">
                                <i class="fas fa-file-alt text-4xl mb-4"></i>
                                <div>Selecione um template para visualizar</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-4 text-center">
                        <button onclick="app.modulos.exportacao.atualizarPreview()" 
                                class="btn-outline px-6 py-2">
                            <i class="fas fa-sync-alt mr-2"></i>Atualizar Pré-visualização
                        </button>
                    </div>
                </div>
                
                <!-- Ações de Exportação -->
                <div class="card">
                    <div class="flex flex-col md:flex-row justify-between items-center p-8">
                        <div class="mb-6 md:mb-0 md:mr-6">
                            <div class="text-2xl font-bold text-gray-900 mb-2">Pronto para Exportar?</div>
                            <div class="text-gray-600">
                                Gere um relatório profissional para compartilhar com contadores, sócios ou investidores.
                            </div>
                        </div>
                        
                        <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                            <button onclick="app.modulos.exportacao.atualizarPreview()" 
                                    class="btn-outline px-8 py-3">
                                <i class="fas fa-eye mr-2"></i>Pré-visualizar
                            </button>
                            
                            <button onclick="app.modulos.exportacao.gerarRelatorio()" 
                                    class="btn-primary px-8 py-3">
                                <i class="fas fa-download mr-2"></i>Gerar Relatório
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Links para Contabilidade -->
                <div class="mt-8 text-center">
                    <div class="text-sm text-gray-600 mb-4">
                        Precisa de análise profissional? Nossos contadores podem ajudar.
                    </div>
                    <a href="https://wa.me/5521991577383?text=Olá!%20Gostaria%20de%20uma%20análise%20profissional%20do%20meu%20relatório%20de%20precificação."
                       target="_blank"
                       class="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium">
                        <i class="fab fa-whatsapp text-xl mr-3"></i>
                        Falar com Contador
                    </a>
                </div>
            </div>
        `;
    }
    
    // Inicializar componentes do módulo
    inicializarComponentes() {
        this.selecionarFormato('pdf');
        this.selecionarTemplate('completo');
        this.inicializarEventos();
        this.atualizarPreview();
    }
    
    // Inicializar eventos específicos
    inicializarEventos() {
        // Eventos para checkboxes
        ['incluirLogo', 'incluirGraficos', 'incluirRecomendacoes'].forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.addEventListener('change', () => this.atualizarPreview());
            }
        });
        
        // Evento para nome do arquivo
        const nomeArquivo = document.getElementById('nomeArquivo');
        if (nomeArquivo) {
            nomeArquivo.addEventListener('input', () => this.atualizarPreview());
        }
    }
    
    // Selecionar formato de exportação
    selecionarFormato(formato) {
        this.formatoSelecionado = formato;
        
        // Atualizar seleção visual
        document.querySelectorAll('.formato-relatorio').forEach(el => {
            el.classList.remove('border-blue-500', 'bg-blue-50');
            const check = el.querySelector('.fa-check');
            if (check) check.classList.add('hidden');
        });
        
        const elemento = document.getElementById(`formato-${formato}`);
        if (elemento) {
            elemento.classList.add('border-blue-500', 'bg-blue-50');
            const check = document.getElementById(`check-${formato}`);
            if (check) check.classList.remove('hidden');
        }
    }
    
    // Selecionar template de relatório
    selecionarTemplate(template) {
        this.templateSelecionado = template;
        
        // Atualizar seleção visual
        document.querySelectorAll('.template-relatorio').forEach(el => {
            el.classList.remove('border-purple-500', 'bg-purple-50');
            const check = el.querySelector('.fa-check');
            if (check) check.classList.add('hidden');
        });
        
        const elemento = document.getElementById(`template-${template}`);
        if (elemento) {
            elemento.classList.add('border-purple-500', 'bg-purple-50');
            const check = document.getElementById(`check-template-${template}`);
            if (check) check.classList.remove('hidden');
        }
        
        // Atualizar pré-visualização
        this.atualizarPreview();
    }
    
    // Obter ícone do formato
    getIconFormato(formato) {
        const icones = {
            pdf: 'pdf',
            excel: 'excel',
            csv: 'file-csv',
            json: 'file-code',
            html: 'code'
        };
        return icones[formato] || 'file';
    }
    
    // Obter descrição do formato
    getDescricaoFormato(formato) {
        const descricoes = {
            pdf: 'Ideal para impressão e compartilhamento formal',
            excel: 'Para análise e manipulação de dados',
            csv: 'Para importação em outros sistemas',
            json: 'Para integração com APIs e sistemas',
            html: 'Para visualização em navegadores'
        };
        return descricoes[formato] || '';
    }
    
    // Obter ícone do template
    getIconTemplate(template) {
        const icones = {
            completo: 'file-alt',
            financeiro: 'chart-line',
            precificacao: 'tag',
            mercado: 'chart-bar',
            resumo: 'file-contract'
        };
        return icones[template] || 'file';
    }
    
    // Obter cor do template
    getCorTemplate(template) {
        const cores = {
            completo: 'blue',
            financeiro: 'green',
            precificacao: 'purple',
            mercado: 'orange',
            resumo: 'red'
        };
        return cores[template] || 'gray';
    }
    
    // Obter descrição do template
    getDescricaoTemplate(template) {
        const descricoes = {
            completo: 'Relatório detalhado com todas as análises',
            financeiro: 'Foco em indicadores financeiros e DRE',
            precificacao: 'Análise detalhada da estratégia de preços',
            mercado: 'Comparação com concorrência e posicionamento',
            resumo: 'Resumo executivo para tomada de decisão'
        };
        return descricoes[template] || '';
    }
    
    // Atualizar pré-visualização do relatório
    atualizarPreview() {
        const preview = document.getElementById('previewConteudo');
        if (!preview) return;
        
        const template = this.templateSelecionado || 'completo';
        const conteudo = this.gerarConteudoPreview(template);
        
        preview.innerHTML = conteudo;
    }
    
    // Gerar conteúdo para pré-visualização
    gerarConteudoPreview(template) {
        const dados = this.app.dados;
        const dataAtual = new Date().toLocaleDateString('pt-BR');
        
        let conteudo = `
            <div class="preview-relatorio bg-white p-8 rounded-lg shadow-inner">
                <!-- Cabeçalho -->
                <div class="border-b-2 border-gray-300 pb-6 mb-6">
                    <div class="flex justify-between items-start">
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900 mb-2">Relatório de Precificação</h1>
                            <div class="text-gray-600">
                                <div>Empresa: <strong>${dados.empresa.nome || 'Nome não informado'}</strong></div>
                                <div>Data: ${dataAtual}</div>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-sm text-gray-500">Template: ${this.templatesRelatorio[template]}</div>
                            <div class="text-sm text-gray-500">Gerado por: Brayan Contabilidade</div>
                        </div>
                    </div>
                </div>
        `;
        
        // Conteúdo específico do template
        switch(template) {
            case 'completo':
                conteudo += this.gerarPreviewCompleto(dados);
                break;
            case 'financeiro':
                conteudo += this.gerarPreviewFinanceiro(dados);
                break;
            case 'precificacao':
                conteudo += this.gerarPreviewPrecificacao(dados);
                break;
            case 'mercado':
                conteudo += this.gerarPreviewMercado(dados);
                break;
            case 'resumo':
                conteudo += this.gerarPreviewResumo(dados);
                break;
        }
        
        conteudo += `
                <!-- Rodapé -->
                <div class="border-t-2 border-gray-300 pt-6 mt-6 text-center text-sm text-gray-500">
                    <div>Relatório gerado pelo Sistema Precifica MEI Pro</div>
                    <div>Brayan Contabilidade • (21) 99157-7383 • WhatsApp: wa.me/5521991577383</div>
                </div>
            </div>
        `;
        
        return conteudo;
    }
    
    // Gerar preview do template completo
    gerarPreviewCompleto(dados) {
        return `
            <!-- Resumo Executivo -->
            <div class="mb-8">
                <h2 class="text-xl font-bold text-gray-800 mb-4">📋 Resumo Executivo</h2>
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="p-3 bg-blue-50 rounded-lg">
                        <div class="text-sm text-blue-700">Faturamento Mensal</div>
                        <div class="text-lg font-bold text-blue-600">${this.app.formatarMoeda(dados.resultados.receitaMensal || 0)}</div>
                    </div>
                    <div class="p-3 bg-green-50 rounded-lg">
                        <div class="text-sm text-green-700">Lucro Mensal</div>
                        <div class="text-lg font-bold text-green-600">${this.app.formatarMoeda(dados.resultados.lucroMensal || 0)}</div>
                    </div>
                </div>
            </div>
            
            <!-- Dados da Empresa -->
            <div class="mb-8">
                <h2 class="text-xl font-bold text-gray-800 mb-4">🏢 Dados da Empresa</h2>
                <table class="w-full border-collapse">
                    <tr class="border-b">
                        <td class="py-2 font-medium">Nome:</td>
                        <td class="py-2">${dados.empresa.nome || 'Não informado'}</td>
                    </tr>
                    <tr class="border-b">
                        <td class="py-2 font-medium">Setor:</td>
                        <td class="py-2">${dados.empresa.setor || 'Não informado'}</td>
                    </tr>
                    <tr class="border-b">
                        <td class="py-2 font-medium">Produto/Serviço:</td>
                        <td class="py-2">${dados.produto.nome || 'Não informado'}</td>
                    </tr>
                </table>
            </div>
            
            <!-- Análise Financeira -->
            <div class="mb-8">
                <h2 class="text-xl font-bold text-gray-800 mb-4">💰 Análise Financeira</h2>
                <table class="w-full border-collapse">
                    <tr class="border-b">
                        <td class="py-2">Margem de Lucro:</td>
                        <td class="py-2 font-bold">${(dados.resultados.margemLucro || 0).toFixed(1)}%</td>
                    </tr>
                    <tr class="border-b">
                        <td class="py-2">Ponto de Equilíbrio:</td>
                        <td class="py-2 font-bold">${dados.resultados.pontoEquilibrioUnidades || 0} unidades</td>
                    </tr>
                    <tr class="border-b">
                        <td class="py-2">ROI Mensal:</td>
                        <td class="py-2 font-bold">${(dados.resultados.roiMensal || 0).toFixed(1)}%</td>
                    </tr>
                </table>
            </div>
            
            <!-- Recomendações -->
            <div class="mb-8">
                <h2 class="text-xl font-bold text-gray-800 mb-4">💡 Recomendações</h2>
                <div class="p-4 bg-yellow-50 rounded-lg">
                    ${this.gerarRecomendacoesTexto(dados)}
                </div>
            </div>
        `;
    }
    
    // Gerar preview do template financeiro
    gerarPreviewFinanceiro(dados) {
        return `
            <div class="mb-8">
                <h2 class="text-xl font-bold text-gray-800 mb-4">📊 Demonstração de Resultados</h2>
                <table class="w-full border-collapse">
                    <tr class="border-b">
                        <td class="py-2 font-bold">Receita Bruta:</td>
                        <td class="py-2 text-right font-bold">${this.app.formatarMoeda(dados.resultados.receitaMensal || 0)}</td>
                    </tr>
                    <tr class="border-b">
                        <td class="py-2 pl-4">(-) Custo das Mercadorias:</td>
                        <td class="py-2 text-right">${this.app.formatarMoeda(dados.resultados.cmv || 0)}</td>
                    </tr>
                    <tr class="border-b">
                        <td class="py-2 pl-4">(-) Custos Fixos:</td>
                        <td class="py-2 text-right">${this.app.formatarMoeda(dados.resultados.custosFixosTotais || 0)}</td>
                    </tr>
                    <tr class="border-b">
                        <td class="py-2 pl-4">(-) Impostos e Taxas:</td>
                        <td class="py-2 text-right">${this.app.formatarMoeda(dados.resultados.impostosTaxas || 0)}</td>
                    </tr>
                    <tr class="border-b bg-green-50">
                        <td class="py-2 font-bold">(=) Lucro Líquido:</td>
                        <td class="py-2 text-right font-bold text-green-600">${this.app.formatarMoeda(dados.resultados.lucroMensal || 0)}</td>
                    </tr>
                </table>
            </div>
        `;
    }
    
    // Gerar preview do template de precificação
    gerarPreviewPrecificacao(dados) {
        return `
            <div class="mb-8">
                <h2 class="text-xl font-bold text-gray-800 mb-4">🏷️ Estratégia de Precificação</h2>
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="p-4 bg-blue-50 rounded-lg">
                        <div class="text-sm text-blue-700">Método Utilizado</div>
                        <div class="text-lg font-bold">${this.getNomeMetodo(dados.precificacao.metodo)}</div>
                    </div>
                    <div class="p-4 bg-green-50 rounded-lg">
                        <div class="text-sm text-green-700">Preço de Venda</div>
                        <div class="text-lg font-bold text-green-600">${this.app.formatarMoeda(dados.precificacao.precoVenda || 0)}</div>
                    </div>
                </div>
                
                <h3 class="font-bold text-gray-700 mb-2">Composição do Preço</h3>
                <table class="w-full border-collapse">
                    <tr class="border-b">
                        <td class="py-2">Custo Unitário:</td>
                        <td class="py-2 text-right">${this.app.formatarMoeda(dados.custos.custoTotalUnitario || 0)}</td>
                    </tr>
                    <tr class="border-b">
                        <td class="py-2">Markup Aplicado:</td>
                        <td class="py-2 text-right">${(dados.precificacao.markup || 0).toFixed(1)}%</td>
                    </tr>
                    <tr class="border-b">
                        <td class="py-2">Lucro por Unidade:</td>
                        <td class="py-2 text-right">${this.app.formatarMoeda(dados.resultados.lucroUnitario || 0)}</td>
                    </tr>
                </table>
            </div>
        `;
    }
    
    // Gerar preview do template de mercado
    gerarPreviewMercado(dados) {
        return `
            <div class="mb-8">
                <h2 class="text-xl font-bold text-gray-800 mb-4">📈 Análise de Mercado</h2>
                <div class="p-4 bg-purple-50 rounded-lg mb-4">
                    <div class="font-bold text-purple-800 mb-2">Posicionamento Competitivo</div>
                    <div class="text-sm text-purple-700">
                        Baseado na análise do mercado, seu produto está posicionado de forma competitiva.
                    </div>
                </div>
                
                <h3 class="font-bold text-gray-700 mb-2">Recomendações de Mercado</h3>
                <ul class="list-disc pl-5 space-y-1 text-sm">
                    <li>Considere ajustes sazonais nos preços</li>
                    <li>Monitore preços da concorrência regularmente</li>
                    <li>Destaque diferenciais competitivos</li>
                </ul>
            </div>
        `;
    }
    
    // Gerar preview do template de resumo
    gerarPreviewResumo(dados) {
        return `
            <div class="text-center mb-8">
                <div class="text-3xl font-bold text-gray-900 mb-2">Relatório Resumido</div>
                <div class="text-gray-600 mb-6">${dados.empresa.nome || 'Empresa'}</div>
            </div>
            
            <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg text-center">
                    <div class="text-2xl font-bold text-blue-600">${this.app.formatarMoeda(dados.resultados.lucroMensal || 0)}</div>
                    <div class="text-sm text-blue-700">Lucro Mensal</div>
                </div>
                <div class="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg text-center">
                    <div class="text-2xl font-bold text-green-600">${(dados.resultados.margemLucro || 0).toFixed(1)}%</div>
                    <div class="text-sm text-green-700">Margem de Lucro</div>
                </div>
            </div>
            
            <div class="p-4 bg-gray-50 rounded-lg">
                <div class="text-sm text-gray-700">
                    <strong>Próximos Passos:</strong> Continue monitorando os indicadores e ajuste a estratégia conforme necessário.
                </div>
            </div>
        `;
    }
    
    // Gerar recomendações em texto
    gerarRecomendacoesTexto(dados) {
        const recomendacoes = [];
        
        // Verificar margem de lucro
        if (dados.resultados.margemLucro < 15) {
            recomendacoes.push("• Margem de lucro abaixo do ideal (15%). Considere aumentar preços ou reduzir custos.");
        }
        
        // Verificar ponto de equilíbrio
        if (dados.resultados.pontoEquilibrioUnidades > (dados.produto.qtdVendaMensal || 100) * 0.7) {
            recomendacoes.push("• Ponto de equilíbrio muito alto. Risco elevado de prejuízo.");
        }
        
        // Verificar custos fixos
        if (dados.custos.custoFixoMensal > dados.resultados.receitaMensal * 0.4) {
            recomendacoes.push("• Custos fixos muito altos (acima de 40% da receita).");
        }
        
        // Recomendação padrão se não houver outras
        if (recomendacoes.length === 0) {
            recomendacoes.push("• A saúde financeira do negócio está boa. Continue monitorando os indicadores.");
        }
        
        return recomendacoes.join('<br>');
    }
    
    // Obter nome do método de precificação
    getNomeMetodo(metodo) {
        const metodos = {
            markup: 'Markup sobre Custo',
            margem: 'Margem de Lucro',
            mercado: 'Preço de Mercado',
            valor: 'Valor Percebido',
            psicologico: 'Preço Psicológico'
        };
        return metodos[metodo] || 'Não especificado';
    }
    
    // Gerar relatório
    async gerarRelatorio() {
        try {
            this.app.mostrarToast('Gerando relatório...', 'info');
            
            const formato = this.formatoSelecionado || 'pdf';
            const template = this.templateSelecionado || 'completo';
            
            switch(formato) {
                case 'pdf':
                    await this.gerarPDF(template);
                    break;
                case 'excel':
                    await this.gerarExcel(template);
                    break;
                case 'csv':
                    await this.gerarCSV(template);
                    break;
                case 'json':
                    await this.gerarJSON(template);
                    break;
                case 'html':
                    await this.gerarHTML(template);
                    break;
                default:
                    this.app.mostrarToast('Formato não suportado', 'error');
            }
            
        } catch (error) {
            console.error('❌ Erro ao gerar relatório:', error);
            this.app.mostrarToast('Erro ao gerar relatório', 'error');
        }
    }
    
    // Gerar PDF
    async gerarPDF(template) {
        try {
            // Verificar se jsPDF está disponível
            if (typeof jspdf === 'undefined') {
                this.app.mostrarToast('Biblioteca PDF não carregada', 'error');
                return;
            }
            
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Configurar página
            doc.setFontSize(12);
            
            // Adicionar conteúdo
            const conteudo = this.gerarConteudoPDF(template);
            doc.text(conteudo, 10, 10);
            
            // Obter nome do arquivo
            const nomeArquivo = document.getElementById('nomeArquivo')?.value || 'relatorio-precificacao';
            
            // Salvar PDF
            doc.save(`${nomeArquivo}.pdf`);
            
            this.app.mostrarToast('PDF gerado com sucesso!', 'success');
            
        } catch (error) {
            console.error('❌ Erro ao gerar PDF:', error);
            this.app.mostrarToast('Erro ao gerar PDF. Tente outro formato.', 'error');
        }
    }
    
    // Gerar conteúdo para PDF
    gerarConteudoPDF(template) {
        const dados = this.app.dados;
        const dataAtual = new Date().toLocaleDateString('pt-BR');
        
        let conteudo = `Relatório de Precificação MEI\n`;
        conteudo += `Data: ${dataAtual}\n`;
        conteudo += `Empresa: ${dados.empresa.nome || 'Não informada'}\n\n`;
        
        conteudo += `RESUMO FINANCEIRO\n`;
        conteudo += `----------------\n`;
        conteudo += `Faturamento Mensal: ${this.app.formatarMoeda(dados.resultados.receitaMensal || 0)}\n`;
        conteudo += `Lucro Mensal: ${this.app.formatarMoeda(dados.resultados.lucroMensal || 0)}\n`;
        conteudo += `Margem de Lucro: ${(dados.resultados.margemLucro || 0).toFixed(1)}%\n\n`;
        
        conteudo += `CUSTOS\n`;
        conteudo += `------\n`;
        conteudo += `Custo Unitário: ${this.app.formatarMoeda(dados.custos.custoTotalUnitario || 0)}\n`;
        conteudo += `Custo Fixo Mensal: ${this.app.formatarMoeda(dados.custos.custoFixoMensal || 0)}\n\n`;
        
        conteudo += `PRECIFICAÇÃO\n`;
        conteudo += `------------\n`;
        conteudo += `Preço de Venda: ${this.app.formatarMoeda(dados.precificacao.precoVenda || 0)}\n`;
        conteudo += `Método: ${this.getNomeMetodo(dados.precificacao.metodo)}\n`;
        conteudo += `Lucro por Unidade: ${this.app.formatarMoeda(dados.resultados.lucroUnitario || 0)}\n\n`;
        
        conteudo += `RECOMENDAÇÕES\n`;
        conteudo += `-------------\n`;
        conteudo += `${this.gerarRecomendacoesTexto(dados).replace(/<br>/g, '\n')}\n\n`;
        
        conteudo += `---\n`;
        conteudo += `Gerado por Brayan Contabilidade Calculator\n`;
        conteudo += `Contato: (21) 99157-7383 | WhatsApp: https://wa.me/5521991577383`;
        
        return conteudo;
    }
    
    // Gerar Excel
    async gerarExcel(template) {
        try {
            const dados = this.app.dados;
            const dataAtual = new Date().toLocaleDateString('pt-BR');
            
            // Criar conteúdo CSV (simulação de Excel)
            let csv = 'Relatório de Precificação MEI\r\n';
            csv += 'Data;Valor\r\n';
            csv += `"${dataAtual}";""\r\n`;
            csv += '"Empresa";"' + (dados.empresa.nome || '') + '"\r\n\r\n';
            
            csv += 'RESUMO FINANCEIRO\r\n';
            csv += 'Faturamento Mensal;' + (dados.resultados.receitaMensal || 0) + '\r\n';
            csv += 'Lucro Mensal;' + (dados.resultados.lucroMensal || 0) + '\r\n';
            csv += 'Margem de Lucro;' + (dados.resultados.margemLucro || 0) + '\r\n\r\n';
            
            csv += 'CUSTOS\r\n';
            csv += 'Custo Unitário;' + (dados.custos.custoTotalUnitario || 0) + '\r\n';
            csv += 'Custo Fixo Mensal;' + (dados.custos.custoFixoMensal || 0) + '\r\n\r\n';
            
            csv += 'PRECIFICAÇÃO\r\n';
            csv += 'Preço de Venda;' + (dados.precificacao.precoVenda || 0) + '\r\n';
            csv += 'Método;"' + this.getNomeMetodo(dados.precificacao.metodo) + '"\r\n\r\n';
            
            // Criar arquivo
            const nomeArquivo = document.getElementById('nomeArquivo')?.value || 'relatorio-precificacao';
            const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            
            link.href = url;
            link.download = `${nomeArquivo}.csv`;
            link.click();
            
            URL.revokeObjectURL(url);
            
            this.app.mostrarToast('Arquivo Excel gerado com sucesso!', 'success');
            
        } catch (error) {
            console.error('❌ Erro ao gerar Excel:', error);
            this.app.mostrarToast('Erro ao gerar Excel', 'error');
        }
    }
    
    // Gerar CSV
    async gerarCSV(template) {
        await this.gerarExcel(template); // Reutiliza lógica do Excel
    }
    
    // Gerar JSON
    async gerarJSON(template) {
        try {
            const dados = this.app.dados;
            const relatorio = {
                metadata: {
                    dataGeracao: new Date().toISOString(),
                    template: template,
                    versao: '1.0.0'
                },
                empresa: dados.empresa,
                produto: dados.produto,
                custos: dados.custos,
                precificacao: dados.precificacao,
                resultados: dados.resultados,
                projecoes: dados.projecoes,
                mercado: dados.mercado,
                recomendacoes: this.gerarRecomendacoesTexto(dados)
            };
            
            const jsonString = JSON.stringify(relatorio, null, 2);
            const nomeArquivo = document.getElementById('nomeArquivo')?.value || 'relatorio-precificacao';
            
            const blob = new Blob([jsonString], { type: 'application/json' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            
            link.href = url;
            link.download = `${nomeArquivo}.json`;
            link.click();
            
            URL.revokeObjectURL(url);
            
            this.app.mostrarToast('JSON gerado com sucesso!', 'success');
            
        } catch (error) {
            console.error('❌ Erro ao gerar JSON:', error);
            this.app.mostrarToast('Erro ao gerar JSON', 'error');
        }
    }
    
    // Gerar HTML
    async gerarHTML(template) {
        try {
            const preview = document.getElementById('previewConteudo');
            if (!preview) return;
            
            const conteudoHTML = preview.innerHTML;
            const nomeArquivo = document.getElementById('nomeArquivo')?.value || 'relatorio-precificacao';
            
            // Adicionar estilos básicos
            const htmlCompleto = `
                <!DOCTYPE html>
                <html lang="pt-BR">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Relatório de Precificação - ${nomeArquivo}</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
                        h1, h2, h3 { color: #333; }
                        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        .bg-blue-50 { background-color: #eff6ff; }
                        .bg-green-50 { background-color: #f0fdf4; }
                        .bg-yellow-50 { background-color: #fefce8; }
                        .text-blue-600 { color: #2563eb; }
                        .text-green-600 { color: #16a34a; }
                        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px; }
                    </style>
                </head>
                <body>
                    ${conteudoHTML}
                    <div class="footer">
                        Relatório gerado pelo Sistema Precifica MEI Pro • Brayan Contabilidade • (21) 99157-7383
                    </div>
                </body>
                </html>
            `;
            
            const blob = new Blob([htmlCompleto], { type: 'text/html' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            
            link.href = url;
            link.download = `${nomeArquivo}.html`;
            link.click();
            
            URL.revokeObjectURL(url);
            
            this.app.mostrarToast('HTML gerado com sucesso!', 'success');
            
        } catch (error) {
            console.error('❌ Erro ao gerar HTML:', error);
            this.app.mostrarToast('Erro ao gerar HTML', 'error');
        }
    }
    
    // Gerar PDF simplificado (fallback)
    gerarPDFSimples() {
        const nomeArquivo = document.getElementById('nomeArquivo')?.value || 'relatorio-precificacao';
        
        // Abrir nova janela com conteúdo
        const conteudo = document.getElementById('previewConteudo')?.innerHTML || '';
        const janela = window.open('', '_blank');
        
        janela.document.write(`
            <html>
            <head>
                <title>${nomeArquivo}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    @media print {
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                ${conteudo}
                <div class="no-print" style="margin-top: 20px;">
                    <button onclick="window.print()">Imprimir/Exportar como PDF</button>
                </div>
            </body>
            </html>
        `);
        
        janela.document.close();
    }
}

// Exportar módulo para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModuloExportacao;
}
