import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-card.component.html',
  styleUrl: './select-card.component.scss',
})
export class SelectCardComponent {
  @Input() index!: number;
  @Input() selectString!: string;
  selectedOption: string = '';
  selectedCard: number | undefined;
  selectedShape: string | undefined;
  backgroundShapes: string[] = [];
  steps: string[] = [];
  card: number = 1;
  nameArray: string[] = [
    'Guardian symbol',
    'First background symbol',
    'Second background symbol',
  ];
  setOptionValue(option: string): void {
    this.selectedOption = option;
  }
  select(id: number) {
    this.selectedCard = id;
    this.selectedShape = this.getShapeFromId(id);
    console.log(this.selectedShape);
  }

  getShapeFromId(id: number): string {
    switch (id) {
      case 1:
        return 'Circle';
      case 2:
        return 'Square';
      case 3:
        return 'Triangle';
      default:
        console.log('Figura non gestita:', id);
        return '';
    }
  }

  onOptionSelected(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Opzione selezionata:', selectedValue);
    this.select(this.getShapeIdFromValue(selectedValue));
  }

  getShapeIdFromValue(value: string): number {
    switch (value) {
      case 'circle':
        return 1;
      case 'square':
        return 2;
      case 'triangle':
        return 3;
      default:
        console.log('Opzione non gestita:', value);
        return 0;
    }
  }

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value.toUpperCase();
    console.log('Input value:', inputValue);
    this.select(this.getShapeIdFromInputValue(inputValue));
  }

  getShapeIdFromInputValue(value: string): number {
    switch (value) {
      case 'C':
        return 1;
      case 'S':
        return 2;
      case 'T':
        return 3;
      case 'c':
        return 1;
      case 's':
        return 2;
      case 't':
        return 3;
      default:
        console.log('Input non gestito:', value);
        return 0;
    }
  }

  addBackgroundShape(shape: string) {
    this.backgroundShapes.push(shape);
    this.generateSteps();
  }

  generateSteps() {
    this.steps = [];
    const guardianShape = this.selectedShape;
    const uniqueBackgroundShape = this.backgroundShapes.find(
      (shape) => shape !== guardianShape
    );
    const duplicateBackgroundShape = this.backgroundShapes.find(
      (shape) => shape === guardianShape
    );

    if (uniqueBackgroundShape && duplicateBackgroundShape) {
      if (
        [guardianShape, duplicateBackgroundShape].every(
          (shape) =>
            shape === 'Circle' || shape === 'Square' || shape === 'Triangle'
        )
      ) {
        this.steps.push(
          'Step 1: Wait until your team is also ready with the first step.'
        );
        this.steps.push(
          `Step 2: Take 2 ${duplicateBackgroundShape}s and give them to the statues that are not holding a ${duplicateBackgroundShape}.`
        );
      } else {
        this.steps.push(
          `Step 1: Take the ${uniqueBackgroundShape} and give it to the statue that is holding a ${uniqueBackgroundShape}.`
        );
        this.steps.push(
          `Step 2: Wait until your team is also ready with the first step.`
        );
        this.steps.push(
          `Step 3: Take 2 ${duplicateBackgroundShape}s and give them to the 2 statues that are not holding a ${duplicateBackgroundShape}.`
        );
      }
    } else {
      console.error('Invalid combination of shapes');
    }
  }
}
