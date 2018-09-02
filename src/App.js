import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Addesses app',
      addresses: []
    }
  }

  // MAKE AJAX CALLS HERE
  componentDidMount() {
    console.log('COMPONENT HAS MOUNTED!!!');
    let _this = this;
    fetch('http://localhost:4001/api/addresses')
    .then(function(res) {
      res.json()
      .then(function(data) {
        console.log(data);
        // let addresses = _this.state.addresses;
        // addresses.concat(data);
        _this.setState({ addresses: data })
      })
    })
  }

  addAddress(event) {
    let _this = this;
    event.preventDefault();
    // console.log('in addAddress method');
    let address_data = {
      add_name: this.refs.add_name.value,
      id: Math.random().toFixed(3)
    }

    // TODO: use fetch() api
    let request = new Request('http://localhost:4001/api/new-address', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(address_data)
    });

    // xmlhttprequest
    console.log(this.state.addresses)
    fetch(request)
      .then(function(res) {
        res.json()
          .then(function(data) {
            console.log(address_data)
            let addresses = _this.state.addresses;
            // console.log(address_data)
            addresses.push(address_data);
            _this.setState({
              addresses: addresses
            })
          })
          .catch(function(err) {
            console.log(err)
          })
      })
  }

  removeAddress(id) {
    let addresses = this.state.addresses;
    let address = addresses.find(function(address){
      return address.id === id
    });
    // let request = new Request('http://localhost:4001/api/addresses', {
    //   method: 'DELETE',

    // })

    let request = new Request('http://localhost:4001/api/remove/' + id, {
      method: 'DELETE',
      // headers: new Headers({ 'Content-Type': 'application/json' }),
      // body: JSON.stringify(address_data)
    });

    fetch(request)
      .then(function(res){
        res.json()
          .then(function(data){
            // console.log('SUCCESSFULLY DELETED')
            console.log(data)
          })
      })
  }

  render() {
    let title = this.state.title;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{title}</h1>
        </header>
        <form>
          <input type="text" ref="add_name" placeholder="Address" />
          <button onClick={this.addAddress.bind(this)}>Add address</button>
        </form>
        {/* <pre>{JSON.stringify(this.state.addresses)}</pre> */}
        <ul>
          {this.state.addresses.map(address => <li key={Math.random().toFixed(3)}>
            {address.add_name} 
            {/* <button onClick={this.removeAddress.bind(this, address.id)}>Delete!</button> */}
          </li>)}
        </ul>
      </div>
    );
  }
}

export default App;
