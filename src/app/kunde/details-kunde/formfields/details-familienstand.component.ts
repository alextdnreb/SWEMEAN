import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Familienstand } from '../../shared/kunde';

@Component({
    selector: 'swe-details-familienstand',
    templateUrl: './details-familienstand.component.html',
})
export class DetailsFamilienstandComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    @Input()
    readonly currentValue!: Familienstand | undefined;

    familienstand!: FormControl;

    ngOnInit() {
        console.log(
            'DetailsFamilienstandComponent.ngOnInit(): currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.familienstand = new FormControl(this.currentValue);
        this.form.addControl('familienstand', this.familienstand);
    }
}
