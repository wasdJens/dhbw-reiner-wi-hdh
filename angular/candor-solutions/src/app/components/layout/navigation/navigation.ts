import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  to: string;
  exact: boolean;
}

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  readonly items: NavItem[] = [
    { label: 'Dashboard',  to: '/',         exact: true },
    { label: 'Kunden',     to: '/clients',  exact: false },
    { label: 'Projekte',   to: '/projects', exact: false },
    { label: 'Über uns',   to: '/about',    exact: false },
  ];
}
