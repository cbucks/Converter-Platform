import React, { Component} from 'react';
import axios from 'axios';
import Development from 'Development';

import PropTypes from 'prop-types'
import {
  Input,
  Label,
  Dropdown,
  Select,
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  GridColumn,
} from 'semantic-ui-react';

import Delimeter from '../utilities/Delimeter';


const fromOptions = [
  { key: 'cbucks', value: 'cbucks', text: 'CBUCKS'},
];
const toOptions = [
  { key: 'php', value: 'php', text: 'PHP' },
  { key: 'usd', value: 'usd', text: 'USD' },
  { key: 'btc', value: 'btc', text: 'BTC' },
  { key: 'eth', value: 'eth', text: 'ETH' },
]

class ConverterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: '',
      fromOption: 'cbucks',
      to: '',
      toOption: 'php',
      rate: 0,
      apiProvider: 'COINGECKO',
    }
    this.onChangeFrom = this.onChangeFrom.bind(this);
    this.onChangeTo = this.onChangeTo.bind(this);
    this.changeAPIProvider = this.changeAPIProvider.bind(this);
    this.getRate = this.getRate.bind(this);
    this.onChangeFromOption = this.onChangeFromOption.bind(this);
    this.onChangeToOption = this.onChangeToOption.bind(this);
  }

  componentDidMount() {
    Number.prototype.countDecimals = function () {
      if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
      return this.toString().split(".")[1].length || 0; 
    }
    this.getRate();
    setInterval(() => {
      this.getRate();
    }, Development.interval)
  }

  changeAPIProvider(provider) {
    this.setState({apiProvider: provider});
    this.getRate();
  }

  getRate() {
    axios.get(`${Development.baseUrl}/market/cbucks/price/${this.state.toOption}/${this.state.apiProvider}`) 
      .then((result) => {
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
    let conversion = value * this.state.rate;
    if (conversion.countDecimals() > 4) {
      conversion = conversion.toFixed(4);
    }
    this.setState({to: conversion});
  }

  onChangeTo(value) {
    this.setState({to: value});
    let conversion = value / this.state.rate;
    if (conversion.countDecimals() > 4) {
      conversion = conversion.toFixed(4);
    }
    this.setState({from: conversion});
  }

  render() {
    return (
      <Grid columns={3} stackable stretched centered>
        <Grid.Row stretched> 
        <Grid.Column only='mobile tablet widescreen computer' mobile={8} table={8} widescreen={10} computer={6}>
        <Segment>
        <Input
          onChange={(e) => {
            const parsed = parseFloat(e.target.value.replace(/,/g, ''));
            if (e.target.value === '') {
              this.setState({from: 0});
              this.setState({to: 0});
            }
            if(!isNaN(parsed)) {
              this.onChangeFrom(Number(parsed));
            }
          }}
          value = {Delimeter(this.state.from)}

          fluid stretched
          labelPosition = 'right'
          placeholder = 'Amount'
          size='massive'>
          <input />

          <Label value={this.state.fromOption}>
          CBUCKS
          </Label>
        </Input>
        </Segment>
        </Grid.Column>
      
        <b className="converter-equal"> = </b>
        
        <Grid.Column only='mobile tablet widescreen computer' mobile={8} table={8} widescreen={10} computer={6}>
        <Segment>
        <Input
          onChange={(e) => {
            const parsed = parseFloat(e.target.value.replace(/,/g, ''));
            if (e.target.value === '') {
              this.setState({from: 0});
              this.setState({to: 0});
            }
            if (!isNaN(parsed)) {
            this.onChangeTo(Number(parsed));
            }
          }}
          value={Delimeter(this.state.to)}

          label={<Dropdown defaultValue='USD' options={toOptions} />}
          labelPosition = 'right'
          fluid stretched
          placeholder = 'Amount'
          size='massive'>
          <input />

          <Select onChange={(e, e2) => {
          this.onChangeToOption(e2.value);
        }} options={toOptions} value={this.state.toOption} />

        </Input>
        </Segment>
        </Grid.Column>

        </Grid.Row>
      </Grid>

      /*
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
      */

    );
  }
}

export default ConverterComponent;