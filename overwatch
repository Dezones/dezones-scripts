javascript:
(function() {
    const unitPop = { "spear": 1, "sword": 1, "archer": 1, "axe": 0, "spy": 0, "light": 0, "marcher": 0, "heavy": 4, "catapult": 2, "ram": 0, "knight": 2, "snob": 0 };
    let villagesData = {}; 

    UI.SuccessMessage("A analisar todas as suas aldeias (Modo Multinível)...", 3000);

    // Função para ler as páginas de tropas (type=there para ver apoios)
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

            if (rows.length === 0) {
                hasNext = false;
            } else {
                processRows(rows, modeType);
                // Verifica se existe o link "próxima" na paginação
                hasNext = $(html).find('.paged-nav-item:contains(">")').length > 0;
                page++;
            }
        }
    }

    function processRows(rows, type) {
        rows.each(function() {
            let vId = $(this).find('.quickedit-vn').attr('data-id');
            let coord = $(this).find('.quickedit-vn').text().match(/\d+\|\d+/)[0];
            
            if (!villagesData[coord]) villagesData[coord] = { coord: coord, totalStack: 0, wall: 20, watchtower: 0 };

            if (type === 'units') {
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
    }

    async function start() {
        // Passo 1: Pegar todas as tropas (incluindo apoios) de todas as páginas
        await fetchAllPages('units');
        // Passo 2: Pegar todos os edifícios de todas as páginas
        await fetchAllPages('buildings');

        // Converter para o formato que o Overwatch original usa
        window.targetData = Object.values(villagesData).map(v => ({
            coord: v.coord,
            totalStack: v.totalStack,
            wall: v.wall,
            watchtower: v.watchtower,
            unitsInVillage: {}, 
            unitsEnRoute: {}
        }));

        UI.SuccessMessage(`Concluído! ${Object.keys(villagesData).length} aldeias processadas.`, 3000);
        
        // Ativa a renderização visual do script original
        if (typeof makeMap === "function") {
            recalculate();
            makeMap();
        }
    }

    start();
})();
