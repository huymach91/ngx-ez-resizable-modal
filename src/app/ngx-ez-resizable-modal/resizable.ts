import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[resizable]',
})
export class ResizableDirective implements AfterViewInit {
  private isMouseDown: boolean;

  private resizers: { [T: string]: HTMLDivElement } = {};

  private currentWidth: number;
  private currentHeight: number;
  private currentElement: HTMLDivElement;
  private currentElementX: number;
  private currentElementY: number;
  private currentPageX: number;
  private currentPageY: number;
  private currentResizer: HTMLDivElement;
  private mininumWidth: number;
  private mininumHeight: number;

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    const element = this.element.nativeElement as HTMLDivElement;

    const width = element.offsetWidth;
    const height = element.offsetHeight;

    this.mininumWidth = width;
    this.mininumHeight = height;

    this.currentWidth = width;
    this.currentHeight = height;
    this.currentElement = element;
    this.currentElement.style.setProperty('position', 'fixed');

    const thick = '4px';

    this.resizers.east = document.createElement('div');
    this.resizers.east.classList.add('east');
    this.resizers.east.style.setProperty('left', '0px');
    this.resizers.east.style.setProperty('top', '0px');
    this.resizers.east.style.setProperty('cursor', 'col-resize');
    this.resizers.east.style.setProperty('width', thick);
    this.resizers.east.style.setProperty('height', '100%');

    this.resizers.west = document.createElement('div');
    this.resizers.west.classList.add('west');
    this.resizers.west.style.setProperty('right', '0px');
    this.resizers.west.style.setProperty('top', '0px');
    this.resizers.west.style.setProperty('cursor', 'col-resize');
    this.resizers.west.style.setProperty('width', thick);
    this.resizers.west.style.setProperty('height', '100%');

    this.resizers.south = document.createElement('div');
    this.resizers.south.classList.add('south');
    this.resizers.south.style.setProperty('bottom', '0px');
    this.resizers.south.style.setProperty('left', '0px');
    this.resizers.south.style.setProperty('cursor', 'row-resize');
    this.resizers.south.style.setProperty('width', '100%');
    this.resizers.south.style.setProperty('height', thick);

    this.resizers.north = document.createElement('div');
    this.resizers.north.classList.add('north');
    this.resizers.north.style.setProperty('top', '0px');
    this.resizers.north.style.setProperty('left', '0px');
    this.resizers.north.style.setProperty('cursor', 'row-resize');
    this.resizers.north.style.setProperty('width', '100%');
    this.resizers.north.style.setProperty('height', thick);

    this.resizers.northEast = document.createElement('div');
    this.resizers.northEast.classList.add('north-east');
    this.resizers.northEast.style.setProperty('top', '-3px');
    this.resizers.northEast.style.setProperty('right', '-3px');
    this.resizers.northEast.style.setProperty('cursor', 'ne-resize');
    this.resizers.northEast.style.setProperty('width', '10px');
    this.resizers.northEast.style.setProperty('border-radius', '10px');
    this.resizers.northEast.style.setProperty('-webkit-border-radius', '10px');
    this.resizers.northEast.style.setProperty('-moz-border-radius', '10px');
    this.resizers.northEast.style.setProperty('-ms-border-radius', '10px');
    this.resizers.northEast.style.setProperty('background', 'red');
    this.resizers.northEast.style.setProperty('height', '10px');

    this.resizers.northWest = document.createElement('div');
    this.resizers.northWest.classList.add('north-west');
    this.resizers.northWest.style.setProperty('top', '-3px');
    this.resizers.northWest.style.setProperty('left', '-3px');
    this.resizers.northWest.style.setProperty('cursor', 'nw-resize');
    this.resizers.northWest.style.setProperty('width', '10px');
    this.resizers.northWest.style.setProperty('border-radius', '10px');
    this.resizers.northWest.style.setProperty('-webkit-border-radius', '10px');
    this.resizers.northWest.style.setProperty('-moz-border-radius', '10px');
    this.resizers.northWest.style.setProperty('-ms-border-radius', '10px');
    this.resizers.northWest.style.setProperty('background', 'red');
    this.resizers.northWest.style.setProperty('height', '10px');

    this.resizers.southEast = document.createElement('div');
    this.resizers.southEast.classList.add('south-east');
    this.resizers.southEast.style.setProperty('bottom', '-3px');
    this.resizers.southEast.style.setProperty('right', '-3px');
    this.resizers.southEast.style.setProperty('cursor', 'se-resize');
    this.resizers.southEast.style.setProperty('width', '10px');
    this.resizers.southEast.style.setProperty('border-radius', '10px');
    this.resizers.southEast.style.setProperty('-webkit-border-radius', '10px');
    this.resizers.southEast.style.setProperty('-moz-border-radius', '10px');
    this.resizers.southEast.style.setProperty('-ms-border-radius', '10px');
    this.resizers.southEast.style.setProperty('height', '10px');

