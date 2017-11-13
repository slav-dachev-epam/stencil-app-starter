import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'my-embedded-component'
})
export class MyEmbeddedComponent {
  @Prop() color: string = 'blue';

  render() {
    return <div>My favorite color is {this.color}</div>;
  }
}
