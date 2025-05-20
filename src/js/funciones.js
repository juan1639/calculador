
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

export function generarCalendario(mes, año, idCalendario, idTitulo, settings, diasTotales, dia_inicial)
{
    const diasEnMes = new Date(año, mes + 1, 0).getDate();
    const primerDia = new Date(año, mes, 1).getDay(); // 0 (Dom) a 6 (Sáb)

    // const calendario = document.querySelector("#calendario tbody");
    const calendario = document.querySelector(`#${idCalendario} tbody`);
    const titulo = document.getElementById(idTitulo);

    const nombresMeses =
    [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    // Limpia el calendario anterior
    calendario.innerHTML = "";
    titulo.textContent = `${nombresMeses[mes]} ${año}`;

    let diaActual = 1;
    let fila = document.createElement("tr");

    // Ajuste para que el lunes sea el primer día
    let inicio = primerDia === 0 ? 6 : primerDia - 1;

    // Celdas vacías hasta el primer día
    for (let i = 0; i < inicio; i++)
    {
        fila.appendChild(document.createElement("td"));
    }

    // Rellenar los días
    while (diaActual <= diasEnMes)
    {
        if (fila.children.length === 7)
        {
            calendario.appendChild(fila);
            fila = document.createElement("tr");
        }

        const celda = document.createElement("td");
        agregar_class_dias_computados(celda, settings, diasTotales, dia_inicial, diaActual);
        celda.textContent = diaActual;
        fila.appendChild(celda);
        diaActual++;
    }

    // Completar fila final si queda incompleta
    while (fila.children.length < 7)
    {
        fila.appendChild(document.createElement("td"));
    }

    calendario.appendChild(fila);
}

function agregar_class_dias_computados(celda, settings, diasTotales, dia_inicial, diaActual)
{
    if (dia_inicial === undefined)
    {
        // A partir del 2do mes, checkea solo el contador...
        if (settings.diasComputados.contador <= diasTotales)
        {
            celda.classList.add("botones-dias-computados");
            settings.diasComputados.contador ++;
        }
    }
    else
    {
        // 1er mes, checkear contador y tambien que el dia...
        // ...comience en el diaInicial(por ejemplo 7) y no en el dia 1 del mes
        if (settings.diasComputados.contador <= diasTotales && diaActual >= dia_inicial)
        {
            celda.classList.add("botones-dias-computados");
            settings.diasComputados.contador ++;
        }
    }
}

export function click_seleccionar_dia(elemento)
{
    console.log('click-', elemento.textContent);

    if (elemento.classList.contains('marcado'))
    {
        elemento.classList.remove('marcado');
        elemento.classList.add('no-marcado');
        return;
    }
    else if (elemento.classList.contains('no-marcado'))
    {
        elemento.classList.remove('no-marcado');
        elemento.classList.add('marcado');
        return;
    }

    elemento.classList.remove('no-marcado');
    elemento.classList.add('marcado');
}
