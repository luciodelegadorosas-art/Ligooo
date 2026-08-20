<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#ffffff">

<title>ReplyMate</title>

<style>
*{
    box-sizing:border-box;
    -webkit-tap-highlight-color:transparent;
}

body{
    margin:0;
    background:#f3f3f5;
    color:#151518;
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;
}

.app{
    width:100%;
    max-width:480px;
    min-height:100vh;
    margin:auto;
    background:#fff;
}

.header{
    padding:20px;
    border-bottom:1px solid #e9e9ec;
    background:#fff;
}

.header-row{
    display:flex;
    align-items:center;
    justify-content:space-between;
}

.logo{
    font-size:24px;
    font-weight:800;
    letter-spacing:-.6px;
}

.logo span{
    color:#ff3f78;
}

.status{
    font-size:12px;
    color:#777;
    background:#f3f3f5;
    padding:6px 9px;
    border-radius:20px;
}

.content{
    padding:20px;
}

.subtitle{
    font-size:14px;
    color:#777;
    margin-bottom:22px;
}

.section-title{
    font-size:15px;
    font-weight:750;
    margin-bottom:10px;
}

/* GALERÍA */

.gallery-button{
    width:100%;
    border:0;
    border-radius:16px;
    background:#f7f7f8;
    min-height:170px;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    overflow:hidden;
    border:1px solid #e5e5e8;
}

.gallery-content{
    text-align:center;
    padding:25px;
}

.gallery-icon{
    width:52px;
    height:52px;
    border-radius:15px;
    background:#151518;
    color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:27px;
    margin:0 auto 12px;
}

.gallery-title{
    font-size:15px;
    font-weight:700;
}

.gallery-subtitle{
    font-size:12px;
    color:#888;
    margin-top:5px;
}

#file{
    display:none;
}

#preview{
    display:none;
    width:100%;
    max-height:330px;
    object-fit:contain;
    border-radius:14px;
}

/* TONOS */

.tones{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:9px;
    margin-bottom:20px;
}

.tone{
    border:1px solid #dedee2;
    background:#fff;
    border-radius:13px;
    padding:14px 8px;
    color:#202024;
    font-size:14px;
    font-weight:600;
    cursor:pointer;
}

.tone.selected{
    background:#151518;
    color:#fff;
    border-color:#151518;
}

.tone:last-child{
    grid-column:1 / 3;
}

/* GENERAR */

.generate{
    width:100%;
    padding:16px;
    border:0;
    border-radius:14px;
    background:#ff3f78;
    color:white;
    font-size:16px;
    font-weight:750;
    cursor:pointer;
}

.generate:active{
    background:#e93469;
}

/* RESULTADOS */

.results{
    display:none;
    margin-top:28px;
}

.results-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:11px;
}

.results-header strong{
    font-size:17px;
}

.results-header span{
    color:#999;
    font-size:12px;
}

.card{
    border:1px solid #e2e2e5;
    border-radius:15px;
    padding:15px;
    margin-bottom:10px;
    background:#fff;
}

.card-number{
    font-size:11px;
    font-weight:700;
    color:#999;
    margin-bottom:8px;
}

.card-text{
    font-size:15px;
    line-height:1.5;
}

.copy{
    margin-top:12px;
    border:1px solid #ddd;
    background:#f6f6f7;
    border-radius:9px;
    padding:8px 13px;
    font-size:12px;
    cursor:pointer;
}

.copy:active{
    background:#e8e8ea;
}

.footer{
    text-align:center;
    color:#aaa;
    font-size:11px;
    padding:25px 20px;
}
</style>
</head>

<body>

