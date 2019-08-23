import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalConfirmacionComponent } from '../views/modal-confirmacion/modal-confirmacion.component';

@Injectable()
export class ModalConfirmacionService {

  constructor(
    private modalService: NgbModal
  ) { }

  public mostrar(
    titulo: string,
    mensaje: string,
    textoBtnConfirmar: string = 'Confirmar',
    textoBtnCancelar: string = 'Cancelar',
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {

    const modalRef = this.modalService.open(ModalConfirmacionComponent, { 
      size: dialogSize,
      centered: true,
      windowClass:"animated bounceIn" 
    });

    modalRef.componentInstance.titulo = titulo;
    modalRef.componentInstance.mensaje = mensaje;
    modalRef.componentInstance.textoBtnConfirmar = textoBtnConfirmar;
    modalRef.componentInstance.textoBtnCancelar = textoBtnCancelar;

    return modalRef.result;
  }

}
