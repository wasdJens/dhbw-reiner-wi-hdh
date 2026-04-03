import { Component } from '@angular/core';
import { DumbIntro } from '../../components/dumb-intro/dumb-intro';
import { CssIntro } from '../../components/css-intro/css-intro';
import { Counter } from '../../components/counter/counter';
import { Playground } from '../../components/playground/playground';
import { Navigation } from '../../components/navigation/navigation';

@Component({
  selector: 'app-home',
  imports: [DumbIntro, CssIntro, Counter, Playground, Navigation],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
