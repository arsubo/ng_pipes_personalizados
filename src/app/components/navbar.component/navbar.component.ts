import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  routes = routes
    .filter((route) => route.title && route.path && !route.path.includes(':') && route.path !== '**')
    .map((route) => ({
      title: route.title ?? '',
      path: route.path ?? '',
    }));
}
