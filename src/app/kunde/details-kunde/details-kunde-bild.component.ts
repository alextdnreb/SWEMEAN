import { ActivatedRoute, Params } from '@angular/router';
import { BASE_URI, HttpStatus } from '../../shared';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FindError, Kunde, KundeService } from '../shared';
import { map, switchMap } from 'rxjs/operators';

import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

@Component({
    selector: 'swe-kunde-bild',
    templateUrl: './details-kunde-bild.component.html',
    styleUrls: ['./details-kunde-bild.component.scss'],
})
export class DetailsKundeBildComponent implements OnInit, OnDestroy, OnChanges {
    waiting = true;

    kunde: Kunde | undefined;

    errorMsg: string | undefined;

    imageUrl: string;

    dataUrl$: Observable<SafeUrl>;

    readonly form = new FormGroup({});

    private idParamSubscription!: Subscription;

    private src$: BehaviorSubject<string>;

    // eslint-disable-next-line max-params
    constructor(
        private readonly kundeService: KundeService,
        private readonly titleService: Title,
        private readonly route: ActivatedRoute,
        private readonly snackBar: MatSnackBar,
        private readonly httpClient: HttpClient,
        private readonly sanitizer: DomSanitizer,
    ) {
        console.log('DetailsKundeFormComponent.constructor()');
    }

    ngOnInit() {
        // Die Beobachtung starten, ob es einen Pfadparameter gibt, ohne dass
        // bisher ein JavaScript-Ereignis, wie z.B. click, eingetreten ist.
        this.idParamSubscription = this.subscribeIdParam();
    }

    ngOnChanges(): void {
        this.src$.next(this.imageUrl);
    }

    ngOnDestroy() {
        this.idParamSubscription.unsubscribe();
    }

    async onPictureUpload(event: Event) {
        if (this.kunde === undefined) {
            console.error(
                'DetailsKundeBildComponent.onUpdate(): kunde === undefined',
            );
            return;
        }
        const inputEvent = event as HTMLInputEvent;
        /* eslint-disable no-null/no-null */
        if (
            inputEvent.target === null ||
            inputEvent.target.files === null ||
            inputEvent.target.files.length === 0
        ) {
            console.error(
                'DetailsKundeBildComponent.onPictureUpload(): no files chosen',
            );
            return;
        }
        this.waiting = true;
        /* eslint-enable no-null/no-null */
        const { files } = inputEvent.target;

        await this.kundeService.uploadPicture(this.kunde, files[0]);

        this.waiting = false;

        this.dataUrl$ = this.src$.pipe(switchMap(url => this.loadImage(url)));

        this.snackBar.open('Upload erfolgreich', 'Schließen', {
            duration: 3000,
            panelClass: 'swe-success-snackbar',
        });

        return false;
    }

    sanitize(url: string) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
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

                this.imageUrl = `${BASE_URI}/${this.kunde?._id}/file`;

                this.src$ = new BehaviorSubject(this.imageUrl);

                this.dataUrl$ = this.src$.pipe(
                    switchMap(url => this.loadImage(url)),
                );
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

    private loadImage(url: string): Observable<SafeUrl> {
        return (
            this.httpClient
                // load the image as a blob
                .get(url, { responseType: 'blob' })
                // create an object url of that blob that we can use in the src attribute
                .pipe(map(e => this.sanitize(URL.createObjectURL(e))))
        );
    }
}
