import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'swe-details-email',
    templateUrl: './details-email.component.html',
})
export class DetailsEmailComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    @Input()
    readonly currentValue!: string;

    email!: FormControl;

    ngOnInit() {
        console.log(
            'DetailsEmailComponent.ngOnInit(): currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.email = new FormControl(
            this.currentValue,
            Validators.compose([Validators.required]),
        );
        this.form.addControl('email', this.email);
    }
}
