
export function importe_total(settings)
{
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

function numero_dias_cada_persona(dataRecibida)
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

    console.log(typeof selectorEntreCuantasPersonas.value, selectorEntreCuantasPersonas.value);

    const entreCuantasPersonas = Number.parseFloat(selectorEntreCuantasPersonas.value);
    console.log(typeof entreCuantasPersonas, entreCuantasPersonas);

    console.log("Total-dias:", typeof diasTotalesRecibo, diasTotalesRecibo);
    console.log("Por-dia:", typeof cantidad_dia, cantidad_dia);

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

    mostrar_resultado(dataAcum);
}

function mostrar_resultado(dataRecibida)
{
    console.log(dataRecibida);

}


function cambiar_estado_seccion(settings)
{
    const estado = settings.secciones.estado;

    settings.doms.secciones[estado].classList.remove('oculto');
    settings.doms.secciones[estado].classList.add('no-oculto');
}




function calcularDiasEntreFechas(diaInicialString, diaFinalString)
{
    const diaInicial = new Date(diaInicialString);
    const diaFinal = new Date(diaFinalString);

    if (isNaN(diaInicial) || isNaN(diaFinal))
    {
        console.warn("Fechas inválidas");
        return null;
    }

    const diferenciaMs = diaFinal - diaInicial;
    const diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

    console.log(`Días de diferencia: ${diferenciaDias}`);
    return diferenciaDias;
}
