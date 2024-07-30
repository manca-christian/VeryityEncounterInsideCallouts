import { CommonModule } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SelectCardComponent } from '../select-card/select-card.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    SelectCardComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChildren(SelectCardComponent)
  cardComponents!: QueryList<SelectCardComponent>;
  title = 'VerityEncounter';
  cards = [
    { id: 0, selectedShape: null as number | null },
    { id: 1, selectedShape: null as number | null },
    { id: 2, selectedShape: null as number | null },
  ];
  characterForm: FormGroup;
  errorMessage: string = '';
  nameArray: string[] = [
    'Guardian symbol',
    'First background symbol',
    'Second background symbol',
  ];
  steps: string[] = [];
    selectedOption: string = '';
  selectedCard: number | undefined;
  backgroundShapes: string[] = [];
  selectedShape: string | undefined;
  allowedCharacters(control: { value: string }) {
    const validCharacters = /^[cstCST]*$/;
    if (!validCharacters.test(control.value)) {
      return { invalidCharacter: true };
    }
    return null;
  }
  
  onInputChange(event: Event) {
    const inputControl = this.characterForm.get('charInput');
    if (inputControl?.errors?.['invalidCharacter']) {
      this.errorMessage = 'Solo i caratteri "c", "s" e "t" sono consentiti.';
    } else {
      this.errorMessage = '';
    }
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 0) {
      const lastChar = value[value.length - 1];
      const index = value.length - 1;
      if (index < this.cardComponents.length) {
        this.cardComponents.toArray()[index].executeFunction(lastChar);
      }
    }
  }
  getShapeIdFromChar(char: string): number {
    const shapeMap: { [key: string]: number } = { C: 0, S: 1, T: 2 };
    return shapeMap[char] ?? 0;
  }
  constructor(private fb: FormBuilder) {
    this.characterForm = this.fb.group({
      charInput: [
        '',
        [Validators.required, Validators.maxLength(3), this.allowedCharacters],
      ],
    });
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
