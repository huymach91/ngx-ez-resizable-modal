import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Draggable } from './draggable';
import { IResizableModalConfig } from './ngx-ez-resizable-modal.interface';

@Component({
  selector: 'ngx-ez-resizable-modal',
  templateUrl: './ngx-ez-resizable-modal.component.html',
  styleUrls: ['./ngx-ez-resizable-modal.component.scss'],
})
export class NgxEzResizableModalComponent implements AfterViewInit {
  @Input() modalConfig: IResizableModalConfig = {};

  @ViewChild('contentRef') contentRef: ElementRef;
  @ViewChild('headerRef') headerRef: ElementRef;
  @ViewChild('bodyRef') bodyRef: ElementRef;
  @ViewChild('footerRef') footerRef: ElementRef;

  @ViewChild('handlerRef') handlerRef: ElementRef;

  private contentElement: any;
  private headerElement: any;
  private bodyElement: any;
  private footerElement: any;
  private handlerElement: any;

  constructor() {}

  ngAfterViewInit() {
    this.contentElement = this.contentRef.nativeElement as HTMLDivElement;
    this.headerElement = this.headerRef.nativeElement as HTMLDivElement;
    this.bodyElement = this.bodyRef.nativeElement as HTMLDivElement;
    this.footerElement = this.footerRef.nativeElement as HTMLDivElement;
    this.handlerElement = this.handlerRef.nativeElement as HTMLDivElement;

    const enableHandler = !!this.handlerElement.children.length;

    const draggableElement = new Draggable(
      this.contentElement,
      enableHandler ? this.handlerElement : this.headerElement
    );
  }

  onClose(event: any) {
    event.stopPropagation();
    this.contentElement.style.setProperty('display', 'none');
  }
}
