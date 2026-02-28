JavaScript
javascript:
(function() {
    // Configurações Globais originais
    var unitPop = { "spear": 1, "sword": 1, "archer": 1, "axe": 0, "spy": 0, "light": 0, "marcher": 0, "heavy": 4, "catapult": 2, "ram": 0, "knight": 2, "snob": 0 };
    var villagesData = {};
    window.targetData = [];

    // Verificação de ambiente
    if (typeof TWMap === 'undefined') {
        alert("Execute este script no Mapa!");
        return;
    }

    UI.SuccessMessage("Overwatch Pessoal: Iniciando leitura (Multi-página)...", 3000);

    // Função para buscar e processar todas as páginas
    async function fetchAllPages(modeType) {
        let page = 0;
        let hasNext = true;
        let baseUrl = `/game.php?screen=overview_villages&mode=${modeType}`;
        if(modeType === 'units') baseUrl += '&type=there';

        while (hasNext) {
            let data = await $.get(`${baseUrl}&page=${page}`);
            let html = $.parseHTML(data);
            let tableId = modeType === 'units' ? '#units_table' : '#buildings_table';
            let rows = $(html).find(`${tableId} tr.nowrap`);

            if (rows.length === 0) break;

            rows.each(function() {
                let cell = $(this).find('.quickedit-vn');
                if (cell.length === 0) return;
                
                let coordMatch = cell.text().match(/\d+\|\d+/);
                if (!coordMatch) return;
                let coord = coordMatch[0];
                
                if (!villagesData[coord]) villagesData[coord] = { coord: coord, totalStack: 0, wall: 20, watchtower: 0 };

                if (modeType === 'units') {
                    let pop = 0;
                    $(this).find('td:gt(1):lt(11)').each(function(i) {
                        let count = parseInt($(this).text()) || 0;
                        let uName = Object.keys(unitPop)[i];
                        pop += count * (unitPop[uName] || 0);
                    });
                    villagesData[coord].totalStack = pop;
                } else {
                    let wall = parseInt($(this).find('td:has(img[src*="wall.png"]) + td').text()) || 0;
                    let tower = parseInt($(this).find('td:has(img[src*="watchtower.png"]) + td').text()) || 0;
                    villagesData[coord].wall = wall;
                    villagesData[coord].watchtower = tower;
                }
            });

            // Lógica de paginação
            let nextBtn = $(html).find('.paged-nav-item:contains(">")');
            hasNext = nextBtn.length > 0 && !nextBtn.parent().hasClass('disabled');
            if (hasNext) page++;
        }
    }

    // Execução sequencial
    async function init() {
        try {
            await fetchAllPages('units');
            await fetchAllPages('buildings');

            // Formata os dados para o formato que o mapa original espera
            window.targetData = Object.values(villagesData).map(v => ({
                coord: v.coord,
                totalStack: v.totalStack,
                wall: v.wall,
                watchtower: v.watchtower
            }));

            UI.SuccessMessage(`Leitura concluída (${targetData.length} aldeias). Renderizando...`, 2000);
            
            // Chama a função de desenho do script original (se disponível no escopo)
            // Caso o script original tenha uma função de 'recalculate' ou 'makeMap', ela rodará aqui:
            if (typeof recalculate === 'function') recalculate();
            if (typeof makeMap === 'function') makeMap();
            
        } catch (e) {
            UI.ErrorMessage("Erro ao processar dados: " + e.message);
        }
    }

    init();
})();
