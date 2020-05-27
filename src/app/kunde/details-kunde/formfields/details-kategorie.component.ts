import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'swe-details-kategorie',
    templateUrl: './details-kategorie.component.html',
})
export class DetailsKategorieComponent implements OnInit {
    @Input()
    readonly form!: FormGroup;

    @Input()
    readonly currentValue!: number | undefined;

    kategorie!: FormControl;

    ngOnInit() {
        console.log(
            'DetailsKategorieComponent.ngOnInit(): currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.kategorie = new FormControl(this.currentValue);
        this.form.addControl('kategorie', this.kategorie);
    }
}
