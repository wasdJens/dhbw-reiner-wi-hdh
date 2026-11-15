import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, input, numberAttribute, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../core/message.service';
import { BreweriesApi } from './breweries.api';
import { Brewery, BreweryInput } from './brewery';
import { BreweryForm } from './brewery-form';

// Neue Brauerei ohne id, Brauerei bearbeiten mit id aus der Route
@Component({
  selector: 'app-brewery-edit-page',
  imports: [BreweryForm],
  template: `
    <h1>{{ id() ? 'Brauerei bearbeiten' : 'Neue Brauerei' }}</h1>
    @if (initial(); as initial) {
      <app-brewery-form [initial]="initial" [error]="error()" (save)="save($event)" />
    }
  `,
})
export class BreweryEditPage implements OnInit {
  private readonly api = inject(BreweriesApi);
  private readonly messages = inject(MessageService);
  private readonly router = inject(Router);

  readonly id = input(undefined, { transform: (value?: string) => numberAttribute(value, 0) });
  protected readonly initial = signal<BreweryInput | null>(null);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.id();
    if (id) {
      this.api.findOne(id).subscribe((brewery) => this.initial.set(brewery));
    } else {
      this.initial.set({ name: '', city: '', country: '' });
    }
  }

  protected save(input: BreweryInput): void {
    this.error.set(null);
    const id = this.id();
    const request = id ? this.api.update(id, input) : this.api.create(input);
    request.subscribe({
      next: (brewery: Brewery) =>
        void this.router
          .navigate(['/breweries', brewery.id])
          .then(() => this.messages.success('Brauerei gespeichert.')),
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.error.set('Bitte prüfe deine Eingaben.');
        }
      },
    });
  }
}
