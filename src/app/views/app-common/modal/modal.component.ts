import {Component, ElementRef, Input} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() public titulo;
  private element: any;

  constructor(public activeModal: NgbActiveModal) {
  }
}
