/* eslint-disable max-lines */

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

export interface KundeShared {
    _id?: string;
    nachname: string;
    email: string;
    newsletter: boolean;
    geburtsdatum?: string;
    umsatz?: Umsatz;
    homepage?: string;
    geschlecht?: Geschlecht;
    familienstand?: Familienstand;
    adresse: Adresse;
    version?: number;
}

interface Link {
    href: string;
}

export interface Umsatz {
    betrag: number;
    waehrung: Waehrung;
}

export interface KundeServer extends KundeShared {
    interessen?: Array<string>;
    kategorie?: number;
    user?: string | null;
    username?: string | null;
    _links?: {
        self: Link;
        list?: Link;
        add?: Link;
        update?: Link;
        remove?: Link;
    };
}

export interface KundeForm extends KundeShared {
    reisen?: boolean;
    lesen?: boolean;
    sport?: boolean;
    kategorie?: string;
}

export enum Geschlecht {
    M = 'MAENNLICH',
    W = 'WEIBLICH',
    D = 'DIVERS',
}

export enum Familienstand {
    L = 'LEDIG',
    VH = 'VERHEIRATET',
    G = 'GESCHIEDEN',
    VW = 'VERWITWET',
}

export enum Waehrung {
    EUR = 'EUR',
    GBP = 'GBP',
    AUD = 'AUD',
    CHF = 'CHF',
    JPY = 'JPY',
    USD = 'USD',
}

export interface Adresse {
    plz: string;
    ort: string;
}

export class Kunde {
    private static readonly SPACE = 2;

    geburtsdatum: Date | undefined;

    interessen: Array<string>;

    // wird aufgerufen von fromServer() oder von fromForm()
    // eslint-disable-next-line max-params
    private constructor(
        public _id: string | undefined,
        public nachname: string,
        public email: string,
        public kategorie: number | undefined,
        public newsletter: boolean,
        geburtsdatum: string | undefined,
        public umsatz: Umsatz | undefined,
        public homepage: string | undefined,
        public geschlecht: Geschlecht | undefined,
        public familienstand: Familienstand | undefined,
        interessen: Array<string> | undefined,
        public adresse: Adresse,
        public version: number | undefined,
    ) {
        // TODO Parsing, ob der Datum-String valide ist
        this.geburtsdatum =
            geburtsdatum === undefined ? new Date() : new Date(geburtsdatum);
        this.interessen = interessen === undefined ? [] : interessen;
        console.log('Kunde(): this=', this);
    }

    /**
     * Ein Buch-Objekt mit JSON-Daten erzeugen, die von einem RESTful Web
     * Service kommen.
     * @param buch JSON-Objekt mit Daten vom RESTful Web Server
     * @return Das initialisierte Buch-Objekt
     */
    static fromServer(kundeServer: KundeServer, etag?: string) {
        console.log('Kunde.fromServer(): begin');
        let selfLink: string | undefined;
        const { _links } = kundeServer;
        if (_links !== undefined) {
            const { self } = _links;
            selfLink = self.href;
        }
        let id: string | undefined;
        if (selfLink !== undefined) {
            const lastSlash = selfLink.lastIndexOf('/');
            id = selfLink.slice(lastSlash + 1);
        }

        let version: number | undefined;
        if (etag !== undefined) {
            // Anfuehrungszeichen am Anfang und am Ende entfernen
            const versionStr = etag.slice(1, -1);
            version = Number.parseInt(versionStr, 10);
        }

        const kunde = new Kunde(
            id,
            kundeServer.nachname,
            kundeServer.email,
            kundeServer.kategorie,
            kundeServer.newsletter,
            kundeServer.geburtsdatum,
            kundeServer.umsatz,
            kundeServer.homepage,
            kundeServer.geschlecht,
            kundeServer.familienstand,
            kundeServer.interessen,
            kundeServer.adresse,
            version,
        );
        console.log('Kunde.fromServer(): Kunde=', kunde);
        return kunde;
    }

    /**
     * Ein Buch-Objekt mit JSON-Daten erzeugen, die von einem Formular kommen.
     * @param buch JSON-Objekt mit Daten vom Formular
     * @return Das initialisierte Buch-Objekt
     */
    static fromForm(kundeForm: KundeForm) {
        console.log('Kunde.fromForm(): kundeForm=', kundeForm);
        const interessen: Array<string> = [];
        if (kundeForm.reisen === true) {
            interessen.push('REISEN');
        }
        if (kundeForm.lesen === true) {
            interessen.push('INTERESSEN');
        }
        if (kundeForm.sport === true) {
            interessen.push('SPORT');
        }

        const kunde = new Kunde(
            kundeForm._id,
            kundeForm.nachname,
            kundeForm.email,
            Number(kundeForm.kategorie),
            kundeForm.newsletter,
            kundeForm.geburtsdatum,
            kundeForm.umsatz,
            kundeForm.homepage,
            kundeForm.geschlecht,
            kundeForm.familienstand,
            interessen,
            kundeForm.adresse,
            kundeForm.version,
        );
        console.log('Kunde.fromForm(): kunde=', kunde);
        return kunde;
    }

