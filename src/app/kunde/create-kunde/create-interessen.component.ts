import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import type { OnInit } from '@angular/core';

@Component({
    selector: 'swe-create-interessen',
    templateUrl: './create-interessen.component.html',
})
export class CreateInteressenComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    readonly sport = new FormControl(false);
    readonly lesen = new FormControl(false);
    readonly kochen = new FormControl(false);

    ngOnInit() {
        console.log('CreateInteressenComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('sport', this.sport);
        this.form.addControl('lesen', this.lesen);
        this.form.addControl('kochen', this.kochen);
    }
}
