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
  private handlerElement: any;

  constructor() {}

  ngAfterViewInit() {
    if (this.modalConfig.draggable) {
      this.contentElement = this.contentRef.nativeElement as HTMLDivElement;
      this.headerElement = this.headerRef.nativeElement as HTMLDivElement;
      this.handlerElement = this.handlerRef.nativeElement as HTMLDivElement;

      const enableHandler = !!this.handlerElement.children.length;

      new Draggable(
        this.contentElement,
        enableHandler ? this.handlerElement : this.headerElement
      );
    }
  }

  onClose(event: any) {
    event.stopPropagation();
    this.contentElement.style.setProperty('display', 'none');
  }
}
