import React from 'react';
import {BrowserRouter, withRouter, Link, Route} from "react-router-dom";
import Projects from "./project.js";
import Assets from "./assets.js";
import { Power1, Power3, Bounce, Back, TimelineLite, TweenMax, TimelineMax } from "gsap";
import Main from './main.js';

class Archive extends React.Component {
  constructor(props) {
    super(props);
    let w = window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
    let h = window.innerHeight;
    this.state = {
      archive:[],
      width: w,
      height: h,
      aim: props.init,
    };
  }

  async componentDidMount(){
    try {
      if (this.state.aim) {this.pageanim();}
      this.setState({archive: Projects});







    }
    catch(error){
      alert(error);
    }
  }
  pageanim(){
    TweenMax.from(this.archpage, 1, {y: - 800, ease: Power1.easeOut})
  }

  exit(){
    if (this.state.aim){
      TweenMax.to(this.archpage, 1, {y: - 800, ease: Power1.easeOut})
        .then(() =>{window.location.replace("/");})
    }
    else{
      window.location.replace("/");
    }

  }

  archHover(i){

  }
  archLeave(i){

  }
  render() {
    return (

      <div>
        <div className = "archive-page" ref={archpage => this.archpage = archpage}>
          <div className = "x" ref={x => this.x = x} onClick= {() => this.exit()}></div>
          {Object.keys(this.state.archive).map((item, i) => {
            return(
              <div
              className = "archive-list"
              key = {'arch_' + i}
              ref = { arch => this['arch' + i] = arch }
              onMouseEnter={()=> this.archHover(i)}
              onMouseLeave={()=> this.archLeave(i)}>
                <div className = "arch-title">{this.state.archive[i]['Title']}</div>
              </div>
            )
          })}

        </div>
      </div>

    );
  }
}

export default withRouter(Archive);
