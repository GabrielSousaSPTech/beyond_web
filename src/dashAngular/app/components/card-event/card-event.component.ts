import { Component, inject, Input, input, OnInit, Signal, signal } from '@angular/core';
import { userEvent } from '../../models/user-event.type';
import { CardEventService } from '../../services/card-event/card-event.service';
import { BaseModalComponent } from "../base-modal/base-modal.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-event',
  imports: [BaseModalComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './card-event.component.html',
  styleUrl: './card-event.component.css'
})
export class CardEventComponent {
  private destroy$ = new Subject<void>();
  private cardEventService = inject(CardEventService)
  protected eventList = this.cardEventService.getUserEvents;
  protected currentEvent = signal<userEvent | null>(null);

  protected openModal = signal(false);
  protected isEditing = signal(false);

  eventForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.eventForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)
      ]],
      descricao: [''],
      cor: ['#000000'],
      dataInicio: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)]],
      dataTermino: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)]],
    });
    
    this.cardEventService.triggerAddEvent$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.addEvent();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  editEvent(eventEdit: userEvent): void {
    this.isEditing.set(true);
    this.openModal.set(true);
    this.currentEvent.set(eventEdit);
    this.eventForm.patchValue({
      name: eventEdit.name,
      descricao: eventEdit.descricao,
      cor: eventEdit.cor || '#000000',
      dataInicio: eventEdit.dataInicio,
      dataTermino: eventEdit.dataTermino
    })
    console.log(this.eventForm.get('cor')?.value);
  }


  closeModal(): void {
    this.openModal.set(false);
  }

  saveEvent(): void {
    if (this.eventForm.valid) {
      const eventData = this.eventForm.value;
      const newEvent: userEvent = {
        id: this.isEditing() ? this.currentEvent()?.id! : this.eventList().length,
        name: eventData.name,
        descricao: eventData.descricao,
        cor: eventData.cor,
        dataInicio: eventData.dataInicio,
        dataTermino: eventData.dataTermino
      };

      if (this.isEditing()) {
        this.cardEventService.editEvent(newEvent, this.currentEvent()?.id!);
      } else {
        this.cardEventService.addEvent(newEvent);
      }

      this.closeModal();
    }
  }

  addEvent(): void {
    this.isEditing.set(false);
    this.openModal.set(true);
    this.currentEvent.set(null);
    this.eventForm.reset();
  }

  deleteEvent(event: userEvent): void {
    this.cardEventService.deleteEvent(event.id);
  }

  getDateObject(date: string | null): Date | null{
    console.log("getDateObject", date);
    if(date){
      console.log("Date is not null")
      console.log("Date", new Date(date))
      return new Date(date);
    }
    console.log("Date is null")
    return null
  }
}
