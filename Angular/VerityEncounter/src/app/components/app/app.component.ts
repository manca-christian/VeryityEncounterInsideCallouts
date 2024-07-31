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
  title = 'VerityEncounter';
  @ViewChildren(SelectCardComponent) cardComponents!: QueryList<SelectCardComponent>;
  
  characterForm: FormGroup;
  errorMessage: string = '';
  valueCard1: string | undefined;
  valueCard2: string | undefined;
  valueCard3: string | undefined;
  nameArray: string[] = [
    'Guardian symbol',
    'First background symbol',
    'Second background symbol',
  ];
  steps: string[] = [];
  
  constructor(private fb: FormBuilder) {
    this.characterForm = this.fb.group({
      charInput: ['', [Validators.required, Validators.maxLength(3), this.allowedCharacters]]
    });
  }

  allowedCharacters(control: { value: string }) {
    const validCharacters = /^[cstCST]*$/;
    return validCharacters.test(control.value) ? null : { invalidCharacter: true };
  }

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const cardComponents = this.cardComponents.toArray();
  
    
    if (value.length === 0) {
      cardComponents.forEach(card => card.resetSelection());
      return;
    }
  
    // Process each character
    for (let i = 0; i < 3; i++) {
      if (i < value.length) {
        const char = value[i].toLowerCase();
        cardComponents[i].executeFunction(char);
      } else {
        // Reset cards that no longer have a corresponding character
        cardComponents[i].resetSelection();
      }
    }
  }

  onShapeSelected(event: { index: number, shape: string }) {
    switch(event.index) {
      case 1:
        this.valueCard1 = event.shape;
        break;
      case 2:
        this.valueCard2 = event.shape;
        break;
      case 3:
        this.valueCard3 = event.shape;
        break;
    }
    this.generateSteps();
  }

  generateSteps() {
    const shapes = [this.valueCard3, this.valueCard1, this.valueCard2]; // Guardian, First background, Second background
    const [guardianShape, firstBackground, secondBackground] = shapes;

    if (!guardianShape || !firstBackground || !secondBackground) {
      this.steps = ['Please select all shapes to generate steps.'];
      return;
    }

    this.steps = [];

    if (firstBackground !== secondBackground && firstBackground === guardianShape) {
      this.steps.push(`Step 1: Take the ${secondBackground} and give it to the statue that is holding a ${secondBackground}.`);
      this.steps.push(`Step 2: Wait until your team is also ready with the first step.`);
      this.steps.push(`Step 3: Take 2 ${firstBackground}s and give them to the 2 statues that are not holding a ${firstBackground}.`);
    } else if (firstBackground !== secondBackground && secondBackground === guardianShape) {
      this.steps.push(`Step 1: Take the ${firstBackground} and give it to the statue that is holding a ${firstBackground}.`);
      this.steps.push(`Step 2: Wait until your team is also ready with the first step.`);
      this.steps.push(`Step 3: Take 2 ${secondBackground}s and give them to the 2 statues that are not holding a ${secondBackground}.`);
    } else if (firstBackground !== secondBackground && (firstBackground !== guardianShape) && (secondBackground !== guardianShape)) {
      this.steps.push(`Step 1: Take the ${firstBackground} and give it to the statue that is holding a ${firstBackground}.`);
      this.steps.push(`Step 2: Take the ${secondBackground} and give it to the statue that is holding a ${secondBackground}.`);
      this.steps.push(`Step 3: Wait for your team to send you the two ${guardianShape}s.`);
      this.steps.push(`Step 4: Take two ${guardianShape}s and give them to the statues that are NOT holding a ${guardianShape}.`);
    } else if (firstBackground === secondBackground && firstBackground === guardianShape) {
      this.steps.push(`Step 1: Wait until your team is also ready with the first step.`);
      this.steps.push(`Step 2: Take 2 ${firstBackground}s and give them to the 2 statues that are not holding a ${firstBackground}.`);
    } else {
      this.steps.push('Invalid combination of shapes. Please select different shapes.');
    }
  }
}
