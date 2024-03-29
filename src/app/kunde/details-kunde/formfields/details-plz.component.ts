import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'swe-details-plz',
    templateUrl: './details-plz.component.html',
})
export class DetailsPlzComponent implements OnInit {
    private static readonly plzRegex = /\d{5}/u;

    @Input()
    readonly form!: FormGroup;

    @Input()
    readonly currentValue!: string | undefined;

    @Input()
    readonly isDisabled: boolean;

    plz!: FormControl;

    ngOnInit() {
        console.log(
            'DetailsOrtComponent.ngOnInit(): currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.plz = new FormControl(
            { value: this.currentValue, disabled: this.isDisabled },
            Validators.compose([
                Validators.required,
                Validators.pattern(DetailsPlzComponent.plzRegex),
            ]),
        );
        this.form.addControl('plz', this.plz);
    }
}
