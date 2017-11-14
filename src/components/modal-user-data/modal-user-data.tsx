import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'modal-user-data'
})
export class ModalUserData {
  @Prop() userId?: number;

  protected render() {
    return <div>Viewing data for user {this.userId}</div>;
  }
}
