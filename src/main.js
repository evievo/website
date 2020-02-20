//Website Portfolio for Evan Vollick-Offer
//Coded by evan Vollick-offer
//2-01-2020

////////////////////////////////////////////////////////////////////////////////
//IMPORTS:
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Power1, Power3, Bounce, Back, TimelineLite, TweenMax, TimelineMax } from "gsap";
import * as ScrollMagic from "scrollmagic";
import Projects from "./project.js"
import Assets from "./assets.js"
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
////////////////////////////////////////////////////////////////////////////////





//global varibales here:
let timer = null;
var lastScrollTop = 0;


class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      archive:[],
      controller: null,
      scene: null,
      width: 0,
      color: "",
    };
  }

  async componentDidMount(){
    try {

    ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

    //init DATA:
      let init_projects = [];
      let count = 0;
      for(let i = 0; i < Projects.length; i++){
        if (!Projects[i]['Archived']){
          init_projects[count] = Projects[i];
          count++;
        }
      }

      let w = window.innerWidth ||
              document.documentElement.clientWidth ||
              document.body.clientWidth;
      //var c = new ScrollMagic.Controller()

    //set set + call initanim:
      this.setState({
        projects: init_projects,
        archive: Projects,
        controller: new ScrollMagic.Controller(),
        scene: [],
        width: w,
        color: "white",
      },() => {this.workaim()});

    //mouse anim:
    this.mouseanim();

    this.logo_filled.addEventListener("mouseover", () =>{
    //  clearTimeout(timer);
      //timer = setTimeout(this.logoaim(true), 100);
      this.logoaim(true);

    })

    this.logo_filled.addEventListener("mouseleave", () =>{
      //clearTimeout(timer);
      //timer = setTimeout(this.logoaim(false), 200);
      this.logoaim(false);
    })


    //navBar anim:
      const trigger = [...document.getElementsByClassName("nav-bounds")];

      trigger.forEach.call(trigger, el => {
        el.addEventListener("mouseover", e => {
          const selcted = el.getElementsByClassName("nav-option")[0];

          TweenMax.to(selcted, 0.25, {transform:"rotate(-15deg)",color: "blue",ease: Power1.easeOut});
        });
      });

      trigger.forEach.call(trigger, el => {
        el.addEventListener("mouseleave", e => {
          const selcted = el.getElementsByClassName("nav-option")[0];

          TweenMax.to(selcted, 0.7, {
            transform: "rotate(0deg)",
            color: this.state.color,
            ease: Power1.easeOut
          });
        });
      });
      /////////////////////////////////////////////
      /////////////////////////////////////////////

      window.addEventListener('resize', (e) => {
        clearTimeout(timer);
        //timer = setTimeout(this.updateaim(), 200);
      });

      window.addEventListener('scroll', (e) => {
        this.updatenav();
        this.scrolleffect(this.getup());

      })



      //intial animations:
      var start = new TimelineLite();
      start
      .from(document.getElementsByClassName('categories'), {opacity: 0, duration: 2, y: -100, ease: Power3.easeIn})
      .from(document.getElementById('navbar'), {opacity: 0, duration: .8, y: -50});




    }//end of TRY
    catch(error){
      alert(error);
    }

  }//end of catch

  getup(){
    let cur = window.pageYOffset || document.documentElement.scrollTop;
    let re = true;
    if (cur > lastScrollTop){re = false;}
    lastScrollTop = cur <= 0 ? 0 : cur;
    return re;
  }

  scrolleffect(up){
    let skew = -2;
    if(up) {skew = 2;}
    const trigger = [...document.getElementsByClassName("list")];

    trigger.forEach.call(trigger, el => {
      for(let i =0; i<this.state.projects.length; i++){
        const selcted = el.getElementsByClassName("project-container")[i];
        TweenMax.to(selcted, 0.1, {skewY:skew, ease: Power3.easeOut});
      }
    });
    trigger.forEach.call(trigger, el => {
      for(let i =0; i<this.state.projects.length; i++){
        const selcted = el.getElementsByClassName("project-container")[i];
        TweenMax.to(selcted, 0.2, {skewY:0, ease: Power3.easeOut});
      }
    });
  }

  logoaim(enter){
    if(enter){
      TweenMax.to(this.logo_filled, 0.1, {opacity: 1, ease: Power1.easeOut} );
      TweenMax.to(this.homeimage, 0.2, {scale:1.02, ease: Power1.easeOut} );
    //  TweenMax.to(this.cursor, 1, {scale: "3", ease: Power3.easeOut} );
    }
    else{
      TweenMax.to(this.logo_filled, 0.2, {opacity: 0, ease: Power1.easeOut} );
      TweenMax.to(this.homeimage, 0.2, {scale:1, ease: Power1.easeOut} );
      //TweenMax.to(this.cursor, 3, {scale: "1", ease: Power3.easeOut} );
    }
  }

  updatenav(){
    const trigger = [...document.getElementsByClassName("nav-bounds")];
    var home = this.home.getBoundingClientRect();
    var work = this.projects.offsetTop;
    var home_bottom = (home.top + this.home.clientHeight);
    console.log("window:" +window.pageYOffset);

    console.log("work:" + this.projects.offsetTop);
    if (window.pageYOffset > (work-20)){
      //TweenMax.to(this.navbar, .5, {color: "black"});
      this.state.color = "black";
      trigger.forEach.call(trigger, el => {

          const selcted = el.getElementsByClassName("nav-option")[0];

          TweenMax.to(selcted, 0.5, {
            color: this.state.color,
            ease: Power1.easeOut
          });

      });
    }
    //else if (window.pageYOffset < (home_bottom - 50) && window.pageYOffset > (home_bottom + 50)){
    else{
      TweenMax.to(this.navbar, .5, {color: "white"});
      this.state.color = "white";
      trigger.forEach.call(trigger, el => {
          const selcted = el.getElementsByClassName("nav-option")[0];
          TweenMax.to(selcted, 0.5, {
            color: this.state.color,
            ease: Power1.easeOut
          });

      });

    }
  }

  updateaim(){
    let w = window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;

    this.setState({width: w}, () => {this.workaim(true)});
    console.log(this.state.width);
  }

  workaim(updating){
    //  var proj_t2 = new TimelineMax({onUpdate:update});
    //var c = new ScrollMagic.Controller();
    //this.setState({ controller: new ScrollMagic.Controller()});

    var proj_t = [];
    for(let i = 0; i < this.state.projects.length; i ++){
      //console.log(this.state.width);
      proj_t[i] = new TimelineMax(/*{onUpdate:update}*/);
        if((this.state.width < 768) || (i % 2 === 0)){
          proj_t[i].from(this['title_' + i], .2,{x: 90, opacity:0, ease: Back.easeOut});
          proj_t[i].from(this['thumbnail_' + i], .4,{x: -200,ease: Back.easeOut});
          proj_t[i].from(this['block_' + i], 2,{x: -20,ease: Back.easeOut});
        }
        else{
          proj_t[i].from(this['title_' + i], .2,{x: -90, opacity:0, ease: Back.easeOut});
          proj_t[i].from(this['thumbnail_' + i], .2,{x: 200,ease: Power1.easeOut});
          proj_t[i].from(this['block_' + i], 2,{x: 20,ease: Back.easeOut});
        }
        if(!updating){
          this.state.scene[i] = new ScrollMagic.Scene({
              triggerElement: this['proj_' + i],
              triggerHook: "onCenter",
            })
            .setTween(proj_t[i])
            //.addIndicators({name: "1 (duration: 20)"})
            .addTo(this.state.controller);
        }
        else{
          this.state.scene[i].destroy(true);
          this.state.scene[i] = new ScrollMagic.Scene({
              triggerElement: this['proj_' + i],
              triggerHook: "onCenter",
            })
            .setTween(proj_t[i])
            //.addIndicators({name: "1 (duration: 20)"})
            .addTo(this.state.controller);
          //this.state.scene[i].refresh();
          this.state.scene[i].update();
        }
      }

    function update() {
      proj_t.progress();
      //console.log(proj_t.progress());
    }

  }



  mouseanim() {
    document.addEventListener("mousemove", (e) => {
      TweenMax.to(this.cursor, 0.6, { css: { left: e.clientX, top: (e.clientY+window.pageYOffset), opacity: 0.3 } });
      TweenMax.to(this.cursor, 0.2, { css: {opacity: 1 } });
    });


  }//end

  mapscreen(pos, size){
    let half = size/2;
    return pos-half;
  }

  projectHover(i){
    this['thumbnail_' + i].addEventListener("mousemove", (e) => {
    let x = (this.mapscreen(e.clientX, window.innerWidth)*.01);
    let y = (this.mapscreen(e.clientY, window.innerHeight)*.018);
    TweenMax.to(this['thumbnail_' + i], 0.4,{x: x,y:y, scale: 1.01,  ease: Power1.easeOut})
  });


    //var x = e.clientY;
    //x = x/(x+1);
  //  TweenMax.to(this['thumbnail_' + i], 0.1,{css})
  }

  projectLeave(i){
    TweenMax.to(this['thumbnail_' + i], 0.6,{x: 0,y:0, scale: 1.0, ease: Power3.easeOut})
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

                <div id = "homeimage" ref={ homeimage => this.homeimage = homeimage}>
                  <div className="logo" ref = {logo => this.logo = logo}>
                    <img src = {Assets["Logo_outlines"]} alt = "logo outline"/>
                    <img src = {Assets["Logo_filled"]} alt = "logo filled" ref={ logo_filled => this.logo_filled = logo_filled}/>
                  </div>
                </div>
                <div className = "categories">
                  <p
                   onMouseEnter = {()=>this.previewhover(0)}
                   onMouseLeave = {()=>this.previewleave(0)}
                   ref = {industrial => this.industrial = industrial }>industrial</p>
                  <p>graphic</p>
                  <p>ui/ux</p>
                  <p>code</p>
                </div>

                <div className = "designer-statment">
                    <p>
                      MULTI disciplinary DESIGNER - MULTI disciplinary DESIGNER - MULTI disciplinary DESIGNER -
                    </p>
                </div>
                <div className ="scroll">
                  <span></span>
                  <p>scroll</p>
                </div>




              </div>


              <div id="projects" ref={ projects => this.projects = projects }>
                <div className = "work-title">
                  <span></span>
                  work
                </div>
                <div className = "list" ref = { list => this.list = list}>
                  { Object.keys(this.state.projects).map((item, i) => {
                    return(
                      <div
                      className = "project-container"
                      key = {'proj_' + i}
                      ref = { proj => this['proj_' + i] = proj }
                      onMouseEnter={()=> this.projectHover(i)}
                      onMouseLeave={()=> this.projectLeave(i)}>
                        <div className = "title" ref = {title=>this['title_' + i]=title}>{ this.state.projects[i]['Title'] }</div>
                          <span></span>

                          <div className= "year" ref = {year=>this['year_' + i]=year}>{this.state.projects[i]['Year']}</div>
                          <div className= "category" ref = {category=>this['category_' + i]=category}>{this.state.projects[i]['Category']}</div>

                          <div className="arrow" style={{backgroundImage: "url(" + Assets['Arrow_right'] + ")"}}></div>



                          <div className="bounding-box">
                          </div>
                          <img src = { this.state.projects[i]['Thumbnail'] }
                                alt = {'thumbnail_' + this.state.projects[i]['Title']}
                                className = "thumbnails"
                                ref = { thumbnail => this['thumbnail_' + i] = thumbnail }/>

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
