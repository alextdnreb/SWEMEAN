import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import type { OnInit } from '@angular/core';
// import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'swe-create-homepage',
    templateUrl: './create-homepage.component.html',
})
export class CreateHomepageComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    readonly homepage = new FormControl(undefined);

    // readonly faExclamationCircle = faExclamationCircle;

    ngOnInit() {
        console.log('CreateHomepageComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('homepage', this.homepage);
    }
}
