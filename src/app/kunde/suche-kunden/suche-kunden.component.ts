import { Component } from '@angular/core';
import type { OnInit } from '@angular/core';
import { Suchkriterien } from '../shared/types';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'swe-suche-kunden',
    templateUrl: './suche-kunden.component.html',
})
export class SucheKundenComponent implements OnInit {
    suchkriterien!: Suchkriterien;
    constructor(private readonly titleService: Title) {
        console.log('SucheKundenComponent.constructor()');
    }

    ngOnInit() {
        this.titleService.setTitle('Suche');
    }

    setSuchkriterien($event: Suchkriterien) {
        console.log(
            'SucheKundenComponent.setSuchkriterien(): suchkriterien=',
            $event,
        );
        this.suchkriterien = $event;
    }
}
