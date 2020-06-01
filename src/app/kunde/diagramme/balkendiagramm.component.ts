import { Component, ElementRef, ViewChild } from '@angular/core';
import type { AfterViewInit } from '@angular/core';
import { KundeService } from '../shared';
import { Title } from '@angular/platform-browser';

/**
 * Komponente mit dem Tag &lt;hs-balkendiagramm&gt; zur Visualisierung
 * von Bewertungen durch ein Balkendiagramm.
 * https://blog.angular-university.io/angular-viewchild
 */
@Component({
    selector: 'swe-balkendiagramm',
    templateUrl: './diagramm.html',
})
export class BalkendiagrammComponent implements AfterViewInit {
    // query results available in ngAfterViewInit
    @ViewChild('chartCanvas', { static: false })
    chartCanvas!: ElementRef<HTMLCanvasElement>;

    constructor(
        private readonly kundeService: KundeService,
        private readonly titleService: Title,
    ) {
        console.log('BalkendiagrammComponent.constructor()');
    }

    /**
     * Das Balkendiagramm beim Tag <code><canvas></code> einf&uuml;gen.
     * Erst in ngAfterViewInit kann auf ein Kind-Element aus dem Template
     * zugegriffen werden:
     * https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html.
     */
    async ngAfterViewInit() {
        await this.kundeService.createBarChart(this.chartCanvas.nativeElement);
        this.titleService.setTitle('Balkendiagramm');
    }
}
