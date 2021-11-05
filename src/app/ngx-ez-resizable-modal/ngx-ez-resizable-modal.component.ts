import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Draggable } from './draggable';

@Component({
  selector: 'ngx-ez-resizable-modal',
  templateUrl: './ngx-ez-resizable-modal.component.html',
  styleUrls: ['./ngx-ez-resizable-modal.component.scss'],
})
export class NgxEzResizableModalComponent implements AfterViewInit {
  @ViewChild('contentRef') contentRef: ElementRef;
  @ViewChild('headerRef') headerRef: ElementRef;
  @ViewChild('bodyRef') bodyRef: ElementRef;
  @ViewChild('footerRef') footerRef: ElementRef;

  private contentElement: any;
  private headerElement: any;
  private bodyElement: any;
  private footerElement: any;

  constructor() {}

  ngAfterViewInit() {
    this.contentElement = this.contentRef.nativeElement as HTMLDivElement;
    this.headerElement = this.headerRef.nativeElement as HTMLDivElement;
    this.bodyElement = this.bodyRef.nativeElement as HTMLDivElement;
    this.footerElement = this.footerRef.nativeElement as HTMLDivElement;

    const draggableElement = new Draggable(
      this.contentElement,
      this.headerElement
    );
  }
}
