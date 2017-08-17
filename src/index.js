import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: []
    };
  }

  componentWillMount() {
    console.log('Component is mounting...');
  }

  componentDidMount() {
    axios.get(`https://fcctop100.herokuapp.com/api/fccusers/top/recent`).then(res => {
      this.setState({userData: res.data});

    });
  }

  render() {

    // component styles

    const BoardStyle = {
      container: {
        boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
      },

      header: {
        backgroundColor: "#3F60DA",
        width: "100%",
        color: "white",
        height: "100px",
        padding: "25px 15px 25px 15px",
        boxShadow: "0 -1px 6px rgba(0,0,0,0.16), 0 -1px 6px rgba(0,0,0,0.23)"
      }
    };

    return (

      <div style={{
        marginTop: "5vh"
      }}>
        <div className="container rounded-top boardHeader" style={BoardStyle.header}>
          <h1>Freecodecamp Leaderboard</h1>
        </div>
        <div className="container rounded-bottom" style={BoardStyle.container}>
          <div className="row">
            <div className="col 12">
              {this.state.userData.length > 0
                ? <Table users={this.state.userData}/>
                : "loading..."
}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Table extends React.Component {
  render() {
    return (

      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Camper Name</th>
            <th>Pts last 30 days</th>
            <th>Pts all time</th>
          </tr>
        </thead>
        <tbody>
          <TableItem user={this.props.users}/>
        </tbody>
      </table>

    );
  }
}

class TableItem extends React.Component {
  render() {
    return (
      <tr>
        <th scope="row">1</th>
        <td>
          {console.log(this.props.user[0].img)}
          <img src={this.props.user[0].img} style={{width: "40px", paddingRight: "5px"}} alt="User profile"/>
          {this.props.user[0].username}
        </td>
        {console.log('tableItem:', this.props.user)}
        <td>{this.props.user[0].recent}</td>
        <td>{this.props.user[0].alltime}</td>
      </tr>
    );
  }
}

ReactDOM.render(
  <Board/>, document.querySelector('#root'));
registerServiceWorker();
