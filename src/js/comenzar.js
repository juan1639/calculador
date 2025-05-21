import {
    cambiar_estado_seccion,
    calcularDiasEntreFechas,
    play_sonido,
    deshabilitar_elementos,
    mostrar_error
} from './funciones.js';

import { numero_dias_cada_persona } from './personas.js';

export function importe_total(settings)
{
    play_sonido(settings.sonidos.correct, settings.volumen.correct);
    deshabilitar_elementos(settings.doms.botonImporteTotal, 0.1);

    const importeTotalString = settings.doms.inputImporteTotal.value;
    //console.log(typeof importeTotalString, importeTotalString);
    
    const importeTotal = Number.parseFloat(importeTotalString);
    //console.log(typeof importeTotal, importeTotal);

    settings.secciones.estado = 1;

    dia_inicial(importeTotal, settings);
}

function dia_inicial(importeTotal, settings)
{
    cambiar_estado_seccion(settings);
    settings.doms.botonDiaInicial.addEventListener('click', () => dia_final(importeTotal, settings));
}

function dia_final(importeTotal, settings)
{
    play_sonido(settings.sonidos.correct, settings.volumen.correct);
    deshabilitar_elementos(settings.doms.botonDiaInicial, 0.1);

    const diaInicialString = settings.doms.inputDiaInicial.value;
    //console.log(typeof diaInicialString, diaInicialString);

    settings.secciones.estado = 2;
    cambiar_estado_seccion(settings);

    const dataAcum = { importeTotal, diaInicialString, settings };

    settings.doms.botonDiaFinal.addEventListener('click', () =>
    {
        if (calcularDiasEntreFechas(diaInicialString, settings.doms.inputDiaFinal.value) === null)
        {
            mostrar_error(true, 2, settings);
            play_sonido(settings.sonidos.wrong, settings.volumen.wrong);
        }
        else if (calcularDiasEntreFechas(diaInicialString, settings.doms.inputDiaFinal.value) >= 0)
        {
            mostrar_error(false, 2, settings);
            play_sonido(settings.sonidos.correct, settings.volumen.correct);

            numero_dias_individual(dataAcum);
        }
    });
}

function numero_dias_individual(dataRecibida)
{
    const { importeTotal, diaInicialString, settings } = dataRecibida;

    deshabilitar_elementos(settings.doms.botonDiaFinal, 0.1);

    const diaFinalString = settings.doms.inputDiaFinal.value;
    //console.log(typeof diaFinalString, diaFinalString);
    
    // Aqui ya calculamos los dias RESTANDO las fechas:
    const diasTotalesRecibo = calcularDiasEntreFechas(diaInicialString, diaFinalString);

    // Calculamos la cantidad/dia:
    const cantidad_dia = importeTotal / diasTotalesRecibo;

    settings.secciones.estado = 3;
    cambiar_estado_seccion(settings);

    const selectorEntreCuantasPersonas = settings.doms.selectores[0];

    const dataAcum =
    {
        importeTotal,
        diaInicialString,
        diaFinalString,
        diasTotalesRecibo,
        cantidad_dia,
        selectorEntreCuantasPersonas,
        settings
    };

    selectorEntreCuantasPersonas.addEventListener('change', () => numero_dias_cada_persona(dataAcum));
}
