import { Component, OnInit } from '@angular/core';
// This lets me use jquery
declare var $: any;

@Component({
  selector: 'app-nueva-carrera',
  templateUrl: './nueva-carrera.component.html',
  styleUrls: ['./nueva-carrera.component.scss']
})
export class NuevaCarreraComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  showModal(): void {
    $('#myModal').modal('show');
  }
  sendModal(): void {
    // do something here
    this.hideModal();
  }
  hideModal(): void {
    document.getElementById('close-modal').click();
  }

}
