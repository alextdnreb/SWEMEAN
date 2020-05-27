import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'swe-details-interessen',
    templateUrl: './details-interessen.component.html',
})
export class DetailsInteressenComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    @Input()
    readonly currentValue!: Array<string>;

    interessen!: FormControl;

    ngOnInit() {
        console.log(
            'DetailsInteressenComponent.ngOnInit(): currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.interessen = new FormControl(this.currentValue);
        this.form.addControl('interessen', this.interessen);
    }
}
