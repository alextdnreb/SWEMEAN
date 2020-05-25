import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import type { OnInit } from '@angular/core';
// import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'swe-create-plz',
    templateUrl: './create-plz.component.html',
})
export class CreatePlzComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    readonly plz = new FormControl(undefined, Validators.required);

    // readonly faExclamationCircle = faExclamationCircle;

    ngOnInit() {
        console.log('CreatePlzComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('plz', this.plz);
    }
}
