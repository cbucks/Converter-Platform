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
    this.onChangeFromOption = this.onChangeFromOption.bind(this);
    this.onChangeToOption = this.onChangeToOption.bind(this);
  }

  componentDidMount() {
    this.getRate();
    setInterval(() => {
      this.getRate();
    }, Development.interval)
  }

  getRate() {
    console.log('to option:', this.state.toOption);
    axios.get(`${Development.baseUrl}/market/price/${this.state.toOption}`)
      .then((result) => {
        console.log(result);
        this.setState({rate: result.data.result.price});
        this.onChangeFrom(this.state.from);
        this.onChangeTo(this.state.to);
      })
      .catch((err) => console.log(err))
  }

  onChangeFromOption(value) {
    this.setState({fromOption: value});
    this.getRate();
  }

  onChangeToOption(value) {
    // return new Promise((resolve, reject) => {
    //   this.setState({toOption: value});
    // })
    // .then(() => this.getRate());
    this.setState({toOption: value});
    setTimeout(() => {
      this.getRate();
    }, 500)
  }

  onChangeFrom(value) {
    this.setState({from: value});
    const conversion = value * this.state.rate;
    this.setState({to: conversion});
  }

  onChangeTo(value) {
    this.setState({to: value});
    const conversion = value / this.state.rate;
    this.setState({from: conversion});
  }

  render() {
    return (
      <span className="converter-component">
        <Input onChange={(e) => {
          this.onChangeFrom(Number(e.target.value));
        }} size="massive" value={this.state.from} />
        <Select onChange={(e, e2) => {
          this.onChangeFromOption(e2.value);
        }} className="converter-select" size="massive" options={fromOptions} value={this.state.fromOption} />
        <b className="converter-equal"> = </b>
        <Input onChange={(e) => {
          this.onChangeTo(Number(e.target.value));
        }} size="massive" value={this.state.to} />
        <Select onChange={(e, e2) => {
          console.log(e2);
          this.onChangeToOption(e2.value);
        }} options={toOptions} value={this.state.toOption} />
      </span>
    );
  }
}

export default ConverterComponent;