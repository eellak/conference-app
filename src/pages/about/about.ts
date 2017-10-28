import { Component } from '@angular/core';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  conferenceDate = '4-5 Νοεμβρίου';

  constructor() { }

  // presentPopover(event: Event) {
  //   let popover = this.popoverCtrl.create(PopoverPage);
  //   popover.present({ ev: event });
  // }
}
