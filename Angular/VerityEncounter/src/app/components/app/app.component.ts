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
  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 0) {
      const lastChar = value[value.length - 1];
      const index = value.length - 1;
      if (index < this.cardComponents.length) {
        this.cardComponents.toArray()[index].executeFunction(lastChar);
      }
    }
  }
}
