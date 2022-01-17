//Website Portfolio for Evan Vollick-Offer
//Coded by evan Vollick-offer
//2-01-2020

////////////////////////////////////////////////////////////////////////////////
//IMPORTS:
import React from 'react';
import {gsap, Power1, Power3, Bounce, Back, TimelineLite, TweenMax, TimelineMax} from "gsap";
import {  ScrollToPlugin } from 'gsap/dist/ScrollToPlugin.js';
import * as ScrollMagic from "scrollmagic";
import Projects from "./project.js"
import Assets from "./assets.js"
import Archive from "./archive.js"
import ProjectPage from './Projects.js';
import Load from './load.js'
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import {BrowserRouter, withRouter, Link, Route, Switch} from "react-router-dom";

////////////////////////////////////////////////////////////////////////////////





//global varibales here:
let timer = null;
var lastScrollTop = 0;
var cursor_stop = false;
var archiveTl = new TimelineMax({repeat:-1});
var logoTl = new TimelineMax({repeat:-1});
var loadTl = new TimelineMax();
var ham = new TimelineMax();
var hamToggle = {timeline: new TimelineMax(), toggled: false};
var introMoved = false;
var timelineIntro = new TimelineMax();
gsap.registerPlugin( ScrollToPlugin);





var scroll = 0;



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
      showProcess: false,
      showSkills: false,
      showMobile:false,
    };

    this.skillsClick = this.skillsClick.bind(this);
    this.processClick = this.processClick.bind(this);
  }

  componentWillMount(){
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
        showSkills: false,
        showProcess: false,
        showMobile:false,
      });
  }

  async componentDidMount(){
    try {

    ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

    //mouse anim:
    this.blurMove();
    this.mouseanim();
    this.toppage();
    this.navAnim();
    window.history.replaceState(null, null, '/');

    var t = TweenMax.to(".move-text", 20, {x:-800, repeat:-1});





    archiveTl.to(this.archive, {rotation: 360, duration: 80});
    ham.pause();
    ham.to(this.hamOne, .2, {x: -3});
    ham.to(this.hamTwo, .2, {x: 3}, "-=.2");
    hamToggle.timeline.pause();
    hamToggle.timeline.to(this.navList, .3, {x: 30, opacity: 0, ease: Power1.easeOut});
    TweenMax.set("#mobile", {y:-2000, opacity:0});

    logoTl.set(this.logo_outline, {opacity:1});
    logoTl.set(this.logo_filled, {opacity:1});
    logoTl.to(this.logo_filled, .6, {opacity:1});
    logoTl.set(this.logo_filled, {opacity:0});
    logoTl.to(this.logo_filled, .6, {opacity:0});
    logoTl.set(this.logo_outline, {opacity:0});
    //logoTl.set(this.logo_filled, {opacity:0});
    logoTl.pause();



    loadTl.set(this.logo_outline_load, {scale: 2, opacity:0});
    loadTl.set(this.logo_filled_load, {scale: 2, opacity:1});
    loadTl.to(this.logo_filled_load, .6, {opacity:1});
    loadTl.set(this.logo_filled_load, {opacity:0});
    loadTl.to(this.logo_filled_load, .6, {opacity:0});
    loadTl.set(this.logo_outline_load, {opacity:1});
    loadTl.to(this.logo_outline_load, .6, {opacity:1});
    loadTl.set(this.logo_outline_load, {opacity:0});
    loadTl.to(this.logo_outline_load, .6, {opacity:0});
    loadTl.set(this.logo_filled_load, {opacity:1});
    loadTl.to(this.logo_filled_load, .6, {opacity:1});
    loadTl.set(this.logo_filled_load, {opacity:0});
    loadTl.to(this.logo_filled_load, .6, {opacity:0});
    loadTl.set(this.logo_outline_load, {opacity:1});
    loadTl.to(this.logo_outline_load, .6, {opacity:1});
    loadTl.set(this.logo_outline_load, {opacity:0});
    loadTl.to(this.logo_outline_load, .6, {opacity:0});


    //loadTl.to(this.load, 3, {opacity:0});

    TweenMax.set(this.archpage, {y:-800, ease: Power1.easeOut});


    window.addEventListener('load', (e) => {

      loadTl.to(this.load, .5, {x:this.state.width, ease: Power3.easeOut}).then(() => {
      loadTl.pause();});
      loadTl.set(this.load, {opacity:0});

    });

    var links = document.getElementsByTagName("a");
    for(let i = 0; i < links.length; i++){
      links[i].addEventListener('mouseenter', (e) =>{
        this.mouseHover();
      });
      links[i].addEventListener('mouseleave', (e) =>{
        this.mouseUnhover();
      });
    }



    window.addEventListener('resize', (e) => {
      let w = window.innerWidth ||
              document.documentElement.clientWidth ||
              document.body.clientWidth;
      let h = window.innerHeight;

      this.setState({width: w, height: h});
      this.toppage();

    });

    var waiting = false;

    window.addEventListener('scroll', (e) => {

      this.scrolleffect(this.getup());
      this.updatescroll();

      })



      /////////////////////////////////////////////
      /////////////////////////////////////////////





      //intial animations:




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
    let skew = -.75;
    let move = 10;
    let smallSkew = -.75;
    let smallMove = 10;
    if(up) {skew *= -1; move *= -1; smallMove *=-1; smallSkew *=-1;}

    for(let i =0; i<this.state.projects.length; i++){
      TweenMax.to(this['title_'+ i], 0.5, {y: move, skewY:skew});
    }
    for(let i =0; i<this.state.projects.length; i++){
      TweenMax.to(this['title_'+ i], 1.2, {duration: 2, y: 0, skewY:0, ease: Power3.easeOut});
    }

    var text = [this.about.getElementsByTagName("p"),this.about.getElementsByTagName("li"),
    document.getElementsByTagName("h3"),this.about.getElementsByTagName("img")];
    console.log(text);
    for(let i = 0; i < text.length; i++){

      for(let j = 0; j < text[i].length; j++){
        TweenMax.to(text[i][j], 0.5, {skewY:smallSkew,y: smallMove});
      }
      for(let j = 0; j < text[i].length; j++){
        TweenMax.to(text[i][j], 1.0, {y: 0, skewY:0, ease: Power3.easeOut});
      }
    }



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




  toppage(){
    const controller = new ScrollMagic.Controller();
  //  var sections = [this.home, this.list, this.about]
    var intro = this.intro;
    timelineIntro.restart();
    timelineIntro.clear();





    if(this.state.width <= 650){
      timelineIntro.to(".intro-portfolio", 1,{ skewX: -3,x: -4500, opacity:.5,ease: Power1.easeInOut},"-=1.5");
      timelineIntro.to(".scroll-icon", 2, {rotation: 360, ease: Power1.easeInOut}, "-=2");
      timelineIntro.to(".scroll-icon", 2, { x: -2000, opacity:.5, ease: Power1.easeInOut}, "-=2");
    }
    else{
      timelineIntro.to(".intro-portfolio", 1,{ skewY: -3,y: -4500, opacity:.5,ease: Power1.easeInOut},"-=1.5");
      timelineIntro.to(".scroll-icon", 2, {rotation: 360, ease: Power1.easeInOut}, "-=2");
      timelineIntro.to(".scroll-icon", 2, { y: -1000, opacity:.5, ease: Power1.easeInOut}, "-=2");
    }

    timelineIntro.to(".name", 1, { y: -300, opacity:.5, ease: Power1.easeInOut}, "-=2");
    timelineIntro.to(".intro-grid", 1, { scale: 1.2, opacity:.2, ease: Power1.easeInOut}, "-=2");



      var second = new ScrollMagic.Scene({
        triggerElement: this.home,
        duration: 5000,


      })
        .setTween(timelineIntro)
        .addTo(controller);

  }

  navAnim(){
    const controller = new ScrollMagic.Controller();
  //  var sections = [this.home, this.list, this.about]

    var timelineNav = new TimelineMax();
    timelineNav.to(".work-toggle", 2, {y:20, opacity: 0})
    timelineNav.set(".work-toggle", {opacity: 0, css:{fontFamily:"var(--type-fam-serif)"}})
    timelineNav.to(".work-toggle", 2, {y:0, opacity: 1})

    var timelineNav2 = new TimelineMax();
    timelineNav2.to(".work-toggle", 2, {y:20, opacity: 0})
    timelineNav2.set(".work-toggle", {opacity: 0, css:{fontFamily:"var(--type-fam-reg)"}})
    timelineNav2.to(".work-toggle", 2, {y:0, opacity: 1})
    timelineNav2.to(".about-toggle", 2, {y:20, opacity: 0})
    timelineNav2.set(".about-toggle", {opacity: 0, css:{fontFamily:"var(--type-fam-serif)"}})
    timelineNav2.to(".about-toggle", 2, {y:0, opacity: 1})


      var work = new ScrollMagic.Scene({
        triggerElement: this.projects,
        duration: 600,
        offset: 250
      })
        .setTween(timelineNav)
        .addTo(controller);

        var about = new ScrollMagic.Scene({
          triggerElement: this.about,
          duration: 600,
          offset: 100
        })
          .setTween(timelineNav2)
          .addTo(controller);
  }





  mouseanim() {

    document.addEventListener("mousemove", (e) => {
      if(!cursor_stop){
        TweenMax.to(this.cursor, 0.6, { css: { left: e.clientX, top: (e.clientY+window.pageYOffset)} });
      }
    });
    window.addEventListener('mousewheel', (e) => {
      TweenMax.to(this.cursor, 0.3, { css: { left: e.clientX, top: (e.clientY+window.pageYOffset)} });
    });


  }

  mapscreen(pos, size){
    let half = size/2;
    return pos-half;
  }

  blurMove(){

      document.addEventListener("mousemove", (e) => {
        let x = (this.mapscreen(e.clientX, window.innerWidth)*.005);
        let y = (this.mapscreen(e.clientY, window.innerHeight)*.01);
        TweenMax.to(".intro-grid", 0.4,{x: x,y:y, ease: Power1.easeOut});
      });

  }

  projectHover(i){
    this.mouseHover();

    this['imagebox_' + i].addEventListener("mousemove", (e) => {
      let details = 35;
      if((this.state.width < 400 && this.state.width < 749)){
        details = 40;
      }
      else if((this.state.width > 750 && this.state.width < 1000)){
        details = 45;
        if(i % 2 === 0){details *= -1};
      }
      else if((this.state.width > 1001)){
        details = 50;
        if(i % 2 === 0){details *= -1};
      }


      let x = (this.mapscreen(e.clientX, window.innerWidth)*.01);
      let y = (this.mapscreen(e.clientY, window.innerHeight)*.018);
      TweenMax.to(this['thumbnail_' + i], 0.4,{x: x,y:y, scale: 1.05,  ease: Power1.easeOut});
      TweenMax.to(this['title_' + i], 0.4,{ opacity:1});

      TweenMax.to(this['details_' + i], .6, {x:details, opacity: 1});
  });

  }

  projectLeave(i){
    this.mouseUnhover();
    TweenMax.to(this['details_' + i], .6, {x:0, opacity:0});

    TweenMax.to(this['thumbnail_' + i], 0.6,{x: 0,y:0, scale: 1.0, ease: Power3.easeOut})
  //  TweenMax.to(this['title_' + i], 0.4,{ opacity:0});
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
    TweenMax.to(this.archive, .2, { scale:2, ease: Power1.easeOut});
    TweenMax.to(this.archpage, 1, {y:0, ease: Power1.easeOut})
    TweenMax.from(this.archpage, 1, {y: - 800, ease: Power1.easeOut})
  }


  goToProj(i, name){

    let url = this.state.projects[i]['Url'];
    window.open(url, '_blank');

    //loadTl.reverse().then(() => {window.location.replace("/projects/" + (i + 1) + ":" + name);})
  }



  skillsClick(){
    if(this.state.showSkills === false){
      this.setState({showSkills:true});
      TweenMax.set(".skillslist", {y:0, opacity:1});
      TweenMax.from(".skillslist", .5, {y:-50, opacity:0,ease:Power3.easeIn});

    }
    else{
        TweenMax.to(".skillslist", .7, {y:-50, opacity:0,ease:Power3.easeOut})
        .then(()=>this.setState({showSkills:false}));


    }

  }
  skillsReturn(){

    return(
      <div>
        <div className = "skillslist">
          <ul><span></span>Digital Design<p>From web design (like the is site), typography, branding, posters, Adobe Creative Suite</p></ul>

          <ul><span></span>Industual<p>Have a passion for physical creations. Sketching, prototyping, devolpment and testing</p></ul>

          <ul><span></span>UI/UX<p>Weather its physical or Digitial, I do case studies, stoyboards, user testing and craft experiences</p></ul>

          <ul><span></span>Programming<p>Trained in C/C++, but also love python, JS, HTML, CSS and know other things like React (what i used for this site), SQL and Ardino harware...always learning</p></ul>
          </div>
      </div>
    );
  }

  processClick(){
    if(this.state.showProcess === false){
      this.setState({showProcess: true});
      TweenMax.set(".processlist", {y:0, opacity:1});
      TweenMax.from(".processlist", .5, {y:-50, opacity:0,ease:Power3.easeIn});
    }
    else{

      TweenMax.to(".processlist", .7, {y:-50, opacity:0,ease:Power3.easeOut})
      .then(()=>this.setState({showProcess: false}));
    }
  }
  processReturn(){
    return(
      <div>
        <ul><span></span>Research<p>From web design (like the is site), typography, branding, posters, Adobe Creative Suite</p></ul>

        <ul><span></span>Ideation/Prototyping<p>Have a passion for physical creations. Sketching, prototyping, devolpment and testing</p></ul>

        <ul><span></span>Devolpment Fun<p>Weather its physical or Digitial, I do case studies, stoyboards, user testing and craft experiences</p></ul>

        <ul><span></span>Test! Test! Test!<p> in C/C++, but also love python, JS, HTML, CSS and know other things like React (what i used for this site), SQL and Ardino harware...always learning</p></ul>

        <ul><span></span>Final Tweakage<p> in C/C++, but also love python, JS, HTML, CSS and know other things like React (what i used for this site), SQL and Ardino harware...always learning</p></ul>

      </div>
    );
  }

  listHover(selcted){

    TweenMax.to(selcted, .5, {x: -30, ease: Power1.easeIn});
    this.mouseHover();
  }

  listLeave(selcted){

    TweenMax.to(selcted, .8, {x: 0, ease: Power1.easeIn});
    this.mouseUnhover();

  }

  hamHover(){
    this.mouseHover();
    ham.play();

  }

  hamLeave(){
    this.mouseUnhover();
    ham.reverse();
  }

  hamClick(){
    if(this.state.width <= 650) {
      if(this.state.showMobile === false){
        this.setState({showMobile: true});
        TweenMax.set("#mobile", {y:0, opacity:.9});
        TweenMax.from("#mobile", 2, {y: -2000});
      }
      else{
        TweenMax.to("#mobile", 2, {y: -2000})
        .then(()=>this.setState({showMobile: false}));

      }

    }
    else{
      if(this.state.showMobile === false){
        TweenMax.to("#mobile", 2, {y: -2000})
        .then(()=>this.setState({showMobile: false}));
      }
      if (!hamToggle.toggled){
          hamToggle.toggled = true;
          hamToggle.timeline.play();
      }
      else{
        hamToggle.toggled = false;
        hamToggle.timeline.reverse();
      }
    }
  }

  mobileReturn(){
    return(
      <div>
        <div className = "mobileNav">
            <li onClick= {()=>{this.hamClick();this.scrollTo(this.projects);}}>work</li>
            <li onClick= {()=>{this.hamClick();this.scrollTo(this.about);}}>about</li>
        </div>
        <div className = "mobileSocail">
          <span></span>
          <li><a href = "mailto:ejvoll@umich.edu">Email</a></li>
          <li><a href = "https://www.behance.net/evanvollick" traget = "_blank"> Behance </a></li>
          <li><a href = "https://www.linkedin.com/in/evan-vo/" traget = "_blank"> LinkedIn</a></li>
          <li><a href = "https://github.com/evievo" traget = "_blank">GitHub</a> </li>
        </div>

      </div>
    );
  }

  mouseHover(){
    TweenMax.to(this.cursor, .5, {scale: 3, opacity:.25, ease: Power1.easeIn});
  }

  mouseUnhover(){
      TweenMax.to(this.cursor, .5, {scale: 1, opacity: 1, ease: Power1.easeOut});
  }

  topEnter(){
    this.mouseHover();
    TweenMax.to(".top-button", .5, {rotation:360});
  }
  topLeave(){
    this.mouseUnhover();
    TweenMax.to(".top-button", .5, {rotation:0});
  }
  scrollTo(section){
    let offset = -400;
    let time = 2;
    if (section === this.page){offset = 0; time = 4;}
    TweenMax.to(window, time, {scrollTo: {y:section, offsetY: offset}, ease: Power3.easeInOut});
  }








//////RENDER//////////
  render() {

    const {stuff} = this.props;

    return (
      <BrowserRouter>
      <div>
         <div id="website" ref={ website => this.website = website }>


           <div className = "load" ref ={ load => this.load = load }>
             <img src = {Assets["Logo_one"]} alt = "logo outline load" ref={ logo_outline_load => this.logo_outline_load = logo_outline_load}/>
             <img src = {Assets["Logo_two"]} alt = "logo filled load" ref={ logo_filled_load => this.logo_filled_load = logo_filled_load}/>
           </div>

            <div className="cursor" ref={ cursor => this.cursor = cursor }></div>
            <span className="scroll-bar" ref = {scroll => this.scroll = scroll}></span>


            <div id="navbar" ref={ navbar => this.navbar = navbar }>

              <div className = "border-top"></div>
              <div className = "viewport"></div>
              <div id="mobile">
                  {this.state.showMobile ? this.mobileReturn() : null}
              </div>

              <div className="mainNav">
                <a href = "/">
                  <img src = {Assets["Logo"]} alt = "logo nav" ref={ logo_nav => this.logo_nav = logo_nav}/>
                  <p>evan vollick offer</p>
                </a>
              </div>

              <div className="navNav" ref = {navList => this.navList = navList}>
                  <div className = "circle"></div>
                  <li className = "work-toggle"><a onClick ={()=>this.scrollTo(this.projects)}>work</a></li>
                  <li className = "about-toggle"><a onClick ={()=>this.scrollTo(this.about)}>about</a></li>
              </div>
              <div className="hamNav"
                   onClick={()=>this.hamClick()}
                   onMouseEnter={()=>this.hamHover()}
                   onMouseLeave = {() => this.hamLeave()}>
                      <span className = "line-one" ref = {hamOne=>this.hamOne=hamOne}></span>
                      <span className="line-two" ref = {hamTwo=>this.hamTwo=hamTwo}></span>

              </div>
            </div>


            <div id ="fixed">

              <div className ="name">
                <h1 ref = {headerHome => this.headerHome = headerHome}>
                  <p className = "evan">Evan Vollick Offer</p>
                </h1>
              </div>


              <img className= "intro-blur" src = {Assets['Blur']} alt = "blurrr"/>



              <div className = "intro" ref= {intro => this.intro = intro}>
                <img className= "intro-grid" src = {Assets['Grid']} alt = "Griddd"/>
                <p className = "intro-portfolio"> <br></br>
                    <img className = "chrome-type" src={Assets['Chrome']} alt="Chrome_Type" />
                <span></span></p>
                <img className = "scroll-icon" src={Assets['Scroll']} alt="Scroll_ICON" />
              </div>

            </div>

            <div id="page" ref={ page => this.page = page }>


              <div id="home" ref={ home => this.home = home }>
                {/*<div className = "start-container" ref= {test => this.test = test}>
                  <p className = "check-it">Selected Works</p>
                  <div className="arrow-white"
                       ref = {arrow_white => this.arrow_white = arrow_white}
                       style={{backgroundImage: "url(" + Assets['Arrow_white'] + ")"}}>
                  </div>
                </div>*/}
              </div>

              <div id="projects" ref={ projects => this.projects = projects }>

                <div className = "project-header">
                  <span></span>
                    <h3>Selected Works</h3>
                </div>

                <div className = "list" ref = { list => this.list = list}>
                  { Object.keys(this.state.projects).map((item, i) => {
                    return(
                      <div
                      className = "project-container"
                      key = {'proj_' + i}
                      ref = { proj => this['proj_' + i] = proj }>

                        <div className = "text-box" ref = {text_box =>this['textbox_' + i] = text_box}>
                            {/*<span></span>*/}
                            <div className = "title" ref = {title=>this['title_' + i]=title}><span></span>{ this.state.projects[i]['Title'] }</div>
                            <div className= "order" ref = {order=>this['order_' + i]=order}>0{i+1}</div>
                            <div className = "detail-wrapper" ref = {details=>this['details_' + i]=details}>
                              <div className= "year" ref = {year=>this['year_' + i]=year}>{this.state.projects[i]['Year']}</div>
                              <div className= "category" ref = {category=>this['category_' + i]=category}>{this.state.projects[i]['Category']}</div>
                            </div>
                        </div>
                              {/* <Link to = {`/projects/${i}`}>
                              <div className="arrow"
                                   ref = {arrow => this['arrow_' + i] = arrow}
                                   style={{backgroundImage: "url(" + Assets['Arrow_right'] + ")"}}></div>*/}

                          <div className = "image-box" ref = {image_box =>this['imagebox_' + i] = image_box}>
                            {/*<Link to= {"/projects/" + (i+1) + ":" + this.state.projects[i]['Title']}>*/}
                            <img src = { this.state.projects[i]['Thumbnail'] }
                                  alt = {'thumbnail_' + this.state.projects[i]['Title']}
                                  className = "thumbnails"
                                  ref = { thumbnail => this['thumbnail_' + i] = thumbnail }
                                  onMouseEnter={()=> this.projectHover(i)}
                                  onMouseLeave={()=> this.projectLeave(i)}
                                  onClick = {()=> this.goToProj(i, this.state.projects[i]['Title'])}/>

                          </div>
                        </div>
                      )
                  })}
                </div>
              </div>
              {/*onClick = {()=> this.goToProj(i, this.state.projects[i]['Title'])}*/}


              <div id="about" ref={ about => this.about = about }>
                <div className = "section-one">
                  <div className = "about-me-header">
                      <span></span>
                      <h3>Jello!</h3>

                  </div>
                  <div className = "about-me-first">
                    <p>I'm Evan<em>(VO). </em>
                      I am a confused designer. <br></br><a href = "mailto:ejvoll@umich.edu">Get in Touch.</a>
                   </p>
                    {/*<div className = "me-list">
                      <li><a href={Assets["Resume_doc"]} download = "Evan's_Resume_2020">Resume</a></li>
                      <li><a><Link to ="/Archive">Archive</Link></a></li>

                      </div>*/}
                    </div>

                  <div className = "meimage" ref={ homeimage => this.homeimage = homeimage}>
                    <p className = "about-me-second">Code Graphic Industrial</p>
                  </div>



                    <div className = "contact-list">
                      <li><a href={Assets["Resume_doc"]} download = "Evan's_Resume_2021">Resume</a></li>
                      <li><a href = "https://www.instagram.com/evanvo_/">Instagram</a></li>
                      <li><a href = "https://www.behance.net/evanvollick" traget = "_blank"> Behance </a></li>
                      <li><a href = "https://www.linkedin.com/in/evan-vo/" traget = "_blank"> LinkedIn</a></li>
                      <li><a href = "https://github.com/evievo" traget = "_blank">GitHub</a> </li>
                    </div>

                  <div className = "resume-archive">

                  </div>

                  <div id="footer">
                    <div onMouseEnter = {() => this.topEnter()} onMouseLeave = {() => this.topLeave()} onClick={()=>this.scrollTo(this.page)}>
                      <img src={Assets["Top"]} alt="top Button" className="top-button" />
                    </div>
                    <span className ="bar"></span>
                    <div className = "copyright">© 2022</div>
                    <div className = "footer-name">EVAN<i>(VO)</i></div>
                  </div>




                </div>
                </div>
{/*

                <div className = "skills" onClick ={() => this.skillsClick()}>
                  <p className = "skills-p"
                     onMouseEnter = {() => this.listHover(".skills-p")}
                     onMouseLeave = {() => this.listLeave(".skills-p")}>
                    <span className = "left">
                      <div className= "move-text">SKILLS</div>
                    </span>
                    <p className= "mask">Skills</p>
                  </p>

                  <div className= "skillslist">
                    {this.state.showSkills ? this.skillsReturn() : null}
                  </div>


                </div>

                <div className = "process" onClick={() => this.processClick()}>
                  <p className = "process-p"
                     onMouseEnter = {() => this.listHover(".process-p")}
                     onMouseLeave = {() => this.listLeave(".process-p")}>
                    <span className = "left">
                      <div className= "move-text">PROCESS</div>
                    </span>
                    <p className= "mask">Process</p>
                  </p>
                  <div className="processlist">
                    {this.state.showProcess ? this.processReturn() : null}
                  </div>


                </div>
              </div>*/}

              {/*<div id="contact" ref={ contact => this.contact = contact }>
                <div className = "contact-block">
                  <div className = "contact-header">
                    <span></span>
                      <h3>Hire Me</h3>
                  </div>
                  <div className = "contact-me">
                    <p>Currently seaching for a full-time postion. Accepting freelance work as well...email for inquries </p>
                  </div>


                </div>

              </div>*/}



            </div>

          <Switch>
            <Route path='/archive' render ={() => <Archive init = {true}/>}/>
            <Route path={`/projects/:projectId`} component={ProjectPage}/>
          </Switch>
         </div>
      </div>
      </BrowserRouter>

    );
  }
}



export default withRouter(Main);
