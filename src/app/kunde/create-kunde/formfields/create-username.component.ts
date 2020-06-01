import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'swe-create-username',
    templateUrl: './create-username.component.html',
})
export class CreateUsernameComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    username!: FormControl;

    ngOnInit() {
        console.log('CreateUsernameComponent.ngOnInit()');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.username = new FormControl(
            '',
            Validators.compose([Validators.required]),
        );
        this.form.addControl('username', this.username);
    }
}
