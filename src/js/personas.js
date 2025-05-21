import { seleccionar_dias } from "./seleccionardias.js";
import { cambiar_estado_seccion, limpiar_interfaz, play_sonido } from './funciones.js';

export function numero_dias_cada_persona(dataRecibida)
{
    const {
        importeTotal,
        diaInicialString,
        diaFinalString,
        diasTotalesRecibo,
        cantidad_dia,
        selectorEntreCuantasPersonas,
        settings
    } = dataRecibida;

    play_sonido(settings.sonidos.correct, settings.volumen.correct);

    //console.log(typeof selectorEntreCuantasPersonas.value, selectorEntreCuantasPersonas.value);

    const entreCuantasPersonas = Number.parseInt(selectorEntreCuantasPersonas.value);
    //console.log(typeof entreCuantasPersonas, entreCuantasPersonas);

    //console.log("Total-dias:", typeof diasTotalesRecibo, diasTotalesRecibo);
    //console.log("Por-dia:", typeof cantidad_dia, cantidad_dia);

    limpiar_interfaz(settings);

    settings.secciones.estado = 4;
    cambiar_estado_seccion(settings);

    const dataAcum =
    {
        importeTotal,
        diaInicialString,
        diaFinalString,
        diasTotalesRecibo,
        cantidad_dia,
        entreCuantasPersonas,
        settings
    };

    nombres_personas(dataAcum);
}

function nombres_personas(dataRecibida)
{
    const {
        importeTotal,
        diaInicialString,
        diaFinalString,
        diasTotalesRecibo,
        cantidad_dia,
        entreCuantasPersonas,
        settings
    } = dataRecibida;
    
    settings.doms.nombresPersonasContainer.innerHTML += '';

    for (let i = 1; i <= entreCuantasPersonas; i ++)
    {
        settings.doms.nombresPersonasContainer.innerHTML += `
        <div>
        <label>Nombre ${i}</label>
        <input type="text" name="nombre-${i}" id="nombre-${i}" class="nombres-values"/>
        </div>`;
    }

    settings.doms.nombresValues = document.getElementsByClassName('nombres-values');

    const dataAcum =
    {
        importeTotal,
        diaInicialString,
        diaFinalString,
        diasTotalesRecibo,
        cantidad_dia,
        entreCuantasPersonas,
        settings
    };

    settings.doms.botonNombres.addEventListener('click', () => seleccionar_dias(dataAcum));
}
