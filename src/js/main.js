// =================================================================
//  Calculador proporcional (main.js)
// -----------------------------------------------------------------
import { Settings } from './settings.js';
import { importe_total } from './comenzar.js';

const context = { settings: undefined };

window.onload = () =>
{
    context.settings = new Settings();
    context.settings.initDOM();

    context.settings.secciones.estado = 0;

    context.settings.doms.botonImporteTotal.addEventListener('click', () => importe_total(context.settings));
    
    // context.settings.doms.secciones[0].classList.add('oculto');
}

export { context };
