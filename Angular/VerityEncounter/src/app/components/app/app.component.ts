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
  characterForm: FormGroup;
  errorMessage: string = '';

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
    let inputValue = this.characterForm.get('charInput')!.value;
    let chars: string[] = inputValue.toUpperCase();
    for (let i = 0; i < chars.length; i++) {
      let char = chars[i];
      let shapeId = this.getShapeIdFromInputValue(char);
      this.cards[i].selectedShape = shapeId;
    }
  }
}

  getShapeIdFromInputValue(char: string): number {
    switch (char.toUpperCase()) {
      case 'C':
        return 0;
      case 'S':
        return 1;
      case 'T':
        return 2;
      default:
        console.log('Input non gestito:', char);
        return 0;
    }
  }
}
