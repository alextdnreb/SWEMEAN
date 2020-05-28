import { Component } from '@angular/core';
import type { OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
    selector: 'swe-details-kunde',
    templateUrl: './details-kunde.component.html',
})
export class DetailsKundeComponent implements OnInit {
    constructor(private readonly titleService: Title) {
        console.log('DetailsKundeComponent.constructor()');
    }

    ngOnInit() {
        this.titleService.setTitle('Details');
    }
}
