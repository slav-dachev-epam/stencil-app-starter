import { Component, Prop, Listen, Event, EventEmitter, PropWillChange } from '@stencil/core';
import { McfModal, IModalEvent, IModalOptions } from '../mcf-modal/mcf-modal';

const DEFAULT_COMPONENT_PROPS: any = {};

const isObject = (obj): boolean => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

@Component({
  tag: 'my-embedded-component'
})
export class MyEmbeddedComponent {
  private _modal: McfModal;
  private modalCtrl;
  private _componentProps: any = DEFAULT_COMPONENT_PROPS;

  @Prop() modalClass?: string = 'my-modal my-blue-modal';

  @PropWillChange('modalClass')
  modalClassDidChange(modalClass: string): void {
    if (this._modal && modalClass) {
      this._modal.cssClass = modalClass;
    }
  }

  @Prop() modalId?: string;
  @Prop() componentName?: string;
  @Prop() componentProps: any = {};

  @PropWillChange('componentProps')
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
      component: this.componentName,
      componentProps: this._componentProps
    };

    const modalSelector: string | undefined = this.modalId ? `[id='${this.modalId}']` : undefined;

    this.modalCtrl.create(modalSelector, modalOpts).then((modal: McfModal) => {
      modal.present();
      this._modal = modal;
    });
  }

  @Listen('body:mcfModalDidDismiss, body:mcfModalDidUnload')
  protected modalWillDismiss(ev: IModalEvent): void {
    const modal: McfModal = ev.detail.modal;
    if (
      (this.modalId && this.modalId === modal.getElement().getAttribute('id')) ||
      (this.componentName && this.componentName === modal.component)
    ) {
      this._modal = null;
      console.log(`DID DISMISS modal: ${this.modalId ? `#${this.modalId}` : this.componentName}`);
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
