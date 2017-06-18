// @flow
import React, { Component } from 'react';

type Props = {
  name: string,
  rows: Number,
  cols: Number,
  meta: Object,
  stle: Object,
  placeholder?: string,
  className?: string,
}

class Textarea extends Component {

  constructor(props){
    super(props);

    this.state = {
      value: props.value
    };
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    const props = this.props;
    const meta = props.meta;
    return <div style={{ ...props.style }}>
      <textarea
        name={props.name}
        rows={props.rows}
        cols={props.cols}
        placeholder={props.placeholder}
        className={props.className || 'form-control'}
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
      />
      {meta.touched && meta.error &&
        <div style={{ fontSize: '85%', color: '#cc5454' }}>{meta.error}</div>
      }
    </div>;
  }
}

export default Textarea;
