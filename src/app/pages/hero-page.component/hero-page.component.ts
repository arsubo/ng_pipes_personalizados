import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'hero-page',
  imports: [RouterLink],
  templateUrl: './hero-page.component.html',
})
export default class HeroPageComponent {
  name = input.required<string>();
}
