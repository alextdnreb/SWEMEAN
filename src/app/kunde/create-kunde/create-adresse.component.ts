import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import type { OnInit } from '@angular/core';
//import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'swe-create-adresse',
    templateUrl: './create-adresse.component.html',
})
export class CreateAdresseComponent implements OnInit {
    private static readonly MIN_LENGTH = 2;

    @Input()
    readonly form!: FormGroup;

    readonly adresse = new FormControl(undefined, [
        Validators.required,
        Validators.minLength(CreateAdresseComponent.MIN_LENGTH),
        Validators.pattern(/^\w.*$/u),
    ]);
    // readonly adresseGroup = new FormGroup({ adresse: this.adresse })

    // readonly faExclamationCircle = faExclamationCircle;

    ngOnInit() {
        console.log('CreateAdresseComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('adresse', this.adresse);
    }
}
