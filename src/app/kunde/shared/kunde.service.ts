/* eslint-disable max-statements, no-null/no-null, max-lines */
import {
    Adresse,
    Kunde,
    KundeServer,
    MAX_KATEGORIE,
    MIN_KATEGORIE,
} from './kunde';
import {
    ChartColor,
    ChartConfiguration,
    ChartData,
    ChartDataSets,
} from 'chart.js';
import { FindError, PatchError, RemoveError, SaveError } from './errors';
// Bereitgestellt durch HttpClientModule
// HttpClientModule enthaelt nur Services, keine Komponenten
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpParams,
} from '@angular/common/http';

import { BASE_URI } from '../../shared';
import { DiagrammService } from '../../shared/diagramm.service';
import { Injectable } from '@angular/core';
// https://github.com/ReactiveX/rxjs/blob/master/src/internal/Subject.ts
// https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

// Methoden der Klasse HttpClient
//  * get(url, options) – HTTP GET request
//  * post(url, body, options) – HTTP POST request
//  * put(url, body, options) – HTTP PUT request
//  * patch(url, body, options) – HTTP PATCH request
//  * delete(url, options) – HTTP DELETE request

interface HalResponse {
    _embedded: {
        kundeList: Array<KundeServer>;
    };
}
// Eine Service-Klasse ist eine "normale" Klasse gemaess ES 2015, die mittels
// DI in eine Komponente injiziert werden kann, falls sie innerhalb von
// provider: [...] bei einem Modul oder einer Komponente bereitgestellt wird.
// Eine Komponente realisiert gemaess MVC-Pattern den Controller und die View.
// Die Anwendungslogik wird vom Controller an Service-Klassen delegiert.

/**
 * Die Service-Klasse zu B&uuml;cher wird zum "Root Application Injector"
 * hinzugefuegt und ist in allen Klassen der Webanwendung verfuegbar.
 */
/* eslint-disable no-underscore-dangle */
@Injectable({ providedIn: 'root' })
export class KundeService {
    // Observables = Event-Streaming mit Promises
    // Subject statt Basisklasse Observable:
    // in find() und findById() wird next() aufgerufen
    readonly kundenSubject = new Subject<Array<Kunde>>();

    readonly kundeSubject = new Subject<Kunde>();

    readonly errorSubject = new Subject<string | number>();

    private readonly baseUriKunden!: string;

    private _kunde!: Kunde;

    /**
     * @param diagrammService injizierter DiagrammService
     * @param httpClient injizierter Service HttpClient (von Angular)
     * @return void
     */
    constructor(
        private readonly httpClient: HttpClient,
        private readonly diagrammService: DiagrammService,
    ) {
        this.baseUriKunden = `${BASE_URI}`;
        console.log(
            `KundeService.constructor(): baseUriKunde=${this.baseUriKunden}`,
        );
    }

    /**
     * Ein Buch-Objekt puffern.
     * @param buch Das Buch-Objekt, das gepuffert wird.
     * @return void
     */
    set kunde(kunde: Kunde) {
        console.log('KundeService.set kunde()', kunde);
        this._kunde = kunde;
    }

    /**
     * Buecher anhand von Suchkriterien suchen
     * @param suchkriterien Die Suchkriterien
     * @returns Gefundene Buecher oder Statuscode des fehlerhaften GET-Requests
     */
    async find(suchkriterien: Suchkriterien | undefined = undefined) {
        console.log('KundeService.find(): suchkriterien=', suchkriterien);
        const params = this.suchkriterienToHttpParams(suchkriterien);
        const uri = this.baseUriKunden;
        console.log(`KundeService.find(): uri=${uri}`);

        // Observable.subscribe() aus RxJS liefert ein Subscription Objekt,
        // das mit einem Flow von Kotlin vergleichbar ist.
        // Mit einem Subscription Objekt kann man den Request auch abbrechen ("cancel")
        // https://angular.io/guide/http
        // https://stackoverflow.com/questions/37364973/what-is-the-difference-between-promises-and-observables#answer-37365955
        // https://stackoverflow.com/questions/34533197/what-is-the-difference-between-rx-observable-subscribe-and-foreach
        // https://xgrommx.github.io/rx-book/content/observable/observable_instance_methods/subscribe.html
        // https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/subscribe.md

        let kundenServer;
        try {
            kundenServer = await this.httpClient
                .get<HalResponse | KundeServer>(uri, { params })
                .pipe(
                    map((result: HalResponse | KundeServer) => {
                        console.log('KundeService.find(): result=', result);
                        if (Object.keys(result).includes('_embedded')) {
                            // eslint-disable-next-line no-extra-parens
                            return (result as HalResponse)._embedded.kundeList;
                        }
                        return [result as KundeServer];
                    }),
                )
                .toPromise();
        } catch (err) {
            console.log(err);
            throw this.buildFindError(err);
        }
        console.log('KundeService.find(): Map data');

        const kunden = kundenServer.map(kunde => Kunde.fromServer(kunde));
        console.log('KundeService.find(): buecher=', kunden);
        return kunden;

        // Same-Origin-Policy verhindert Ajax-Datenabfragen an einen Server in
        // einer anderen Domain. JSONP (= JSON mit Padding) ermoeglicht die
        // Uebertragung von JSON-Daten ueber Domaingrenzen.
        // In Angular gibt es dafuer den Service Jsonp.
    }

