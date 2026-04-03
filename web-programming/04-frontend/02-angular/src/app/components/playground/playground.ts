import { Component } from '@angular/core';
import { Card } from '../card/card/card';
import { CardHeader } from '../card/card-header/card-header';
import { CardContent } from '../card/card-content/card-content';
import { CardFooter } from '../card/card-footer/card-footer';

@Component({
  selector: 'app-playground',
  imports: [Card, CardHeader, CardContent, CardFooter],
  templateUrl: './playground.html',
  styleUrl: './playground.css',
})
export class Playground {}
