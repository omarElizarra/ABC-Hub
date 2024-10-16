import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  readonly columnMap = Object.freeze({
    id: {
      label: 'ID',
      description: 'ID',
    },
    name: {
      label: 'Name',
      description: 'Name',
    },
    email: {
      label: 'Email',
      description: 'Email',
    },
    actions: {
      label: '',
      description: 'Actions',
    },
  });

  displayedColumns = Object.keys(this.columnMap);

  dataSource = [
    { id: 1, name: 'Fulano', email: 'fulano@mail.com' },
    { id: 1, name: 'Beltrano', email: 'beltrano@mail.com' },
    { id: 1, name: 'Cicrano', email: 'cicrano@mail.com' },
    { id: 1, name: 'Fulano', email: 'fulano@mail.com' },
    { id: 1, name: 'Beltrano', email: 'beltrano@mail.com' },
    { id: 1, name: 'Cicrano', email: 'cicrano@mail.com' },
    { id: 1, name: 'Fulano', email: 'fulano@mail.com' },
    { id: 1, name: 'Beltrano', email: 'beltrano@mail.com' },
  ];

  constructor(){}

}
