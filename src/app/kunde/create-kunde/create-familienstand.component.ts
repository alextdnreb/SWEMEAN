import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import type { OnInit } from '@angular/core';
// import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'swe-create-familienstand',
    templateUrl: './create-familienstand.component.html',
})
export class CreateFamilienstandComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    readonly familienstand = new FormControl(undefined, Validators.required);

    // readonly faExclamationCircle = faExclamationCircle;

    ngOnInit() {
        console.log('CreateFamilienstandComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('familienstand', this.familienstand);
    }
}
