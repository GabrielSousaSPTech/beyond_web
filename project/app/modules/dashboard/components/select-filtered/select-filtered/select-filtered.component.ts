import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { ClickOutsideDirective } from '../../../../../core/directives/clickOutside/clickOutside.directive';

@Component({
  selector: 'app-select-filtered',
  imports: [CommonModule, FormsModule, ClickOutsideDirective, ReactiveFormsModule],
  templateUrl: './select-filtered.component.html',
  styleUrl: './select-filtered.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFilteredComponent implements OnInit {
  @Input() type: 'select' | 'checkbox' = 'select'
  @Input() searchTerm: string | undefined = '';
  @Input() placeHolder: string = ""
  @Input() inputData!: Observable<any[]>;
  @Input() msgCheckbox?: string = ''
  @Output() valueChange = new EventEmitter<string | Number | Array< number|string>>();


  protected showDropdown: WritableSignal<boolean> = signal(false);
  protected selectedOption: string | null = null;
  private savedData: string[] = [];
  protected filteredOptions: string[] = [];

  ngOnInit() {
    this.inputData.subscribe(data => {
      this.savedData = data.map(d => d.nome || d.tipo || d.ano || d.mes);
      this.filteredOptions = [...this.savedData];
    });

    if (this.searchTerm) {
        this.selectedOption = this.searchTerm;
    }

  }


  filterOptions() {
    if(this.type == 'select'){
      if (!this.searchTerm?.trim()) {
      this.filteredOptions = [...this.savedData];
      this.showDropdown.set(false);
    } else {
      this.filteredOptions = this.savedData.filter(element => 
        element.toLowerCase().includes(this.searchTerm!.toLowerCase())
      );
      this.showDropdown.set(true);
    }
    } if(this.type == 'checkbox') {
      
    }
  }
  
  selectOption(option: string) {
    this.selectedOption = option;
    this.searchTerm = option;
    this.showDropdown.set(false);
    this.valueChange.emit(option);
  }

  protected multipleOptions: Set<string | number> = new Set();
selectMultipleOptions(data: Record<string, number|string>) {
  if(this.type === 'checkbox') {
    const value = data['value'];
    
    if(this.multipleOptions.has(value)) {
      this.multipleOptions.delete(value);
    } else {
      this.multipleOptions.add(value);
    }

    if(this.multipleOptions.size > 1) {
      this.searchTerm = `${this.multipleOptions.size} ${this.msgCheckbox}`;
    } else if (this.multipleOptions.size === 1) {
      this.searchTerm = Array.from(this.multipleOptions)[0].toString();
    } else {
      this.searchTerm = '';
    }

    this.valueChange.emit(Array.from(this.multipleOptions));
  } else {
    throw new Error("ERRO: Uso de select multiple options sem ser tipo checkbox");
  }
}

  showAllOptions() {
    this.filteredOptions = [...this.savedData];
    this.showDropdown.set(true);
  }

  clickedOutside(){
    this.showDropdown.set(false);
  }

  clearSearchTerm() {
    this.searchTerm = '';
    this.selectedOption = null;
    this.filteredOptions = [...this.savedData];
    this.showDropdown.set(false);
    this.valueChange.emit('');
  }
 }
