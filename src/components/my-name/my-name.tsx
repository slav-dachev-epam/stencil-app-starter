import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'my-name',
  styleUrl: 'my-name.scss'
})
export class MyName {
  @Prop() first: string;

  @Prop() last: string;

  render() {
    return (
      <div>
        Hello, my name is {this.first} {this.last}
        <br />
        <br />
        <my-embedded-component color="red" />
        <br />
        <br />
        <slot name="custom-html" />
        <br />
        <br />
        <slot name="angular-component" />
        <br />
        <br />
        <slot name="mcf-component" />
      </div>
    );
  }
}
