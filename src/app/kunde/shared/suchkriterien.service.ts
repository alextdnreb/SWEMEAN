import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Suchkriterien } from './kunde.service';

@Injectable({ providedIn: 'root' })
export class SuchkriterienService {
    suchkriterien: Subject<Suchkriterien> = new Subject<Suchkriterien>();

    constructor() {
        console.log('SuchkriterienService.constructor()');
    }

    setSuchkriterien(suchkriterien: Suchkriterien) {
        this.suchkriterien.next(suchkriterien);
    }
}
