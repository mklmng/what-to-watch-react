(this["webpackJsonpwhat-to-watch-react"]=this["webpackJsonpwhat-to-watch-react"]||[]).push([[0],{21:function(e,t,a){e.exports=a(45)},26:function(e,t,a){},44:function(e,t,a){},45:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(16),c=a.n(l),s=(a(26),a(6)),i=a(1),m=a(2),o=a(4),d=a(3),u=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("header",null,r.a.createElement("h1",{className:"header-main"},"What to Watch"),r.a.createElement("div",{id:"theme-switcher",onChange:function(){return e.props.switchTheme()}},r.a.createElement("label",{htmlFor:"theme"},this.props.nightTheme&&"Night ",!this.props.nightTheme&&"Day ","theme"),r.a.createElement("input",{type:"checkbox",name:"theme",id:"theme"})))}}]),a}(n.Component),h=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-12"},r.a.createElement("div",{id:"filter-watched",className:"film-filter centered"},r.a.createElement("label",{htmlFor:"watched"},"Hide films I have watched"),r.a.createElement("input",{type:"checkbox",name:"watched",id:"watched",onChange:function(){return e.props.handleFilterByWatched()}}))))}}]),a}(n.Component),p=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-12"},r.a.createElement("div",{id:"filter-runtime",className:"film-filter"},r.a.createElement("div",{id:"runtimes"},r.a.createElement("h2",{className:"filter-header"},"How much time do you have?"),r.a.createElement("div",{id:"runtimes-filters",onChange:function(t){return e.props.handleFilterByRuntime(t)}},r.a.createElement("div",{className:"runtime-filter"},r.a.createElement("input",{type:"radio",className:"film-times",name:"runtime",id:"runtime-90",value:"90"}),r.a.createElement("label",{htmlFor:"runtime-90"},"1h 30min")),r.a.createElement("div",{className:"runtime-filter"},r.a.createElement("input",{type:"radio",className:"film-times",name:"runtime",id:"runtime-120",value:"120"}),r.a.createElement("label",{htmlFor:"runtime-120"},"2h")),r.a.createElement("div",{className:"runtime-filter"},r.a.createElement("input",{type:"radio",className:"film-times",name:"runtime",id:"runtime-150",value:"150"}),r.a.createElement("label",{htmlFor:"runtime-150"},"2h 30min")),r.a.createElement("div",{className:"runtime-filter"},r.a.createElement("input",{type:"radio",className:"film-times",name:"runtime",id:"runtime-180",value:"180"}),r.a.createElement("label",{htmlFor:"runtime-180"},"3h")),r.a.createElement("div",{className:"runtime-filter"},r.a.createElement("input",{type:"radio",className:"film-times",name:"runtime",id:"runtime-all",value:"9999"}),r.a.createElement("label",{htmlFor:"runtime-all"},"All the time in world")))))))}}]),a}(n.Component),E=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-12"},r.a.createElement("div",{id:"filter-decades",className:"film-filter"},r.a.createElement("h2",{className:"filter-header"},"Which era are you interested on?"),r.a.createElement("div",{className:"decades-filters"},r.a.createElement("label",{htmlFor:"oldest-decade",className:"decades-filters__label"},"From"),r.a.createElement("select",{name:"decades",id:"oldest-decade",defaultValue:"1960",onChange:function(t){return e.props.handleFilterByDecade(t)}},r.a.createElement("option",{value:"1960"},"1960s"),r.a.createElement("option",{value:"1970"},"1970s"),r.a.createElement("option",{value:"1980"},"1980s"),r.a.createElement("option",{value:"1990"},"1990s"),r.a.createElement("option",{value:"2000"},"2000s"),r.a.createElement("option",{value:"2010"},"2010s")),r.a.createElement("label",{htmlFor:"newest-decade",className:"decades-filters__label"},"To"),r.a.createElement("select",{name:"decades",id:"newest-decade",defaultValue:"2010",onChange:function(t){return e.props.handleFilterByDecade(t)}},r.a.createElement("option",{value:"1960"},"1960s"),r.a.createElement("option",{value:"1970"},"1970s"),r.a.createElement("option",{value:"1980"},"1980s"),r.a.createElement("option",{value:"1990"},"1990s"),r.a.createElement("option",{value:"2000"},"2000s"),r.a.createElement("option",{value:"2010"},"2010s"))))))}}]),a}(n.Component),v=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={expanded:!1},e}return Object(m.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-12"},r.a.createElement("div",{id:"filter-genres",className:"film-filter"},r.a.createElement("h2",{className:"filter-header"},"What genres do you like?"),r.a.createElement("div",{id:"main-genres",onChange:function(t){return e.props.handleFilterByGenre(t)}},r.a.createElement("div",{className:"genre-selector"},r.a.createElement("input",{id:"action",type:"checkbox",className:"genre-items",value:"action"}),r.a.createElement("label",{htmlFor:"action"},"action")),r.a.createElement("div",{className:"genre-selector"},r.a.createElement("input",{id:"comedy",type:"checkbox",className:"genre-items",value:"comedy"}),r.a.createElement("label",{htmlFor:"comedy"},"comedy")),r.a.createElement("div",{className:"genre-selector"},r.a.createElement("input",{id:"drama",type:"checkbox",className:"genre-items",value:"drama"}),r.a.createElement("label",{htmlFor:"drama"},"drama")),r.a.createElement("div",{className:"genre-selector"},r.a.createElement("input",{id:"horror",type:"checkbox",className:"genre-items",value:"horror"}),r.a.createElement("label",{htmlFor:"horror"},"horror")),r.a.createElement("div",{className:"genre-selector"},r.a.createElement("input",{id:"sci-fi",type:"checkbox",className:"genre-items",value:"sci-fi"}),r.a.createElement("label",{htmlFor:"sci-fi"},"sci-fi"))),r.a.createElement("span",{className:"cta-expand ".concat(this.state.expanded&&"expanded"),onClick:function(){return e.setState({expanded:!e.state.expanded})}},"See all genres"),r.a.createElement("div",{id:"extra-genres",onChange:function(t){return e.props.handleFilterByGenre(t)}},r.a.createElement("div",{className:"genre-selector"},r.a.createElement("input",{id:"adventure",type:"checkbox",className:"genre-items",value:"adventure"}),r.a.createElement("label",{htmlFor:"adventure"},"adventure")),r.a.createElement("div",{className:"genre-selector"},r.a.createElement("input",{id:"animation",type:"checkbox",className:"genre-items",value:"animation"}),r.a.createElement("label",{htmlFor:"animation"},"animation")),r.a.createElement("div",{className:"genre-selector"},r.a.createElement("input",{id:"biography",type:"checkbox",className:"genre-items",value:"biography"}),r.a.createElement("label",{htmlFor:"biography"},"biography")),r.a.createElement("div",{className:"genre-selector"},r.a.createElement("input",{id:"crime",type:"checkbox",className:"genre-items",value:"crime"}),r.a.createElement("label",{htmlFor:"crime"},"crime")),r.a.createElement("div",{className:"genre-selector"},r.a.createElement("input",{id:"documentary",type:"checkbox",className:"genre-items",value:"documentary"}),r.a.createElement("label",{htmlFor:"documentary"},"documentary")),r.a.createElement("div",{className:"genre-selector"},r.a.createElement("input",{id:"fantasy",type:"checkbox",className:"genre-items",value:"fantasy"}),r.a.createElement("label",{htmlFor:"fantasy"},"fantasy")),r.a.createElement("div",{className:"genre-selector"},r.a.createElement("input",{id:"history",type:"checkbox",className:"genre-items",value:"history"}),r.a.createElement("label",{htmlFor:"history"},"history")),r.a.createElement("div",{className:"genre-selector"},r.a.createElement("input",{id:"music",type:"checkbox",className:"genre-items",value:"music"}),r.a.createElement("label",{htmlFor:"music"},"music")),r.a.createElement("div",{className:"genre-selector"},r.a.createElement("input",{id:"musical",type:"checkbox",className:"genre-items",value:"musical"}),r.a.createElement("label",{htmlFor:"musical"},"musical")),r.a.createElement("div",{className:"genre-selector"},r.a.createElement("input",{id:"mystery",type:"checkbox",className:"genre-items",value:"mystery"}),r.a.createElement("label",{htmlFor:"mystery"},"mystery")),r.a.createElement("div",{className:"genre-selector"},r.a.createElement("input",{id:"romance",type:"checkbox",className:"genre-items",value:"romance"}),r.a.createElement("label",{htmlFor:"romance"},"romance")),r.a.createElement("div",{className:"genre-selector"},r.a.createElement("input",{id:"sci-Fi",type:"checkbox",className:"genre-items",value:"sci-Fi"}),r.a.createElement("label",{htmlFor:"sci-Fi"},"sci-Fi")),r.a.createElement("div",{className:"genre-selector"},r.a.createElement("input",{id:"sport",type:"checkbox",className:"genre-items",value:"sport"}),r.a.createElement("label",{htmlFor:"sport"},"sport")),r.a.createElement("div",{className:"genre-selector"},r.a.createElement("input",{id:"thriller",type:"checkbox",className:"genre-items",value:"thriller"}),r.a.createElement("label",{htmlFor:"thriller"},"thriller")),r.a.createElement("div",{className:"genre-selector"},r.a.createElement("input",{id:"war",type:"checkbox",className:"genre-items",value:"war"}),r.a.createElement("label",{htmlFor:"war"},"war"))))))}}]),a}(n.Component),g=a(17),f=a.n(g),b=a(20),y=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){var e=this.props.genres.join(", "),t=this.props.director.length>1?this.props.director.join(", "):this.props.director,a=function(e){var t=e/60;return e<60?"".concat(e,"mins"):e%60>0?"".concat(Math.floor(t),"h ").concat(e%60,"mins"):"".concat(t,"h")}(this.props.runtime);return r.a.createElement(n.Fragment,null,r.a.createElement("div",{className:"col-md-4",key:this.props.id},r.a.createElement("div",{className:"card mb-4 box-shadow"},r.a.createElement("img",{className:"card-img-top",src:"https://via.placeholder.com/336x255?text=".concat(this.props.title),alt:this.props.title}),r.a.createElement("div",{className:"card-body"},r.a.createElement("p",{className:"card-text"},r.a.createElement("span",null,"Title: ")," ",this.props.title),r.a.createElement("p",{className:"card-text"},r.a.createElement("span",null,"Year: ")," ",this.props.year),r.a.createElement("p",{className:"card-text"},r.a.createElement("span",null,"Director: ")," ",t),r.a.createElement("p",{className:"card-text"},r.a.createElement("span",null,"Genres: ")," ",e),r.a.createElement("p",{className:"card-text"},r.a.createElement("span",null,"Runtime: ")," ",a),r.a.createElement("div",{className:"d-flex justify-content-between align-items-center"},r.a.createElement("div",{className:"btn-group"},r.a.createElement("a",{href:"https://www.justwatch.com/uk/movie/".concat(this.props.whereToWatch),className:"btn btn-sm btn-outline-secondary"},"Watch Film")))))))}}]),a}(n.Component),N=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={films:[],loading:!1},e}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.setState({loading:!0},(function(){f.a.get("https://gist.githubusercontent.com/mklmng/fa894dc9c86dfed34e45063adcf1b73e/raw/aaebe9185fbb4b1ebcaf5343335168c9d2898f9a/Films.json").then((function(t){e.setState({films:t.data,loading:!1})})).catch((function(t){e.setState({loading:!1})}))}))}},{key:"render",value:function(){var e=this,t=this.state.films.filter((function(t){return t.runtime<=e.props.runtime&&t.runtime<=e.props.runtime&&t.year>=e.props.oldestDecade&&t.year<=e.props.newestDecade+9}));return this.props.hideWatched&&(t=t.filter((function(t){return t.watched===!e.props.hideWatched}))),this.props.genres.length&&(t=t.filter((function(t){return t.genres.some((function(t){return e.props.genres.includes(t)}))}))),r.a.createElement(n.Fragment,null,r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-12"},r.a.createElement("div",{id:"results"},t.length>1&&r.a.createElement("span",null,"There are ",r.a.createElement("strong",null,t.length)," matches."),1===t.length&&r.a.createElement("span",null,"There is ",r.a.createElement("strong",null,"1")," match."),!t.length&&r.a.createElement("span",null,"Sorry, there aren't any matches.")))),r.a.createElement("div",{className:"row"},this.state.loading&&r.a.createElement(b.a,{animation:"border",role:"status"},r.a.createElement("span",{className:"sr-only"},"Loading...")),t.map((function(e){return r.a.createElement(y,{key:e.id,id:e.id,title:e.title,year:e.year,director:e.director,genres:e.genres,runtime:e.runtime,whereToWatch:e.whereToWatch,trailer:e.trailer})}))))}}]),a}(n.Component),w=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){return r.a.createElement("footer",null,r.a.createElement("small",null,"Work in progress. New features coming soon."))}}]),a}(n.Component),F=(a(44),function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).switchTheme=function(){return n.setState({nightTheme:!n.state.nightTheme})},n.handleFilterByWatched=function(){return n.setState({hideWatched:!n.state.watched})},n.handleFilterByRuntime=function(e){return n.setState({runtime:parseInt(e.target.value)})},n.handleFilterByDecade=function(e){var t=parseInt(e.target.value),a=e.target.selectedIndex;"oldest-decade"===e.target.id&&(t>n.state.newestDecade?(n.setState({oldestDecade:t,newestDecade:t}),document.querySelector("#newest-decade").selectedIndex=a):n.setState({oldestDecade:t})),"newest-decade"===e.target.id&&(e.target.value>=n.state.oldestDecade?n.setState({newestDecade:t}):(n.setState({newestDecade:n.state.oldestDecade}),document.querySelector("#newest-decade").selectedIndex=document.querySelector("#oldest-decade").selectedIndex))},n.handleFilterByGenre=function(e){var t=e.target.value;if(n.state.genres.includes(t)){var a=Object(s.a)(n.state.genres),r=a.indexOf(e.target.value);a.splice(r,1),n.setState({genres:a})}else n.setState({genres:[].concat(Object(s.a)(n.state.genres),[t])})},n.state={nightTheme:!1,runtime:9999,oldestDecade:1960,newestDecade:2010,hideWatched:!1,genres:[]},n}return Object(m.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{id:"full-wrapper",className:"".concat(this.state.nightTheme&&"dark")},r.a.createElement("link",{rel:"stylesheet",href:"https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css",integrity:"sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk",crossOrigin:"anonymous"}),r.a.createElement(u,{nightTheme:this.state.nightTheme,switchTheme:this.switchTheme}),r.a.createElement("div",{className:"container"},r.a.createElement(h,{handleFilterByWatched:this.handleFilterByWatched}),r.a.createElement(p,{handleFilterByRuntime:this.handleFilterByRuntime}),r.a.createElement(v,{handleFilterByGenre:this.handleFilterByGenre}),r.a.createElement(E,{handleFilterByDecade:this.handleFilterByDecade}),r.a.createElement(N,{hideWatched:this.state.hideWatched,runtime:this.state.runtime,oldestDecade:this.state.oldestDecade,newestDecade:this.state.newestDecade,genres:this.state.genres})),r.a.createElement(w,null))}}]),a}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(F,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[21,1,2]]]);
//# sourceMappingURL=main.6835218e.chunk.js.map