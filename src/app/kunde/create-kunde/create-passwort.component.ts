import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import type { OnInit } from '@angular/core';

@Component({
    selector: 'swe-create-passwort',
    templateUrl: './create-passwort.component.html',
})
export class CreatePasswortComponent implements OnInit {
    private static readonly MIN_LENGTH = 2;

    @Input()
    readonly form!: FormGroup;

    readonly passwort = new FormControl(undefined, [
        Validators.required,
        Validators.minLength(CreatePasswortComponent.MIN_LENGTH),
    ]);
    // readonly PasswortGroup = new FormGroup({ passwort: this.passwort })

    // readonly faExclamationCircle = faExclamationCircle;

    ngOnInit() {
        console.log('CreatePasswortComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('passwort', this.passwort);
    }
}
