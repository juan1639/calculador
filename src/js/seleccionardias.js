import
{
    cambiar_estado_seccion,
    devuelve_dia_dela_semana,
    devuelve_mes,
    limpiar_interfaz,
    generarCalendario,
    click_seleccionar_dia,
    play_sonido,
    marcar_desmarcar_todos,
    mover_scroll,
    cambiar_txt_boton
} from "./funciones.js";

import { mostrar_resultados } from './resultados.js';

export function seleccionar_dias(dataRecibida)
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

    //console.log(settings.doms.nombresValues[0].value);
    //console.log("Nro nombres: ", settings.doms.nombresValues.length);

    const diaSemana = devuelve_dia_dela_semana(diaInicialString);
    const mes = devuelve_mes(diaInicialString);
    //console.log(diaSemana, mes);

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

    // -----------------------------------------------------------------------
    // Evento de 'Siguente Persona' (enviar datos dias-individuales-persona)
    // -----------------------------------------------------------------------
    settings.doms.botonEnviarDiasComputados.addEventListener('click', () =>
    {
        play_sonido(settings.sonidos.correct, settings.volumen.correct);

        let arrayDiasPersona = [];

        const botonesArray = Array.from(settings.doms.botonesDiasComputados);
        botonesArray.forEach(elemento =>
        {
            if (elemento.classList.contains('marcado'))
            {
                arrayDiasPersona.push(true);
            }
            else
            {
                arrayDiasPersona.push(false);
            }
        });

        const iteracion = settings.bucleNombres.contador;

        settings.bucleNombres.diasIndividuales[iteracion] = [...arrayDiasPersona];
        console.log(settings.bucleNombres.diasIndividuales);

        if (iteracion < settings.doms.nombresValues.length - 1)
        {
            // *** incrementar el contador (persona) ***
            settings.bucleNombres.contador ++;
            const iteracion = settings.bucleNombres.contador;

            settings.doms.sustituirNombre.textContent = settings.doms.nombresValues[iteracion].value;
            cambiar_txt_boton('Calcular', iteracion, settings);
            
            marcar_desmarcar_todos(false, settings);
            mover_scroll(0, 'smooth');
        }
        else
        {
            mostrar_resultados(dataAcum);
        }
    });

    // -------------------------------------------------------------------
    // Evento de 'Seleccionar todos' (seleccionar todo el periodo)
    // -------------------------------------------------------------------
    settings.doms.botonSeleccionarTodos.addEventListener('click', () =>
    {
        play_sonido(settings.sonidos.numKey, settings.volumen.numKey);
        marcar_desmarcar_todos(true, settings);
    });
}
