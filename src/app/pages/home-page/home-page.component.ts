import { Component } from '@angular/core';
import { Section1Component } from '../../components/section1/section1.component';
import { Section2Component } from '../../components/section2/section2.component';
import { Section3Component } from '../../components/section3/section3.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [Section1Component, Section2Component, Section3Component],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {}
