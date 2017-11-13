/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */

import '@stencil/router';

import { MyEmbeddedComponent as MyEmbeddedComponent } from './components/my-embedded-component/my-embedded-component';

interface HTMLMyEmbeddedComponentElement extends MyEmbeddedComponent, HTMLElement {
}
declare var HTMLMyEmbeddedComponentElement: {
  prototype: HTMLMyEmbeddedComponentElement;
  new (): HTMLMyEmbeddedComponentElement;
};
declare global {
  interface HTMLElementTagNameMap {
      "my-embedded-component": HTMLMyEmbeddedComponentElement;
  }
  interface ElementTagNameMap {
      "my-embedded-component": HTMLMyEmbeddedComponentElement;
  }
  namespace JSX {
      interface IntrinsicElements {
          "my-embedded-component": JSXElements.MyEmbeddedComponentAttributes;
      }
  }
  namespace JSXElements {
      export interface MyEmbeddedComponentAttributes extends HTMLAttributes {
          mode?: string,
          color?: string,
        
      }
  }
}

import { MyName as MyName } from './components/my-name/my-name';

interface HTMLMyNameElement extends MyName, HTMLElement {
}
declare var HTMLMyNameElement: {
  prototype: HTMLMyNameElement;
  new (): HTMLMyNameElement;
};
declare global {
  interface HTMLElementTagNameMap {
      "my-name": HTMLMyNameElement;
  }
  interface ElementTagNameMap {
      "my-name": HTMLMyNameElement;
  }
  namespace JSX {
      interface IntrinsicElements {
          "my-name": JSXElements.MyNameAttributes;
      }
  }
  namespace JSXElements {
      export interface MyNameAttributes extends HTMLAttributes {
          mode?: string,
          color?: string,
        
          first?: string,
          last?: string
      }
  }
}

