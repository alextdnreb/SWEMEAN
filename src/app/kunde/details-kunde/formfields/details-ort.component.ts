import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'swe-details-ort',
    templateUrl: './details-ort.component.html',
})
export class DetailsOrtComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    @Input()
    readonly currentValue!: string | undefined;

    @Input()
    readonly isDisabled: boolean;

    ort!: FormControl;

    ngOnInit() {
        console.log(
            'DetailsOrtComponent.ngOnInit(): currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.ort = new FormControl(
            { value: this.currentValue, disabled: this.isDisabled },
            Validators.compose([Validators.required]),
        );
        this.form.addControl('ort', this.ort);
    }
}
