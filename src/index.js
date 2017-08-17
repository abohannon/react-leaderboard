import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';


class Board extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      value: ''
    };
  }

  render() {
    return (

      <div className="row">
        <div className="col 12">
          <ul>
            <BoardItem />
          </ul>
        </div>
      </div>

    );
  }

}

class BoardItem extends React.Component {
  render() {
    return (
      <li className="collection-item avatar">
      <img src="images/yuna.jpg" alt="" className="circle" />
      <span className="title">Title</span>
      <p>First Line <br />
         Second Line
      </p>
      <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
    </li>
  );
  }
}


ReactDOM.render(<Board />, document.getElementById('root'));
registerServiceWorker();
