//Website Portfolio for Evan Vollick-Offer
//Coded by evan Vollick-offer
//2-01-2020

////////////////////////////////////////////////////////////////////////////////
//IMPORTS:
import React from 'react';
import { Power1, Power3, Bounce, Back, TimelineLite, TweenMax, TimelineMax } from "gsap";
import * as ScrollMagic from "scrollmagic";
import Projects from "./project.js"
import Assets from "./assets.js"
import Archive from "./archive.js"
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import {BrowserRouter, withRouter, Link, Route} from "react-router-dom";

////////////////////////////////////////////////////////////////////////////////





//global varibales here:
let timer = null;
var lastScrollTop = 0;
var cursor_stop = false;
var archiveTl = new TimelineMax({repeat:-1});
var logoTl = new TimelineMax({repeat:-1});
var loadTl = new TimelineMax();



class Main extends React.Component {

  constructor(props) {
    super(props);
    let w = window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
    let h = window.innerHeight;
    this.state = {
      projects: [],
      archive:[],
      controller: null,
      scene: null,
      width: w,
      height: h,
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


      //var c = new ScrollMagic.Controller()
      let w = window.innerWidth ||
              document.documentElement.clientWidth ||
              document.body.clientWidth;
      let h = window.innerHeight;

    //set set + call initanim:
      this.setState({
        projects: init_projects,
        archive: Projects,
        controller: new ScrollMagic.Controller(),
        scene: [],
        width: w,
        height: h,
        color: "white",
      },() => {this.workaim()});

    //mouse anim:
    this.mouseanim();
    archiveTl.to(this.archive, {rotation: 360, duration: 80});

    logoTl.set(this.logo_outline, {opacity:1});
    logoTl.set(this.logo_filled, {opacity:1});
    logoTl.to(this.logo_filled, .6, {opacity:1});
    logoTl.set(this.logo_filled, {opacity:0});
    logoTl.to(this.logo_filled, .6, {opacity:0});
    logoTl.set(this.logo_outline, {opacity:0});
    //logoTl.set(this.logo_filled, {opacity:0});
    logoTl.pause();

    loadTl.pause();

    loadTl.set(this.logo_outline_load, {opacity:1});
    loadTl.set(this.logo_filled_load, {opacity:1});
    loadTl.to(this.logo_filled_load, .6, {opacity:1});
    loadTl.set(this.logo_filled_load, {opacity:0});
    loadTl.to(this.logo_filled_load, .6, {opacity:0});
    loadTl.set(this.logo_outline_load, {opacity:0});
    loadTl.set(this.logo_outline_load, {opacity:1});
    loadTl.set(this.logo_filled_load, {opacity:1});
    loadTl.to(this.logo_filled_load, .6, {opacity:1});
    loadTl.set(this.logo_filled_load, {opacity:0});
    loadTl.to(this.logo_filled_load, .6, {opacity:0});
    loadTl.set(this.logo_outline_load, {opacity:0});
    loadTl.to(this.load, 1.5, {x:this.state.width, ease: Power3.easeOut});
    //loadTl.to(this.load, 3, {opacity:0});

    TweenMax.set(this.archpage, {y:-800, ease: Power1.easeOut});

    window.addEventListener('hashchange', (e) => {
     alert("change");
     //if (window.location.href.indexOf("franky") != -1)
   });

    window.addEventListener('load', (e) => {

      loadTl.resume();

    });

    window.addEventListener('resize', (e) => {
      let w = window.innerWidth ||
              document.documentElement.clientWidth ||
              document.body.clientWidth;
      let h = window.innerHeight;

      this.setState({width: w, height: h});
      //clearTimeout(timer);
      //timer = setTimeout(this.updateaim(), 200);
    });

    window.addEventListener('scroll', (e) => {
      this.updatenav();
      this.scrolleffect(this.getup());
      this.updatescroll();

    })


    this.homeimage.addEventListener("mouseover", () =>{
      clearTimeout(timer);
      timer = setTimeout(this.logoaim(true), 400);
      this.logoaim(true);

    })

    this.homeimage.addEventListener("mouseleave", () =>{
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
  updatescroll(top){
    var progress = (window.innerHeight + window.scrollY) / this.page.scrollHeight;
    var bar = progress * window.innerHeight;
    var op = 1;
    if (window.innerHeight >  window.scrollY){ op = 0;}
    TweenMax.to(this.scroll, .01, {height: bar, opacity: op});

  }
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
        TweenMax.to(selcted, 0.1, {skewY:skew, ease: Power1.easeOut});
      }
    });
    trigger.forEach.call(trigger, el => {
      for(let i =0; i<this.state.projects.length; i++){
        const selcted = el.getElementsByClassName("project-container")[i];
        TweenMax.to(selcted, 1, {duration: 2, skewY:0, ease: Bounce.easeOut});
      }
    });
  }

  logoaim(enter){
    if(enter){
      logoTl.resume();

    }
    else{
      logoTl.pause();
      TweenMax.to(this.logo_filled, 0.1, {opacity: 0, ease: Power1.easeOut} );
      TweenMax.to(this.logo_outline, 0.1, {opacity: 0, ease: Power1.easeOut} );
      //TweenMax.to(this.cursor, 3, {scale: "1", ease: Power3.easeOut} );
    }
  }

