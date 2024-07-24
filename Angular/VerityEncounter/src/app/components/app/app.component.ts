import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
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
  cards = [
    { id: 0, selectedShape: null as number | null },
    { id: 1, selectedShape: null as number | null },
    { id: 2, selectedShape: null as number | null }
  ]

  cardArray: number[] = [0, 1, 2];
  characterForm: FormGroup;
  errorMessage: string = '';
  prova: string | undefined;

  constructor(private fb: FormBuilder) {
    this.characterForm = this.fb.group({
      charInput: [
        '',
        [Validators.required, Validators.maxLength(3), this.allowedCharacters],
      ],
    });
  }

  allowedCharacters(control: { value: string }) {
    const validCharacters = /^[cstCST]*$/;
    if (!validCharacters.test(control.value)) {
      return { invalidCharacter: true };
    }
    return null;
  }

  onInput() {
    if (this.characterForm.get('charInput')?.errors?.['invalidCharacter']) {
      this.errorMessage = 'Solo i caratteri "c", "s" e "t" sono consentiti.';
    } else {
      this.errorMessage = '';
      const inputValue = this.characterForm.get('charInput')!.value;
      const shapeIds = [];
      for (let i = 0; i < inputValue.length; i++) {
        shapeIds.push(this.getShapeIdsFromInputValue(inputValue[i]));
      }
      console.log(shapeIds);
  
    
      for (let i = 0; i < shapeIds.length; i++) {
        const cardId = this.cardArray[i];
        const shapeId = shapeIds[i][0]; 
        this.cards.find(card => card.id === cardId)!.selectedShape = shapeId;
      }
    }
  }

  getShapeIdsFromInputValue(input: string): number[] {
  const shapeIds: number[] = [];
  for (const char of input.toUpperCase()) {
    switch (char) {
      case 'C':
        shapeIds.push(0);
        break;
      case 'S':
        shapeIds.push(1);
        break;
      case 'T':
        shapeIds.push(2);
        break;
      default:
        console.log(`Input non gestito: ${char}`);
        shapeIds.push(0);
    }
  }
  return shapeIds;
}

}


