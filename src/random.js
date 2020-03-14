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
