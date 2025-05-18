
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
    const estado = settings.secciones.estado;

    settings.doms.secciones[estado].classList.remove('oculto');
    settings.doms.secciones[estado].classList.add('no-oculto');

    settings.doms.botonDiaInicial.addEventListener('click', () => dia_final(importeTotal, settings));
}

function dia_final(importeTotal, settings)
{
    const diaInicialString = settings.doms.inputDiaInicial.value;
    console.log(typeof diaInicialString, diaInicialString);

    settings.secciones.estado = 2;
    const estado = settings.secciones.estado;

    settings.doms.secciones[estado].classList.remove('oculto');
    settings.doms.secciones[estado].classList.add('no-oculto');

    settings.doms.botonDiaFinal.addEventListener('click', () => numero_dias_individual(importeTotal, diaInicialString, settings));
}

function numero_dias_individual(importeTotal, diaInicialString, settings)
{
    const diaFinalString = settings.doms.inputDiaFinal.value;
    console.log(typeof diaFinalString, diaFinalString);

    settings.secciones.estado = 3;
    const estado = settings.secciones.estado;

    settings.doms.secciones[estado].classList.remove('oculto');
    settings.doms.secciones[estado].classList.add('no-oculto');
}