    /**
     * Ein Buch anhand der ID suchen
     * @param id Die ID des gesuchten Buchs
     */
    async findById(id: string | undefined) {
        console.log(`KundeService.findById(): id=${id}`);

        // Gibt es ein gepuffertes Buch mit der gesuchten ID und Versionsnr.?
        if (
            this._kunde !== undefined &&
            this._kunde._id === id &&
            this._kunde.version !== undefined
        ) {
            console.log(
                `KundeService.findById(): Kunde gepuffert, version=${this._kunde.version}`,
            );
            return this._kunde;
        }

        if (id === undefined) {
            console.log('KundeService.findById(): Keine Id');
            return;
        }

        // wegen fehlender Versionsnummer (im ETag) nachladen
        console.log('KundeService.findById(): GET-Request');
        const uri = `${this.baseUriKunden}/${id}`;
        let response;
        try {
            // Observable.subscribe() aus RxJS liefert ein Subscription Objekt
            response = await this.httpClient
                .get<KundeServer>(uri, { observe: 'response' })
                .toPromise();
        } catch (err) {
            throw this.buildFindError(err);
        }

        const { body } = response;
        if (body === null) {
            return;
        }
        const etag = response.headers.get('ETag') ?? undefined;
        console.log(`etag = ${etag}`);

        this._kunde = Kunde.fromServer(body, etag);
        return this._kunde;
    }

    /**
     * Einen neuen Kunden anlegen
     * @param kunde Das JSON-Objekt mit dem neuen Kunden
     */
    async save(kunde: Kunde) {
        console.log('KundeService.save(): kunde=', kunde);

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        // Subscription von RxJS als Promise
        let response;
        try {
            response = await this.httpClient
                .post(this.baseUriKunden, kunde, {
                    headers,
                    observe: 'response',
                    responseType: 'text',
                })
                .toPromise();
        } catch (err) {
            console.error('KundeService.save(): err=', err);
            throw new SaveError(err.status, err.error, err);
        }

        console.log('KundeService.save(): map(): response', response);
        const location = response.headers.get('Location');
        return location?.slice(location.lastIndexOf('/') + 1);
    }

    /**
     * Ein vorhandenen Kunden aktualisieren
     * @param kunde Das JSON-Objekt mit den aktualisierten Kundendaten
     * @param successFn Die Callback-Function fuer den Erfolgsfall
     * @param errorFn Die Callback-Function fuer den Fehlerfall
     */
    async update(
        kunde: Kunde,
        successFn: () => void,
        errorFn: (
            status: number,
            errors: { [s: string]: unknown } | undefined,
        ) => void,
    ) {
        console.log('KundeService.update(): kunde=', kunde);

        const { version } = kunde;
        if (version === undefined) {
            console.error(`Keine Versionsnummer fuer den Kunden ${kunde._id}`);
            return;
        }
        const successFnPut = () => {
            successFn();
            // Wenn Update erfolgreich war, dann wurde serverseitig die Versionsnr erhoeht
            if (kunde.version === undefined) {
                kunde.version = 1;
            } else {
                kunde.version++;
            }
        };

        const errorFnPut = (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
                console.error(
                    'Client-seitiger oder Netzwerkfehler',
                    err.error.message,
                );
            } else if (errorFn === undefined) {
                console.error('errorFnPut', err);
            } else {
                errorFn(err.status, err.error);
            }
        };

