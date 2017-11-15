import { Component, Prop, Listen, Event, EventEmitter, PropDidChange } from '@stencil/core';
import { McfModal, IModalEvent, IModalOptions } from '../mcf-modal/mcf-modal';

const DEFAULT_COMPONENT_PROPS: any = {};

const isObject = (obj): boolean => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

@Component({
  tag: 'my-embedded-component'
})
export class MyEmbeddedComponent {
  private modalCtrl;
  private _componentProps: any = DEFAULT_COMPONENT_PROPS;

  @Prop() modalClass: string = 'my-modal my-blue-modal';
  @Prop() component: string = 'modal-user-data';
  @Prop() componentProps: any = {};

  @PropDidChange('componentProps')
  componentPropsDidChange(componentProps: any): void {
    this.setComponentProps(componentProps);
  }

  /**
   * @output {UIEvent} Emitted on modal dismiss.
   */
  @Event() mcfModalDismiss: EventEmitter;

  setComponentProps(componentProps: any): void {
    if (!componentProps || componentProps === '') {
      this._componentProps = DEFAULT_COMPONENT_PROPS;
    } else if (typeof componentProps === 'string') {
      try {
        this._componentProps = JSON.parse(componentProps);
      } catch (error) {
        console.log(error);
        this._componentProps = DEFAULT_COMPONENT_PROPS;
      }
    } else if (componentProps && isObject(componentProps)) {
      this._componentProps = componentProps;
    }
  }

  presentModal(event: UIEvent): void {
    event.preventDefault();

    const modalOpts: IModalOptions = {
      cssClass: this.modalClass,
      component: this.component,
      componentProps: this._componentProps
    };

    this.modalCtrl.create(modalOpts).then((modal: McfModal) => modal.present());
  }

  @Listen('body:mcfModalDidDismiss, body:mcfModalDidUnload')
  protected modalWillDismiss(ev: IModalEvent): void {
    const modal: McfModal = ev.detail.modal;
    if (modal.component === this.component) {
      console.log('DID DISMISS modal data');
    }
  }

  componentWillLoad(): void {
    this.setComponentProps(this.componentProps);
    this.modalCtrl = document.querySelector('mcf-modal-controller');
  }

  protected render() {
    return <button onClick={(event: UIEvent) => this.presentModal(event)}>Present modal, pass params</button>;
  }
}
