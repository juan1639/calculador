import {
    cambiar_estado_seccion,
    calcularDiasEntreFechas,
    devuelve_dia_dela_semana,
    devuelve_mes,
    limpiar_interfaz,
    generarCalendario,
    click_seleccionar_dia,
    play_sonido
} from './funciones.js';

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

    play_sonido(settings.sonidos.correct, settings.volumen.correct);

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

    play_sonido(settings.sonidos.correct, settings.volumen.correct);

    console.log(typeof selectorEntreCuantasPersonas.value, selectorEntreCuantasPersonas.value);

    const entreCuantasPersonas = Number.parseFloat(selectorEntreCuantasPersonas.value);
    console.log(typeof entreCuantasPersonas, entreCuantasPersonas);

    console.log("Total-dias:", typeof diasTotalesRecibo, diasTotalesRecibo);
    console.log("Por-dia:", typeof cantidad_dia, cantidad_dia);

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
    //console.log(dataRecibida);

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

function seleccionar_dias(dataRecibida)
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

    play_sonido(settings.sonidos.correct, settings.volumen.correct);

    console.log(settings.doms.nombresValues[0].value);
    console.log(settings.doms.nombresValues[1].value);
    console.log("Nro nombres: ", settings.doms.nombresValues.length);

    const diaSemana = devuelve_dia_dela_semana(diaInicialString);
    const mes = devuelve_mes(diaInicialString);
    console.log(diaSemana, mes);

    limpiar_interfaz(settings);

    settings.secciones.estado = 5;
    cambiar_estado_seccion(settings);

    settings.doms.diasComputadosContainer.innerHTML += '';

    const iteracion = settings.bucleNombres.contador;
    settings.doms.sustituirNombre.textContent = settings.doms.nombresValues[iteracion].value;

    // Obtener fecha actual
    const hoy = new Date(diaInicialString);
    settings.diasComputados.contador = 1;

    const mes1 = hoy.getMonth();
    const año1 = hoy.getFullYear();
    const dia_inicial = hoy.getDate();
    generarCalendario(mes1, año1, "calendario", "titulo-mes", settings, diasTotalesRecibo, dia_inicial);

    // Segundo mes, manejar rollover a enero del siguiente año
    const mes2 = (mes1 + 1) % 12;
    const año2 = mes1 === 11 ? año1 + 1 : año1;
    generarCalendario(mes2, año2, "calendario-2", "titulo-mes-2", settings, diasTotalesRecibo, undefined);

    settings.doms.botonesDiasComputados = document.getElementsByClassName('botones-dias-computados');

    const botonesArray = Array.from(settings.doms.botonesDiasComputados);
    botonesArray.forEach(elemento =>
    {
        // elemento.style.backgroundColor = 'red';
        elemento.addEventListener('click', () => click_seleccionar_dia(elemento));
    });

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

    settings.doms.botonEnviarDiasComputados.addEventListener('click', () =>
    {
        play_sonido(settings.sonidos.correct, settings.volumen.correct);

        let contador = 0;

        const botonesArray = Array.from(settings.doms.botonesDiasComputados);
        botonesArray.forEach(elemento =>
        {
            if (elemento.classList.contains('marcado'))
            {
                contador ++;
            }
        });

        const iteracion = settings.bucleNombres.contador;

        settings.bucleNombres.diasIndividuales[iteracion] = contador;
        console.log(settings.bucleNombres.diasIndividuales);

        if (iteracion < settings.doms.nombresValues.length - 1)
        {
            settings.bucleNombres.contador ++;
            const iteracion = settings.bucleNombres.contador;
            settings.doms.sustituirNombre.textContent = settings.doms.nombresValues[iteracion].value;

            const botonesArray = Array.from(settings.doms.botonesDiasComputados);
            botonesArray.forEach(elemento =>
            {
                elemento.classList.remove('marcado');
                elemento.classList.add('no-marcado');
            });

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        else
        {
            mostrar_resultados(dataAcum);
        }
    });
}

function mostrar_resultados(dataRecibida)
{
    console.log('resultados *******');
}

function iteracionesNombres()
{

}

function novale()
{
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

    settings.doms.botonEnviarDiasComputados.addEventListener('click', mostrar_resultados(dataAcum));
}
