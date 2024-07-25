import { CommonModule } from '@angular/common';
import {
  Component,
  input,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-card.component.html',
  styleUrl: './select-card.component.scss',
})
export class SelectCardComponent implements OnChanges {
  @Input() cards!: any[];
  @Input() index!: number;
  @Input() selectString: string | undefined;
  @Input() selectedShape: string | undefined;
  @Input() titleCard: string | undefined;

  selectedOption: string = '';
  selectedCard: number | undefined;
  backgroundShapes: string[] = [];
  steps: string[] = [];

  SHAPE_IDS = {
    Circle: 1,
    Square: 2,
    Triangle: 3,
  };
  lastChar: string | undefined;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedShape']) {
      console.log('selectedShape changed:', this.selectedShape);
      this.updateSelectedCard();
    }
  }

  updateSelectedCard() {
    if (this.selectedShape) {
      const shapeId = this.getShapeIdFromValue(this.selectedShape);
      this.selectedCard = shapeId;
      this.selectedOption = this.selectedShape;
      console.log('Updated selectedCard:', this.selectedCard);
    } else {
      this.selectedCard = undefined;
      this.selectedOption = '';
    }
  }

  setOptionValue(option: string): void {
    this.selectedOption = option;
    this.selectedShape = option;
  }

  select(id: number) {
    this.selectedCard = id;
    this.selectedShape = this.getShapeFromId(id);
    console.log('Selected shape:', this.selectedShape);
  }

  getShapeFromId(id: number): string {
    return (
      Object.keys(this.SHAPE_IDS).find(
        (key) => this.SHAPE_IDS[key as keyof typeof this.SHAPE_IDS] === id
      ) || ''
    );
  }
  executeFunction(char: string) {
    this.lastChar = char;
    this.select(this.getShapeIdFromValue(char));
  }
  onOptionSelected(event: Event, indexCard: number): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue) {
      console.log(
        'Option selected:',
        selectedValue,
        'Card selected:',
        indexCard
      );
      this.select(this.getShapeIdFromValue(selectedValue));
    }
  }

  getShapeIdFromValue(value: string): number {
    const shapeMap: { [key: string]: number } = {
      circle: this.SHAPE_IDS.Circle,
      square: this.SHAPE_IDS.Square,
      triangle: this.SHAPE_IDS.Triangle,
      c: this.SHAPE_IDS.Circle,
      s: this.SHAPE_IDS.Square,
      t: this.SHAPE_IDS.Triangle,
    };
    return shapeMap[value.toLowerCase()] || 0;
  }

  addBackgroundShape(shape: string) {
    this.backgroundShapes.push(shape);
    this.generateSteps();
  }

  generateSteps() {
    this.steps = [];
    const guardianShape = this.selectedShape ?? '';
    const backgroundShapes = this.backgroundShapes.filter(
      (shape) => shape !== guardianShape
    );
    const duplicateBackgroundShape = this.backgroundShapes.find(
      (shape) => shape === guardianShape
    );

    if (backgroundShapes.length === 2 && duplicateBackgroundShape) {
      this.generateStepsForTwoBackgroundShapes(backgroundShapes, guardianShape);
    } else if (duplicateBackgroundShape) {
      this.generateStepsForDuplicateBackgroundShape(
        guardianShape,
        duplicateBackgroundShape
      );
    } else {
      throw new Error('Invalid combination of shapes');
    }
  }

  private generateStepsForTwoBackgroundShapes(
    backgroundShapes: string[],
    guardianShape: string
  ) {
    backgroundShapes.forEach((shape, index) => {
      this.steps.push(
        `Step ${
          index + 1
        }: Take the ${shape} and give it to the statue that is holding a ${shape}.`
      );
    });
    this.steps.push(
      `Step ${
        backgroundShapes.length + 1
      }: Wait for your team to send you the two ${guardianShape}s.`
    );
    this.steps.push(
      `Step ${
        backgroundShapes.length + 2
      }: Take two ${guardianShape}s and give them to the statues that are NOT holding a ${guardianShape}.`
    );
  }

  private generateStepsForDuplicateBackgroundShape(
    guardianShape: string,
    duplicateBackgroundShape: string
  ) {
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
        `Step 1: Take the ${duplicateBackgroundShape} and give it to the statue that is holding a ${duplicateBackgroundShape}.`
      );
      this.steps.push(
        `Step 2: Wait until your team is also ready with the first step.`
      );
      this.steps.push(
        `Step 3: Take 2 ${duplicateBackgroundShape}s and give them to the 2 statues that are not holding a ${duplicateBackgroundShape}.`
      );
    }
  }
}
