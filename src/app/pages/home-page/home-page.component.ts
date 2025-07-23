import { Component } from '@angular/core';
import { Section1Component } from '../../components/section1/section1.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [Section1Component],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {}
