import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: [],
      recentSorted: false,
      allSorted: false
    };

    this.sortRecent = this.sortRecent.bind(this);
    this.sortAll = this.sortAll.bind(this);
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

  sortRecent() {
    const sortRecentUp = this.state.userData.slice().sort((a, b) => {
      return a.recent - b.recent;
    });
    const sortRecentDown = this.state.userData.slice().sort((a, b) => {
      return b.recent - a.recent;
    });
    if (this.state.recentSorted === false) {
      this.setState({
        userData: sortRecentUp,
        recentSorted: true
      });
    } else {
      this.setState({
        userData: sortRecentDown,
        recentSorted: false
      });
    }
  }

  sortAll() {
    const sortAllUp = this.state.userData.slice().sort((a, b) => {
      return a.alltime - b.alltime;
    });
    const sortAllDown = this.state.userData.slice().sort((a, b) => {
      return b.alltime - a.alltime;
    });
    if (this.state.allSorted === false) {
      this.setState({
        userData: sortAllUp,
        allSorted: true
      });
    } else {
      this.setState({
        userData: sortAllDown,
        allSorted: false
      });
    }
  }

  render() {

    console.log("state.userData:", this.state.userData);

    // component styles

    const BoardStyle = {
      header: {
        backgroundColor: "#3F60DA",
        width: "100%",
        color: "white",
        padding: "30px 15px 5px 15px",
        textAlign: "center"
      }
    };

    return (

      <div style={{marginTop: "5vh", minWidth: "600px"}}>
        <div className="container rounded-top boardHeader" style={BoardStyle.header}>
          <img src="https://www.freecodecamp.com/design-style-guide/img/freeCodeCamp.svg" />
          <p style={{fontWeight: "300", padding: "10px"}}>Top campers from the last 30 days</p>
        </div>
        <div className="container rounded-bottom border" style={BoardStyle.container}>
          <div className="row">
            <div className="col 12">
              {this.state.userData.length > 0
                ? <Table users={this.state.userData} sortRecent={this.sortRecent} sortAll={this.sortAll}/>
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
            <th onClick={this.props.sortRecent} style={{cursor: "pointer"}}>Points (Last 30)</th>
            <th onClick={this.props.sortAll} style={{cursor: "pointer"}}>Points (All Time)</th>
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
