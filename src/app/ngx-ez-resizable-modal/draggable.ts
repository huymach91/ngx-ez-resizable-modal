export function draggable(element: HTMLElement) {
  var wrapper = document.body;
  var shiftX, shiftY;

  wrapper.style.setProperty('height', '100vh');
  wrapper.style.setProperty('width', '100vw');

  element.addEventListener('mousedown', function (event) {
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

  function onMouseMove(event2) {
    moveAt(event2.pageX, event2.pageY);
  }

  function moveAt(pageX, pageY) {
    var wrapperRect = wrapper.getBoundingClientRect();

    let left = pageX - shiftX;
    if (left <= wrapperRect.left) {
      left = wrapperRect.left;
    } else if (
      left >=
      wrapperRect.left + wrapper.clientWidth - element.clientWidth
    ) {
      left = wrapperRect.left + wrapper.clientWidth - element.clientWidth;
    }

    let top = pageY - shiftY;
    if (top <= wrapperRect.top) {
      top = wrapperRect.top;
    } else if (
      top >=
      wrapperRect.top + wrapper.clientHeight - element.clientHeight
    ) {
      top = wrapperRect.left + wrapper.clientHeight - element.clientHeight;
    }

    element.style.left = left + 'px';
    element.style.top = top + 'px';
  }
}
