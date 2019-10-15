import React from 'react';
import './App.css';

export default class App extends React.Component {

  constructor () {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      phone:'',
      allData:[],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }


// function for dynamic sorting
  compareValues=(key, order='asc') =>{
    return function(a, b) {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = (typeof a[key] === 'string') ?
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  submitForm=()=>{
    const data={
      firstName:this.state.firstName,
      lastName:this.state.lastName,
      phone:this.state.phone
    }
    let temp = this.state.allData;
    temp.push(data);
    temp.sort(this.compareValues('lastName'))
    this.setState({allData:temp});
  }

  render () {
    const singleEntry = this.state.allData.map((item, key) =>
      <tr><td>{item.firstName}</td><td>{item.lastName}</td><td>{item.phone}</td></tr>
    );
    return (
      <div>
      <form onSubmit={this.submitForm}>
        <label>First Name</label>
        <input type="text" name="firstName" onChange={this.handleChange} />
        <label>Last Name</label>
        <input type="text" name="lastName" onChange={this.handleChange} />
        <label>Phone</label>
        <input type="text" name="phone" onChange={this.handleChange} />
        <button type="button" onClick={this.submitForm}>Button</button>
      </form>
      <table>
        <tr><td>First Name</td><td>Last Name</td><td>Phone</td></tr>
        {singleEntry}
      </table>
      </div>
    );
  }
}
