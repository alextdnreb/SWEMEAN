import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import type { OnInit } from '@angular/core';
// import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'swe-create-umsatz',
    templateUrl: './create-umsatz.component.html',
})
export class CreateUmsatzComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    readonly umsatz = new FormControl(undefined, Validators.required);

    // readonly faExclamationCircle = faExclamationCircle;

    ngOnInit() {
        console.log('CreateUmsatzComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('umsatz', this.umsatz);
    }
}
