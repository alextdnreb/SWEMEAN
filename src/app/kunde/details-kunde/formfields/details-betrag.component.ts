import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'swe-details-betrag',
    templateUrl: './details-betrag.component.html',
})
export class DetailsBetragComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    @Input()
    readonly currentValue!: number | undefined;

    @Input()
    readonly isDisabled: boolean;

    betrag!: FormControl;

    ngOnInit() {
        console.log(
            'DetailsBetragComponent.ngOnInit(): currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.betrag = new FormControl({
            value: this.currentValue,
            disabled: this.isDisabled,
        });
        this.form.addControl('betrag', this.betrag);
    }
}