        const uri = `${this.baseUriKunden}/${kunde._id}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'text/plain',
            'If-Match': `"${version}"`,
        });
        console.log('headers=', headers);
        try {
            await this.httpClient.put(uri, kunde, { headers }).toPromise();
        } catch (err) {
            errorFnPut(err);
            return;
        }

        successFnPut();
    }

    /**
     * Ein Kunde l&ouml;schen
     * @param kunde Das JSON-Objekt mit dem zu loeschenden Kunde
     */
    async remove(kunde: Kunde) {
        console.log('KundeService.remove(): kunde=', kunde);
        const uri = `${this.baseUriKunden}/${kunde._id}`;

        try {
            await this.httpClient.delete(uri).toPromise();
        } catch (err) {
            console.log('KundeService.remove(): err=', err);
            throw new RemoveError(err.status);
        }
    }

    async uploadPicture(kunde: Kunde, picture: File) {
        const uri = `${this.baseUriKunden}/${kunde._id}`;

        const headers = new HttpHeaders({
            'Content-Type': picture.type,
            Accept: 'text/plain',
        });
        console.log(
            `KundeService.uploadPicture(), picture = ${JSON.stringify(
                picture,
            )}`,
        );

        try {
            await this.httpClient.patch(uri, picture, { headers }).toPromise();
        } catch (err) {
            console.error('KundeService.uploadPicture(): err err=', err);
            throw new PatchError(err.status);
        }
    }

    async createPieChart(chartElement: HTMLCanvasElement) {
        console.log('KundeService.createPieChart()');
        const kunden = await this.find();
        const kundenGueltig = kunden.filter(
            k => k._id !== undefined && k.kategorie !== undefined,
        );

        const labels: Array<number> = [];
        for (let i = MIN_KATEGORIE; i <= MAX_KATEGORIE; i += 1) {
            labels.push(i);
        }
        console.log('KundeService.createPieChart(): labels:', labels);

        const kategorien = kundenGueltig.map(k => k.kategorie);
        const anzahlKunden = labels.map(
            kategorie =>
                kundenGueltig.filter(kunde => kunde.kategorie === kategorie)
                    .length,
        );
        const backgroundColor: Array<ChartColor> = [];
        const hoverBackgroundColor: Array<ChartColor> = [];
        for (let i = 0; i < kategorien.length; i++) {
            backgroundColor.push(this.diagrammService.getBackgroundColor(i));
            hoverBackgroundColor.push(
                this.diagrammService.getHoverBackgroundColor(i),
            );
        }

        const data: ChartData = {
            labels: labels.map(label => `# Kunden Kategorie ${label}`),
            datasets: [
                {
                    data: anzahlKunden,
                    backgroundColor,
                    hoverBackgroundColor,
                },
            ],
        };

        const config: ChartConfiguration = { type: 'pie', data };
        this.diagrammService.createChart(chartElement, config);
    }
    /* eslint-disable-next-line max-lines-per-function */
    async createBarChart(chartElement: HTMLCanvasElement) {
        console.log('KundeService.createBarChart()');
        const kunden = await this.find();

        const kundenGueltig = kunden.filter(
            k => k._id !== undefined && k.kategorie !== undefined,
        );
        const labels: Array<number> = [];
        for (let i = MIN_KATEGORIE; i <= MAX_KATEGORIE; i += 1) {
            labels.push(i);
        }

        const backgroundColor: Array<ChartColor> = [];
        const hoverBackgroundColor: Array<ChartColor> = [];
        for (let i = 0; i < labels.length; i++) {
            backgroundColor.push(this.diagrammService.getBackgroundColor(i));
            hoverBackgroundColor.push(
                this.diagrammService.getHoverBackgroundColor(i),
            );
        }
        console.log('KundeService.createBarChart(): labels:', labels);

        const data = labels.map(
            kategorie =>
                kundenGueltig.filter(kunde => kunde.kategorie === kategorie)
                    .length,
        );
        const datasets: Array<ChartDataSets> = [
            {
                label: 'Anzahl Kunden',
                data,
                backgroundColor,
                hoverBackgroundColor,
            },
        ];

        const config: ChartConfiguration = {
            type: 'bar',
            data: { labels, datasets },
            options: {
                /* eslint-disable object-curly-newline */
                legend: {
                    display: false,
                },
                /* eslint-enable object-curly-newline */
                scales: {
                    yAxes: [
                        {
                            ticks: { stepSize: 1, beginAtZero: true },
                            scaleLabel: {
                                display: true,
                                labelString: 'Anzahl Kunden',
                            },
                        },
                    ],
                    xAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: 'Kategorie',
                            },
                        },
                    ],
                },
            },
        };
        return this.diagrammService.createChart(chartElement, config);
    }

    async createLinearChart(chartElement: HTMLCanvasElement) {
        console.log('KundeService.createLinearChart()');
        const kunden = await this.find();
        const kundenGueltig = kunden.filter(
            k => k._id !== undefined && k.kategorie !== undefined,
        );

        const labels = kundenGueltig
            .map(k => k._id)
            .map(id => (id === undefined ? '?' : id)); // eslint-disable-line no-extra-parens
        console.log('KundeService.createLinearChart(): labels:', labels);

        const data = kundenGueltig.map(k => k.kategorie);
        const datasets: Array<ChartDataSets> = [{ label: 'Kategorie', data }];

        const config: ChartConfiguration = {
            type: 'line',
            data: { labels, datasets },
        };
        return this.diagrammService.createChart(chartElement, config);
    }

    // http://www.sitepoint.com/15-best-javascript-charting-libraries
    // http://thenextweb.com/dd/2015/06/12/20-best-javascript-chart-libraries
    // http://mikemcdearmon.com/portfolio/techposts/charting-libraries-using-d3

    // D3 (= Data Driven Documents) https://d3js.org ist das fuehrende Produkt
    // fuer Datenvisualisierung:
    //  initiale Version durch die Dissertation von Mike Bostock
    //  gesponsort von der New York Times, seinem heutigen Arbeitgeber
    //  basiert auf SVG = scalable vector graphics: Punkte, Linien, Kurven, ...
    //  ca 250.000 Downloads/Monat bei https://www.npmjs.com
    //  https://github.com/mbostock/d3 mit ueber 100 Contributors

    // Weitere Alternativen:
    // Google Charts: https://google-developers.appspot.com/chart
    // Chartist.js:   http://gionkunz.github.io/chartist-js
    // n3-chart:      http://n3-charts.github.io/line-chart

    // Chart.js ist deutlich einfacher zu benutzen als D3
    //  basiert auf <canvas>
    //  ca 25.000 Downloads/Monat bei https://www.npmjs.com
    //  https://github.com/nnnick/Chart.js mit ueber 60 Contributors

    /**
     * Suchkriterien in Request-Parameter konvertieren.
     * @param suchkriterien Suchkriterien fuer den GET-Request.
     * @return Parameter fuer den GET-Request
     */
    // eslint-disable-next-line max-lines-per-function
    private suchkriterienToHttpParams(
        suchkriterien: Suchkriterien | undefined,
    ): HttpParams {
        console.log(
            'KundeService.suchkriterienToHttpParams(): suchkriterien=',
            suchkriterien,
        );
        let httpParams = new HttpParams();

        if (suchkriterien === undefined) {
            return httpParams;
        }

        const {
            nachname,
            email,
            interessen,
            kategorie,
            plz,
            ort,
            geschlecht,
        } = suchkriterien;

        const { reisen, lesen, sport } = interessen;

        if (nachname !== undefined && nachname.length !== 0) {
            httpParams = httpParams.set('nachname', nachname);
        }

        if (kategorie !== undefined && kategorie.length !== 0) {
            httpParams = httpParams.set('kategorie', kategorie);
        }

        if (plz !== undefined && plz.length !== 0) {
            httpParams = httpParams.set('plz', plz);
        }

        if (ort !== undefined && ort.length !== 0) {
            httpParams = httpParams.set('ort', ort);
        }

        if (geschlecht !== undefined && geschlecht.length !== 0) {
            httpParams = httpParams.set('geschlecht', geschlecht);
        }

        if (email !== undefined && email.length !== 0) {
            httpParams = httpParams.set('email', email);
        }
        if (reisen || lesen || sport) {
            let httpInteressen = '';
            if (reisen) {
                httpInteressen += 'R,';
            }
            if (lesen) {
                httpInteressen += 'L,';
            }
            if (sport) {
                httpInteressen += 'S,';
            }
            httpParams = httpParams.set('interessen', httpInteressen);
        }
        return httpParams;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private buildFindError(err: any) {
        if (err.error instanceof ProgressEvent) {
            const msg = 'Client-seitiger oder Netzwerkfehler';
            console.error(msg, err.error);
            return new FindError(-1, msg, err);
        }

        const { status, error }: { status: number; error: string } = err;
        console.log(
            `KundeService.buildFindError(): status=${status}, Response-Body=${error}`,
        );
        return new FindError(status, error, err);
    }
}
/* eslint-enable no-underscore-dangle */

export interface Suchkriterien {
    nachname?: string;
    email?: string;
    adresse?: Adresse;
    interessen: { reisen: boolean; lesen: boolean; sport: boolean };
    kategorie?: string;
    ort?: string;
    plz?: string;
    geschlecht?: string;
}
/* eslint-enable max-statements,no-null/no-null, max-lines */
