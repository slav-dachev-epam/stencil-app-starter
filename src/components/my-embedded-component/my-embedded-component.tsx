import { Component, Prop, Listen } from '@stencil/core';
import { McfModal, IModalEvent, IModalOptions } from '../mcf-modal/mcf-modal';
import { ModalUserData } from '../modal-user-data/modal-user-data';
// import { McfModalController } from '../mcf-modal-controller/mcf-modal-controller';

@Component({
  tag: 'my-embedded-component'
})
export class MyEmbeddedComponent {
  private modalCtrl;

  @Prop() color: string = 'blue';

  presentModal(event: UIEvent): void {
    event.preventDefault();

    const modalOpts: IModalOptions = {
      cssClass: `my-modal my-${this.color}-modal`,
      component: 'modal-user-data',
      componentProps: {
        userId: 8675309
      }
    };

    this.modalCtrl.create(modalOpts).then((modal: McfModal) => modal.present());
  }

  @Listen('body:mcfModalDidDismiss, body:mcfModalDidUnload')
  protected modalWillDismiss(ev: IModalEvent): void {
    const modal: McfModal = ev.detail.modal;
    if (modal instanceof ModalUserData) {
      console.log('DID DISMISS modal data');
    }
  }

  componentWillLoad(): void {
    this.modalCtrl = document.querySelector('mcf-modal-controller');
  }

  protected render() {
    return (
      <div>
        My favorite color is {this.color}
        <br />
        <br />
        <button onClick={(event: UIEvent) => this.presentModal(event)}>Present modal, pass params</button>
      </div>
    );
  }
}
