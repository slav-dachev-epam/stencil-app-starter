import { Component, Element, Event, EventEmitter, Listen, Prop, State, Method, PropDidChange } from '@stencil/core';

export type CssClassMap = { [className: string]: boolean };

const createClasses: Function = (classes: string): CssClassMap => {
  let classObj: CssClassMap = {};

  return classes.split(' ').reduce((classObj: CssClassMap, classString: string): CssClassMap => {
    classObj[classString] = true;

    return classObj;
  }, classObj);
};

@Component({
  tag: 'mcf-modal',
  styleUrl: 'mcf-modal.scss'
})
export class McfModal {
  @Element() private el: HTMLElement;

  /**
   * @output {ModalEvent} Emitted after the modal has loaded.
   */
  @Event() mcfModalDidLoad: EventEmitter;

  /**
   * @output {ModalEvent} Emitted after the modal has presented.
   */
  @Event() mcfModalDidPresent: EventEmitter;

  /**
   * @output {ModalEvent} Emitted after the modal has dismissed.
   */
  @Event() mcfModalDidDismiss: EventEmitter;

  /**
   * @output {ModalEvent} Emitted after the modal has unloaded.
   */
  @Event() mcfModalDidUnload: EventEmitter;

  @Prop() component: string;
  @Prop() componentProps: any = {};
  @Prop() enableBackdropDismiss: boolean = true;
  @Prop() enterAnimation: boolean = true;
  @Prop() exitAnimation: boolean = true;
  @Prop() modalId: string;
  @Prop() showBackdrop: boolean = true;
  @Prop() showCloseIcon: boolean = true;
  @Prop() cssClass: string;

  @PropDidChange('cssClass')
  cssClassDidChange(cssClass: string): void {
    if (cssClass) {
      this.classValue = cssClass;
    }
  }

  style: any = {};

  @State() isPresented: boolean = false;
  @State() classValue: string;

  // private animation: Animation;

  @Listen('mcfDismiss')
  protected onDismiss(ev: UIEvent): void {
    ev.stopPropagation();
    ev.preventDefault();

    this.dismiss();
  }

  @Method()
  present(): void {
    this.isPresented = true;
    return this.mcfModalDidPresent.emit({ modal: this });
  }

  @Method()
  dismiss(): void {
    this.mcfModalDidDismiss.emit({ modal: this });
    if (this.component) {
      Context.dom.write(() => {
        this.el.parentNode.removeChild(this.el);
      });
    } else {
      Context.dom.write(() => {
        this.el.style.display = 'none';
      });
    }
  }

  @Method()
  getElement(): HTMLElement {
    return this.el;
  }

  protected componentWillLoad(): void {
    this.classValue = this.cssClass;
  }

  protected componentDidLoad(): void {
    this.mcfModalDidLoad.emit({ modal: this });
  }

  protected componentDidUnload(): void {
    this.mcfModalDidUnload.emit({ modal: this });
  }

  protected backdropClick(): void {
    if (this.enableBackdropDismiss) {
      this.dismiss();
    }
  }

  protected closeClick(): void {
    this.dismiss();
  }

  protected render() {
    const ThisComponent: any = this.component;

    let userCssClasses: string = 'modal-content';
    if (this.classValue) {
      userCssClasses += ` ${this.classValue}`;
    }

    const dialogClasses: CssClassMap = createClasses('modal-wrapper');
    const thisComponentClasses: CssClassMap = createClasses(userCssClasses);

    dialogClasses['show-modal'] = this.isPresented;

    if (this.isPresented) {
      Context.dom.write(() => {
        this.el.style.display = 'block';
      });
    }

    return [
      <div
        onClick={() => this.backdropClick()}
        class={{
          'modal-backdrop': true,
          'hide-backdrop': !this.showBackdrop
        }}
      />,
      <div role="dialog" class={dialogClasses}>
        {this.showCloseIcon ? <div class="close small rounded thick" onClick={() => this.closeClick()} /> : null}
        {this.component ? <ThisComponent {...this.componentProps} class={thisComponentClasses} /> : null}
        <slot name="prerendered-content" />
      </div>
    ];
  }
}

export interface IModalOptions {
  component: string;
  componentProps?: any;
  showBackdrop?: boolean;
  enableBackdropDismiss?: boolean;
  enterAnimation?: boolean;
  exitAnimation?: boolean;
  cssClass?: string;
  modalId?: string;
  showCloseIcon?: boolean;
}

export interface IModalEvent extends Event {
  detail: {
    modal: McfModal;
  };
}
