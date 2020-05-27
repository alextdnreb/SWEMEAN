import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'swe-details-homepage',
    templateUrl: './details-homepage.component.html',
})
export class DetailsHomepageComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    @Input()
    readonly currentValue!: string | undefined;

    @Input()
    readonly isDisabled: boolean;

    homepage!: FormControl;

    ngOnInit() {
        console.log(
            'DetailsHomepageComponent.ngOnInit(): currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.homepage = new FormControl({
            value: this.currentValue,
            disabled: this.isDisabled,
        });
        this.form.addControl('homepage', this.homepage);
    }
}
