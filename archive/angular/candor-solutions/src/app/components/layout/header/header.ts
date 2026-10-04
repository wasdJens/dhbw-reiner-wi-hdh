import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navigation } from '../navigation/navigation';

@Component({
  selector: 'app-header',
  imports: [RouterLink, Navigation],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
