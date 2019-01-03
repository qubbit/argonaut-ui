import React, { Component } from 'react';
import ThinButton from '../../elements/thin_button';
import styled from 'styled-components';

// TODO: Fix state/prop descrepancy and the onCancel handler

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
    this.popupWrapper = React.createRef();
    this.state = { visible: props.visible };
  }

  defaultOnCancel = () => {
    this.setState({ visible: false });
  };

  componentDidMount() {
    const elem = this.popupWrapper.current;
    const { right, bottom } = elem.getBoundingClientRect();
    const deltaW = window.innerWidth - right;
    const deltaH = window.innerHeight - bottom;

    if (deltaW < 0) {
      elem.style.right = 0;
    }

    if (deltaH < 0) {
      elem.style.bottom = 0;
    }
  }

  render() {
    const { onConfirm, children, visible } = this.props;
    const onCancel = this.props.onCancel
      ? this.props.onCancel
      : this.defaultOnCancel;

    return (
      <Wrapper
        ref={this.popupWrapper}
        style={{ visibility: visible ? 'visible' : 'hidden' }}>
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
