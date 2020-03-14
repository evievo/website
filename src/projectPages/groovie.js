

import one from './grooviePics/one.png';
import two from './grooviePics/two.png';
import three from './grooviePics/three.jpg';



/*
TEMPLATE:
let entry = {
  use: true,
  type: "",
  size: -1,
  description: "",
  pic: "",
  text: "",
}*/

var groovieData = [];

    //
    groovieData.push({
      use: true,
      type: "pic",
      description: "pic one!",
      pic: one,
    })

    //
    groovieData.push({
      use: true,
      type: "pic",
      description: "blah blah blah",
      pic: two,
    })

    groovieData.push({
      use: true,
      type: "pic",
      description: "THREEEEEEEEE",
      pic: three,
    })

    groovieData.push({
      use: true,
      type: "text",
      text: "This project was such a learning expereince. From working in teams, to pitching our ideas to indusrty innovators i learned a lot about what it takes to brinng a product to market",
    })






export default groovieData
