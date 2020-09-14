import React, { Component } from "react";

export default class FreqInput extends Component {
  constructor(props) {
    super(props);
    this.state = { frequency: this.props.frequency };
  }

  static getDerivedStateFromProps(nextProps) {
    return { frequency: nextProps.frequency };
  }

  handleChange = event => {
    let frequency = event.target.value;
    frequency = Math.min(20000, Math.max(0, frequency));
    if (frequency === 0) {
      frequency = "";
    }
    this.setState({ frequency });
    this.props.onChange(frequency === "" ? 0 : frequency);
  };

  render() {
    return (
      <input
        type="number"
        placeholder="Frecuencia"
        value={this.state.frequency}
        onChange={this.handleChange}
      />
    );
  }
}
