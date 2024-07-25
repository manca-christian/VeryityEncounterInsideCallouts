import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  // cards = [
  //   { id: 0, selectedShape: null as number | null },
  //   { id: 1, selectedShape: null as number | null },
  //   { id: 2, selectedShape: null as number | null },
  // ];
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
    const inputControl = this.characterForm.get('charInput');

    if (inputControl?.errors?.['invalidCharacter']) {
      this.errorMessage = 'Solo i caratteri "c", "s" e "t" sono consentiti.';
    } else {
      this.errorMessage = '';
      const inputValue = (inputControl?.value || '').toUpperCase().slice(0, 3);

      switch (inputValue.length) {
        case 1:
          this.valueCard1 = inputValue[0];
          console.log('Figura: ', inputValue[0], 'Card: 1');
          break;
        case 2:
          this.valueCard1 = inputValue[0];
          console.log('Figura: ', inputValue[0], 'Card: 1');
          this.valueCard2 = inputValue[1];
          console.log('Figura: ', inputValue[1], 'Card: 1');
          break;
        case 3:
          this.valueCard1 = inputValue[0];
          console.log('Figura: ', inputValue[0], 'Card: 1');
          this.valueCard2 = inputValue[1];
          console.log('Figura: ', inputValue[1], 'Card: 2');
          this.valueCard3 = inputValue[2];
          console.log('Figura: ', inputValue[2], 'Card: 3');
          break;
      }

      // this.cards.forEach((card) => (card.selectedShape = null));
      // for (let i = 0; i < inputValue.length; i++) {
      //   const shapeId = this.getShapeIdFromChar(inputValue[i]);
      //   if (i < this.cards.length) {
      //     this.cards[i].selectedShape = shapeId;
      //   }
      // }
      // console.log('Carte aggiornate:', this.cards);
    }
  }

  getShapeIdFromChar(char: string): number {
    const shapeMap: { [key: string]: number } = { C: 0, S: 1, T: 2 };
    return shapeMap[char] ?? 0;
  }
}
