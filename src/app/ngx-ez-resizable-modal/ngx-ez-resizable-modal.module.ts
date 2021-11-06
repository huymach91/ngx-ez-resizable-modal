import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEzResizableModalComponent } from './ngx-ez-resizable-modal.component';
import { ResizableDirective } from './resizable';

@NgModule({
  imports: [CommonModule],
  declarations: [NgxEzResizableModalComponent, ResizableDirective],
  exports: [NgxEzResizableModalComponent, ResizableDirective],
})
export class NgxEzResizableModalModule {}
