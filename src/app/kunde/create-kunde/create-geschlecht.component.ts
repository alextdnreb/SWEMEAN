import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import type { OnInit } from '@angular/core';
// import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'swe-create-geschlecht',
    templateUrl: './create-geschlecht.component.html',
})
export class CreateGeschlechtComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    readonly geschlecht = new FormControl(undefined, Validators.required);

    // readonly faExclamationCircle = faExclamationCircle;

    ngOnInit() {
        console.log('CreateGeschlechtComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('geschlecht', this.geschlecht);
    }
}
