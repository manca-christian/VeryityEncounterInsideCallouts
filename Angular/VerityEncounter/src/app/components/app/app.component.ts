import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SelectCardComponent } from '../select-card/select-card.component';
import {
  FormBuilder,
  FormGroup,
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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'VerityEncounter';
  cardArray: number[] = [0, 1, 2];

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
      this.errorMessage = '';
    }
  }
}
