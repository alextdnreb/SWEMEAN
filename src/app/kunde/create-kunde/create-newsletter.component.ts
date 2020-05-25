import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import type { OnInit } from '@angular/core';

@Component({
    selector: 'swe-create-newsletter',
    templateUrl: './create-newsletter.component.html',
})
export class CreateNewsletterComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    readonly newsletter = new FormControl(false);

    ngOnInit() {
        console.log('CreateNewsletterComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('newsletter', this.newsletter);
    }
}
