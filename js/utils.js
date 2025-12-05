// utils.js - Utilitários gerais para a aplicação

class Utils {
    constructor(app) {
        this.app = app;
    }
    
    // ==================== VALIDAÇÃO ====================
    
    // Validar CPF/CNPJ
    validarCpfCnpj(valor) {
        if (!valor) return true; // Campo não obrigatório
        
        const limpo = valor.replace(/\D/g, '');
        
        if (limpo.length === 11) {
            return this.validarCPF(limpo);
        } else if (limpo.length === 14) {
            return this.validarCNPJ(limpo);
        }
        
        return false;
    }
    
    // Validar CPF
    validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        
        if (cpf.length !== 11) return false;
        
        // Verificar sequências inválidas
        if (/^(\d)\1{10}$/.test(cpf)) return false;
        
        // Validar primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = soma % 11;
        let digito1 = resto < 2 ? 0 : 11 - resto;
        
        if (digito1 !== parseInt(cpf.charAt(9))) return false;
        
        // Validar segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = soma % 11;
        let digito2 = resto < 2 ? 0 : 11 - resto;
        
        return digito2 === parseInt(cpf.charAt(10));
    }
    
    // Validar CNPJ
    validarCNPJ(cnpj) {
        cnpj = cnpj.replace(/\D/g, '');
        
        if (cnpj.length !== 14) return false;
        
        // Verificar sequências inválidas
        if (/^(\d)\1{13}$/.test(cnpj)) return false;
        
        // Tamanho das matrizes do CNPJ
        const tamanho = cnpj.length - 2;
        const numeros = cnpj.substring(0, tamanho);
        const digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        
        // Validar primeiro dígito
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        
        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado !== parseInt(digitos.charAt(0))) return false;
        
        // Validar segundo dígito
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        return resultado === parseInt(digitos.charAt(1));
    }
    
    // Validar email
    validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Validar telefone
    validarTelefone(telefone) {
        const limpo = telefone.replace(/\D/g, '');
        return limpo.length >= 10 && limpo.length <= 11;
    }
    
    // Validar número positivo
    validarNumeroPositivo(valor) {
        const num = parseFloat(valor);
        return !isNaN(num) && num >= 0;
    }
    
    // Validar porcentagem
    validarPorcentagem(valor) {
        const num = parseFloat(valor);
        return !isNaN(num) && num >= 0 && num <= 100;
    }
    
    // ==================== FORMATAÇÃO ====================
    
    // Formatar CPF
    formatarCPF(cpf) {
        if (!cpf) return '';
        const limpo = cpf.replace(/\D/g, '');
        return limpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    
    // Formatar CNPJ
    formatarCNPJ(cnpj) {
        if (!cnpj) return '';
        const limpo = cnpj.replace(/\D/g, '');
        return limpo.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    
    // Formatar telefone
    formatarTelefone(telefone) {
        if (!telefone) return '';
        const limpo = telefone.replace(/\D/g, '');
        
        if (limpo.length === 11) {
            return limpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (limpo.length === 10) {
            return limpo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        
        return telefone;
    }
    
    // Formatar CEP
    formatarCEP(cep) {
        if (!cep) return '';
        const limpo = cep.replace(/\D/g, '');
        return limpo.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
    
    // Formatar data
    formatarData(data, formato = 'pt-BR') {
        if (!data) return '';
        
        try {
            const date = new Date(data);
            if (isNaN(date.getTime())) return data;
            
            return date.toLocaleDateString(formato, {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch (error) {
            return data;
        }
    }
    
    // Formatar data e hora
    formatarDataHora(data, formato = 'pt-BR') {
        if (!data) return '';
        
        try {
            const date = new Date(data);
            if (isNaN(date.getTime())) return data;
            
            return date.toLocaleDateString(formato, {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return data;
        }
    }
    
    // Formatar número com casas decimais
    formatarNumero(valor, decimais = 2) {
        if (valor === null || valor === undefined || isNaN(valor)) {
            return '0,00';
        }
        
        return parseFloat(valor).toLocaleString('pt-BR', {
            minimumFractionDigits: decimais,
            maximumFractionDigits: decimais
        });
    }
    
    // Formatar porcentagem
    formatarPorcentagem(valor, decimais = 1) {
        if (valor === null || valor === undefined || isNaN(valor)) {
            return '0%';
        }
        
        return parseFloat(valor).toLocaleString('pt-BR', {
            minimumFractionDigits: decimais,
            maximumFractionDigits: decimais,
            style: 'percent'
        });
    }
    
    // Formatar moeda com símbolo
    formatarMoedaCompleta(valor, moeda = 'BRL') {
        return this.app.formatarMoeda(valor, moeda);
    }
    
    // ==================== CÁLCULOS ====================
    
    // Calcular juros compostos
    calcularJurosCompostos(capital, taxa, periodo, tipoPeriodo = 'meses') {
        // Converter taxa para decimal
        const taxaDecimal = taxa / 100;
        
        // Converter período para meses se necessário
        let periodoMeses = periodo;
        if (tipoPeriodo === 'anos') {
            periodoMeses = periodo * 12;
        } else if (tipoPeriodo === 'dias') {
            periodoMeses = periodo / 30;
        }
        
        // Fórmula: M = C * (1 + i)^n
        const montante = capital * Math.pow(1 + taxaDecimal, periodoMeses);
        const juros = montante - capital;
        
        return {
            capital,
            juros,
            montante,
            taxaMensal: taxa,
            periodoMeses,
            jurosPercentual: (juros / capital) * 100
        };
    }
    
    // Calcular valor presente
    calcularValorPresente(valorFuturo, taxa, periodo) {
        // Fórmula: VP = VF / (1 + i)^n
        const taxaDecimal = taxa / 100;
        const valorPresente = valorFuturo / Math.pow(1 + taxaDecimal, periodo);
        
        return {
            valorFuturo,
            valorPresente,
            taxa,
            periodo,
            desconto: valorFuturo - valorPresente
        };
    }
    
    // Calcular média ponderada
    calcularMediaPonderada(valores, pesos) {
        if (valores.length !== pesos.length || valores.length === 0) {
            return 0;
        }
        
        let somaProdutos = 0;
        let somaPesos = 0;
        
        for (let i = 0; i < valores.length; i++) {
            somaProdutos += valores[i] * pesos[i];
            somaPesos += pesos[i];
        }
        
        return somaProdutos / somaPesos;
    }
    
    // Calcular desvio padrão
    calcularDesvioPadrao(valores) {
        if (valores.length === 0) return 0;
        
        const media = valores.reduce((a, b) => a + b, 0) / valores.length;
        const diferencasQuadradas = valores.map(valor => Math.pow(valor - media, 2));
        const mediaDiferencas = diferencasQuadradas.reduce((a, b) => a + b, 0) / valores.length;
        
        return Math.sqrt(mediaDiferencas);
    }
    
    // Calcular variação percentual
    calcularVariacaoPercentual(valorAnterior, valorAtual) {
        if (!valorAnterior || valorAnterior === 0) {
            return valorAtual > 0 ? 100 : 0;
        }
        
        return ((valorAtual - valorAnterior) / valorAnterior) * 100;
    }
    
    // Calcular índice de lucratividade
    calcularIndiceLucratividade(receita, custos) {
        if (!receita || receita === 0) return 0;
        
        const lucro = receita - custos;
        return (lucro / receita) * 100;
    }
    
    // ==================== MANIPULAÇÃO DE DADOS ====================
    
    // Filtrar array por propriedade
    filtrarPorPropriedade(array, propriedade, valor) {
        return array.filter(item => item[propriedade] === valor);
    }
    
    // Ordenar array por propriedade
    ordenarPorPropriedade(array, propriedade, ordem = 'asc') {
        return [...array].sort((a, b) => {
            const valorA = a[propriedade];
            const valorB = b[propriedade];
            
            if (valorA < valorB) return ordem === 'asc' ? -1 : 1;
            if (valorA > valorB) return ordem === 'asc' ? 1 : -1;
            return 0;
        });
    }
    
    // Agrupar array por propriedade
    agruparPorPropriedade(array, propriedade) {
        return array.reduce((grupos, item) => {
            const chave = item[propriedade];
            if (!grupos[chave]) {
                grupos[chave] = [];
            }
            grupos[chave].push(item);
            return grupos;
        }, {});
    }
    
    // Remover duplicatas de array
    removerDuplicatas(array, propriedade = null) {
        if (!propriedade) {
            return [...new Set(array)];
        }
        
        const vistos = new Set();
        return array.filter(item => {
            const chave = item[propriedade];
            if (vistos.has(chave)) {
                return false;
            }
            vistos.add(chave);
            return true;
        });
    }
    
    // Converter objeto para query string
    objetoParaQueryString(objeto) {
        return Object.keys(objeto)
            .map(chave => `${encodeURIComponent(chave)}=${encodeURIComponent(objeto[chave])}`)
            .join('&');
    }
    
    // Converter query string para objeto
    queryStringParaObjeto(queryString) {
        return queryString.split('&').reduce((objeto, par) => {
            const [chave, valor] = par.split('=');
            objeto[decodeURIComponent(chave)] = decodeURIComponent(valor);
            return objeto;
        }, {});
    }
    
    // Deep clone de objeto
    deepClone(objeto) {
        return JSON.parse(JSON.stringify(objeto));
    }
    
    // Mesclar objetos
    mesclarObjetos(...objetos) {
        return objetos.reduce((resultado, objeto) => {
            return { ...resultado, ...objeto };
        }, {});
    }
    
    // ==================== MANIPULAÇÃO DE STRINGS ====================
    
    // Capitalizar primeira letra
    capitalizar(texto) {
        if (!texto) return '';
        return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
    }
    
    // Capitalizar todas as palavras
    capitalizarPalavras(texto) {
        if (!texto) return '';
        return texto
            .split(' ')
            .map(palavra => this.capitalizar(palavra))
            .join(' ');
    }
    
    // Remover acentos
    removerAcentos(texto) {
        if (!texto) return '';
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    
    // Abreviar texto
    abreviarTexto(texto, maxCaracteres, sufixo = '...') {
        if (!texto || texto.length <= maxCaracteres) return texto;
        return texto.substring(0, maxCaracteres) + sufixo;
    }
    
    // Extrair números da string
    extrairNumeros(texto) {
        if (!texto) return '';
        return texto.replace(/\D/g, '');
    }
    
    // Extrair letras da string
    extrairLetras(texto) {
        if (!texto) return '';
        return texto.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    }
    
    // ==================== MANIPULAÇÃO DE DATAS ====================
    
    // Adicionar dias à data
    adicionarDias(data, dias) {
        const novaData = new Date(data);
        novaData.setDate(novaData.getDate() + dias);
        return novaData;
    }
    
    // Adicionar meses à data
    adicionarMeses(data, meses) {
        const novaData = new Date(data);
        novaData.setMonth(novaData.getMonth() + meses);
        return novaData;
    }
    
    // Adicionar anos à data
    adicionarAnos(data, anos) {
        const novaData = new Date(data);
        novaData.setFullYear(novaData.getFullYear() + anos);
        return novaData;
    }
    
    // Calcular diferença entre datas em dias
    diferencaEmDias(data1, data2) {
        const umDia = 24 * 60 * 60 * 1000; // milissegundos em um dia
        const primeiraData = new Date(data1);
        const segundaData = new Date(data2);
        
        return Math.round(Math.abs((primeiraData - segundaData) / umDia));
    }
    
    // Verificar se data é válida
    isDataValida(data) {
        return !isNaN(new Date(data).getTime());
    }
    
    // Obter dia da semana
    getDiaDaSemana(data) {
        const dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const dataObj = new Date(data);
        return dias[dataObj.getDay()];
    }
    
    // ==================== MANIPULAÇÃO DE ARQUIVOS ====================
    
    // Baixar arquivo
    baixarArquivo(conteudo, nomeArquivo, tipoMime = 'text/plain') {
        try {
            const blob = new Blob([conteudo], { type: tipoMime });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            
            link.href = url;
            link.download = nomeArquivo;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            
            return true;
        } catch (error) {
            console.error('❌ Erro ao baixar arquivo:', error);
            return false;
        }
    }
    
    // Ler arquivo como texto
    lerArquivoComoTexto(arquivo) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target.result);
            reader.onerror = (error) => reject(error);
            reader.readAsText(arquivo);
        });
    }
    
    // Ler arquivo como JSON
    async lerArquivoComoJSON(arquivo) {
        try {
            const texto = await this.lerArquivoComoTexto(arquivo);
            return JSON.parse(texto);
        } catch (error) {
            throw new Error('Erro ao ler arquivo JSON: ' + error.message);
        }
    }
    
    // ==================== UI/UX ====================
    
    // Copiar para área de transferência
    async copiarParaClipboard(texto) {
        try {
            await navigator.clipboard.writeText(texto);
            return true;
        } catch (error) {
            console.error('❌ Erro ao copiar para clipboard:', error);
            
            // Fallback para navegadores mais antigos
            const textarea = document.createElement('textarea');
            textarea.value = texto;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            
            try {
                document.execCommand('copy');
                document.body.removeChild(textarea);
                return true;
            } catch (err) {
                document.body.removeChild(textarea);
                return false;
            }
        }
    }
    
    // Gerar cor aleatória
    gerarCorAleatoria() {
        const letras = '0123456789ABCDEF';
        let cor = '#';
        for (let i = 0; i < 6; i++) {
            cor += letras[Math.floor(Math.random() * 16)];
        }
        return cor;
    }
    
    // Gerar cor baseada em string (hash)
    gerarCorDeString(texto) {
        let hash = 0;
        for (let i = 0; i < texto.length; i++) {
            hash = texto.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        let cor = '#';
        for (let i = 0; i < 3; i++) {
            const valor = (hash >> (i * 8)) & 0xFF;
            cor += ('00' + valor.toString(16)).substr(-2);
        }
        
        return cor;
    }
    
    // Gerar ID único
    gerarIdUnico(prefixo = 'id') {
        return `${prefixo}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    // Formatar bytes para tamanho legível
    formatarBytes(bytes, decimais = 2) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const dm = decimais < 0 ? 0 : decimais;
        const tamanhos = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + tamanhos[i];
    }
    
    // ==================== VALIDAÇÃO DE FORMULÁRIOS ====================
    
    // Validar formulário
    validarFormulario(formulario) {
        const elementos = formulario.querySelectorAll('[required]');
        const erros = [];
        
        elementos.forEach(elemento => {
            const valor = elemento.value;
            const nome = elemento.getAttribute('name') || elemento.getAttribute('id') || 'Campo';
            
            if (!valor || valor.trim() === '') {
                erros.push(`${nome} é obrigatório`);
                elemento.classList.add('border-red-500');
            } else {
                elemento.classList.remove('border-red-500');
            }
        });
        
        return {
            valido: erros.length === 0,
            erros
        };
    }
    
    // Limpar validação de formulário
    limparValidacaoFormulario(formulario) {
        formulario.querySelectorAll('.border-red-500').forEach(elemento => {
            elemento.classList.remove('border-red-500');
        });
        
        formulario.querySelectorAll('.erro-validacao').forEach(erro => {
            erro.remove();
        });
    }
    
    // Mostrar erros de validação
    mostrarErrosValidacao(formulario, erros) {
        this.limparValidacaoFormulario(formulario);
        
        if (erros.length === 0) return;
        
        // Criar container de erros
        const container = document.createElement('div');
        container.className = 'p-4 mb-4 bg-red-50 border border-red-200 rounded-lg';
        
        const titulo = document.createElement('div');
        titulo.className = 'font-bold text-red-800 mb-2';
        titulo.textContent = 'Corrija os seguintes erros:';
        
        const lista = document.createElement('ul');
        lista.className = 'list-disc pl-5 text-red-700';
        
        erros.forEach(erro => {
            const item = document.createElement('li');
            item.textContent = erro;
            lista.appendChild(item);
        });
        
        container.appendChild(titulo);
        container.appendChild(lista);
        
        formulario.insertBefore(container, formulario.firstChild);
    }
    
    // ==================== LOCAL STORAGE ====================
    
    // Salvar dados no localStorage
    salvarNoLocalStorage(chave, dados, tempoExpiracao = null) {
        try {
            const item = {
                dados: dados,
                timestamp: new Date().getTime(),
                expiraEm: tempoExpiracao ? new Date().getTime() + tempoExpiracao : null
            };
            
            localStorage.setItem(chave, JSON.stringify(item));
            return true;
        } catch (error) {
            console.error('❌ Erro ao salvar no localStorage:', error);
            return false;
        }
    }
    
    // Carregar dados do localStorage
    carregarDoLocalStorage(chave) {
        try {
            const item = localStorage.getItem(chave);
            if (!item) return null;
            
            const dados = JSON.parse(item);
            
            // Verificar expiração
            if (dados.expiraEm && new Date().getTime() > dados.expiraEm) {
                localStorage.removeItem(chave);
                return null;
            }
            
            return dados.dados;
        } catch (error) {
            console.error('❌ Erro ao carregar do localStorage:', error);
            return null;
        }
    }
    
    // Remover dados do localStorage
    removerDoLocalStorage(chave) {
        try {
            localStorage.removeItem(chave);
            return true;
        } catch (error) {
            console.error('❌ Erro ao remover do localStorage:', error);
            return false;
        }
    }
    
    // Limpar localStorage
    limparLocalStorage() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('❌ Erro ao limpar localStorage:', error);
            return false;
        }
    }
    
    // ==================== SESSÃO ====================
    
    // Iniciar sessão
    iniciarSessao(dadosUsuario) {
        this.salvarNoLocalStorage('sessao_usuario', dadosUsuario, 24 * 60 * 60 * 1000); // 24 horas
    }
    
    // Obter sessão atual
    obterSessao() {
        return this.carregarDoLocalStorage('sessao_usuario');
    }
    
    // Encerrar sessão
    encerrarSessao() {
        return this.removerDoLocalStorage('sessao_usuario');
    }
    
    // Verificar se usuário está autenticado
    estaAutenticado() {
        return !!this.obterSessao();
    }
}

// Exportar módulo para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}

// Funções utilitárias estáticas (não dependem da instância)
class UtilsEstaticas {
    
    // Debounce function
    static debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const context = this;
            const later = () => {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Throttle function
    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Sleep function
    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Gerar número aleatório entre min e max
    static random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    // Verificar se é número
    static isNumber(valor) {
        return !isNaN(parseFloat(valor)) && isFinite(valor);
    }
    
    // Verificar se é string
    static isString(valor) {
        return typeof valor === 'string' || valor instanceof String;
    }
    
    // Verificar se é array
    static isArray(valor) {
        return Array.isArray(valor);
    }
    
    // Verificar se é objeto
    static isObject(valor) {
        return valor !== null && typeof valor === 'object' && !Array.isArray(valor);
    }
    
    // Verificar se é função
    static isFunction(valor) {
        return typeof valor === 'function';
    }
    
    // Verificar se está vazio
    static isEmpty(valor) {
        if (this.isArray(valor)) return valor.length === 0;
        if (this.isObject(valor)) return Object.keys(valor).length === 0;
        if (this.isString(valor)) return valor.trim().length === 0;
        return valor === null || valor === undefined;
    }
}

// Adicionar métodos estáticos à classe Utils
Object.assign(Utils, UtilsEstaticas);
