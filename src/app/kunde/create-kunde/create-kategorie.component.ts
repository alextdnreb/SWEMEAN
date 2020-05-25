import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import type { OnInit } from '@angular/core';

@Component({
    selector: 'swe-create-kategorie',
    templateUrl: './create-kategorie.component.html',
})
export class CreateKategorieComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    readonly kategorie = new FormControl(undefined);

    ngOnInit() {
        console.log('CreateKategorieComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('kategorie', this.kategorie);
    }
}
