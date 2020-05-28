/*
 * Copyright (C) 2015 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// Bereitgestellt durch das RouterModule
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { Component } from '@angular/core';
import { FindError } from '../../shared';
import { HttpStatus } from '../../../shared';
import { Input } from '@angular/core';
import { Kunde } from '../../shared';
import { KundeService } from '../../shared';
import type { OnChanges } from '@angular/core';
import type { OnInit } from '@angular/core';
import type { RemoveError } from '../../shared';
import type { SimpleChanges } from '@angular/core';
import type { Suchkriterien } from '../../shared/kunde.service';
import { easeIn } from '../../../shared/animations';
import { easeOut } from '../../../shared/animations';

/**
 * Komponente f&uuml;r das Tag <code>hs-suchergebnis</code>, um zun&auml;chst
 * das Warten und danach das Ergebnis der Suche anzuzeigen, d.h. die gefundenen
 * Kunden oder eine Fehlermeldung.
 */
@Component({
    selector: 'swe-suchergebnis',
    templateUrl: './suchergebnis.component.html',
    styleUrls: ['./suchergebnis.component.scss'],
    animations: [easeIn, easeOut],
})
export class SuchergebnisComponent implements OnChanges, OnInit {
    // Im ganzen Beispiel: lokale Speicherung des Zustands und nicht durch z.B.
    // eine Flux-Bibliothek, wie z.B. Redux http://redux.js.org

    // Property Binding: <hs-suchergebnis [waiting]="...">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    suchkriterien: Suchkriterien | undefined;

    displayedColumns: Array<string> = [
        'position',
        'ID',
        'nachname',
        'email',
        'interessen',
        'kategorie',
        'ort',
        'geschlecht',
        'details',
        'loeschen',
    ];

    waiting = false;

    kunden: Array<Kunde> = [];
    errorMsg: string | undefined;
    isAdmin!: boolean;

    // Empfehlung: Konstruktor nur fuer DI
    // eslint-disable-next-line max-params
    constructor(
        private readonly kundeService: KundeService,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly authService: AuthService,
    ) {
        console.log('SuchergebnisComponent.constructor()');
    }

    async ngOnChanges(changes: SimpleChanges) {
        console.log('SuchergebnisComponent.ngOnChange(): do');
        console.log(changes);
        if (changes.suchkriterien.currentValue === undefined) {
            return;
        }

        this.waiting = true;
        console.log('SuchergebnisComponent.ngOnChange(): run find()');
        try {
            // eslint-disable-next-line unicorn/no-fn-reference-in-iterator
            this.kunden = await this.kundeService.find(this.suchkriterien);
        } catch (err) {
            this.handleFindError(err);
            this.kunden = [];
            return;
        } finally {
            this.waiting = false;
        }

        console.log('SuchergebnisComponent.ngOnChange(): done');
    }

    // Attribute mit @Input() sind undefined im Konstruktor.
    // Methode zum "LifeCycle Hook" OnInit: wird direkt nach dem Konstruktor
    // aufgerufen. Entspricht @PostConstruct bei Java.
    // Weitere Methoden zum Lifecycle: ngAfterViewInit(), ngAfterContentInit()
    // https://angular.io/docs/ts/latest/guide/cheatsheet.html
    // Die Ableitung vom Interface OnInit ist nicht notwendig, aber erleichtet
    // IntelliSense bei der Verwendung von TypeScript.
    ngOnInit() {
        console.log('SuchergebnisComponent.ngOnInit()');
        this.isAdmin = this.authService.isAdmin;
    }

    /**
     * Das ausgew&auml;hlte bzw. angeklickte Kunde in der Detailsseite anzeigen.
     * @param kunde Das ausgew&auml;hlte Kunde
     */
    onClick(kunde: Kunde) {
        console.log('SuchergebnisComponent.onClick(): buch=', kunde);
        // Puffern im Singleton, um nicht erneut zu suchen
        this.kundeService.kunde = kunde;

        /* eslint-disable object-curly-newline */
        return this.router.navigate(['..', kunde._id], {
            relativeTo: this.route,
        });
        /* eslint-enable object-curly-newline */
    }

    mapInteressen(interessen: Array<string>) {
        /* eslint-disable-next-line no-null/no-null */
        if (interessen === null || interessen.length === 0) {
            return '';
        }
        return interessen
            .map(interesse => {
                switch (interesse) {
                    case 'R':
                        return 'Reisen';
                    case 'L':
                        return 'Lesen';
                    case 'S':
                        return 'Sport';
                    default:
                        return '';
                }
            })
            .join(', ');
    }

    getGeschlecht(geschlecht: string) {
        /* eslint-disable-next-line no-null/no-null */
        if (geschlecht === null || geschlecht.length === 0) {
            return '';
        }
        switch (geschlecht) {
            case 'M':
                return 'männlich';
            case 'W':
                return 'weiblich';
            default:
                return 'unbekannt';
        }
    }

    /**
     * Das ausgew&auml;hlte bzw. angeklickte Kunde l&ouml;schen.
     * @param kunde Das ausgew&auml;hlte Kunde
     */
    async onRemove(kunde: Kunde) {
        console.log('SuchergebnisComponent.onRemove(): kunde=', kunde);

        try {
            await this.kundeService.remove(kunde);
        } catch (err) {
            this.handleRemoveError(err);
            return;
        }

        if (this.kunden.length > 0) {
            this.kunden = this.kunden.filter((k: Kunde) => k._id !== kunde._id);
        }
    }

    private handleRemoveError(err: RemoveError) {
        console.error(
            `SuchergebnisComponent.onRemove(): statuscode=${err.statuscode}`,
        );
        this.reset();
        this.errorMsg = 'Fehler beim entfernen des Kunden.';
        console.log(
            `SuchErgebnisComponent.handleRemoveError(): errorMsg=${this.errorMsg}`,
        );
    }

    private handleFindError(err: FindError) {
        const { statuscode } = err;
        console.log(
            `SuchErgebnisComponent.handleFindError(): statuscode=${statuscode}`,
        );
        this.reset();

        switch (statuscode) {
            case HttpStatus.NOT_FOUND:
                this.errorMsg = 'Keine Kunden gefunden.';
                break;
            case HttpStatus.TOO_MANY_REQUESTS:
                this.errorMsg =
                    'Zu viele Anfragen. Bitte versuchen Sie es später noch einmal.';
                break;
            case HttpStatus.GATEWAY_TIMEOUT:
                this.errorMsg = 'Ein interner Fehler ist aufgetreten.';
                console.error('Laeuft der Appserver?');
                break;
            default:
                this.errorMsg = 'Ein unbekannter Fehler ist aufgetreten.';
                break;
        }

        console.log(
            `SuchErgebnisComponent.handleFindError(): errorMsg=${this.errorMsg}`,
        );
    }

    private reset() {
        this.suchkriterien = {
            nachname: '',
            email: '',
            adresse: undefined,
            interessen: { reisen: false, lesen: false, sport: false },
        };

        this.waiting = false;
    }
}
