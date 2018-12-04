import React, { Component } from 'react';
import ThinButton from '../../elements/thin_button';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  padding: 10px;
  width: 250px;
  z-index: 999;
  color: #444;
  background: #fff;
  text-align: left;
  box-shadow: -1px 1px 5px -1px ${props => props.theme.primary};
  border-right: 5px solid ${props => props.theme.primary};
`;

class PopupConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: props.visible };
    this.defaultOnCancel.bind(this);
  }

  defaultOnCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { onConfirm, children, visible } = this.props;
    const onCancel = this.props.onCancel
      ? this.props.onCancel
      : this.defaultOnCancel;

    return (
      <Wrapper style={{ display: this.state.visible ? 'block' : 'none' }}>
        <div>{children}</div>
        <hr />
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <ThinButton
            style={{
              borderColor: '#28a745',
              background: '#fff',
              color: '#28a745'
            }}
            onClick={() => onConfirm(this)}>
            Yes
          </ThinButton>
          <ThinButton onClick={() => onCancel(this)}>No</ThinButton>
        </div>
      </Wrapper>
    );
  }
}
export default PopupConfirm;
