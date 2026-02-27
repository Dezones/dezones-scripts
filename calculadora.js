(function() {
    if (document.getElementById('tw_calc_container')) {
        document.getElementById('tw_calc_container').remove();
        return;
    }

    const html = `
    <div id="tw_calc_container" style="position:fixed; top:60px; right:20px; z-index:9999; background:#1a0b2e; padding:20px; border:2px solid #00ffff; border-radius:12px; width:350px; color:#e0d5ff; font-family:'Segoe UI', Tahoma, sans-serif; box-shadow: 0 0 20px rgba(0, 255, 255, 0.3); border-top: 8px solid #00ffff;">
        <h3 style="text-align:center; color:#00ffff; margin-top:0; text-transform:uppercase; letter-spacing:1px; border-bottom:1px solid #483d8b; padding-bottom:10px;">Calculadora VIP</h3>
        
        <div style="margin-top:15px;">
            <label style="font-size:11px; color:#b19cd9; font-weight:bold;">MOEDAS TOTAIS NA ACADEMIA</label>
            <input type="number" id="calc_moedas_totais" value="4175" style="width:100%; background:#2d1b4d; border:1px solid #00ffff; color:#fff; padding:8px; border-radius:5px; margin-bottom:12px; outline:none;">
            
            <label style="font-size:11px; color:#b19cd9; font-weight:bold;">LIMITE ATUAL DE NOBRES</label>
            <input type="number" id="calc_limite_atual" value="90" style="width:100%; background:#2d1b4d; border:1px solid #00ffff; color:#fff; padding:8px; border-radius:5px; margin-bottom:12px; outline:none;">
            
            <label style="font-size:11px; color:#b19cd9; font-weight:bold;">META FINAL DE NOBRES</label>
            <input type="number" id="calc_nobres_meta" value="100" style="width:100%; background:#2d1b4d; border:1px solid #00ffff; color:#fff; padding:8px; border-radius:5px; margin-bottom:12px; outline:none;">

            <label style="font-size:11px; color:#b19cd9; font-weight:bold;">DESCONTO BANDEIRA (%)</label>
            <input type="number" id="calc_desc" value="0" style="width:100%; background:#2d1b4d; border:1px solid #00ffff; color:#fff; padding:8px; border-radius:5px; margin-bottom:20px; outline:none;">

            <button id="btn_calc_tw" style="width:100%; background:#00ffff; color:#1a0b2e; border:none; padding:12px; cursor:pointer; font-weight:bold; border-radius:5px; transition:0.3s; text-transform:uppercase;">CALCULAR ESTRATÉGIA</button>
        </div>
        
        <div id="tw_res" style="margin-top:20px; font-size:13px; display:none; background:rgba(0, 255, 255, 0.05); padding:15px; border-radius:8px; border:1px dashed #00ffff;">
            <div style="margin-bottom:8px;">Moedas a Cunhar: <span id="res_moedas" style="color:#00ffff; font-weight:bold; float:right;"></span></div>
            <div style="color:#b19cd9; font-size:11px; margin-bottom:10px; border-bottom:1px solid #483d8b;">RECURSOS TOTAIS:</div>
            <div style="margin-bottom:5px;">Madeira: <span id="res_m" style="color:#00ffff; float:right;"></span></div>
            <div style="margin-bottom:5px;">Argila: <span id="res_a" style="color:#00ffff; float:right;"></span></div>
            <div style="margin-bottom:5px;">Ferro: <span id="res_f" style="color:#00ffff; float:right;"></span></div>
        </div>
        
        <div style="text-align:center; margin-top:15px;">
            <button onclick="document.getElementById('tw_calc_container').remove()" style="background:transparent; color:#b19cd9; border:none; font-size:10px; cursor:pointer; text-decoration:underline;">[ fechar terminal ]</button>
        </div>
    </div>`;

    const div = document.createElement('div');
    div.innerHTML = html;
    document.body.appendChild(div);

    document.getElementById('btn_calc_tw').onclick = function() {
        const moedasNaAcademia = parseInt(document.getElementById('calc_moedas_totais').value);
        const metaFinal = parseInt(document.getElementById('calc_nobres_meta').value);
        const desc = (100 - parseFloat(document.getElementById('calc_desc').value)) / 100;

        const somaPA = (n) => (n * (n + 1)) / 2;
        const totalNecessarioParaMeta = somaPA(metaFinal);
        const faltam = Math.max(0, totalNecessarioParaMeta - moedasNaAcademia);

        document.getElementById('res_moedas').innerText = faltam.toLocaleString('pt-BR');
        document.getElementById('res_m').innerText = Math.ceil(faltam * 28000 * desc).toLocaleString('pt-BR');
        document.getElementById('res_a').innerText = Math.ceil(faltam * 30000 * desc).toLocaleString('pt-BR');
        document.getElementById('res_f').innerText = Math.ceil(faltam * 25000 * desc).toLocaleString('pt-BR');
        document.getElementById('tw_res').style.display = 'block';
    };
})();
