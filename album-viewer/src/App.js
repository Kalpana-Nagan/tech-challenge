import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Album from './component/albumComponent';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        users:[],
        selectedUser:''
    }
  }
  componentDidMount(){
      fetch('https://jsonplaceholder.typicode.com/users')
      .then(response=>response.json())
      .then(data=>{
          console.log(data);
          this.setState({users:data}); } );
  }

  selectUser(event){
    console.log(event.target.value);
    let userId= event.target.value;
    this.setState({selectedUser:userId});
  }

  render(){
  return (
    <div>
      <header className="header">
      Photo Viewer
      </header>
      <div className="container">
      <div className="form-group">
        <label htmlFor="user"></label>
        <select className="form-control" onChange={this.selectUser.bind(this)}>
            <option disabled selected>Please select User</option>
            {
                this.state.users.map((value,index)=>{
                    return <option key={index} value={value.id}>{value.name}</option>
                })
            }
        </select>
      </div>

      <Album user={this.state.selectedUser} />
    </div>
  </div>)
  }
}
