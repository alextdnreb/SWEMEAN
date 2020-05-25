import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import type { OnInit } from '@angular/core';

@Component({
    selector: 'swe-create-geburtsdatum',
    templateUrl: './create-geburtsdatum.component.html',
})
export class CreateGeburtsdatumComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    readonly geburtsdatum = new FormControl(undefined, Validators.required);

    // readonly faExclamationCircle = faExclamationCircle;

    ngOnInit() {
        console.log('CreateGeburtsdatumComponent.ngOnInit');
        this.form.addControl('geburtsdatum', this.geburtsdatum);
    }
}