  updatenav(){
    const trigger = [...document.getElementsByClassName("nav-bounds")];
    var home = this.home.getBoundingClientRect();
    var work = this.projects.offsetTop;
    var home_bottom = (home.top + this.home.clientHeight);

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
      if(!cursor_stop){
      TweenMax.to(this.cursor, 0.6, { css: { left: e.clientX, top: (e.clientY+window.pageYOffset), opacity: 0.3 } });
      TweenMax.to(this.cursor, 0.2, { css: {opacity: 1 } });
    }
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
    TweenMax.to(this['thumbnail_' + i], 0.4,{x: x,y:y, scale: 1.01,  ease: Power1.easeOut});
    TweenMax.to(this['arrow_' + i], 0.4,{y: 80, opacity:1,  ease: Bounce.easeOut});
  });

  }

  projectLeave(i){
    TweenMax.to(this['thumbnail_' + i], 0.6,{x: 0,y:0, scale: 1.0, ease: Power3.easeOut})
    TweenMax.to(this['arrow_' + i], 0.4, {y: 0, opacity:0, ease: Bounce.easeOut});
  }

  archiveEnter(){
    cursor_stop = true;
    let x = (this.archive.getBoundingClientRect().left + this.archive.getBoundingClientRect().right/2);
    let y = (window.innerHeight + this.archive.offsetTop)+48;
    //alert((this.archive.offsetTop + this.archive.offsetHeight + window.pageYOffset) - window.innerHeight);
    TweenMax.to(this.cursor, .8, { left: 204, top: y, scale:.3, opacity:0, ease: Power3.easeOut});
    TweenMax.to(this.archive, 1, { scale:1.25, ease: Power3.easeOut});
    TweenMax.to(this.archive, 1, { rotation: -30, ease: Power3.easeOut});
    TweenMax.to(this.blob, 1, { scale:8, opacity: 1, ease: Power3.easeOut});
    archiveTl.pause();
  }

  archiveLeave(){
    archiveTl.resume();
    TweenMax.to(this.cursor, 2, { scale:1.0, ease: Power3.easeOut});
    TweenMax.to(this.archive, 1, { scale:1, ease: Power3.easeOut});
    cursor_stop = false;
  }

  archiveClick(){
  //  window.history.pushState('', '', '/archive');


    TweenMax.to(this.archive, .2, { scale:2, ease: Power1.easeOut});
    TweenMax.to(this.archpage, 1, {y:0, ease: Power1.easeOut})
    TweenMax.from(this.archpage, 1, {y: - 800, ease: Power1.easeOut})

  }


  archHover(i){

  }
  archLeave(i){

  }




//////RENDER//////////
  render() {

    const {stuff} = this.props;

    return (
      <BrowserRouter>
      <div>
         <div id="website" ref={ website => this.website = website }>

           <div className = "load" ref ={ load => this.load = load }>
             <img src = {Assets["Logo_outlines"]} alt = "logo outline load" ref={ logo_outline_load => this.logo_outline_load = logo_outline_load}/>
             <img src = {Assets["Logo_filled"]} alt = "logo filled load" ref={ logo_filled_load => this.logo_filled_load = logo_filled_load}/>
           </div>

            <div className="cursor" ref={ cursor => this.cursor = cursor }></div>
            <span className="scroll-bar" ref = {scroll => this.scroll = scroll}></span>


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
                    <img src = {Assets["Logo_outlines"]} alt = "logo outline" ref={ logo_outline => this.logo_outline = logo_outline}/>
                    <img src = {Assets["Logo_filled"]} alt = "logo filled" ref={ logo_filled => this.logo_filled = logo_filled}/>
                  </div>
                </div>

                <div className = "intro">

                    <p>
                      Hi, i'm Evan!
                    </p>
                </div>
                <div className="arrow-white"
                     ref = {arrow_white => this.arrow_white = arrow_white}
                     style={{backgroundImage: "url(" + Assets['Arrow_white'] + ")"}}></div>
                <div className = "designer-statment">
                   <p>
                    MULTI disciplinary DESIGNER - MULTI disciplinary DESIGNER - MULTI disciplinary DESIGNER -
                    </p>
                </div>
              </div>


              <div id="projects" ref={ projects => this.projects = projects }>
                <div className = "work-title">
                  <span></span>
                </div>


                <Link to= "/archive"> <div className = "archive-wrap"
                    src = {archivebox => this.archivebox = archivebox}
                    onMouseEnter={()=>this.archiveEnter()}
                    onMouseLeave={()=>this.archiveLeave()}
                    onClick ={()=>this.archiveClick()}>


                  <div className = "archive-btn"
                       ref ={archive => this.archive = archive}
                       style = {{backgroundImage: 'url(' + Assets['Archive'] + ')'}}>
                  </div>



                  <div className = "blob" src = {blob => this.blob = blob}></div>
                </div></Link>


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
                          <div className= "order" ref = {order=>this['order_' + i]=order}>0{i+1}</div>
                          <div className= "year" ref = {year=>this['year_' + i]=year}>{this.state.projects[i]['Year']}</div>
                          <div className= "category" ref = {category=>this['category_' + i]=category}>{this.state.projects[i]['Category']}</div>

                          <div className="arrow"
                               ref = {arrow => this['arrow_' + i] = arrow}
                               style={{backgroundImage: "url(" + Assets['Arrow_right'] + ")"}}></div>



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
                <div className = "footer">
                  <span></span>

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
                <div className = "about-statment">
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


          <Route path='/archive' render ={() => <Archive init = {true}/>}/>

         </div>
      </div>
      </BrowserRouter>

    );
  }
}



export default withRouter(Main);
