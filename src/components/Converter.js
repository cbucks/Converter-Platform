import React from 'react';
import { Input, Select } from 'semantic-ui-react';
import axios from 'axios';
import Development from 'Development';

const fromOptions = [
  { key: 'cbucks', value: 'cbucks', text: 'CBUCKS'},
];
const toOptions = [
  { key: 'usd', value: 'usd', text: 'USD' },
  { key: 'btc', value: 'btc', text: 'BTC' },
  { key: 'eth', value: 'eth', text: 'ETH' },
  { key: 'php', value: 'php', text: 'PHP' },
]

class ConverterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: '',
      fromOption: 'cbucks',
      to: '',
      toOption: 'usd',
      rate: 0,
    }
    this.onChangeFrom = this.onChangeFrom.bind(this);
    this.onChangeTo = this.onChangeTo.bind(this);
    this.getRate = this.getRate.bind(this);
  }

  componentDidMount() {
    this.getRate();
    setInterval(() => {
      this.getRate();
    }, Development.interval)
  }

  getRate() {
    axios.get(`${Development.baseUrl}/market/price/${this.state.toOption}`)
      .then((result) => {
        this.setState({rate: result.data.result.price});
        this.onChangeFrom(this.state.from);
        this.onChangeTo(this.state.to);
      })
      .catch((err) => console.log(err))
  }

  onChangeFrom(value) {
    this.setState({from: value});
    const conversion = value * this.state.rate;
    this.setState({to: conversion});
    // axios.get(`${Development.baseUrl}/market/price/${this.state.toOption}`)
    //   .then((result) => {
    //     const conversion = value * result.data.result.price;
    //     this.setState({to: conversion});
    //   })
    //   .catch((err) => console.log(err))
  }

  onChangeTo(value) {
    this.setState({to: value});
    const conversion = value / this.state.rate;
    this.setState({from: conversion});
    // axios.get(`${Development.baseUrl}/market/price/${this.state.toOption}`)
    //   .then((result) => {
    //     console.log('Result:', result.data.result.price);
    //     const conversion = value / result.data.result.price;
    //     console.log('VALUE:', conversion);
    //     this.setState({from: conversion});
    //   })
    //   .catch((err) => console.log(err))
  }

  render() {
    return (
      <span className="converter-component">
        <Input onChange={(e) => {
          this.onChangeFrom(Number(e.target.value));
        }} size="massive" value={this.state.from} />
        <Select className="converter-select" size="massive" options={fromOptions} value={this.state.fromOption} />
        <b className="converter-equal"> = </b>
        <Input onChange={(e) => {
          this.onChangeTo(Number(e.target.value));
        }} size="massive" value={this.state.to} />
        <Select options={toOptions} value={this.state.toOption} />
      </span>
    );
  }
}

export default ConverterComponent;