import { Component, signal } from '@angular/core';
import { CardComponent } from '../../components/card/card.component/card.component';
import { I18nPluralPipe, I18nSelectPipe, JsonPipe, SlicePipe } from '@angular/common';

const client1 = {
  name: 'Arnoldo',
  gender: 'male',
  age: 45,
  address: 'Managua Nicaragua',
};
const client2 = {
  name: 'Vera',
  gender: 'female',
  age: 50,
  address: 'Managua Nicaragua',
};

@Component({
  selector: 'uncommon-page',
  imports: [CardComponent, I18nSelectPipe, I18nPluralPipe, SlicePipe, JsonPipe],
  templateUrl: './uncommon-page.component.html',
})
export default class UncommonPageComponent {
  //i18n Select
  client = signal(client1);

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
  };

  changeClient() {
    if (this.client() === client1) {
      this.client.set(client2);
      return;
    }
    this.client.set(client1);
  }

  //i18n Plural
  clientsMap = signal({
    '=0': 'no tenemos ningún cliente esperando',
    '=1': 'tenemos un cliente esperando',
    '=2': 'tenemos dos clientes esperando',
    other: ' # clientes esperando',
  });

  clients = signal(['Melisa', 'Pedro', 'Fernando', 'Maria', 'Natalia', 'Andrea', 'Juan', 'Carlos']);

  deleteClient() {
    this.clients.update((prev) => prev.slice(1));
  }
}
