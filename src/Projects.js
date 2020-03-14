import React from 'react';
import {BrowserRouter, withRouter, Link, Route} from "react-router-dom";
import Projects from "./project.js";
import Assets from "./assets.js";
import { Power1, Power3, Bounce, Back, TimelineLite, TweenMax, TimelineMax } from "gsap";


class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    let w = window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
    let h = window.innerHeight;
    this.state = {
      projects:[],
      width: w,
      height: h,
      url: this.props.location.pathname,
      project: "",
      number: "",
      data: [],
    };
  }

  async componentDidMount(){
    try {
      let url = this.state.url.split("/");
      let end = url[url.length - 1].split(":");
      this.setState({
        projects: Projects,
        project: end[1],
        number: parseInt(end[0])
      }, () => this.handleUrl());


    }
    catch(error){
      alert(error);
    }
  }

  handleUrl(){
    if (this.checkVaild()){
      this.setState({data: this.state.projects[this.state.number - 1]["Data"]});

      return;
    }
    else{
      window.location= "/"
    }
  }

  checkVaild(){
    let num = this.state.number - 1;
    if(this.state.projects[num]['Title'] === this.state.project){
      return true;
    }
    return false;
  }

  changeProj(num){
    window.location = "/projects/" + (num) + ":" + this.state.projects[num - 1]['Title'];
  }

  exit(){
      window.location = "/";
  }

  dataReturn(proj_data, i){

    if (!proj_data['use']) {return(<div></div>);}

    if (proj_data['type'] === 'pic'){

      return(
        <div>
          <div className = "pic-container">

            <div className = "pic-box" ref = {pic_box => this['picbox_' + i] = pic_box}>
              <img className = "pic"
                   src={proj_data['pic']}
                   alt={proj_data['pic'] + '_' + i}
                   ref = {pic => this['pic' + i] = pic}/>
             </div>

             <div className = "description" ref = {description => this['description_' + i] = description}>
               {proj_data['description']}
             </div>

          </div>
        </div>
      );
    }
    else if (proj_data['type'] === 'text'){

      return(
        <div>
        </div>
      );
    }
    else if (proj_data['type'] === 'both'){

      return(
        <div>
        </div>
      );
    }
  }

  footerReturn(next){
    let n = this.state.number;
    let dir = "";
    if ((n === 1 && (!next)) || (n === this.state.projects.length && next)){
      return(
        <div>
        </div>
      );
    }
    if(next){
      n = n + 1;
      dir = "right";
    }
    else{
      n = n - 1;
      dir = "left";
    }
    return (
      <div>
      <div className="arrow"
           ref = {arrow => this['arrow_' + dir] = arrow}
           style={{backgroundImage: "url(" + Assets['Arrow_right'] + ")"}}
           onClick = {() => this.changeProj(n)}/>
      <h3>{this.state.projects[n - 1]['Title']}</h3>
      <h3 >{n}</h3>
      </div>
    );
  }

  render() {
    if (this.state.data.length === 0) {
            return <div className = "failed" />
        }
    let data = this.state.data;
    var num = this.state.number - 1;

    return (

      <div>
        <div id = "project-page">
          <div className = "project-header">
            <div className = "project-x"
                 onClick= {()=> this.exit()}
                 style = {{backgroundImage: "url(" + Assets['Arrow_white'] + ")"}}>
            </div>
            <div className = "project-title" >{this.state.project}</div>
            <div className = "project-details">

              <div className = "project-number" >{this.state.number}</div>
              <div className = "project-category" >{this.state.projects[num]['Category']}</div>
              <div className = "project-year" >{this.state.projects[num]['Year']}</div>
            </div>


          </div>
          <div className = "project-body">


            <div className = "project-thumbnail">
              <img src = {this.state.projects[num]['Thumbnail']} alt= "firstpic"/>
            </div>
            {/*<div className = "bio" >Breif: {this.state.projects[num]['Bio']}</div>*/}
            <div className = "project-content">


              { Object.keys(this.state.data).map((item, i) => {
                return(
                  <div className = "data-container"
                       key = {'data_' + i}
                       ref = { proj => this['data_' + i] = data }>
                       {this.dataReturn(this.state.data[i], i)}
                  </div>
                )
              })}
              <div className = "project-footer">
                <div className = "next-project" >
                  {this.footerReturn(true)}

                </div>
                <div className = "prev-project">
                  {this.footerReturn(false)}
                </div>
              </div>
            </div>

          </div>




        </div>


      </div>

    );

  }
}

export default withRouter(ProjectPage);
