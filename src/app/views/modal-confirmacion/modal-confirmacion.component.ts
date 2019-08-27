import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
})
export class ModalConfirmacionComponent implements OnInit {

  @Input() titulo: string;
  @Input() mensaje: string;
  @Input() textoBtnConfirmar: string;
  @Input() textoBtnCancelar: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  public cancelar() {
    this.activeModal.close(false);
  }

  public confirmar() {
    this.activeModal.close(true);
  }

  public cerrar() {
    this.activeModal.dismiss();
  }

}
