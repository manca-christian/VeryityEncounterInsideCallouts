import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-select-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-card.component.html',
  styleUrl: './select-card.component.scss',
})
export class SelectCardComponent {
  selectedCard: number | undefined;
  select(id: number) {
    this.selectedCard = id;
    console.log(id);
  }

  onOptionSelected(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Opzione selezionata:', selectedValue);
    switch (selectedValue) {
      case 'circle':
        this.select(1);
        break;
      case 'square':
        this.select(2);
        break;
      case 'triangle':
        this.select(3);
        break;
      default:
        console.log('Opzione non gestita:', selectedValue);
        break;
    }
  }
}
