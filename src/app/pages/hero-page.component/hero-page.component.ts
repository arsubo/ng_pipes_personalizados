import { Component, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SuperheroService } from '../../services/superhero.service';
import { SuperheroApiResult } from '../../interfaces/superhero-api.interface';

@Component({
  selector: 'hero-page',
  imports: [RouterLink],
  templateUrl: './hero-page.component.html',
})
export default class HeroPageComponent {
  private readonly superheroService = inject(SuperheroService);

  name = input.required<string>();

  hero = signal<SuperheroApiResult | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor() {
    effect((onCleanup) => {
      const heroName = this.name();
      this.loading.set(true);
      this.error.set(null);
      this.hero.set(null);

      const sub = this.superheroService.searchHeroByName(heroName).subscribe({
        next: (res) => {
          this.loading.set(false);
          if (res.response === 'success' && res.results && res.results.length > 0) {
            this.hero.set(res.results[0]);
          } else {
            this.error.set(res.error || `No se encontró información para "${heroName}"`);
          }
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set('Ocurrió un error al obtener la información de la API.');
        },
      });

      onCleanup(() => sub.unsubscribe());
    });
  }

  // Método auxiliar para convertir stats a número de forma segura
  getStatNumber(stat: string): number {
    if (!stat || stat === 'null' || stat === '-') return 0;
    const parsed = parseInt(stat, 10);
    return isNaN(parsed) ? 0 : parsed;
  }
}
