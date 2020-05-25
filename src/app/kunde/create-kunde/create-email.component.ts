import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import type { OnInit } from '@angular/core';
// import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'swe-create-email',
    templateUrl: './create-email.component.html',
})
export class CreateEmailComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    readonly email = new FormControl(undefined, [Validators.required]);

    //readonly faExclamationCircle = faExclamationCircle;

    ngOnInit() {
        console.log('CreateEmailComponent.ngOnInit');
        this.form.addControl('email', this.email);
    }
}
