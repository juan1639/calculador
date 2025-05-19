
export function cambiar_estado_seccion(settings)
{
    const estado = settings.secciones.estado;

    settings.doms.secciones[estado].classList.remove('oculto');
    settings.doms.secciones[estado].classList.add('no-oculto');
}

export function limpiar_interfaz(settings)
{
    const estado = settings.secciones.estado;

    for (let i = 0; i <= estado; i ++)
    {
        settings.doms.secciones[i].classList.remove('no-oculto');
        settings.doms.secciones[i].classList.add('oculto');
    }
}

export function calcularDiasEntreFechas(diaInicialString, diaFinalString)
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

export function devuelve_dia_dela_semana(diaInicialString)
{
    const diaInicial = new Date(diaInicialString);

    return diaInicial.getDay();
}

export function devuelve_mes(diaInicialString)
{
    const diaInicial = new Date(diaInicialString);

    return diaInicial.getMonth();
}
