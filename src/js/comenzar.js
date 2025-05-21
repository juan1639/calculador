import {
    cambiar_estado_seccion,
    calcularDiasEntreFechas,
    play_sonido
} from './funciones.js';

import
{
    numero_dias_cada_persona
} from './personas.js';

export function importe_total(settings)
{
    play_sonido(settings.sonidos.correct, settings.volumen.correct);

    const importeTotalString = settings.doms.inputImporteTotal.value;
    console.log(typeof importeTotalString, importeTotalString);
    
    const importeTotal = Number.parseFloat(importeTotalString);
    console.log(typeof importeTotal, importeTotal);

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

    const diaInicialString = settings.doms.inputDiaInicial.value;
    console.log(typeof diaInicialString, diaInicialString);

    settings.secciones.estado = 2;
    cambiar_estado_seccion(settings);

    const dataAcum = { importeTotal, diaInicialString, settings };
    settings.doms.botonDiaFinal.addEventListener('click', () => numero_dias_individual(dataAcum));
}

function numero_dias_individual(dataRecibida)
{
    const { importeTotal, diaInicialString, settings } = dataRecibida;

    
    const diaFinalString = settings.doms.inputDiaFinal.value;
    console.log(typeof diaFinalString, diaFinalString);
    
    // Aqui ya calculamos los dias RESTANDO las fechas:
    const diasTotalesRecibo = calcularDiasEntreFechas(diaInicialString, diaFinalString);
    
    if (diasTotalesRecibo === null)
    {
        settings.doms.errorFechaFinalAnterior.classList.remove('oculto');
        settings.doms.errorFechaFinalAnterior.classList.add('no-oculto');
        
        settings.doms.secciones[2].classList.add('error-rojo');
        
        play_sonido(settings.sonidos.wrong, settings.volumen.wrong);
    }
    else if (diasTotalesRecibo >= 0)
    {
        settings.doms.errorFechaFinalAnterior.classList.remove('no-oculto');
        settings.doms.errorFechaFinalAnterior.classList.add('oculto');
        
        settings.doms.secciones[2].classList.remove('error-rojo');

        play_sonido(settings.sonidos.correct, settings.volumen.correct);
    }

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

    selectorEntreCuantasPersonas.addEventListener('change', () =>
    {
        if (diasTotalesRecibo >= 0)
        {
            numero_dias_cada_persona(dataAcum);
        }
        else
        {
            play_sonido(settings.sonidos.wrong, settings.volumen.wrong);
        }
    });
}
