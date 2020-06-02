import { Component } from '@angular/core';

/**
 * Komponente f&uuml;r den Hauptteil einer Seite mit dem Tag &lt;hs-main&gt;.
 */
@Component({
    selector: 'swe-main',
    // router-outlet: Komponente fuer das Routing, d.h.
    // Platzhalter fuer den Austausch der HTML-Templates (= Fragmente)
    // beim Routing
    template: `
        <main class="swe-main-container">
            <div class="swe-main"><router-outlet></router-outlet></div>
        </main>
    `,
    styleUrls: ['./main.component.scss'],
})
export class MainComponent {
    constructor() {
        console.log('MainComponent.constructor()');
    }
}
