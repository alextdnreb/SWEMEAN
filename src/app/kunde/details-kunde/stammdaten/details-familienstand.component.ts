import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'swe-details-familienstand',
    templateUrl: './details-familienstand.component.html',
})
export class DetailsFamilienstandComponent implements OnInit {
    @Input()
    readonly familienstand: string;

    constructor() {
        console.log('DetailsFamilienstandComponent.constructor()');
    }

    ngOnInit() {
        console.log();
    }
}
