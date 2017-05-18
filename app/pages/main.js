import React, { Component }                            from 'react';
import        { Pie }                                  from 'react-chartjs-2';
import        { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      consts: {
        a: 0,
        b: 0,
        c: 0
      },
      data: {
        labels: ['a', 'b', 'c'],
        datasets: [{
          data: [0, 0, 0],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }]
      }
    };

    this.onChangeData = this.onChangeData.bind(this);
  }

  onChangeData(e) {
    let input = e.target.value.toLowerCase();
    let symbols = input.split('');
    let regExp = /(a{1}|b{1}|c{1})/g;

    this.state.data.datasets[0].data.length = 0;

    if (input !== '') {
      if (regExp.test(input)) {
        if (e.key === 'a' || e.key === 'b' || e.key === 'c') {
          for (var k in this.state.consts) {
            if (symbols[symbols.length - 1] === k) {
              this.state.consts[k] += 1;
              this.setState();
            }
          }
        } else if (e.key === 'Backspace') {
          for (var k in this.state.consts) {
            if (symbols[symbols.length - 1] === k) {
              this.state.consts[k] -= 1;
              this.setState();
            }
          }
        } else {
          return;
        }
      }
    } else {
      this.setState({
        consts: {
          a: 0,
          b: 0,
          c: 0
        }
      });
    }

    for (var k in this.state.consts) {
      this.state.data.datasets[0].data.push(this.state.consts[k]);
    }

    this.setState();
  }

  render() {
		return (
			<div className='input-data'>
        <h1>Графическая статистика в режиме реального времени</h1>
        <div className="input-block">
          <FormGroup>
            <ControlLabel>Введите предложение</ControlLabel>
            <FormControl
              type='text'
              onKeyUp={ this.onChangeData }
            />
          </FormGroup>
        </div>
        <div className="input-output">
          <p>a: <span>{ parseInt(this.state.consts.a) }</span></p>
          <p>b: <span>{ parseInt(this.state.consts.b) }</span></p>
          <p>c: <span>{ parseInt(this.state.consts.c) }</span></p>
        </div>
        <div className="chart-output">
          <Pie data={this.state.data} redraw />
        </div>
      </div>
		);
	}
}