    // Property in TypeScript wie in C#
    // https://www.typescriptlang.org/docs/handbook/classes.html#accessors
    get datumFormatted() {
        // z.B. 7. Mai 2020
        const formatter = new Intl.DateTimeFormat('de', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        return this.geburtsdatum === undefined
            ? ''
            : formatter.format(this.geburtsdatum);
    }

    /**
     * Abfrage, ob im Buchtitel der angegebene Teilstring enthalten ist. Dabei
     * wird nicht auf Gross-/Kleinschreibung geachtet.
     * @param titel Zu &uuml;berpr&uuml;fender Teilstring
     * @return true, falls der Teilstring im Buchtitel enthalten ist. Sonst
     *         false.
     */
    containsNachname(nachname: string) {
        return this.nachname === undefined
            ? false
            : this.nachname.toLowerCase().includes(nachname.toLowerCase());
    }

    /**
     * Aktualisierung der Stammdaten des Buch-Objekts.
     * @param titel Der neue Buchtitel
     * @param rating Die neue Bewertung
     * @param art Die neue Buchart (DRUCKAUSGABE oder KINDLE)
     * @param verlag Der neue Verlag
     * @param preis Der neue Preis
     * @param rabatt Der neue Rabatt
     */
    // eslint-disable-next-line max-params
    update(
        nachname: string,
        email: string,
        kategorie: number,
        newsletter: boolean,
        geburtsdatum: Date,
        umsatz: Umsatz,
        homepage: string,
        geschlecht: Geschlecht,
        familienstand: Familienstand,
        adresse: Adresse,
        reisen: boolean,
        lesen: boolean,
        sport: boolean,
    ) {
        this.nachname = nachname;
        this.email = email;
        this.kategorie = kategorie;
        this.newsletter = newsletter;
        this.geburtsdatum = geburtsdatum;
        this.umsatz = umsatz;
        this.homepage = homepage;
        this.geschlecht = geschlecht;
        this.familienstand = familienstand;
        this.adresse = adresse;
        this.resetInteressen();
        if (reisen) {
            this.addInteresse('REISEN');
        }
        if (lesen) {
            this.addInteresse('LESEN');
        }
        if (sport) {
            this.addInteresse('SPORT');
        }
    }

    /**
     * Abfrage, ob es zum Buch auch Schlagw&ouml;rter gibt.
     * @return true, falls es mindestens ein Schlagwort gibt. Sonst false.
     */
    hasInteressen() {
        /* eslint-disable-next-line no-null/no-null */
        if (this.interessen === null) {
            return false;
        }
        return this.interessen.length !== 0;
    }

    /**
     * Abfrage, ob es zum Buch das angegebene Schlagwort gibt.
     * @param schlagwort das zu &uuml;berpr&uuml;fende Schlagwort
     * @return true, falls es das Schlagwort gibt. Sonst false.
     */
    hasInteresse(interesse: string) {
        /* eslint-disable-next-line no-null/no-null */
        if (this.interessen === null) {
            return false;
        }
        return this.interessen.includes(interesse);
    }

    /**
     * Konvertierung des Buchobjektes in ein JSON-Objekt f&uuml;r den RESTful
     * Web Service.
     * @return Das JSON-Objekt f&uuml;r den RESTful Web Service
     */
    toJSON(): KundeServer {
        const geburtsdatum =
            this.geburtsdatum === undefined
                ? undefined
                : this.geburtsdatum.toISOString();
        console.log(`toJson(): datum=${geburtsdatum}`);
        return {
            _id: this._id,
            nachname: this.nachname,
            email: this.email,
            kategorie: this.kategorie,
            newsletter: this.newsletter,
            geburtsdatum,
            umsatz: this.umsatz,
            homepage: this.homepage,
            interessen: this.interessen,
            geschlecht: this.geschlecht,
            familienstand: this.familienstand,
            adresse: this.adresse,
        };
    }

    toString() {
        // eslint-disable-next-line no-null/no-null,unicorn/no-null
        return JSON.stringify(this, null, Kunde.SPACE);
    }

    private resetInteressen() {
        this.interessen = [];
    }

    private addInteresse(schlagwort: string) {
        if (this.interessen === undefined) {
            this.interessen = [];
        }
        this.interessen.push(schlagwort);
    }
}
/* eslint-enable max-lines */
