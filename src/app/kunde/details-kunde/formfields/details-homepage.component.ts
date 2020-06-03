import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'swe-details-homepage',
    templateUrl: './details-homepage.component.html',
})
export class DetailsHomepageComponent implements OnInit {
    /* eslint-disable-next-line max-len */
    private static readonly homepageRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/u;
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
        this.homepage = new FormControl(
            {
                value: this.currentValue,
                disabled: this.isDisabled,
            },
            /* eslint-disable array-bracket-newline */
            Validators.compose([
                Validators.pattern(DetailsHomepageComponent.homepageRegex),
            ]),
            /* eslint-enable array-bracket-newline */
        );
        this.form.addControl('homepage', this.homepage);
    }
}
