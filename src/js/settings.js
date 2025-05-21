
export class Settings
{
    constructor()
    {
        this.constantes =
        {
            FPS: 50
        };

        this.clickRespuesta =
        {
            bandera: false
        };

        this.estado =
        {
            importeTotal: true,
            periodo: false,
            numeroDiasCadaUno: false,
            resultado: false
        };

        this.secciones =
        {
            estado: 0
        };

        this.diasComputados =
        {
            contador: 0
        };

        this.bucleNombres =
        {
            contador: 0,
            diasIndividuales: []
        };

        this.sonidos =
        {
            boooh: new Audio('assets/audio/boooh.mp3'),
            correct: new Audio('assets/audio/correct-choice.mp3'),
            wrong: new Audio('assets/audio/wrong-answer.mp3'),
            moneda: new Audio('assets/audio/p-ping.mp3'),
            key: new Audio('assets/audio/key.wav'),
            numKey: new Audio('assets/audio/numkey.wav')
        };

        this.volumen =
        {
            correct: 0.8,
            boooh: 0.7,
            wrong: 0.7,
            moneda: 0.4,
            key: 0.9,
            numKey: 0.9
        };

        this.detectarAnchoPantalla();
    }

    detectarAnchoPantalla()
    {
        if (window.innerWidth <= 768)
        {
            console.log("Comienzo con pantalla pequeña");
            return;
        }

        console.log("Comienzo con pantalla grande")
    }

    initDOM()
    {
        this.doms =
        {
            main: document.getElementById('main'),
            introduccionDatos: document.getElementById('introduccion-datos'),
            secciones: document.getElementsByClassName('secciones'),

            inputImporteTotal: document.getElementById('input-importe-total'),
            botonImporteTotal: document.getElementById('boton-importe-total'),

            inputDiaInicial: document.getElementById('input-dia-inicial'),
            botonDiaInicial: document.getElementById('boton-dia-inicial'),

            inputDiaFinal: document.getElementById('input-dia-final'),
            botonDiaFinal: document.getElementById('boton-dia-final'),

            selectores: document.getElementsByClassName('selector'),

            nombresPersonasContainer: document.getElementById('nombres-personas-container'),
            botonNombres: document.getElementById('boton-nombres'),
            sustituirNombre: document.getElementById('sustituir-nombre'),

            diasComputadosContainer: document.getElementById('dias-computados-container'),
            botonEnviarDiasComputados: document.getElementById('boton-enviar-dias-computados'),
            botonSeleccionarTodos: document.getElementById('boton-seleccionar-todos')
        };
    }
}
