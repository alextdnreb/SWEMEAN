import { ActivatedRoute, Params } from '@angular/router';
import { AuthService, ROLLE_ADMIN } from '../../auth/auth.service';
import { Kunde, KundeService } from '../shared';
import type { OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { HttpStatus } from '../../shared';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
/**
 * Komponente f&uuml;r das Tag <code>swe-details-kunde</code>
 */
@Component({
    selector: 'swe-details-kunde',
    templateUrl: './details-kunde.component.html',
})
export class DetailsKundeComponent implements OnInit, OnDestroy {
    waiting = true;

    kunde: Kunde | undefined;

    errorMsg: string | undefined;

    isAdmin!: boolean;

    private kundeSubscription!: Subscription;

    private errorSubscription!: Subscription;

    private idParamSubscription!: Subscription;

    private isAdminSubscription!: Subscription;

    private findByIdSubscription: Subscription | undefined;

    // eslint-disable-next-line max-params
    constructor(
        private readonly kundeService: KundeService,
        private readonly titleService: Title,
        private readonly route: ActivatedRoute,
        private readonly authService: AuthService,
    ) {
        console.log('DetailsKundeComponent.constructor()');
    }

    ngOnInit() {
        // Die Beobachtung starten, ob es ein zu darzustellenden Kunde oder
        // einen Fehler gibt.
        this.kundeSubscription = this.subscribeKunde();
        this.errorSubscription = this.subscribeError();
        this.idParamSubscription = this.subscribeIdParam();

        // Initialisierung, falls zwischenzeitlich der Browser geschlossen wurde
        this.isAdmin = this.authService.isAdmin;
        this.isAdminSubscription = this.subscribeIsAdmin();
    }

    ngOnDestroy() {
        this.kundeSubscription.unsubscribe();
        this.errorSubscription.unsubscribe();
        this.idParamSubscription.unsubscribe();
        this.isAdminSubscription.unsubscribe();

        if (this.findByIdSubscription !== undefined) {
            this.findByIdSubscription.unsubscribe();
        }
    }

    private subscribeKunde() {
        const next = (kunde: Kunde) => {
            this.waiting = false;
            this.kunde = kunde;
            console.log('DetailsKundeComponent.kunde=', this.kunde);
            const titel =
                this.kunde === undefined
                    ? 'Details'
                    : `Details ${this.kunde._id}`;
            this.titleService.setTitle(titel);
        };
        return this.kundeService.kundeSubject.subscribe(next);
    }

    private subscribeError() {
        const next = (err: string | number | undefined) => {
            this.waiting = false;
            if (err === undefined) {
                this.errorMsg = 'Ein Fehler ist aufgetreten.';
                return;
            }

            if (typeof err === 'string') {
                this.errorMsg = err;
                return;
            }

            this.errorMsg =
                err === HttpStatus.NOT_FOUND
                    ? 'Kein Kunde gefunden.'
                    : 'Ein Fehler ist aufgetreten.';
            console.log(`DetailsKundeComponent.errorMsg: ${this.errorMsg}`);

            this.titleService.setTitle('Fehler');
        };

        return this.kundeService.errorSubject.subscribe(next);
    }

    private subscribeIdParam() {
        // UUID (oder Mongo-ID) ist ein String
        const next = (params: Params) => {
            console.log(
                'DetailsKundeComponent.subscribeIdParam(): params=',
                params,
            );
            this.findByIdSubscription = this.kundeService.findById(params.id);
        };
        // ActivatedRoute.params ist ein Observable
        return this.route.params.subscribe(next);
    }

    private subscribeIsAdmin() {
        const nextIsAdmin = (event: Array<string>) => {
            this.isAdmin = event.includes(ROLLE_ADMIN);
            console.log(
                `DetailsKundeComponent.subscribeIsAdmin(): isAdmin=${this.isAdmin}`,
            );
        };
        return this.authService.rollenSubject.subscribe(nextIsAdmin);
    }
}
