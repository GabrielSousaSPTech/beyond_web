import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { userEvent } from '../../../../shared/models/user-event.type';
import { CardEventService } from '../../services/card-event/card-event.service';
import { BaseModalComponent } from "../../../../shared/components/base-modal/base-modal.component";
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-modal',
  imports: [BaseModalComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './event-modal.component.html',
  styleUrl: './event-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventModalComponent {
  private cardEventService = inject(CardEventService)
  protected eventList = this.cardEventService.getUserEvents;

  protected openModal = this.cardEventService.isModalOpen;
  protected isEditing = this.cardEventService.isEditing;
  private subscription: Subscription;

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
        id_eventos: [0]
      });

      this.subscription = this.cardEventService.eventUpdates$.subscribe(
        (updatedEvent: userEvent) => {
          this.eventForm.patchValue({
            id_eventos: updatedEvent.ID_EVENTOS,
            name: updatedEvent.NOME,
            descricao: updatedEvent.DESCRICAO,
            cor: updatedEvent.COR,
            dataInicio: updatedEvent.DATA_INICIO,
            dataTermino: updatedEvent.DATA_TERMINO,
          });
        }
      );
    }

    ngOnDestroy() {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
    }
  
    saveEvent(): void {
      if (this.eventForm.valid) {
        const eventData = this.eventForm.value;
        console.log('Event data:', eventData.id_eventos);
        const newEvent: userEvent = {
          ID_EVENTOS: eventData.id_eventos,
          NOME: eventData.name,
          DESCRICAO: eventData.descricao,
          COR: eventData.cor,
          DATA_INICIO: eventData.dataInicio,
          DATA_TERMINO: eventData.dataTermino
        };
        console.log('New event:', newEvent);
  
        if (this.isEditing()) {
          this.cardEventService.updateEvent(newEvent);
        } else {
          this.cardEventService.insertEvent(newEvent);
        }
  
        this.closeModal();
      }
    }

    addEvent(): void {
      this.eventForm.reset();
    }

    closeModal(): void {
      this.cardEventService.isModalOpen.set(false);
      this.cardEventService.isEditing.set(false);
      this.eventForm.reset();
    }
 }

