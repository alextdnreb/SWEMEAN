import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'swe-create-password',
    templateUrl: './create-password.component.html',
})
export class CreatePasswordComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    password!: FormControl;

    ngOnInit() {
        console.log('CreatePasswordComponent.ngOnInit()');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.password = new FormControl(
            '',
            Validators.compose([Validators.required]),
        );
        this.form.addControl('password', this.password);
    }
}
