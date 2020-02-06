import React from 'react';
import { withRouter } from 'react-router-dom';
import { TimelineLite, TweenMax, TimelineMax } from "gsap";

//global varibales here:
let timer = null;
let hover = false;

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
  }

  async componentDidMount(){
    try {

      //mouse anim
      document.addEventListener("mousemove", (e) => {
        TweenMax.to(this.cursor, 0.6, { css: { left: e.clientX, top: e.clientY, opacity: 0.3 } });
        TweenMax.to(this.cursor, 0.2, { css: {opacity: 1 } });
        if (hover){
          TweenMax.to(this.cursor, 0.6, { css: {opacity: 1, scale: 2} });
        }
        else if (!hover){
          TweenMax.to(this.cursor, 0.6, { css: { scale: 1} });
        }

      });
      //mouse animation when clicking
      document.addEventListener("click", (e) => {
        TweenMax.to(this.cursor, 0.0, { css: {scale: 1 } });
        TweenMax.to(this.cursor, 0.4, { css: {scale: 2 } });
        TweenMax.to(this.cursor, 0.4, { css: {scale: 1 } });
      });

      let first = {Title: "coasters", Bio: "hey this is design", order: 0}
      let second = {Title: "clock", Bio: "hey this is also design", order: 1}

      this.setState({
        projects: [first, second]
      });
    }
    catch(error){
      alert(error);
    }

  }

  mouseenter(){
    hover = true;
  }
  mouseleave(){
    hover = false;
  }

//////RENDER//////////
  render() {

    const {stuff} = this.props;

    return (
      <div>
         <div id="website" ref={ website => this.website = website }>

            <div className="cursor" ref={ cursor => this.cursor = cursor }></div>

            <div id="navbar" ref={ navbar => this.navbar = navbar }>
              <div className="mainNav"
              onMouseEnter={ () => this.mouseenter() }
              onMouseLeave={ () => this.mouseleave() }>
                <p>evan vollick-offer</p>
              </div>
              <div className="navNav">
                <p> <a>work</a> <a>play</a> <a>about</a></p>

              </div>
            </div>

            <div id="page" ref={ page => this.page = page }>
              <div id="projects" ref={ projects => this.projects = projects }>

                { Object.keys(this.state.projects).map((item, i) => {
                  return(
                    <div
                    className = "proj-title"
                    key = {'Title" + i'}>
                      {this.state.projects[i]['Title']}
                    </div>


                  )
                }) }

              </div>
            </div>
         </div>
      </div>
    );
  }
}

export default withRouter(Main);
