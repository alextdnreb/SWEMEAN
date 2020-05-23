import { Component } from '@angular/core';
import { SuchkriterienService } from '../../kunde/shared/suchkriterien.service';

@Component({
    selector: 'swe-nav-search',
    templateUrl: './nav-search.component.html',
    styleUrls: ['./nav-search.component.scss'],
})
export class NavSearchComponent {
    nachname = '';

    constructor(private readonly suchkriterienService: SuchkriterienService) {
        console.log('NavSearchComponent.constructor()');
    }

    onFind() {
        this.suchkriterienService.setSuchkriterien({
            nachname: this.nachname,
            interessen: { reisen: false, lesen: false, sport: false },
        });
    }
}
