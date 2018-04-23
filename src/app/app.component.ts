import { Component, ChangeDetectorRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
// import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';

import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer){
		iconRegistry.addSvgIcon(
        'menu',sanitizer.bypassSecurityTrustResourceUrl('../assets/ic_menu_white_24px.svg'));
	}
	
  title = 'app';
}