    this.resizers.southWest = document.createElement('div');
    this.resizers.southWest.classList.add('south-west');
    this.resizers.southWest.style.setProperty('bottom', '-3px');
    this.resizers.southWest.style.setProperty('left', '-3px');
    this.resizers.southWest.style.setProperty('cursor', 'sw-resize');
    this.resizers.southWest.style.setProperty('width', '10px');
    this.resizers.southWest.style.setProperty('border-radius', '10px');
    this.resizers.southWest.style.setProperty('-webkit-border-radius', '10px');
    this.resizers.southWest.style.setProperty('-moz-border-radius', '10px');
    this.resizers.southWest.style.setProperty('-ms-border-radius', '10px');
    this.resizers.southWest.style.setProperty('height', '10px');

    for (const i in this.resizers) {
      this.setStyle(this.resizers[i]);
      element.appendChild(this.resizers[i]);
    }

    this.initDrag();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isMouseDown) return;
    const edge = this.currentResizer.className;
    const bounding = this.currentElement.getBoundingClientRect();
    let newWidth, newHeight, newLeft, newTop;
    switch (edge) {
      case 'east':
        newWidth = this.currentWidth - (event.pageX - this.currentPageX);
        newLeft = this.currentElementX + (event.pageX - this.currentPageX);
        this.currentElement.style.setProperty('width', newWidth + 'px');
        this.currentElement.style.setProperty('left', newLeft + 'px');
        break;
      case 'west':
        newWidth = event.pageX - bounding.left;
        this.currentElement.style.setProperty('width', newWidth + 'px');
        break;
      case 'south':
        newHeight = event.pageY - bounding.top;
        this.currentElement.style.setProperty('height', newHeight + 'px');
        break;
      case 'south-west':
        newWidth = this.currentWidth - (event.pageX - this.currentPageX);
        newHeight = this.currentHeight + (event.pageY - this.currentPageY);
        newLeft = this.currentElementX + (event.pageX - this.currentPageX);
        this.currentElement.style.setProperty('width', newWidth + 'px');
        this.currentElement.style.setProperty('height', newHeight + 'px');
        this.currentElement.style.setProperty('left', newLeft + 'px');
        break;
      case 'south-east':
        newWidth = this.currentWidth + (event.pageX - this.currentPageX);
        newHeight = this.currentHeight + (event.pageY - this.currentPageY);
        this.currentElement.style.setProperty('width', newWidth + 'px');
        this.currentElement.style.setProperty('height', newHeight + 'px');
        break;
      case 'north':
        newHeight = this.currentHeight - (event.pageY - this.currentPageY);
        newTop = this.currentElementY + (event.pageY - this.currentPageY);
        this.currentElement.style.setProperty('height', newHeight + 'px');
        this.currentElement.style.setProperty('top', newTop + 'px');
        break;
      case 'north-west':
        newWidth = this.currentWidth - (event.pageX - this.currentPageX);
        newHeight = this.currentHeight - (event.pageY - this.currentPageY);
        newTop = this.currentElementY + (event.pageY - this.currentPageY);
        newLeft = this.currentElementX + (event.pageX - this.currentPageX);
        this.currentElement.style.setProperty('width', newWidth + 'px');
        this.currentElement.style.setProperty('height', newHeight + 'px');
        this.currentElement.style.setProperty('top', newTop + 'px');
        this.currentElement.style.setProperty('left', newLeft + 'px');
        break;
      case 'north-east':
        newWidth = this.currentWidth + (event.pageX - this.currentPageX);
        newHeight = this.currentHeight - (event.pageY - this.currentPageY);
        newTop = this.currentElementY + (event.pageY - this.currentPageY);
        this.currentElement.style.setProperty('width', newWidth + 'px');
        this.currentElement.style.setProperty('height', newHeight + 'px');
        this.currentElement.style.setProperty('top', newTop + 'px');
        break;
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.isMouseDown = false;
  }

  private initDrag() {
    for (const i in this.resizers) {
      const resizer = this.resizers[i] as HTMLDivElement;
      resizer.addEventListener('mousedown', (event: MouseEvent) => {
        this.isMouseDown = true;
        this.currentResizer = resizer;
        this.currentWidth = this.currentElement.offsetWidth;
        this.currentHeight = this.currentElement.offsetHeight;
        this.currentElementX = resizer.getBoundingClientRect().left;
        this.currentElementY = resizer.getBoundingClientRect().top;
        this.currentPageX = event.pageX;
        this.currentPageY = event.pageY;
      });
    }
  }

  private setStyle(resizer: HTMLDivElement) {
    resizer.style.setProperty('position', 'absolute');
    resizer.style.setProperty('background-color', '#3794ff');
  }
}
