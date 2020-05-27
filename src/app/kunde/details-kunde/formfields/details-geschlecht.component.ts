import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Geschlecht } from '../../shared/kunde';

@Component({
    selector: 'swe-details-geschlecht',
    templateUrl: './details-geschlecht.component.html',
})
export class DetailsGeschlechtComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    @Input()
    readonly currentValue!: Geschlecht | undefined;

    geschlecht!: FormControl;

    ngOnInit() {
        console.log(
            'DetailsGeschlechtComponent.ngOnInit(): currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.geschlecht = new FormControl(this.currentValue);
        this.form.addControl('geschlecht', this.geschlecht);
    }
}
