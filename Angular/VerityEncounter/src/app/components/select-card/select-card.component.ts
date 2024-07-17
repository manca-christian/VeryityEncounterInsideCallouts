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
 
  @Input() selectedShape: string | undefined;
  @Input() index!: number;
  @Input() selectString!: string;
  selectedOption: string = '';
  selectedCard: number | undefined;
  
  backgroundShapes: string[] = [];
  steps: string[] = [];
  nameArray: string[] = [
    'Guardian symbol',
    'First background symbol',
    'Second background symbol',
  ];

  private SHAPE_IDS = {
    Circle: 1,
    Square: 2,
    Triangle: 3,
  };

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
      case this.SHAPE_IDS.Circle:
        return 'Circle';
      case this.SHAPE_IDS.Square:
        return 'Square';
      case this.SHAPE_IDS.Triangle:
        return 'Triangle';
      default:
        console.log('Figura non gestita:', id);
        return '';
    }
  }

  onOptionSelected(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue) {
      console.log('Opzione selezionata:', selectedValue);
      this.select(this.getShapeIdFromValue(selectedValue));
    }
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
    if (inputValue) {
      console.log('Input value:', inputValue);
      this.select(this.getShapeIdFromInputValue(inputValue));
    }
  }

  getShapeIdFromInputValue(char: string): number {
    switch (char.toUpperCase()) {
      case 'C':
        return this.SHAPE_IDS.Circle;
      case 'S':
        return this.SHAPE_IDS.Square;
      case 'T':
        return this.SHAPE_IDS.Triangle;
      default:
        console.log('Input non gestito:', char);
        return 0;
    }
  }

  addBackgroundShape(shape: string) {
    this.backgroundShapes.push(shape);
    this.generateSteps();
  }

  
  generateSteps() {
    this.steps = [];
    const guardianShape = this.selectedShape ?? '';
    const backgroundShapes = this.backgroundShapes.filter(shape => shape !== guardianShape);
    const duplicateBackgroundShape = this.backgroundShapes.find(shape => shape === guardianShape);

    if (backgroundShapes.length === 2 && duplicateBackgroundShape) {
      this.generateStepsForTwoBackgroundShapes(backgroundShapes, guardianShape);
    } else if (duplicateBackgroundShape) {
      this.generateStepsForDuplicateBackgroundShape(guardianShape, duplicateBackgroundShape);
    } else {
      throw new Error('Invalid combination of shapes');
    }
  }

  private generateStepsForTwoBackgroundShapes(backgroundShapes: string[], guardianShape: string) {
    backgroundShapes.forEach((shape, index) => {
      this.steps.push(`Step ${index + 1}: Take the ${shape} and give it to the statue that is holding a ${shape}.`);
    });
    this.steps.push(`Step ${backgroundShapes.length + 1}: Wait for your team to send you the two ${guardianShape}s.`);
    this.steps.push(`Step ${backgroundShapes.length + 2}: Take two ${guardianShape}s and give them to the statues that are NOT holding a ${guardianShape}.`);
  }

  private generateStepsForDuplicateBackgroundShape(guardianShape: string, duplicateBackgroundShape: string) {
    if ([guardianShape, duplicateBackgroundShape].every((shape) => shape === 'Circle' || shape === 'Square' || shape === 'Triangle')) {
      this.steps.push('Step 1: Wait until your team is also ready with the first step.');
      this.steps.push(`Step 2: Take 2 ${duplicateBackgroundShape}s and give them to the statues that are not holding a ${duplicateBackgroundShape}.`);
    } else {
      this.steps.push(`Step 1: Take the ${duplicateBackgroundShape} and give it to the statue that is holding a ${duplicateBackgroundShape}.`);
      this.steps.push(`Step 2: Wait until your team is also ready with the first step.`);
      this.steps.push(`Step 3: Take 2 ${duplicateBackgroundShape}s and give them to the 2 statues that are not holding a ${duplicateBackgroundShape}.`);
    }
  }
}