/**
 * About Page – Über Ceta
 *
 * Statischer Inhalt über das Unternehmen.
 */

import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../components/layout/page-header.component';

@Component({
  selector: 'app-about-page',
  imports: [PageHeaderComponent],
  templateUrl: './about.page.html',
  styleUrl: './about.page.css',
})
export default class AboutPage {}
