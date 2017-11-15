import { Component, Listen, Method } from '@stencil/core';
import { McfModal, IModalEvent, IModalOptions } from '../mcf-modal/mcf-modal';

@Component({
  tag: 'mcf-modal-controller'
})
export class McfModalController {
  private ids = 0;
  private modalResolves: { [modalId: string]: Function } = {};
  private modals: McfModal[] = [];

  @Method()
  create(modalSelector?: string, opts?: IModalOptions, appRootSelector: string = 'body'): Promise<McfModal> {
    let modal;

    if (modalSelector) {
      modal = document.querySelector(modalSelector);
    } else {
      modal = document.createElement('mcf-modal');
    }

    const id: number = this.ids++;
    const modalId: string = `modal-${id}`;

    // give this modal a unique id
    modal.setAttribute('modalId', modalId);
    modal.style.zIndex = (10000 + id).toString();
    opts.modalId = modalId;
    // convert the passed in modal options into props
    // that get passed down into the new modal
    Object.assign(modal, opts);

    // append the modal element to the document body
    const appRoot: Element = document.querySelector(appRootSelector) || document.body;
    appRoot.appendChild(modal as any);

    if (modalSelector) {
      return Promise.resolve(modal);
    }

    // store the resolve function to be called later up when the modal loads
    return new Promise<McfModal>(resolve => {
      this.modalResolves[modalId] = resolve;
    });
  }

  @Listen('body:mcfModalDidLoad')
  protected modalDidLoad(ev: IModalEvent): void {
    const modal: McfModal = ev.detail.modal;
    const modalResolve: Function = this.modalResolves[modal.modalId];

    if (modalResolve) {
      modalResolve(modal);
      delete this.modalResolves[modal.modalId];
    }
  }

  @Listen('body:mcfModalDidPresent')
  protected modalWillPresent(ev: IModalEvent): void {
    this.modals.push(ev.detail.modal);
  }

  @Listen('body:mcfModalDidDismiss, body:mcfModalDidUnload')
  protected modalWillDismiss(ev: IModalEvent): void {
    const index: number = this.modals.indexOf(ev.detail.modal);
    if (index > -1) {
      this.modals.splice(index, 1);
    }
  }

  @Listen('body:keyup.escape')
  protected escapeKeyUp(): void {
    const lastModal: McfModal = this.modals[this.modals.length - 1];
    if (lastModal) {
      lastModal.dismiss();
    }
  }
}
