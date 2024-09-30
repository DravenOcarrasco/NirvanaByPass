(async function () {
    /**
     * Função para criar o contexto do módulo.
     * Esse contexto inclui conexão WebSocket, comandos de teclado, gerenciamento de armazenamento e funções utilitárias.
     */
    async function MakeContext() {
        const MODULE_NAME = "NIRVANABYPASS";
        const SOCKET = io(`http://${window.WSACTION.config.ip}:${window.WSACTION.config.port}`, { secure: false });

        const KEYBOARD_COMMANDS = [
            {
                description: "Nothing",
                keys: [
                    {
                        key: "control",
                        uppercase: false
                    }
                ]
            }
        ];

        /**
         * Armazena um valor no armazenamento do módulo.
         * @param {string} key - A chave de armazenamento.
         * @param {any} value - O valor a ser armazenado.
         * @returns {Promise<object>} - Resultado da operação de armazenamento.
         */
        const setStorage = async (key, value) => {
            return new Promise((resolve) => {
                const timeout = setTimeout(() => {
                    resolve({ success: false, error: 'Timeout: The operation took more than 10 seconds.' });
                }, 10000);

                SOCKET.on(`storage.store.res.${MODULE_NAME}.${window.identifier}.${key}`, (data) => {
                    clearTimeout(timeout);
                    resolve(data);
                });

                SOCKET.emit('storage.store', {
                    extension: MODULE_NAME,
                    id: window.identifier,
                    key,
                    value,
                    response: `storage.store.res.${MODULE_NAME}.${window.identifier}.${key}`
                });
            });
        };

        /**
         * Carrega um valor do armazenamento do módulo.
         * @param {string} key - A chave de armazenamento.
         * @returns {Promise<object>} - Resultado da operação de carregamento.
         */
        const getStorage = async (key) => {
            return new Promise((resolve) => {
                const timeout = setTimeout(() => {
                    resolve({ success: false, error: 'Timeout: The operation took more than 10 seconds.' });
                }, 10000);

                SOCKET.on(`storage.load.res.${MODULE_NAME}.${window.identifier}.${key}`, (data) => {
                    clearTimeout(timeout);
                    if (data.success) {
                        resolve(data);
                    } else {
                        resolve({ success: false, error: 'Error loading storage' });
                    }
                });

                SOCKET.emit('storage.load', {
                    extension: MODULE_NAME,
                    id: window.identifier,
                    key,
                    response: `storage.load.res.${MODULE_NAME}.${window.identifier}.${key}`
                });
            });
        };

        /**
         * Obtém o valor de uma variável armazenada, com opção de criá-la caso não exista.
         * @param {string} variableName - O nome da variável.
         * @param {any} defaultValue - O valor padrão se a variável não existir.
         * @param {boolean} create - Se deve criar a variável caso ela não exista.
         * @returns {Promise<any>} - O valor da variável.
         */
        const getVariable = async (variableName, defaultValue, create = false) => {
            const data = await getStorage(variableName);
            if (!data.success && create) {
                await setStorage(variableName, defaultValue);
                return defaultValue;
            } else if (data.success) {
                return data.value;
            } else {
                return defaultValue;
            }
        };

        /**
         * Exibe o menu com as opções fornecidas.
         * Esta função é necessária para o injetor abrir o menu.
         * @param {Array} options - As opções do menu.
         */
        const showMenu = function (options) {
            console.log('Menu is shown with options:', options);
        };

        SOCKET.on('connect', () => {
            console.log(`${MODULE_NAME} Connected to WebSocket server`);

            SOCKET.on(`${MODULE_NAME}:event`, (data) => {
                console.log('Received event:', data);
            });
        });

        SOCKET.on('disconnect', () => {
            console.log(`${MODULE_NAME} Disconnected from WebSocket server`);
        });

        return {
            MODULE_NAME,
            KEYBOARD_COMMANDS,
            setStorage,
            getStorage,
            getVariable,
            showMenu,
            SOCKET
        };
    }

    const context = await MakeContext();

    // Registrar a extensão no contexto global
    if (window.extensionContext) {
        window.extensionContext.addExtension(context.MODULE_NAME, {
            location: window.location,
            ...context
        });
    }

    setTimeout(()=>{
         // Verificar se a URL contém o caminho "https://www.nirvana.finance/community"
         if (window.location.href.includes('www.nirvana.finance')) {
             // Procurar por um iframe com allow="clipboard-write", width="100%", height="100%"
             const iframe = $("#kazm-form").find("iframe");
             // Se o iframe for encontrado, redirecionar para o endereço do src do iframe
             if (iframe) {
                 const iframeSrc = iframe.attr("src");
                 if (iframeSrc) {
                     // Redirecionar a página atual para o endereço do iframe com seus parâmetros
                     window.location.href = iframeSrc;
                 }
             }
         }
    }, 5000)
})();
