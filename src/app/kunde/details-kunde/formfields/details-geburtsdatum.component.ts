import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'swe-details-geburtsdatum',
    templateUrl: './details-geburtsdatum.component.html',
})
export class DetailsGeburtsdatumComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    @Input()
    readonly currentValue!: Date | undefined;

    geburtsdatum!: FormControl;

    ngOnInit() {
        console.log(
            'DetailsGeburtsdatumComponent.ngOnInit(): currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.geburtsdatum = new FormControl(this.currentValue);
        this.form.addControl('geburtsdatum', this.geburtsdatum);
    }
}
