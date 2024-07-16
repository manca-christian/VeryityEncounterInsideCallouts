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
  cardArray: number[] = [0, 1, 2];
  i: number | undefined;
  characterForm: FormGroup;
  a: SelectCardComponent | undefined;
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
      this.errorMessage = '';
      console.log(this.characterForm.get('charInput')?.value[0]);
      console.log(this.characterForm.get('charInput')?.value[1]);
      console.log(this.characterForm.get('charInput')?.value[2]);
      const card0 = document.getElementById('card0') as HTMLInputElement;
      const card1 = document.getElementById('card1') as HTMLInputElement;
      const card2 = document.getElementById('card2') as HTMLInputElement;
      console.log(card0)
      card0.value = this.characterForm.get('charInput')?.value[0];
      card1.value = this.characterForm.get('charInput')?.value[1];
      card2.value = this.characterForm.get('charInput')?.value[2];
    }
  }

  getShapeIdFromInputValue(value: string): number {
    switch (value) {
      case 'C':
        return 1;
      case 'S':
        return 2;
      case 'T':
        return 3;
      default:
        console.log('Input non gestito:', value);
        return 0;
    }
  }
}
