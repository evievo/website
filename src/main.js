import React from 'react';
import { withRouter } from 'react-router-dom';

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
  }

  async componentDidMount(){
    try {
    

    }

    catch(error){
      alert(error);
    }

  }


//////RENDER//////////
  render() {

    return (
      <div>
         <div id="website" ref={ website => this.website = website }>

            <div className="cursor" ref={ cursor => this.cursor = cursor }></div>

            <div id="navbar" ref={ navbar => this.navbar = navbar }>
              <div className="mainNav"><p>evan vollick-offer</p></div>
              <div className="navNav">
                <p> <a>work</a> <a>play</a> <a>about</a></p>

              </div>
            </div>

            <div id="page" ref={ page => this.page = page }>
              <div id="projects" ref={ projects => this.projects = projects }>
              </div>
            </div>
         </div>
      </div>
    );
  }
}

export default withRouter(Main);
