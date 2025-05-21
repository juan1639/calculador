import { cambiar_estado_seccion, limpiar_interfaz } from "./funciones.js";

export function mostrar_resultados(dataRecibida)
{
    console.log('resultados *******');

    const {
        importeTotal,
        diaInicialString,
        diaFinalString,
        diasTotalesRecibo,
        cantidad_dia,
        entreCuantasPersonas,
        settings
    } = dataRecibida;

    for (let i = 0; i < entreCuantasPersonas; i ++)
    {
        settings.resultados.resultado[i] = 0;
    }

    for (let dia = 0; dia < diasTotalesRecibo; dia ++)
    {
        let diaEntreCuantos = 0;

        for (let i = 0; i < entreCuantasPersonas; i ++)
        {
            if (settings.bucleNombres.diasIndividuales[i][dia])
            {
                diaEntreCuantos ++;
            }
        }

        const esteDia = cantidad_dia / diaEntreCuantos;

        for (let persona = 0; persona < entreCuantasPersonas; persona ++)
        {
            if (settings.bucleNombres.diasIndividuales[persona][dia])
            {
                settings.resultados.resultado[persona] += esteDia;
            }
        }
    }

    limpiar_interfaz(settings);
    
    settings.secciones.estado = 6;
    cambiar_estado_seccion(settings);

    settings.doms.personasResultadosContainer.innerHTML += '';

    for (let i = 0; i < entreCuantasPersonas; i ++)
    {
        const cantidad = settings.resultados.resultado[i].toFixed(2);

        settings.doms.personasResultadosContainer.innerHTML += `
        <div class="label-resultados"><label>${settings.doms.nombresValues[i].value}</label></div>
        <div class="input-resultados">
        <input disabled value="${cantidad}" type="text" name="nombre-resultado-${i}" id="nombre-resultado-${i}" class="nombres-values" style="font-weight: bold;"/>
        </div>`;

        console.log(settings.resultados.resultado[i]);
    }

    settings.doms.botonRepetir.addEventListener('click', () =>
    {
        location.reload();
    });
}
