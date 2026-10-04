import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-beers-create',
  imports: [ReactiveFormsModule],
  templateUrl: './beers-create.html',
  styleUrl: './beers-create.css',
})
export class BeersCreate {
  private http = inject(HttpClient);

  createBeerForm = new FormGroup({
    name: new FormControl(''),
  });

  createdBeer = signal<{ name: string } | null>(null);

  async onSubmit() {
    const name = this.createBeerForm.value.name;
    const request = this.http.post<{ name: string }>('http://localhost:3000/v2/beers', { name });
    const response = await firstValueFrom(request);

    this.createdBeer.set(response);
  }
}
