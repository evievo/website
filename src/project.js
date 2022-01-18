
import coasters from './images/thumbnails/CoastersThumbnail.jpg'
import clock from './images/thumbnails/ThumbnailClock.jpg'
import ggbl from './images/thumbnails/ThumbnailGGBL.jpg'
import ember from './images/thumbnails/ThumbnailEmber.jpg'
import groovie from './images/thumbnails/ThumbnailGroovie.png'
import groovieData from './projectPages/groovie.js'
import hoop from './images/thumbnails/HoopHaven.jpg'
import pages from './images/thumbnails/Pages.jpg'
import chair from './images/thumbnails/chair.jpg'
import oldtimers from './images/thumbnails/NoOldtimers.jpg'
import marks from './images/thumbnails/MarksAndSuch.png'
import navstar from './images/thumbnails/GPStony.jpg'

  var data = []
  data[0] = {
              stuff: "hi"
            };


  var projects = [];
  projects[7] = {Title: "Industrial Coasters",
                 Bio: "",
                 Year: "2019",
                 Thumbnail: coasters,
                 Archived: false,
                 Category: "Graphic/Industrial",
                 Data: data[0],
                 Url: "https://www.behance.net/gallery/93917927/Industrial-Coasters",
               };

  projects[3] = {Title: "PlayTime",
                 Bio: "",
                 Year: "2019",
                 Thumbnail: clock,
                 Archived: false,
                 Category: "Graphic/Industrial",
                 Data: data[0],
                 Url: "https://www.behance.net/gallery/93917691/Play-Time-Clock",
               };

  projects[4] = {Title: "GGBL",
                 Bio: "",
                 Year: "2019",
                 Thumbnail: ggbl,
                 Archived: false,
                 Category: "Graphic",
                 Data: data[0],
                 Url: "https://www.behance.net/gallery/93918041/GGBL-Wayfinding",
               };

  projects[5] = {Title: "ember",
                 Bio: "",
                 Year: "2019",
                 Thumbnail: ember,
                 Archived: false,
                 Category: "Industrial",
                 Data: data[0],
                 Url: "https://www.behance.net/gallery/93734863/ember-a-urn-for-your-data"
                };

  projects[6] = {Title: "groovie",
                 Bio: "Groovie is a product designed to help elementray kids devolp a healthy realtionship with technology. After conducting studies, ideations, focus groups, and prototypping we settled on honing in on moderating technology in a fun, empowing, and healthy way.",
                 Year: "2019",
                 Thumbnail: groovie,
                 Archived: false,
                 Category: "industrial/UX",
                 Data: groovieData,
                 Url: "https://www.behance.net/gallery/93848625/Groovie"
                };

  projects[9] = {Title: "Pages",
                 Bio: "",
                 Year: "2019",
                 Thumbnail: pages,
                 Archived: false,
                 Category: "UI/UX",
                 Data: data[0],
                 Url: "",
                };

  projects[10] = {Title: "Hoop Haven",
                 Bio: "",
                 Year: "2019",
                 Thumbnail: hoop,
                 Archived: false,
                 Category: "industrial",
                 Data: data[0],
                 Url: "https://www.behance.net/gallery/93918271/Hoop-Haven",
                };

  projects[8] = {Title: "Dagligdags Chair",
                 Bio: "",
                 Year: "2019",
                 Thumbnail: chair,
                 Archived: false,
                 Category: "industrial",
                 Data: data[0],
                 Url: "https://www.behance.net/gallery/93920075/Dagligdags-Chair",
                };

  projects[1] = {Title: "No Old-Timers",
                 Bio: "",
                 Year: "2021",
                 Thumbnail: oldtimers,
                 Archived: false,
                 Category: "graphic",
                 Data: data[0],
                 Url: "https://www.behance.net/gallery/135241531/No-Old-Timers",
                };
  projects[0] = {Title: "Marks and Such",
                 Bio: "",
                 Year: "2021",
                 Thumbnail: marks,
                 Archived: false,
                 Category: "graphic",
                 Data: data[0],
                 Url: "https://www.behance.net/gallery/135317397/Marks-and-Such-2020-2022",
                };
  projects[2] = {Title: "NAV STAR",
                 Bio: "",
                 Year: "2021",
                 Thumbnail: navstar,
                 Archived: false,
                 Category: "graphic",
                 Data: data[0],
                 Url: "https://www.behance.net/gallery/97591261/GPS-TONY-NAV-STAR-EP",
                };



  for (let i = 0; i < projects.length; i++){
    if(i > 8){
      projects[i]['Archived'] = true;
    }
  }

export default projects;
