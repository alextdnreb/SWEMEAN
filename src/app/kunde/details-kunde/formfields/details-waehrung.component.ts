import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Waehrung } from '../../shared/kunde';

@Component({
    selector: 'swe-details-waehrung',
    templateUrl: './details-waehrung.component.html',
})
export class DetailsWaehrungComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    @Input()
    readonly currentValue!: Waehrung | undefined;

    @Input()
    readonly isDisabled: boolean;

    waehrung!: FormControl;

    ngOnInit() {
        console.log(
            'DetailsWaehrungComponent.ngOnInit(): currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.waehrung = new FormControl({
            value: this.currentValue,
            disabled: this.isDisabled,
        });
        this.form.addControl('waehrung', this.waehrung);
    }
}
