import { Component, ElementRef, ViewChild } from '@angular/core';
import type { AfterViewInit } from '@angular/core';
import { KundeService } from '../shared';
import { Title } from '@angular/platform-browser';

/**
 * Komponente mit dem Tag &lt;hs-tortendiagramm&gt; zur Visualisierung
 * von Bewertungen durch ein Tortendiagramm.
 */
@Component({
    selector: 'swe-tortendiagramm',
    templateUrl: './diagramm.html',
})
export class TortendiagrammComponent implements AfterViewInit {
    // query results available in ngAfterViewInit
    @ViewChild('chartCanvas', { static: false })
    chartCanvas!: ElementRef<HTMLCanvasElement>;

    constructor(
        private readonly kundeService: KundeService,
        private readonly titleService: Title,
    ) {
        console.log('TortendiagrammComponent.constructor()');
    }

    /**
     * Das Tortendiagramm beim Tag <code><canvas></code> einf&uuml;gen.
     * Erst in ngAfterViewInit kann auf ein Kind-Element aus dem Template
     * zugegriffen werden.
     */
    async ngAfterViewInit() {
        await this.kundeService.createPieChart(this.chartCanvas.nativeElement);
        this.titleService.setTitle('Tortendiagramm');
    }
}
