(function() {
    if (document.getElementById('tw_calc_container')) {
        document.getElementById('tw_calc_container').remove();
        return;
    }

    const html = `
    <div id="tw_calc_container" style="position:fixed; top:50px; right:20px; z-index:9999; background:#4a3721; padding:15px; border:2px solid #cebb93; border-radius:8px; width:300px; color:#f0e2c5; font-family:Verdana; box-shadow: 0 5px 15px rgba(0,0,0,0.5);">
        <h3 style="text-align:center; color:#ffcc66; margin-top:0;">Calculadora de Nobres</h3>
        <label style="font-size:10px;">Moedas Atuais</label>
        <input type="number" id="calc_moedas_atuais" value="0" style="width:100%; margin-bottom:10px;">
        
        <label style="font-size:10px;">Nobres (Vivos+Treinando+Aldeias)</label>
        <input type="number" id="calc_nobres_atuais" value="0" style="width:100%; margin-bottom:10px;">
        
        <label style="font-size:10px;">Meta Total de Nobres</label>
        <input type="number" id="calc_nobres_meta" value="1" style="width:100%; margin-bottom:10px;">

        <label style="font-size:10px;">Desconto Bandeira (%)</label>
        <input type="number" id="calc_desc" value="0" style="width:100%; margin-bottom:10px;">

        <button id="btn_calc_tw" style="width:100%; background:#8b0000; color:#fff; border:none; padding:8px; cursor:pointer; font-weight:bold;">CALCULAR</button>
        
        <div id="tw_res" style="margin-top:10px; font-size:11px; display:none; background:#3b2a18; padding:8px;">
            Moedas Faltantes: <span id="res_moedas" style="color:#ffcc66"></span><br>
            Mad: <span id="res_m"></span> | Arg: <span id="res_a"></span> | Fer: <span id="res_f"></span>
        </div>
        <button onclick="document.getElementById('tw_calc_container').remove()" style="width:100%; background:transparent; color:#aaa; border:none; font-size:10px; cursor:pointer; margin-top:5px;">[fechar]</button>
    </div>`;

    const div = document.createElement('div');
    div.innerHTML = html;
    document.body.appendChild(div);

    document.getElementById('btn_calc_tw').onclick = function() {
        const atuais = parseInt(document.getElementById('calc_nobres_atuais').value);
        const meta = parseInt(document.getElementById('calc_nobres_meta').value);
        const moedasExtras = parseInt(document.getElementById('calc_moedas_atuais').value);
        const desc = (100 - parseFloat(document.getElementById('calc_desc').value)) / 100;

        const somaMoedas = (n) => (n * (n + 1)) / 2;
        const faltam = Math.max(0, somaMoedas(meta) - (somaMoedas(atuais) + moedasExtras));

        document.getElementById('res_moedas').innerText = faltam;
        document.getElementById('res_m').innerText = Math.ceil(faltam * 28000 * desc).toLocaleString();
        document.getElementById('res_a').innerText = Math.ceil(faltam * 30000 * desc).toLocaleString();
        document.getElementById('res_f').innerText = Math.ceil(faltam * 25000 * desc).toLocaleString();
        document.getElementById('tw_res').style.display = 'block';
    };
})();
