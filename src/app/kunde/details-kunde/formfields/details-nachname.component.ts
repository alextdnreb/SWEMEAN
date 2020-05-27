import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'swe-details-nachname',
    templateUrl: './details-nachname.component.html',
})
export class DetailsNachnameComponent implements OnInit {
    /* eslint-disable-next-line max-len*/
    private static readonly nachnamePattern = /(o'|von|von der|von und zu|van)?[A-ZÄÖÜ][a-zäöüß]+(-[A-ZÄÖÜ][a-zäöüß]+)/u;

    @Input()
    readonly form!: FormGroup;

    @Input()
    readonly currentValue!: string | undefined;

    @Input()
    readonly isDisabled!: boolean;

    nachname!: FormControl;

    ngOnInit() {
        console.log(
            'DetailsNachnameComponent.ngOnInit(): currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.nachname = new FormControl(
            { value: this.currentValue, disabled: this.isDisabled },
            Validators.compose([Validators.required]),
        );
        this.form.addControl('nachname', this.nachname);
    }
}
