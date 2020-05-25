import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import type { OnInit } from '@angular/core';

@Component({
    selector: 'swe-create-nachname',
    templateUrl: './create-nachname.component.html',
})
export class CreateNachnameComponent implements OnInit {
    private static readonly MIN_LENGTH = 2;

    @Input()
    readonly form!: FormGroup;

    readonly nachname = new FormControl(undefined, [
        Validators.required,
        Validators.minLength(CreateNachnameComponent.MIN_LENGTH),
        Validators.pattern(/^\w.*$/u),
    ]);
    // readonly nachnameGroup = new FormGroup({ nachname: this.nachname })

    // readonly faExclamationCircle = faExclamationCircle;

    ngOnInit() {
        console.log('CreateNachnameComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('nachname', this.nachname);
    }
}
