import { Component, ElementRef, ViewChild } from '@angular/core';
import type { AfterViewInit } from '@angular/core';
import { KundeService } from '../shared';
import { Title } from '@angular/platform-browser';

/**
 * Komponente mit dem Tag &lt;hs-liniendiagramm&gt; zur Visualisierung
 * von Bewertungen durch ein Liniendiagramm.
 */
@Component({
    selector: 'swe-liniendiagramm',
    templateUrl: './diagramm.html',
})
export class LiniendiagrammComponent implements AfterViewInit {
    // query results available in ngAfterViewInit
    @ViewChild('chartCanvas', { static: false })
    chartCanvas!: ElementRef<HTMLCanvasElement>;

    constructor(
        private readonly kundeService: KundeService,
        private readonly titleService: Title,
    ) {
        console.log('LiniendiagrammComponent.constructor()');
    }

    /**
     * Das Liniendiagramm beim Tag <code><canvas></code> einf&uuml;gen.
     * Erst in ngAfterViewInit kann auf ein Kind-Element aus dem Template
     * zugegriffen werden.
     */
    async ngAfterViewInit() {
        await this.kundeService.createLinearChart(
            this.chartCanvas.nativeElement,
        );
        this.titleService.setTitle('Liniendiagramm');
    }
}
