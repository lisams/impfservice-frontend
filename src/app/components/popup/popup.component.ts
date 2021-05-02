import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  @Input() headline: string;
  @Input() text: string;
  @Input() buttontext: string;
  @Input() visible: boolean;
  @Output() popupAnswer = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
    if(this.visible) {
      console.log("visible");
    } else {
      console.log("not");
    }
  }

  scrollIssue() {
    document.body.classList.add('popup--open');
  }

  abort() {
    this.popupAnswer.emit(false);
  }

  confirm() {
    this.popupAnswer.emit(true);
  }
}
