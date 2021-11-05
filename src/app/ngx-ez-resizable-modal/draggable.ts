export function draggable(element: HTMLElement, target?: HTMLElement) {
  var wrapper = document.body;
  var shiftX, shiftY;

  this.wrapperElement.style.setProperty('height', '100vh');
  this.wrapperElement.style.setProperty('width', '100vw');

  element.addEventListener('mousedown', function (event: any) {
    shiftX = event.clientX - element.getBoundingClientRect().left;
    shiftY = event.clientY - element.getBoundingClientRect().top;

    document.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      element.onmouseup = null;
    };

    document.addEventListener('mousemove', onMouseMove);
  });

  element.ondragstart = function () {
    return false;
  };

  function onMouseMove(event2: any) {
    moveAt(event2.pageX, event2.pageY);
  }

  function moveAt(pageX: number, pageY) {
    var wrapperRect = this.wrapperElement.getBoundingClientRect();

    let left = pageX - shiftX;
    if (left <= wrapperRect.left) {
      left = wrapperRect.left;
    } else if (
      left >=
      wrapperRect.left + this.wrapperElement.clientWidth - element.clientWidth
    ) {
      left =
        wrapperRect.left +
        this.wrapperElement.clientWidth -
        element.clientWidth;
    }

    let top = pageY - shiftY;
    if (top <= wrapperRect.top) {
      top = wrapperRect.top;
    } else if (
      top >=
      wrapperRect.top + this.wrapperElement.clientHeight - element.clientHeight
    ) {
      top =
        wrapperRect.left +
        this.wrapperElement.clientHeight -
        element.clientHeight;
    }

    element.style.left = left + 'px';
    element.style.top = top + 'px';
  }
}

export class Draggable {
  private wrapperElement: HTMLElement;
  private shiftX: number;
  private shiftY: number;

  private moveAtRef: any;
  private stopRef: any;

  constructor(private element: HTMLElement, private target?: HTMLElement) {
    this.wrapperElement = document.body;
    this.wrapperElement.style.setProperty('height', '100vh');
    this.wrapperElement.style.setProperty('width', '100vw');

    this.startDrag();
  }

  private startDrag() {
    this.stopRef = this.stop.bind(this);
    this.moveAtRef = this.moveAt.bind(this);
    this.wrapperElement.addEventListener('mousedown', (event: MouseEvent) => {
      this.shiftX = event.clientX - this.element.getBoundingClientRect().left;
      this.shiftY = event.clientY - this.element.getBoundingClientRect().top;

      document.addEventListener('mouseup', this.stopRef);
      document.addEventListener('mousemove', this.moveAtRef);
    });
    // prevent default
    this.element.ondragstart = function () {
      return false;
    };
  }

  private moveAt(event: MouseEvent) {
    const position = this.newPosition(event.pageX, event.pageY) as {
      left: number;
      top: number;
    };
    this.element.style.left = position.left + 'px';
    this.element.style.top = position.top + 'px';
  }

  private newPosition(pageX: number, pageY: number) {
    var wrapperRect = this.wrapperElement.getBoundingClientRect();

    let left = pageX - this.shiftX;
    if (left <= wrapperRect.left) {
      left = wrapperRect.left;
    } else if (
      left >=
      wrapperRect.left +
        this.wrapperElement.clientWidth -
        this.element.clientWidth
    ) {
      left =
        wrapperRect.left +
        this.wrapperElement.clientWidth -
        this.element.clientWidth;
    }

    let top = pageY - this.shiftY;
    if (top <= wrapperRect.top) {
      top = wrapperRect.top;
    } else if (
      top >=
      wrapperRect.top +
        this.wrapperElement.clientHeight -
        this.element.clientHeight
    ) {
      top =
        wrapperRect.left +
        this.wrapperElement.clientHeight -
        this.element.clientHeight;
    }

    return {
      left: left,
      top: top,
    };
  }

  private stop() {
    document.removeEventListener('mouseup', this.stopRef);
    document.removeEventListener('mousemove', this.moveAtRef);
  }
}
