import React from 'react';
import { withRouter } from 'react-router-dom';
import { Power1, Bounce, TimelineLite, TweenMax, TimelineMax } from "gsap";
import coaster from './images/thumbnails/01_coaster.JPG'
import clock from './images/thumbnails/02_clock.JPG'
import logo from './images/Elogo.png'
import grid from './images/bluegrid.svg'
import Projects from "./project.js"


//global varibales here:
let timer = null;
let hover = false;
let hovertext = "";

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      archive:[],
      logo: "",
    };
  }

  async componentDidMount(){
    try {


      //mouse anim
      document.addEventListener("mousemove", (e) => {
        TweenMax.to(this.cursor, 0.6, { css: { left: e.clientX, top: e.clientY, opacity: 0.3 } });
        TweenMax.to(this.cursor, 0.2, { css: {opacity: 1 } });


      });
      //mouse animation when clicking
      document.addEventListener("click", (e) => {
        TweenMax.to(this.cursor, 0.0, { css: {scale: 1 } });
        TweenMax.to(this.cursor, 0.8, { css: {scale: 2 } });
        TweenMax.to(this.cursor, 0.4, { css: {scale: 1 } });
      });

      const trigger = [...document.getElementsByClassName("nav-bounds")];

      trigger.forEach.call(trigger, el => {
        el.addEventListener("mouseover", e => {
          const selcted = el.getElementsByClassName("nav-option")[0];

          TweenMax.to(selcted, 0.25, {css:{transform: "rotate(15deg)",color: "blue"},ease: Power1.easeOut});
        });
      });

      trigger.forEach.call(trigger, el => {
        el.addEventListener("mouseleave", e => {
          const selcted = el.getElementsByClassName("nav-option")[0];

          TweenMax.to(selcted, 0.7, {css:{
            transform: "rotate(0deg)",
            color: "black"},
            ease: Power1.easeOut
          });
        });
      });

      //intial animations:
      var start = new TimelineLite();
      start
      .from(document.getElementById('navbar'), {opacity: 0, duration: .8, y: -50})
      .from(document.getElementById('blue-block'), {opacity: 0, duration: 2, y: 100, ease: Power1.easeOut}, "-=1.2");
      //////

      //onscroll anim:
      //const controller = new ScrollMagic.Controller();
      //////

      document.getElementById('blue-block').addEventListener("mouseover", () =>{
        TweenMax.to(this.cursor, 0.4, {scale: 1.2, borderColor: "white"} );
      })
      document.getElementById('blue-block').addEventListener("mouseleave", () =>{
        TweenMax.to(this.cursor, 0.4, {scale: 1.2, borderColor: "blue"} );
      })







      //init DATA:
      //let first = {Title: "coasters", Bio: "hey this is design", Order: 0, Thumbnail: coaster};
      //let second = {Title: "clock", Bio: "hey this is also design", Order: 1, Thumbnail: clock};
      //let third = {Title: "clock", Bio: "hey this is also design", Order: 2, Thumbnail: clock};
      //let fourth = {Title: "coasters", Bio: "hey this is design", Order: 3, Thumbnail: coaster};
      let init_projects = [];
      let count = 0;
      for(let i = 0; i < Projects.length; i++){

        if (!Projects[i]['Archived']){
          init_projects[count] = Projects[i];
          count++;
        }
      }


      this.setState({
        projects: init_projects,
        logo: logo,
      });

    }//end of TRY
    catch(error){
      alert(error);
    }

  }//end of catch

  mouseover() {

  }

  mouseleave(){

  }


//////RENDER//////////
  render() {

    const {stuff} = this.props;

    return (
      <div>
         <div id="website" ref={ website => this.website = website }>

            <div className="cursor" ref={ cursor => this.cursor = cursor }></div>


            <div id="navbar" ref={ navbar => this.navbar = navbar }>
              <div className="mainNav">
                <div className = "nav-bounds">
                  <div className = "nav-option">
                    <a href = "/">evan vollick offer</a>
                  </div>
                </div>
              </div>
              <div className="navNav">

                  <div className = "nav-bounds"><div className = "nav-option">
                    <a href="#projects">work</a>
                  </div></div>
                  <div className = "nav-bounds"><div className = "nav-option">
                    <a href = "#play">play</a>
                  </div></div>
                  <div className = "nav-bounds"><div className = "nav-option">
                    <a href = "#about">about</a>
                  </div></div>

              </div>
            </div>

            <div id="page" ref={ page => this.page = page }>
              <div id="home" ref={ home => this.home = home }>

                <div id = "blue-block" ref={ blueblock => this.blueblock = blueblock}
                  onMouseEnter = {this.mouseover()}
                  onMouseLeave = {this.mouseleave()} >
                  <div className = "designer-statment">
                      <p>
                        MULTI disciplinary DESIGNER
                        <span></span>
                      </p>
                  </div>


                </div>
              </div>


              <div id="projects" ref={ projects => this.projects = projects }>
                <div className = "work-title">
                  work
                </div>
                <div className = "list">
                  { Object.keys(this.state.projects).map((item, i) => {
                    return(
                      <div
                      className = "project-container"
                      key = {'Title" + i'}>
                        <div className = "title"> { this.state.projects[i]['Title'] }</div>
                        <div className = "wrapper">
                          <img src = { this.state.projects[i]['Thumbnail'] } alt = {'thumbnail_' + this.state.projects[i]['Title']} className = "thumbnails"/>
                          <div className = "block"></div>
                        </div>


                      </div>
                    )
                  })}
                </div>
              </div>

              <div id="play" ref={ play => this.play = play }>
                <div className = "play-title">
                  play
                </div>
              </div>
              <div id="about" ref={ about => this.about = about }>
                <div className = "about-title">
                  about
                </div>
                <div className = "intro">
                  <span></span>
                    <p>
                      Hello i'm Evan!
                    </p>
                  <span></span>
                </div>
                <div className = "socail">
                  <ul className= "socail-list">
                    <span></span>
                    <div className ="socail-item">
                      <a href= "" className="socail-link"></a>
                    </div>
                  </ul>
                </div>
              </div>




            </div>
         </div>
      </div>
    );
  }
}

export default withRouter(Main);
