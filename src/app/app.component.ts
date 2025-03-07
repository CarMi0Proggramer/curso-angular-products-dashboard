import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateProductModalComponent } from './create-product-modal/create-product-modal.component';
import { UpdateProductModalComponent } from './update-product-modal/update-product-modal.component';
import { ConfirmDeleteModalComponent } from './confirm-delete-modal/confirm-delete-modal.component';
import { FilterDropdownComponent } from './filter-dropdown/filter-dropdown.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CreateProductModalComponent,
    UpdateProductModalComponent,
    ConfirmDeleteModalComponent,
    FilterDropdownComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  /*
  TODO: Inicializar los eventos para mostrar los componentes interactivos usando flowbite

  * Se debe elegir el momento del ciclo de vida adecuado
  */
  ngOnInit(): void {
    import('flowbite').then((flowbite) => {
      flowbite.initFlowbite();
    });
  }
}
