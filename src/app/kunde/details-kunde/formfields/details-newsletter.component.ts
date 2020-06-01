import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'swe-details-newsletter',
    templateUrl: './details-newsletter.component.html',
})
export class DetailsNewsletterComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    @Input()
    readonly currentValue!: boolean;

    @Input()
    readonly isDisabled: boolean;

    newsletter!: FormControl;

    ngOnInit() {
        console.log(
            'DetailsNewsletterComponent.ngOnInit(): currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.newsletter = new FormControl({
            value: this.currentValue,
            disabled: this.isDisabled,
        });
        this.form.addControl('newsletter', this.newsletter);
    }
}
