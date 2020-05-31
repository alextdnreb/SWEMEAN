import { AuthService } from '../auth/auth.service';
// eslint-disable-next-line sort-imports
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginDialogComponent } from '../layout/header/login-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'swe-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    styles: [],
})
export class HomeComponent implements OnInit, OnDestroy {
    username: string | undefined;
    password: string | undefined;
    path: string;
    notLoggedIn!: boolean;

    private isLoggedInSubscription!: Subscription;

    // eslint-disable-next-line max-params
    constructor(
        private readonly titleService: Title,
        private readonly authService: AuthService,
        private readonly router: Router,
        public dialog: MatDialog,
        private readonly snackBar: MatSnackBar,
    ) {
        console.log('HomeComponent.Constructor()');
    }

    ngOnInit() {
        this.titleService.setTitle('Home');
        this.path = '';
        this.notLoggedIn = !this.authService.isLoggedIn;
        this.isLoggedInSubscription = this.subscribeLogin();
    }

    ngOnDestroy() {
        this.isLoggedInSubscription.unsubscribe();
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(LoginDialogComponent, {
            width: '250px',
            data: { username: this.username, password: this.password },
        });

        dialogRef.afterClosed().subscribe(result => {
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (result) {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                this.authService.login(result.username, result.password);
            }
        });
    }

    openURL(path: string) {
        if (this.notLoggedIn) {
            this.path = path;
            this.openDialog();
        } else {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.router.navigateByUrl(path);
        }
    }

    /**
     * Methode, um den injizierten <code>AuthService</code> zu beobachten,
     * ob es Login-Informationen gibt. Diese private Methode wird in der Methode
     * <code>ngOnInit</code> aufgerufen.
     */
    private subscribeLogin() {
        const next = (event: boolean) => {
            if (this.notLoggedIn && !event) {
                // Noch nicht eingeloggt und ein Login-Event kommt, d.h.
                // es gab einen Login-Versuch, der aber fehlerhaft (= false) war
                console.warn('AuthComponent: Falsche Login-Daten', event);

                this.snackBar.open('Falsche Login-Daten', 'Schließen', {
                    duration: 3000,
                    panelClass: 'swe-error-snackbar',
                });

                if (!this.dialog.openDialogs.length) {
                    this.openDialog();
                }
            }
            this.notLoggedIn = !event;
            console.log('AuthComponent.notLoggedIn:', this.notLoggedIn);
            if (!this.notLoggedIn && this.path.length > 0) {
                this.router
                    .navigateByUrl(this.path)
                    .catch(err => console.log(err));
                this.path = '';
            }
        };

        // Observable.subscribe() aus RxJS liefert ein Subscription Objekt,
        // mit dem man den Request abbrechen ("cancel") kann
        // https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/subscribe.md
        // http://stackoverflow.com/questions/34533197/what-is-the-difference-between-rx-observable-subscribe-and-foreach
        // https://xgrommx.github.io/rx-book/content/observable/observable_instance_methods/subscribe.html
        // Funktion als Funktionsargument, d.h. Code als Daten uebergeben
        return this.authService.isLoggedInSubject.subscribe(next);
    }
}
