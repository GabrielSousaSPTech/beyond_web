import { Component, EventEmitter, Input, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ClickOutsideDirective } from '../../../../../core/directives/clickOutside/clickOutside.directive';

@Component({
  selector: 'app-select-filtered',
  imports: [CommonModule, FormsModule, ClickOutsideDirective],
  templateUrl: './select-filtered.component.html',
  styleUrl: './select-filtered.component.css',
})
export class SelectFilteredComponent implements OnInit {
  
  @Input() searchTerm: string | undefined = '';
  protected showDropdown: WritableSignal<boolean> = signal(false);
  protected selectedOption: string | null = null;
  @Input() placeHolder: string = ""

  @Output() valueChange = new EventEmitter<string>();

  @Input() inputData!: Observable<any[]>;
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
    if (!this.searchTerm?.trim()) {
      this.filteredOptions = [...this.savedData];
      this.showDropdown.set(false);
    } else {
      this.filteredOptions = this.savedData.filter(element => 
        element.toLowerCase().includes(this.searchTerm!.toLowerCase())
      );
      this.showDropdown.set(true);
    }
  }
  
  selectOption(option: string) {
    this.selectedOption = option;
    this.searchTerm = option;
    this.showDropdown.set(false);
    this.valueChange.emit(option);
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
