import { AuthService, ROLLE_ADMIN } from '../../auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

/**
 * Komponente f&uuml;r die Navigationsleiste mit dem Tag &lt;hs-nav&gt;.
 */
@Component({
    selector: 'swe-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
    isAdmin!: boolean;

    private isAdminSubscription!: Subscription;
    constructor(
        public dialog: MatDialog,
        private readonly authService: AuthService,
    ) {
        console.log('NavComponent.constructor()');
    }

    ngOnInit() {
        this.isAdmin = this.authService.isAdmin;

        this.isAdminSubscription = this.subscribeIsAdmin();
    }

    ngOnDestroy() {
        this.isAdminSubscription.unsubscribe();
    }

    private subscribeIsAdmin() {
        const next = (event: Array<string>) => {
            this.isAdmin = event !== undefined && event.includes(ROLLE_ADMIN);
            console.log('NavComponent.isAdmin:', this.isAdmin);
        };
        return this.authService.rollenSubject.subscribe(next);
    }
}
