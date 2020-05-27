import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Kunde } from '../../shared/kunde';

@Component({
    selector: 'swe-details-interessen',
    templateUrl: './details-interessen.component.html',
})
export class DetailsInteressenComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    @Input()
    readonly kunde!: Kunde;

    @Input()
    readonly isDisabled: boolean;

    lesen!: FormControl;

    reisen!: FormControl;

    sport!: FormControl;

    ngOnInit() {
        console.log(
            'DetailsInteressenComponent.ngOnInit(): currentValue=',
            this.kunde.interessen,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.lesen = new FormControl({
            value: this.kunde.hasInteresse('L'),
            disabled: this.isDisabled,
        });
        this.reisen = new FormControl({
            value: this.kunde.hasInteresse('R'),
            disabled: this.isDisabled,
        });
        this.sport = new FormControl({
            value: this.kunde.hasInteresse('S'),
            disabled: this.isDisabled,
        });
        this.form.addControl('lesen', this.lesen);
        this.form.addControl('reisen', this.reisen);
        this.form.addControl('sport', this.sport);
    }
}
