import { ActivatedRoute, Router } from '@angular/router';
import { Kunde, KundeService, SaveError } from '../shared';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpStatus } from '../../shared';
import { MatSnackBar } from '@angular/material/snack-bar';
import type { OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'swe-create-kunde',
    templateUrl: './create-kunde.component.html',
})
export class CreateKundeComponent implements OnInit {
    form = new FormGroup({});

    waiting = false;

    errorMsg: string | undefined = undefined;
    /* eslint-disable-next-line max-params */
    constructor(
        private readonly kundeService: KundeService,
        private readonly router: Router,
        private readonly titleService: Title,
        private readonly route: ActivatedRoute,
        private readonly snackBar: MatSnackBar,
    ) {
        console.log('CreateKundeComponent.constructor()');
        if (router !== undefined) {
            console.log('Injizierter Router:', router);
        }
    }

    ngOnInit() {
        this.titleService.setTitle('Erstellen');
    }

    /**
     * Die Methode <code>save</code> realisiert den Event-Handler, wenn das
     * Formular abgeschickt wird, um ein neues Buch anzulegen.
     * @return false, um das durch den Button-Klick ausgel&ouml;ste Ereignis
     *         zu konsumieren.
     */
    async onSave() {
        // In einem Control oder in einer FormGroup gibt es u.a. folgende
        // Properties
        //    value     JSON-Objekt mit den IDs aus der FormGroup als
        //              Schluessel und den zugehoerigen Werten
        //    errors    Map<string,any> mit den Fehlern, z.B. {'required': true}
        //    valid/invalid     fuer valide Werte
        //    dirty/pristine    falls der Wert geaendert wurde

        if (this.form.invalid) {
            console.log(
                'CreateKundeComponent.onSave(): Validierungsfehler',
                this.form,
            );
            return false;
        }
        this.waiting = true;
        const neuerKunde = Kunde.fromForm(this.form.value);
        console.log('CreateKundeComponent.onSave(): neuerKunde=', neuerKunde);
        let id: string | undefined;

        try {
            id = await this.kundeService.save(neuerKunde);
            console.log(`CreateKundeComponent.onSave(): id=${id}`);
        } catch (err) {
            this.handleError(err);
            return;
        } finally {
            this.waiting = false;
        }
        await this.router.navigate(['..', id], { relativeTo: this.route });
        this.snackBar.open('Kunde erfolgreich erstellt', 'Schließen', {
            duration: 3000,
            panelClass: 'swe-success-snackbar',
        });
        // damit das (Submit-) Ereignis konsumiert wird und nicht an
        // uebergeordnete Eltern-Komponenten propagiert wird bis zum Refresh
        // der gesamten Seite
        return false;
    }

    private handleError(err: SaveError) {
        const { statuscode } = err;
        console.log(
            `CreateBuchComponent.handleError(): statuscode=${statuscode}`,
        );

        switch (statuscode) {
            case HttpStatus.BAD_REQUEST:
                // TODO Aufbereitung der Fehlermeldung: u.a. Anfuehrungszeichen
                this.errorMsg = JSON.stringify(err.message);
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
    }
}
