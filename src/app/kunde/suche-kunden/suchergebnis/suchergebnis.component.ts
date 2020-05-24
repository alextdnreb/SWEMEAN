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

/* eslint-disable max-classes-per-file */

// Bereitgestellt durch das RouterModule
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { Component } from '@angular/core';
import { easeIn } from '../../../shared/animations';
import { easeOut } from '../../../shared/animations';
import { FindError } from '../../shared';
import { HttpStatus } from '../../../shared';
import { Input } from '@angular/core';
import { Kunde } from '../../shared';
import { KundeService } from '../../shared';
import type {
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { NgLocalization } from '@angular/common';
import { Subscription } from 'rxjs';
import type { Suchkriterien } from '../../shared/kunde.service';

/**
 * Komponente f&uuml;r das Tag <code>hs-suchergebnis</code>, um zun&auml;chst
 * das Warten und danach das Ergebnis der Suche anzuzeigen, d.h. die gefundenen
 * B&uuml;cher oder eine Fehlermeldung.
 */
@Component({
    selector: 'swe-suchergebnis',
    templateUrl: './suchergebnis.component.html',
    animations: [easeIn, easeOut],
})
export class SuchergebnisComponent implements OnChanges, OnInit, OnDestroy {
    // Im ganzen Beispiel: lokale Speicherung des Zustands und nicht durch z.B.
    // eine Flux-Bibliothek, wie z.B. Redux http://redux.js.org

    // Property Binding: <hs-suchergebnis [waiting]="...">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    suchkriterien: Suchkriterien | undefined;

    waiting = false;

    kunden: Array<Kunde> = [];
    errorMsg: string | undefined;
    isAdmin!: boolean;

    private kundenSubscription!: Subscription;
    private errorSubscription!: Subscription;
    private removeDescription: Subscription | undefined;

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
        if (changes.suchkriterien.currentValue === undefined) {
            return;
        }

        this.waiting = true;
        console.log('SuchergebnisComponent.ngOnChange(): run find()');

        try {
            this.kunden = await this.kundeService.find(this.suchkriterien);
        } catch (err) {
            this.handleFindError(err);
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
        this.kundenSubscription = this.subscribeKunden();
        this.errorSubscription = this.subscribeError();
        this.isAdmin = this.authService.isAdmin;
    }

    ngOnDestroy() {
        console.log('SuchergebnisComponent.ngOnDestroy()');
        this.kundenSubscription.unsubscribe();
        this.errorSubscription.unsubscribe();

        if (this.removeDescription !== undefined) {
            this.removeDescription.unsubscribe();
        }
    }

    private handleFindError(err: FindError) {
        const { statuscode } = err;
        console.log(
            `SuchErgebnisComponent.handleFindError(): statuscode=${statuscode}`,
        );
        this.reset();

        switch (statuscode) {
            case HttpStatus.NOT_FOUND:
                this.errorMsg = 'Keine Bücher gefunden.';
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

    /**
     * Das ausgew&auml;hlte bzw. angeklickte Kunde in der Detailsseite anzeigen.
     * @param kunde Das ausgew&auml;hlte Kunde
     */
    onClick(kunde: Kunde) {
        console.log('SuchergebnisComponent.onSelect(): Kunde=', kunde);
        // Puffern im Singleton, um nicht erneut zu suchen
        this.kundeService.kunde = kunde;
        // TODO: NavigationExtras beim Routing
        // https://github.com/angular/angular/pull/27198
        // https://github.com/angular/angular/commit/67f4a5d4bd3e8e6a35d85500d630d94db061900b
        /* eslint-disable object-curly-newline */
        return this.router.navigate(['..', kunde._id], {
            relativeTo: this.route,
        });
    }

    /**
     * Das ausgew&auml;hlte bzw. angeklickte Kunde l&ouml;schen.
     * @param kunde Das ausgew&auml;hlte Kunde
     */
    async onRemove(kunde: Kunde) {
        console.log('SuchergebnisComponent.onRemove(): buch=', kunde);
        await this.kundeService
            .remove(kunde)
            .catch(err => console.log(err))
            .then(() => console.log('Remove succeed'));
        if (this.kunden.length > 0) {
            this.kunden = this.kunden.filter((k: Kunde) => k._id !== kunde._id);
        }
    }

    /**
     * Methode, um den injizierten <code>BuchService</code> zu beobachten,
     * ob es gefundene bzw. darzustellende B&uuml;cher gibt, die in der
     * Kindkomponente f&uuml;r das Tag <code>gefundene-buecher</code>
     * dargestellt werden. Diese private Methode wird in der Methode
     * <code>ngOnInit</code> aufgerufen.
     */
    private subscribeKunden() {
        console.log('SuchergebnisComponent.subscribeKunden()');
        const next = (kunden: Array<Kunde>) => {
            this.reset();
            this.errorMsg = undefined;

            this.kunden = kunden;
            console.log(
                'SuchErgebnisComponent.subscribeKunden: this.kunden=',
                this.kunden,
            );
        };

        // Observable.subscribe() aus RxJS liefert ein Subscription Objekt,
        // mit dem man den Request auch abbrechen ("cancel") kann
        // https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/subscribe.md
        // http://stackoverflow.com/questions/34533197/what-is-the-difference-between-rx-observable-subscribe-and-foreach
        // https://xgrommx.github.io/rx-book/content/observable/observable_instance_methods/subscribe.html
        // Funktion als Funktionsargument, d.h. Code als Daten uebergeben
        return this.kundeService.kundenSubject.subscribe(next);
    }

    /**
     * Methode, um den injizierten <code>BuchService</code> zu beobachten,
     * ob es bei der Suche Fehler gibt, die in der Kindkomponente f&uuml;r das
     * Tag <code>error-message</code> dargestellt werden. Diese private Methode
     * wird in der Methode <code>ngOnInit</code> aufgerufen.
     */
    private subscribeError() {
        const next = (err: string | number | undefined) => {
            this.reset();
            this.kunden = [];

            console.log('SuchErgebnisComponent.subscribeError: err=', err);
            if (err === undefined) {
                this.errorMsg = 'Ein Fehler ist aufgetreten.';
                return;
            }

            if (typeof err === 'string') {
                this.errorMsg = err;
                return;
            }

            switch (err) {
                case HttpStatus.NOT_FOUND:
                    this.errorMsg = 'Keine Kunden gefunden.';
                    break;
                case HttpStatus.TOO_MANY_REQUESTS:
                    this.errorMsg =
                        'Zu viele Anfragen. Bitte versuchen Sie es später noch einmal.';
                    break;
                default:
                    this.errorMsg = 'Ein Fehler ist aufgetreten.';
                    break;
            }
            console.log(`SuchErgebnisComponent.errorMsg: ${this.errorMsg}`);
        };

        return this.kundeService.errorSubject.subscribe(next);
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

export class AnzahlLocalization extends NgLocalization {
    getPluralCategory(count: number) {
        return count === 1 ? 'single' : 'multi'; 
    }
}
