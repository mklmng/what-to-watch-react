(this["webpackJsonpwhat-to-watch-react"]=this["webpackJsonpwhat-to-watch-react"]||[]).push([[0],{21:function(e,t,a){e.exports=a(45)},26:function(e,t,a){},44:function(e,t,a){},45:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),l=a(16),i=a.n(l),s=(a(26),a(6)),c=a(1),d=a(2),o=a(4),m=a(3),u=a(17),h=a.n(u),f=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){var e=this.props,t=e.handleToggleOverlay,a=e.trailer;return n.a.createElement("div",{id:"overlay",onClick:function(){return t()}},n.a.createElement("div",{className:"overlay__wrapper"},n.a.createElement("div",{className:"overlay__wrapper__video-container"},n.a.createElement("iframe",{title:a,itemProp:"trailer",className:"overlay__wrapper__video-container__video",width:"560",height:"315",src:"https://www.youtube-nocookie.com/embed/".concat(a),frameBorder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0}))))}}]),a}(r.Component),g=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){return n.a.createElement("div",{className:"col-12 col-md-6 col-lg-6"},n.a.createElement("header",{id:"main-header"},n.a.createElement("h1",{className:"header-main"},"What to Watch")))}}]),a}(r.Component),p=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){var e=this.props,t=e.handleChange,a=e.searchText,r=e.handleAutocomplete,l=e.handleSubmit,i=e.showFilm,s=e.suggestedFilms;return n.a.createElement("div",{className:"col-12 col-md-6 col-lg-4 search-box"},n.a.createElement("div",{className:"search-box__container"},n.a.createElement("form",{onSubmit:l},n.a.createElement("label",{htmlFor:"search",className:"hidden"},"Search"),n.a.createElement("input",{placeholder:"Enter film title",id:"search","aria-label":"search",type:"text",value:a,onChange:t,onKeyUp:r,autoComplete:"off"}),n.a.createElement("div",{className:"btn-wrapper"},n.a.createElement("input",{className:"btn-search",type:"submit",value:"Search"})),s.length>0&&n.a.createElement("ul",{className:"autocomplete"},s.map((function(e,t){return n.a.createElement("li",{onClick:function(){return i(e.id)},className:"film-suggestion",key:e.id},e.title," ",n.a.createElement("span",null,"(",e.year,")"))}))))))}}]),a}(r.Component),b=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){var e=this.props,t=e.runtime,a=e.runtimeText,r=e.runtimeId,l=!1;return t===e.selectedRuntime.toString()&&(l=!0),n.a.createElement("div",{className:"runtime-filter"},n.a.createElement("input",{type:"radio",className:"film-times",name:"runtime",id:r,value:t,defaultChecked:l}),n.a.createElement("label",{htmlFor:r},a))}}]),a}(r.Component),y=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(c.a)(this,a);for(var r=arguments.length,n=new Array(r),l=0;l<r;l++)n[l]=arguments[l];return(e=t.call.apply(t,[this].concat(n))).state={runtimes:[{runtime:"90",runtimeId:"runtime-90",runtimeText:"1h 30min"},{runtime:"120",runtimeId:"runtime-120",runtimeText:"2h"},{runtime:"150",runtimeId:"runtime-150",runtimeText:"2h 30min"},{runtime:"180",runtimeId:"runtime-180",runtimeText:"3h"},{runtime:"9999",runtimeId:"runtime-all",runtimeText:"All the time in world"}]},e}return Object(d.a)(a,[{key:"render",value:function(){var e=this.props,t=e.runtime,a=e.handleFilterByRuntime;return n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-md-12"},n.a.createElement("div",{id:"filter-runtime",className:"film-filter"},n.a.createElement("div",{id:"runtimes"},n.a.createElement("h2",{className:"filter-header"},"How much time do you have?"),n.a.createElement("div",{id:"runtimes-filters",onChange:function(e){return a(e)}},this.state.runtimes.map((function(e,a){return n.a.createElement(b,{key:a,runtime:e.runtime,runtimeId:e.runtimeId,runtimeText:e.runtimeText,selectedRuntime:t})})))))))}}]),a}(r.Component),v=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){return n.a.createElement("option",{value:this.props.decade},this.props.decade)}}]),a}(r.Component),E=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(c.a)(this,a);for(var r=arguments.length,n=new Array(r),l=0;l<r;l++)n[l]=arguments[l];return(e=t.call.apply(t,[this].concat(n))).state={decades:[1960,1970,1980,1990,2e3,2010]},e}return Object(d.a)(a,[{key:"render",value:function(){var e=this.props,t=e.handleFilterByDecade,a=e.oldestDecade,r=e.newestDecade,l=this.state.decades;return n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-md-12"},n.a.createElement("div",{id:"filter-decades",className:"film-filter"},n.a.createElement("h2",{className:"filter-header"},"Which era are you interested on?"),n.a.createElement("div",{className:"decades-filters"},n.a.createElement("label",{htmlFor:"oldest-decade",className:"decades-filters__label"},"From"),n.a.createElement("select",{name:"decades",id:"oldest-decade",defaultValue:a,onChange:function(e){return t(e)}},l.map((function(e,t){return n.a.createElement(v,{key:t,decade:e})}))),n.a.createElement("label",{htmlFor:"newest-decade",className:"decades-filters__label"},"To"),n.a.createElement("select",{name:"decades",id:"newest-decade",defaultValue:r,onChange:function(e){return t(e)}},l.map((function(e,t){return n.a.createElement(v,{key:t,decade:e})})))))))}}]),a}(r.Component),F=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){var e=this.props,t=e.genre,a=e.genres,r=a.some((function(e){return a.includes(t)}));return n.a.createElement("div",{className:"genre-selector"},n.a.createElement("input",{id:this.props.genre,defaultChecked:r,type:"checkbox",className:"genre-items",value:this.props.genre}),n.a.createElement("label",{htmlFor:this.props.genre},this.props.genre))}}]),a}(r.Component),w=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(c.a)(this,a),(r=t.call(this,e)).state={expanded:!1},r.genresRef=n.a.createRef(),r}return Object(d.a)(a,[{key:"render",value:function(){var e=this,t=this.props,a=t.handleFilterByGenre,r=t.mainGenres,l=t.extraGenres,i=t.genres;return n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-md-12"},n.a.createElement("div",{id:"filter-genres",className:"film-filter"},n.a.createElement("h2",{className:"filter-header"},"Which genres do you like?"),n.a.createElement("div",{id:"main-genres",onChange:function(e){return a(e)}},r.map((function(e,t){return n.a.createElement(F,{key:t,genre:e,genres:i})}))),n.a.createElement("span",{className:"cta-expand ".concat(this.state.expanded?"expanded":""),onClick:function(){return function(t){e.setState({expanded:!e.state.expanded});var a=t.current.getBoundingClientRect();window.scrollTo(0,Math.round(a.y))}(e.genresRef)}},"See all genres"),n.a.createElement("div",{id:"extra-genres",ref:this.genresRef,onChange:function(e){return a(e)}},l.map((function(e,t){return n.a.createElement(F,{key:t,genre:e,genres:i})}))))))}}]),a}(r.Component),N=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){var e=this.props,t=e.handleFilterByWatched,a=e.hideWatched;return n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-md-12 centered"},n.a.createElement("div",{id:"filter-watched",className:"film-filter centered"},n.a.createElement("button",{type:"button",className:"btn btn-sm btn-outline-secondary",onClick:function(){return t()}},a?"Show":"Hide"," watched"))))}}]),a}(r.Component),x=a(20),T=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){var e=this.props,t=e.id,a=e.title,l=e.year,i=e.director,s=e.genres,c=e.runtime,d=e.watched,o=e.whereToWatch,m=e.trailer,u=e.handleToggleOverlay,h=e.convertTime,f=e.toggleFilmWatched,g=e.handleFilterByYear,p=e.handleFilterByDirector,b=e.handleFilterByGenre,y=h(c);return n.a.createElement("div",{className:"col-md-4",key:t},n.a.createElement("div",{className:"card film-card mb-4 box-shadow ".concat(d?"watched":"")},n.a.createElement("button",{className:"icon-watched",title:"".concat(d?"Mark as unwatched":"Mark as watched"),onClick:function(){return f(t)}}),n.a.createElement("img",{className:"card-img-top",src:"https://via.placeholder.com/336x255?text=".concat(a),alt:a}),n.a.createElement("div",{className:"card-body"},n.a.createElement("p",{itemScope:!0,className:"card-text"},n.a.createElement("span",{className:"card-text__category"},"Title: "),n.a.createElement("span",{itemProp:"title"},a)),n.a.createElement("p",{itemScope:!0,className:"card-text"},n.a.createElement("span",{className:"card-text__category"},"Year: "),n.a.createElement("span",{className:"card-text__filter",itemProp:"year",onClick:function(){return g(l)}},l)),n.a.createElement("p",{itemScope:!0,className:"card-text"},n.a.createElement("span",{className:"card-text__category"},"Director: "),i.map((function(e,t){return n.a.createElement(r.Fragment,{key:t},n.a.createElement("span",{className:"card-text__filter",itemProp:"director",onClick:function(){return p(e)}},e),t<i.length-1&&", ")}))),n.a.createElement("p",{itemScope:!0,className:"card-text"},n.a.createElement("span",{className:"card-text__category"},"Genres: "),s.map((function(e,t){return n.a.createElement(r.Fragment,{key:t},n.a.createElement("span",{className:"card-text__filter",itemProp:"genre",onClick:function(){return b(e)}},e),t<s.length-1&&", ")}))),n.a.createElement("p",{itemScope:!0,className:"card-text"},n.a.createElement("span",{className:"card-text__category"},"Runtime: "),n.a.createElement("span",{itemProp:"runtime"},y)),n.a.createElement("div",{className:"d-flex justify-content-between align-items-center"},n.a.createElement("div",{className:"btn-group"},n.a.createElement("a",{href:"https://www.justwatch.com/uk/movie/".concat(o),className:"btn btn-sm btn-outline-secondary btn-vod"},"Watch Film"),n.a.createElement("button",{type:"button",className:"btn btn-sm btn-outline-secondary btn-trailer",onClick:function(){return u(m)}},"Watch trailer"))))))}}]),a}(r.Component),D=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){return n.a.createElement("footer",null,n.a.createElement("small",null,"Work in progress. New features coming soon."))}}]),a}(r.Component),O=(a(44),function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(e){var r;Object(c.a)(this,a),(r=t.call(this,e)).toggleWatched=function(){r.setState({watched:!r.state.watched})},r.showFilter=function(e){return r.setState({activeFilter:e})},r.runtimeFilter=function(e){return function(t){return!(e>0)||t.runtime<=e}},r.genreFilter=function(e){return function(t){return!e.length||t.genres.some((function(t){return e.includes(t)}))}},r.watchedFilter=function(e){return function(t){return!e||t.watched!==e}},r.yearFilter=function(e){return function(t){return!(e>0)||t.year===e}},r.decadeFilter=function(e,t,a){return function(r){return 0!==a||(!(e>0&&t>0)||r.year>=e&&r.year<=t+9)}},r.directorFilter=function(e){return function(t){return!e.length||t.director.some((function(t){return e.includes(t)}))}},r.submittedFilter=function(e,t){return function(a){return!e||a.title.toLowerCase().includes(t)}},r.suggestedFilter=function(e){return function(t){return!(e>0)||t.id===e}},r.chainFilters=function(e,t){return e.filter(r.runtimeFilter(t.runtime)).filter(r.genreFilter(t.genres)).filter(r.yearFilter(t.year)).filter(r.decadeFilter(t.oldestDecade,t.newestDecade,t.year)).filter(r.directorFilter(t.director)).filter(r.submittedFilter(t.submitted,t.submittedQuery)).filter(r.suggestedFilter(t.id)).filter(r.watchedFilter(t.hideWatched))},r.handleFilterByYear=function(e){r.filters.year=parseInt(e),r.filters.id=0,r.filters.director="",r.filters.hideWatched=!1,r.filters.submitted=!1,r.filters.submittedQuery="",r.filters.runtime=parseInt(Math.max.apply(0,r.state.films.map((function(e){return e.runtime})))),r.filters.genres=[];var t=r.chainFilters(r.state.films,r.filters);r.setState({filteredFilms:t,searchText:"",selectedId:0,selectedYear:parseInt(e),selectedDirector:"",filterTriggered:!0,submitted:!1})},r.handleFilterByDirector=function(e){r.filters.id=0,r.filters.year=0,r.filters.hideWatched=!1,r.filters.submitted=!1,r.filters.submittedQuery=r.state.searchText,r.filters.director=e,r.filters.id=0,r.filters.year=0,r.filters.hideWatched=!1,r.filters.submitted=!1,r.filters.submittedQuery="",r.filters.runtime=parseInt(Math.max.apply(0,r.state.films.map((function(e){return e.runtime}))));var t=r.state.films.map((function(e){return e.year}));r.filters.oldestDecade=10*Math.floor(Math.min.apply(0,t)/10),r.filters.newestDecade=10*Math.floor(Math.max.apply(0,t)/10),r.filters.genres=[];var a=r.chainFilters(r.state.films,r.filters);r.setState({filteredFilms:a,searchText:"",selectedId:0,selectedDirector:e,selectedYear:0,filterTriggered:!0,submitted:!1})},r.handleFilterByWatched=function(){r.filters.hideWatched=!r.state.hideWatched;var e=r.chainFilters(r.state.films,r.filters);r.setState({filteredFilms:e,hideWatched:!r.state.hideWatched,filterWatched:!0})},r.handleFilterByRuntime=function(e){r.filters.id=0,r.filters.year=0,r.filters.hideWatched=!1,r.filters.submitted=!1,r.filters.submittedQuery=r.state.searchText,r.filters.director="",r.filters.runtime=parseInt(e.target.value);var t=r.chainFilters(r.state.films,r.filters);r.setState({filteredFilms:t,searchText:"",selectedId:0,selectedDirector:"",selectedYear:0,runtime:parseInt(e.target.value),filterTriggered:!0,submitted:!1})},r.handleFilterByDecade=function(e){var t=parseInt(e.target.value),a=e.target.selectedIndex;if(r.filters.id=0,r.filters.year=0,r.filters.hideWatched=!1,r.filters.submitted=!1,r.filters.submittedQuery=r.state.searchText,r.filters.director="","oldest-decade"===e.target.id)if(t>r.state.newestDecade){r.filters.oldestDecade=t,r.filters.newestDecade=t;var n=r.chainFilters(r.state.films,r.filters);r.setState({filteredFilms:n,searchText:"",selectedId:0,selectedDirector:"",selectedYear:0,oldestDecade:t,newestDecade:t,filterTriggered:!0,submitted:!1}),document.querySelector("#newest-decade").selectedIndex=a}else{r.filters.oldestDecade=t,r.filters.newestDecade=r.state.newestDecade;var l=r.chainFilters(r.state.films,r.filters);r.setState({filteredFilms:l,searchText:"",selectedId:0,selectedDirector:"",selectedYear:0,oldestDecade:t,filterTriggered:!0,submitted:!1})}if("newest-decade"===e.target.id)if(r.filters.oldestDecade=r.state.oldestDecade,t>=r.state.oldestDecade){r.filters.newestDecade=t;var i=r.chainFilters(r.state.films,r.filters);r.setState({filteredFilms:i,searchText:"",selectedId:0,selectedDirector:"",selectedYear:0,newestDecade:t,filterTriggered:!0,submitted:!1})}else{r.filters.newestDecade=r.state.oldestDecade;var s=r.chainFilters(r.state.films,r.filters);r.setState({filteredFilms:s,searchText:"",selectedId:0,selectedDirector:"",selectedYear:0,newestDecade:r.state.oldestDecade,filterTriggered:!0,submitted:!1}),document.querySelector("#newest-decade").selectedIndex=document.querySelector("#oldest-decade").selectedIndex}},r.scrollToSection=function(e){if(r.setState({goToFilms:!r.state.goToFilms}),r.state.goToFilms)window.scrollTo(0,0);else{var t=document.querySelector(".row.product-list").getBoundingClientRect();window.scrollTo(0,Math.round(t.y))}},r.handleFilterByGenre=function(e){var t="";if(t="string"===typeof e?e:e.target.value,r.filters.id=0,r.filters.year=0,r.filters.hideWatched=!1,r.filters.submitted=!1,r.filters.submittedQuery=r.state.searchText,r.filters.director="",r.state.genres.includes(t)){var a=Object(s.a)(r.state.genres),n=a.indexOf(t);a.splice(n,1),r.filters.genres=a;var l=r.chainFilters(r.state.films,r.filters);r.setState({filteredFilms:l,searchText:"",selectedId:0,selectedDirector:"",selectedYear:0,genres:a,filterTriggered:!0,submitted:!1})}else{r.filters.genres=[].concat(Object(s.a)(r.state.genres),[t]);var i=r.chainFilters(r.state.films,r.filters);r.setState({filteredFilms:i,searchText:"",selectedId:0,selectedDirector:"",selectedYear:0,genres:[].concat(Object(s.a)(r.state.genres),[t]),filterTriggered:!0,submitted:!1})}},r.handleToggleOverlay=function(e){r.setState({overlay:!r.state.overlay,trailer:e})},r.convertTime=function(e){var t=e/60;return e<60?"".concat(e,"mins"):e%60>0?"".concat(Math.floor(t),"h ").concat(e%60,"mins"):"".concat(t,"h")},r.toggleFilmWatched=function(e){var t=Object(s.a)(r.state.films);t.forEach((function(t){t.id===e&&(t.watched=!t.watched)})),r.setState({films:t,selectedDirector:""})},r.resetProperty=function(e){"director"===e&&r.setState({selectedDirector:""}),"year"===e&&r.setState({selectedYear:0})},r.handleChange=function(e){e.target.value.length?r.setState({searchText:e.target.value,filterTriggered:!0,submittedQuery:""}):r.setState({searchText:e.target.value,filterTriggered:!0,suggestedFilms:[],submittedQuery:""})},r.handleAutocomplete=function(e){if(r.state.searchText.length>0){var t=[],a=e.target.value.toLowerCase();r.state.films.forEach((function(e){e.title.toLowerCase().startsWith(a)&&t.push(e)})),r.setState({suggestedFilms:t,submitted:!1,filterTriggered:!0})}},r.showFilm=function(e){r.filters.id=e,r.filters.year=0,r.filters.hideWatched=!1,r.filters.submitted=!1,r.filters.submittedQuery="",r.filters.director="",r.filters.runtime=parseInt(Math.max.apply(0,r.state.films.map((function(e){return e.runtime}))));var t=r.state.films.map((function(e){return e.year}));r.filters.oldestDecade=10*Math.floor(Math.min.apply(0,t)/10),r.filters.newestDecade=10*Math.floor(Math.max.apply(0,t)/10),r.filters.genres=[];var a=r.chainFilters(r.state.films,r.filters);r.setState({filteredFilms:a,searchText:"",selectedId:e,suggestedFilms:[],filterTriggered:!0,submitted:!1,genres:[]})},r.handleSubmit=function(e){e.preventDefault(),r.filters.id=0,r.filters.year=0,r.filters.hideWatched=!1,r.filters.submitted=!0,r.filters.submittedQuery=r.state.searchText,r.filters.director="",r.filters.runtime=parseInt(Math.max.apply(0,r.state.films.map((function(e){return e.runtime}))));var t=r.state.films.map((function(e){return e.year}));r.filters.oldestDecade=10*Math.floor(Math.min.apply(0,t)/10),r.filters.newestDecade=10*Math.floor(Math.max.apply(0,t)/10),r.filters.genres=[];var a=r.chainFilters(r.state.films,r.filters);r.setState({filteredFilms:a,submittedQuery:r.state.searchText,suggestedFilms:[],submitted:!0,selectedId:0,searchText:""})},r.state={filterTriggered:!1,runtime:0,selectedYear:0,selectedDirector:"",oldestDecade:0,newestDecade:0,hideWatched:!1,genres:[],mainGenres:["action","comedy","drama","horror","sci-fi"],extraGenres:[],films:[],filteredFilms:[],searchText:"",selectedId:0,suggestedFilms:[],submitted:!1,submittedQuery:"",loading:!0,overlay:!1,trailer:"",goToFilms:!1,activeFilter:""};var l=r.state,i=l.runtime,d=l.genres,o=l.oldestDecade,m=l.newestDecade,u=l.hideWatched,h=l.selectedDirector,f=l.selectedYear,g=l.selectedId,p=l.submitted,b=l.submittedQuery;return r.filters={runtime:i,genres:d,oldestDecade:o,newestDecade:m,hideWatched:u,director:h,year:f,id:g,submitted:p,submittedQuery:b},r.resultsRef=n.a.createRef(),r}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.state.films.length<1?this.setState({loading:!0},(function(){h.a.get("https://gist.githubusercontent.com/mklmng/fa894dc9c86dfed34e45063adcf1b73e/raw/eab13d0cb818951da46c78ee18d07f904814015b/Films.json").then((function(t){var a=parseInt(Math.max.apply(0,t.data.map((function(e){return e.runtime})))),r=t.data.map((function(e){return e.year})),n=10*Math.floor(Math.min.apply(0,r)/10),l=10*Math.floor(Math.max.apply(0,r)/10),i=Object(s.a)(e.state.extraGenres);i.length||(t.data.forEach((function(t){t.genres.forEach((function(t){i.includes(t)||e.state.mainGenres.includes(t)||i.push(t)}))})),i.sort()),e.setState({loading:!1,runtime:a,oldestDecade:n,newestDecade:l,extraGenres:i,films:t.data,filteredFilms:t.data})})).catch((function(t){e.setState({loading:!1})}))})):this.setState({films:this.state.films})}},{key:"render",value:function(){var e=this,t=this.state,a=t.filteredFilms,l=t.filterTriggered,i=t.suggestedFilms,s=t.searchText,c=t.submitted,d=t.submittedQuery,o=t.runtime,m=t.selectedYear,u=t.selectedDirector,h=t.oldestDecade,b=t.newestDecade,v=t.hideWatched,F=t.genres,O=t.trailer,_=t.overlay,j=t.activeFilter,k=t.mainGenres,S=t.extraGenres,C=this.convertTime(o);return n.a.createElement("div",{id:"full-wrapper"},n.a.createElement("link",{rel:"stylesheet",href:"https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css",integrity:"sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk",crossOrigin:"anonymous"}),_&&n.a.createElement(f,{handleToggleOverlay:this.handleToggleOverlay,trailer:O}),n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"row below2"},n.a.createElement(g,null),n.a.createElement(p,{searchText:s,suggestedFilms:i,handleChange:this.handleChange,handleAutocomplete:this.handleAutocomplete,handleSubmit:this.handleSubmit,showFilm:this.showFilm})),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-md-12"},n.a.createElement("div",{className:"main-filters"},n.a.createElement("h2",{className:"sub-header"},"Filter by")))),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-12 col-md-4"},n.a.createElement("button",{className:"btn btn-sm btn-lg-3 btn-outline-secondary btn-filter ".concat("runtime"===j?"active":""),onClick:function(){return e.showFilter("runtime")}},"Runtime"),n.a.createElement("button",{className:"btn btn-sm btn-lg-3 btn-outline-secondary btn-filter ".concat("genre"===j?"active":""),onClick:function(){return e.showFilter("genre")}},"Genre"),n.a.createElement("button",{className:"btn btn-sm btn-lg-3 btn-outline-secondary btn-filter ".concat("decade"===j?"active":""),onClick:function(){return e.showFilter("decade")}},"Decade"))),n.a.createElement(r.Fragment,null,"runtime"===j&&n.a.createElement(y,{handleFilterByRuntime:this.handleFilterByRuntime,runtime:o}),"genre"===j&&n.a.createElement(w,{handleFilterByGenre:this.handleFilterByGenre,mainGenres:k,extraGenres:S,genres:F}),"decade"===j&&n.a.createElement(E,{handleFilterByDecade:this.handleFilterByDecade,oldestDecade:h,newestDecade:b}),n.a.createElement(N,{handleFilterByWatched:this.handleFilterByWatched,hideWatched:v})),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-md-12"},l&&n.a.createElement("div",{id:"search-labels"},n.a.createElement("p",{className:"search-labels__content"},n.a.createElement("span",{className:"search-labels__content__intro"},"Looking for:"),(d.length>0||c)&&n.a.createElement("span",{className:"search-labels__tag"},d),s.length>0&&n.a.createElement("span",{className:"search-labels__tag"},s),!(s.length>0||c)&&n.a.createElement(r.Fragment,null,F.map((function(t,a){return n.a.createElement("span",{key:a,className:"search-labels__tag search-labels__tag--interactive",onClick:function(){return e.handleFilterByGenre(t)}},t)})),0!==o&&o<181&&n.a.createElement("span",{className:"search-labels__tag"},C," or less"),0===m&&h===b&&n.a.createElement("span",{className:"search-labels__tag"},h,"s"),0===m&&!(h===b)&&n.a.createElement("span",{className:"search-labels__tag"},h,"s - ",b,"s"),m>0&&n.a.createElement("span",{className:"search-labels__tag search-labels__tag--interactive",onClick:function(){return e.resetProperty("year")}},m),""!==u&&n.a.createElement("span",{className:"search-labels__tag search-labels__tag--interactive",onClick:function(){return e.resetProperty("director")}},"Directed by ",u),v&&n.a.createElement("span",{className:"search-labels__tag search-labels__tag--interactive",onClick:function(){return e.handleFilterByWatched()}},"unseen")))),n.a.createElement("div",{id:"results",ref:this.resultsRef,onClick:function(){return e.scrollToSection(e.resultsRef)}},n.a.createElement("p",{className:"film-results ".concat(this.state.goToFilms?"return":"")},a.length>1&&n.a.createElement("span",null,"There are ",n.a.createElement("strong",null,a.length)," matches."),1===a.length&&n.a.createElement("span",null,"There is ",n.a.createElement("strong",null,"1")," match."),!a.length&&n.a.createElement("span",null,"Sorry, there aren't any matches."))))),n.a.createElement("div",{className:"row product-list"},this.state.loading&&n.a.createElement(x.a,{animation:"border",role:"status"},n.a.createElement("span",{className:"sr-only"},"Loading...")),!this.state.loading&&a.map((function(t){return n.a.createElement(T,{key:t.id,id:t.id,title:t.title,year:t.year,director:t.director,genres:t.genres,runtime:t.runtime,watched:t.watched,whereToWatch:t.whereToWatch,trailer:t.trailer,overlay:e.state.overlay,handleToggleOverlay:e.handleToggleOverlay,convertTime:e.convertTime,toggleFilmWatched:e.toggleFilmWatched,handleFilterByYear:e.handleFilterByYear,handleFilterByDirector:e.handleFilterByDirector,handleFilterByGenre:e.handleFilterByGenre})})))),n.a.createElement(D,null))}}]),a}(r.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(O,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[21,1,2]]]);
//# sourceMappingURL=main.4bf13864.chunk.js.map