<div class="app">

    <!-- CABECERA -->

    <header class="header">

        <div class="header-row">

            <div class="logo">
                Reply<span>Mate</span>
            </div>

            <div class="status">
                ● Listo
            </div>

        </div>

    </header>


    <main class="content">

        <div class="subtitle">
            Sube una captura de tu conversación y encuentra una buena respuesta.
        </div>


        <!-- GALERÍA -->

        <div class="section-title">
            Tu conversación
        </div>

        <label class="gallery-button" for="file">

            <div class="gallery-content" id="galleryContent">

                <div class="gallery-icon">
                    ＋
                </div>

                <div class="gallery-title">
                    Elegir de galería
                </div>

                <div class="gallery-subtitle">
                    Selecciona una captura de tu teléfono
                </div>

            </div>

            <img id="preview" alt="Captura seleccionada">

        </label>

        <input
            id="file"
            type="file"
            accept="image/*"
        >


        <br><br>


        <!-- TONOS -->

        <div class="section-title">
            ¿Qué tipo de respuesta quieres?
        </div>

        <div class="tones">

            <button class="tone" data-tone="caliente">
                🔥 Caliente
            </button>

            <button class="tone" data-tone="enamorar">
                ❤️ Enamorar
            </button>

            <button class="tone" data-tone="chistoso">
                😂 Chistoso
            </button>

            <button class="tone" data-tone="salvar">
                🛟 Salvar
            </button>

            <button class="tone" data-tone="seguro">
                😎 Seguro
            </button>

        </div>


        <!-- BOTÓN -->

        <button class="generate" onclick="generate()">
            Generar respuestas
        </button>


        <!-- RESULTADOS -->

        <section class="results" id="results">

            <div class="results-header">

                <strong>
                    Respuestas para ti
                </strong>

                <span>
                    3 opciones
                </span>

            </div>

            <div id="cards"></div>

        </section>

    </main>


    <footer class="footer">
        ReplyMate · Demo
    </footer>

</div>


<script>

let selectedTone = "";


// ============================
// SELECCIÓN DE TONO
// ============================

const toneButtons = document.querySelectorAll(".tone");

toneButtons.forEach(button => {

    button.addEventListener("click", function(){

        toneButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        this.classList.add("selected");

        selectedTone = this.dataset.tone;

    });

});


// ============================
// GALERÍA
// ============================

const fileInput = document.getElementById("file");

fileInput.addEventListener("change", function(){

    const file = this.files[0];

    if(!file) return;

    if(!file.type.startsWith("image/")){
        alert("Selecciona una imagen.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event){

        const preview = document.getElementById("preview");
        const galleryContent =
            document.getElementById("galleryContent");

        preview.src = event.target.result;

        preview.style.display = "block";

        galleryContent.style.display = "none";

    };

    reader.readAsDataURL(file);

});


// ============================
// RESPUESTAS
// ============================

const responseData = {

    caliente: [

        "Mmm... contigo la conversación se está poniendo interesante 😏🔥",

        "No sé si debería decirte lo que estoy pensando ahora mismo 😏",

        "Cuidado con seguir hablando así conmigo... puedes terminar gustándome demasiado 🔥"

    ],

    enamorar: [

        "Me gusta hablar contigo. Tienes algo que hace que quiera seguir conociéndote ❤️",

        "La verdad, cada vez me dan más ganas de conocerte fuera de este chat.",

        "No sé qué tienes, pero consigues sacarme una sonrisa cada vez que hablamos ❤️"

    ],

    chistoso: [

        "JAJAJA 😂 definitivamente contigo uno nunca sabe qué esperar.",

        "Ok, eso no estaba en mis planes para hoy 😂",

        "Voy a fingir que tengo una respuesta inteligente para esto... pero no 😂"

    ],

    salvar: [

        "A ver, cambiemos de tema antes de que esta conversación se nos muera 😂 ¿qué haces ahora?",

        "Te voy a dar una oportunidad para salvar esta conversación 😌 Cuéntame algo interesante de ti.",

        "Pregunta importante: ¿cuál es algo que podrías hablar durante horas?"

    ],

    seguro: [

        "Me caes bien. Creo que deberíamos seguir hablando y conocernos mejor.",

        "Voy directo: me pareces interesante y quiero saber más de ti 😎",

        "Sin tantas vueltas: ¿cuándo nos tomamos algo y seguimos esta conversación en persona?"

    ]

};


// ============================
// GENERAR
// ============================

function generate(){

    if(!selectedTone){

        alert("Primero elige un estilo de respuesta.");

        return;

    }

    const results =
        responseData[selectedTone];

    const cards =
        document.getElementById("cards");

    cards.innerHTML = "";

    results.forEach((text,index)=>{

        const card =
            document.createElement("div");

        card.className = "card";

        card.innerHTML = `

            <div class="card-number">
                OPCIÓN ${index + 1}
            </div>

            <div class="card-text">
                ${text}
            </div>

            <button
                class="copy"
                onclick="copyResponse(this)"
            >
                Copiar
            </button>

        `;

        cards.appendChild(card);

    });

    document.getElementById("results").style.display = "block";

}


// ============================
// COPIAR
// ============================

function copyResponse(button){

    const text =
        button.parentElement
        .querySelector(".card-text")
        .innerText;

    navigator.clipboard.writeText(text)
    .then(()=>{

        button.innerText = "Copiado ✓";

        setTimeout(()=>{

            button.innerText = "Copiar";

        },1200);

    });

}

</script>

</body>
</html>
