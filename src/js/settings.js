
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
            botonEnviarDiasComputados: document.getElementById('boton-enviar-dias-computados')
        };
    }
}
