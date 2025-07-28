import { Component } from '@angular/core';
import { Section1Component } from '../../components/section1/section1.component';
import { Section2Component } from '../../components/section2/section2.component';
import { Section3Component } from '../../components/section3/section3.component';
import { Section4Component } from '../../components/section4/section4.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [Section1Component, Section2Component, Section3Component, Section4Component, FooterComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {}
