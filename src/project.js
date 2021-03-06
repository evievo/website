
import coasters from './images/thumbnails/CoastersThumbnail.jpg'
import clock from './images/thumbnails/ThumbnailClock.jpg'
import ggbl from './images/thumbnails/ThumbnailGGBL.jpg'
import ember from './images/thumbnails/ThumbnailEmber.jpg'
import groovie from './images/thumbnails/ThumbnailGroovie.jpg'
import groovieData from './projectPages/groovie.js'
import hoop from './images/thumbnails/HoopHaven.jpg'
import pages from './images/thumbnails/Pages.jpg'
import chair from './images/thumbnails/chair.jpg'

  var data = []
  data[0] = {
              stuff: "hi"
            };


  var projects = [];
  projects[1] = {Title: "Industrial Coasters",
                 Bio: "",
                 Year: "2019",
                 Thumbnail: coasters,
                 Archived: false,
                 Category: "Graphic/Industrial",
                 Data: data[0],
                 Url: "https://www.behance.net/gallery/93917927/Industrial-Coasters",
               };

  projects[4] = {Title: "PlayTime",
                 Bio: "",
                 Year: "2019",
                 Thumbnail: clock,
                 Archived: false,
                 Category: "Graphic/Industrial",
                 Data: data[0],
                 Url: "https://www.behance.net/gallery/93917691/Play-Time-Clock",
               };

  projects[2] = {Title: "GGBL",
                 Bio: "",
                 Year: "2019",
                 Thumbnail: ggbl,
                 Archived: false,
                 Category: "Graphic",
                 Data: data[0],
                 Url: "https://www.behance.net/gallery/93918041/GGBL-Wayfinding",
               };

  projects[3] = {Title: "ember",
                 Bio: "",
                 Year: "2019",
                 Thumbnail: ember,
                 Archived: false,
                 Category: "Industrial",
                 Data: data[0],
                 Url: "https://www.behance.net/gallery/93734863/ember-a-urn-for-your-data"
                };

  projects[0] = {Title: "groovie",
                 Bio: "Groovie is a product designed to help elementray kids devolp a healthy realtionship with technology. After conducting studies, ideations, focus groups, and prototypping we settled on honing in on moderating technology in a fun, empowing, and healthy way.",
                 Year: "2019",
                 Thumbnail: groovie,
                 Archived: false,
                 Category: "industrial/UX",
                 Data: groovieData,
                 Url: "https://www.behance.net/gallery/93848625/Groovie"
                };

  projects[6] = {Title: "Pages",
                 Bio: "",
                 Year: "2019",
                 Thumbnail: pages,
                 Archived: false,
                 Category: "UI/UX",
                 Data: data[0],
                 Url: "",
                };

  projects[5] = {Title: "Hoop Haven",
                 Bio: "",
                 Year: "2019",
                 Thumbnail: hoop,
                 Archived: false,
                 Category: "industrial",
                 Data: data[0],
                 Url: "https://www.behance.net/gallery/93918271/Hoop-Haven",
                };

  projects[7] = {Title: "Dagligdags Chair",
                 Bio: "",
                 Year: "2019",
                 Thumbnail: chair,
                 Archived: false,
                 Category: "industrial",
                 Data: data[0],
                 Url: "https://www.behance.net/gallery/93920075/Dagligdags-Chair",
                };

  for (let i = 0; i < projects.length; i++){
    if(i > 4){
      projects[i]['Archived'] = true;
    }
  }

export default projects;
