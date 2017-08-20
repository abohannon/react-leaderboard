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

    this.sortColumn = this.sortColumn.bind(this);
  }

  componentWillMount() {
    console.log('Component is mounting...');
  }

  componentDidMount() {
    axios.get(`https://fcctop100.herokuapp.com/api/fccusers/top/recent`).then(res => {
      this.setState({userData: res.data});
      console.log('Component mounted.');
    });

  }

  sortColumn() {
    const sorted = this.state.userData.slice().sort((a, b) => {
      return a.recent - b.recent;
    });
    this.setState({userData: sorted});
  }

  render() {

    console.log("state.userData:", this.state.userData);

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
                ? <Table users={this.state.userData} sort={this.sortColumn}/>
                : "loading..."}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Table extends React.Component {
  render() {

    const userArray = this.props.users;
    let count = 0;

    const getUser = userArray.map((user) => {
      count++;
      return <TableItem key={user.username} user={user} rank={count}/>;
    });

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Camper Name</th>
            <th onClick={this.props.sort}>Pts last 30 days</th>
            <th>Pts all time</th>
          </tr>
        </thead>
        <tbody>
          {getUser}
        </tbody>
      </table>
    );
  }
}

class TableItem extends React.Component {
  render() {
    return (
      <tr>
        <th scope="row">{this.props.rank}</th>
        <td>
          <img src={this.props.user.img} style={{
            width: "40px",
            paddingRight: "5px"
          }} alt="User profile"/> {this.props.user.username}
        </td>
        <td>{this.props.user.recent}</td>
        <td>{this.props.user.alltime}</td>
      </tr>
    );
  }
}

ReactDOM.render(
  <Board/>, document.querySelector('#root'));
registerServiceWorker();
