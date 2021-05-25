import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Popup} from '../../shared/popup';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html'
})
export class ConfirmPopupComponent implements OnInit {

  @Input() popup : Popup;
  @Output() popupAnswer = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  abort() {
    this.popupAnswer.emit(false);
  }

  confirm() {
    this.popupAnswer.emit(true);
  }
}
