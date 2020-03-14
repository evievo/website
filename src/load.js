import React from 'react';
import Assets from "./assets.js"
import { Power1, Power3, Bounce, Back, TimelineLite, TweenMax, TimelineMax } from "gsap";

var loadTl = new TimelineMax();

class Load extends React.Component {
  constructor(props) {
    super(props);
    let w = window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
    let h = window.innerHeight;
    this.state = {
      width: w,
      height: h,
      reversed: this.props.reverse,

    };
  }


  componentDidMount(){
    if(!this.state.reversed){
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
    loadTl.resume();
  }
  else{
    loadTl.reverse();
  }

  }


render() {
  return (
    <div>
    <div className = "load" ref ={ load => this.load = load }>
      <img src = {Assets["Logo_outlines"]} alt = "logo outline load" ref={ logo_outline_load => this.logo_outline_load = logo_outline_load}/>
      <img src = {Assets["Logo_filled"]} alt = "logo filled load" ref={ logo_filled_load => this.logo_filled_load = logo_filled_load}/>
    </div>
    </div>
  );
}
}
export default Load;
