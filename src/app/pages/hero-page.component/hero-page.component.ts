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

  // Mapa de imágenes alternativas de alta resolución para todos los héroes
  private readonly fallbackImages: Record<string, string> = {
    superman: 'https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?w=600&auto=format&fit=crop&q=80',
    batman: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600&auto=format&fit=crop&q=80',
    flash: 'https://images.unsplash.com/photo-1608889175123-8ec330b86f84?w=600&auto=format&fit=crop&q=80',
    thor: 'https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=600&auto=format&fit=crop&q=80',
    hulk: 'https://images.unsplash.com/photo-1608889334960-9388df2944b2?w=600&auto=format&fit=crop&q=80',
    spiderman: 'https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?w=600&auto=format&fit=crop&q=80',
    ironman: 'https://images.unsplash.com/photo-1608889174649-41864385f200?w=600&auto=format&fit=crop&q=80',
    wolverine: 'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?w=600&auto=format&fit=crop&q=80',
    'capitan america': 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=600&auto=format&fit=crop&q=80',
    'captain america': 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=600&auto=format&fit=crop&q=80',
    'wonder woman': 'https://images.unsplash.com/photo-1608889175638-9322300c46e8?w=600&auto=format&fit=crop&q=80',
    'black panther': 'https://images.unsplash.com/photo-1611750011873-a81d130663f6?w=600&auto=format&fit=crop&q=80',
    'black widow': 'https://images.unsplash.com/photo-1608889175171-cb864b971a8e?w=600&auto=format&fit=crop&q=80',
    'doctor strange': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    robin: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=600&auto=format&fit=crop&q=80',
    daredevil: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    'linterna verde': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    'green lantern': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    aquaman: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    magneto: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&auto=format&fit=crop&q=80',
    'capitan marvel': 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
    'captain marvel': 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
    supergirl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    storm: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&auto=format&fit=crop&q=80',
    hawkeye: 'https://images.unsplash.com/photo-1511367461989-f85a21fda168?w=600&auto=format&fit=crop&q=80',
    nightwing: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=600&auto=format&fit=crop&q=80',
    antman: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80',
    wasp: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80'
  };

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

  // Manejar errores de carga de imágenes para sustituirlas por imágenes premium estables
  onImageError(event: Event, heroName: string): void {
    const imgElement = event.target as HTMLImageElement;
    const cleanName = heroName.toLowerCase().trim();
    
    // Buscar coincidencia en nuestro mapa de imágenes de respaldo
    const fallback = this.fallbackImages[cleanName];
    if (fallback && imgElement.src !== fallback) {
      imgElement.src = fallback;
    } else {
      // Imagen genérica definitiva si no hay coincidencia específica o si el fallback también falla
      const genericFallback = 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=600&auto=format&fit=crop&q=80';
      if (imgElement.src !== genericFallback) {
        imgElement.src = genericFallback;
      }
    }
  }
}
