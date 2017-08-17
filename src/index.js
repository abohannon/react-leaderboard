import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rank: '',
      username: '',
      points30: '',
      pointsAll: ''

    };
  }

  componentWillMount() {
    console.log('Component is mounting...');
  }

  componentDidMount () {
    axios.get(`https://fcctop100.herokuapp.com/api/fccusers/top/recent`)
    .then(res => {
      console.log(res);
    });
  }

  render() {

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
      },
    };

    return (
      <div style={{marginTop: "5vh"}}>
      <div className="container rounded-top boardHeader" style={BoardStyle.header}>
        <h1>Freecodecamp Leaderboard</h1>
      </div>
      <div className="container rounded-bottom" style={BoardStyle.container}>
        <div className="row">
          <div className="col 12">

              <Table/>
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
          <TableItem/>
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
        <td>SkyCoder</td>
        <td>314</td>
        <td>2158</td>
      </tr>

    );
  }
}

ReactDOM.render(
  <Board/>, document.querySelector('#root'));
registerServiceWorker();
