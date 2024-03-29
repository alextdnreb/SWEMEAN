import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'swe-details-geburtsdatum',
    templateUrl: './details-geburtsdatum.component.html',
})
export class DetailsGeburtsdatumComponent implements OnInit {
    readonly maxDate = (d => new Date(d.setDate(d.getDate() - 1)))(new Date());

    @Input()
    readonly form!: FormGroup;

    @Input()
    readonly currentValue!: Date | undefined;

    @Input()
    readonly isDisabled: boolean;

    geburtsdatum!: FormControl;

    ngOnInit() {
        console.log(
            'DetailsGeburtsdatumComponent.ngOnInit(): currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.geburtsdatum = new FormControl({
            value: this.currentValue,
            disabled: this.isDisabled,
        });
        this.form.addControl('geburtsdatum', this.geburtsdatum);
    }
}
