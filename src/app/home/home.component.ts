import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

@Component({
    selector: 'swe-home',
    templateUrl: './home.component.html',
    styles: [],
})
export class HomeComponent implements OnInit {
    constructor(private readonly titleService: Title) {
        console.log('HomeComponent.Constructor()');
    }

    ngOnInit() {
        this.titleService.setTitle('Details');
    }
}
