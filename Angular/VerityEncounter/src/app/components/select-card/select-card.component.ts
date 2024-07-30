import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  input,
  Input,
  OnChanges,
  Output,
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
export class SelectCardComponent {
  @Input() index!: number;
  @Input() selectedShape: string | undefined;
  @Input() titleCard: string | undefined;
  @Output() shapeSelected = new EventEmitter<{ index: number, shape: string }>();

  finalShape: string[];
  constructor() {
    this.finalShape = ['', '', ''];
  }
  SHAPE_IDS = {
    Circle: 1,
    Square: 2,
    Triangle: 3,
  };

  selectedCard: number | undefined;

  select(id: number) {
    this.selectedCard = id;
    const shape = this.getShapeFromId(id);
    this.selectedShape = shape;
    this.shapeSelected.emit({ index: this.index, shape });
  }

  setOptionValue(option: string) {
    this.selectedShape = option;
    this.shapeSelected.emit({ index: this.index, shape: option });
  }

  onOptionSelected(event: Event, index:number) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue) {
      this.setOptionValue(selectedValue);
    }
  }

  getShapeFromId(id: number): string {
    return Object.keys(this.SHAPE_IDS).find(
      key => this.SHAPE_IDS[key as keyof typeof this.SHAPE_IDS] === id
    ) || '';
  }

  executeFunction(char: string) {
    const shapeMap: { [key: string]: number } = {
      c: this.SHAPE_IDS.Circle,
      s: this.SHAPE_IDS.Square,
      t: this.SHAPE_IDS.Triangle,
    };
    const shapeId = shapeMap[char.toLowerCase()];
    if (shapeId) {
      this.select(shapeId);
    }
  }

  resetSelection() {
    this.selectedCard = undefined;
    this.selectedShape = undefined;
    this.shapeSelected.emit({ index: this.index, shape: '' });
  }
}
