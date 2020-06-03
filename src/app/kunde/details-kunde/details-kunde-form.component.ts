import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FindError, Kunde, KundeService } from '../shared';
import { HOME_PATH, HttpStatus } from '../../shared';

import { AuthService } from '../../auth/auth.service';
import { FormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'swe-kunde-form',
    templateUrl: './details-kunde-form.component.html',
})
export class DetailsKundeFormComponent implements OnInit, OnDestroy {
    waiting = true;

    formWaiting = false;

    kunde: Kunde | undefined;

    errorMsg: string | undefined;

    readonly form = new FormGroup({});

    isUpdate: boolean;

    isAdmin!: boolean;

    private idParamSubscription!: Subscription;

    // eslint-disable-next-line max-params
    constructor(
        private readonly kundeService: KundeService,
        private readonly titleService: Title,
        private readonly route: ActivatedRoute,
        private readonly authService: AuthService,
        private readonly snackBar: MatSnackBar,
    ) {
        console.log('DetailsKundeFormComponent.constructor()');
    }

    ngOnInit() {
        // Die Beobachtung starten, ob es einen Pfadparameter gibt, ohne dass
        // bisher ein JavaScript-Ereignis, wie z.B. click, eingetreten ist.
        this.idParamSubscription = this.subscribeIdParam();

        // Initialisierung, falls zwischenzeitlich der Browser geschlossen wurde
        this.isAdmin = this.authService.isAdmin;
    }

    ngOnDestroy() {
        this.idParamSubscription.unsubscribe();
    }

    onChange(event: MatSlideToggleChange) {
        if (event.checked) {
            this.form.enable();
        } else {
            this.form.disable();
        }
    }
    /* eslint-disable-next-line max-lines-per-function */
    async onUpdate() {
        if (this.form.pristine) {
            console.log(
                'DetailsKundeFormComponent.onUpdate(): keine Aenderungen',
            );
            return;
        }

        if (this.kunde === undefined) {
            console.error(
                'DetailsKundeFormComponent.onUpdate(): kunde === undefined',
            );
            return;
        }
        this.formWaiting = true;
        this.kunde.update(
            this.form.value.nachname,
            this.form.value.email,
            this.form.value.kategorie,
            this.form.value.newsletter,
            this.form.value.geburtsdatum,
            {
                betrag: this.form.value.betrag,
                waehrung: this.form.value.waehrung,
            },
            this.form.value.homepage,
            this.form.value.geschlecht,
            this.form.value.familienstand,
            { ort: this.form.value.ort, plz: this.form.value.plz },
            this.form.value.reisen,
            this.form.value.lesen,
            this.form.value.sport,
        );
        console.log('kunde=', this.kunde);
        const successFn = () => {
            console.log(
                `DetailsKundeFormComponent.onUpdate(): successFn: path: ${HOME_PATH}`,
            );
            this.isUpdate = false;
            this.formWaiting = false;
            this.form.disable();
            this.snackBar.open('Ändern erfolgreich', 'Schließen', {
                duration: 3000,
                panelClass: 'swe-success-snackbar',
            });
        };

        const errorFn: (
            status: number,
            errors: { [s: string]: unknown } | undefined,
        ) => void = (status, errors?) => {
            this.formWaiting = false;
            console.error(
                `DetailsKundeFormComponent.onUpdate(): errorFn(): status: ${status}, errors=`,
                errors,
            );
        };

        await this.kundeService.update(this.kunde, successFn, errorFn);

        // damit das (Submit-) Ereignis konsumiert wird und nicht an
        // uebergeordnete Eltern-Komponenten propagiert wird bis zum
        // Refresh der gesamten Seite
        return false;
    }

    private subscribeIdParam() {
        // Pfad-Parameter aus /buecher/:id
        // UUID (oder Mongo-ID) ist ein String

        // next-Function fuer Observable
        const next = (params: Params) => {
            console.log(
                'DetailsBuchComponent.subscribeIdParam(): params=',
                params,
            );

            // IIFE (= Immediately Invoked Function Expression) statt async Function
            // https://developer.mozilla.org/en-US/docs/Glossary/IIFE
            // https://github.com/typescript-eslint/typescript-eslint/issues/647
            // https://github.com/typescript-eslint/typescript-eslint/pull/1799
            (async () => {
                try {
                    this.kunde = await this.kundeService.findById(params.id);
                } catch (err) {
                    this.handleError(err);
                    return;
                } finally {
                    this.waiting = false;
                }

                this.errorMsg = undefined;
                const titel =
                    this.kunde === undefined
                        ? 'Details'
                        : `Details ${this.kunde._id}`;
                this.titleService.setTitle(titel);
            })();
        };

        // ActivatedRoute.params ist ein Observable
        return this.route.params.subscribe(next);
    }

    private handleError(err: FindError) {
        const { statuscode } = err;
        console.log(`DetailsComponent.handleError(): statuscode=${statuscode}`);

        this.kunde = undefined;

        switch (statuscode) {
            case HttpStatus.NOT_FOUND:
                this.errorMsg = 'Kein Buch gefunden.';
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

        this.titleService.setTitle('Fehler');
    }
}
