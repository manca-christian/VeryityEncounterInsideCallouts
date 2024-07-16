import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-card.component.html',
  styleUrl: './select-card.component.scss',
})
export class SelectCardComponent {
  selectedOption: string = '';
  selectedCard: number | undefined;
  selectedShape: string | undefined; 


  setOptionValue(option: string): void {
    this.selectedOption = option;
  }
  select(id: number) {
    this.selectedCard = id;
    switch (id) {
      case 1:
        this.selectedShape = 'Circle';
        break;
      case 2:
        this.selectedShape = 'Square';
        break;
      case 3:
        this.selectedShape = 'Triangle';
        break;
      default:
        console.log('Figura non gestita:', id);
        break;
    }
    console.log(this.selectedShape);
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
