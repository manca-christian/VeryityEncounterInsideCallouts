import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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

  finalShape: string[];
  constructor() {
    this.finalShape = ['', '', ''];
  }
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
    this.finalShape![indexCard - 1] = selectedValue;
    console.log(this.finalShape);
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
}
