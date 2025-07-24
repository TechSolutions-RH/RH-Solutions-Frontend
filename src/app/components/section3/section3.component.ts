import { Component } from '@angular/core';
import { JOB_CATEGORIES, JobCategory } from './jobs.mock';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section3',
  imports: [CommonModule],
  templateUrl: './section3.component.html',
  styles: ``
})
export class Section3Component {
  jobCategories: JobCategory[] = JOB_CATEGORIES;
}
