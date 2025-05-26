import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapService } from '../../services/map-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'map',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ],
  templateUrl: './page-map.component.html',
  styleUrl: './page-map.component.scss'
})
export class PageMapComponent {
  sidebarVisible = true;
  constructor(public mapService: MapService) {}

  toggleSidebar(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.sidebarVisible = checkbox.checked;
  }
}
