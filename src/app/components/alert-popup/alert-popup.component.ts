import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Popup} from '../../shared/popup';

@Component({
  selector: 'app-alert-popup',
  templateUrl: './alert-popup.component.html',
  styleUrls: ['./alert-popup.component.scss']
})
export class AlertPopupComponent implements OnInit {

  @Input() popup : Popup;
  @Input() link : string = '';
  @Output() popupAnswer = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  scrollIssue() {
    document.body.classList.add('confirm-popup--open');
  }

  close() {
    this.popupAnswer.emit(false);
  }
}
