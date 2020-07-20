This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# What to Watch React
This is the React version of the [What to Watch](https://mklmng.github.io/what-to-watch-vjs/). project a small tool to help the users choosing what film to watch based on various filters: runtime, genre and decade. All these genres can be combined if the users want to.

# Dependencies
At this stage this project uses the following dependencies not included on React-Create-App:
- [react-bootstrap](https://www.npmjs.com/package/react-bootstrap)
- [axios](https://www.npmjs.com/package/axios) 

# User Journey
All the filters (except the expanded genres) are available to the users from the beginning. The order is as follows, watched, runtime, genres and decades.

# Filter by Watched
It allows the users to hide films where the watched property is set true, on first load all films are visible so toggle this filter will hide the watched films.

# Filter by Runtime
It allows the users to filter films based on different runtimes: 1h 30 minutes, 2h, 2h 30 minutes, 3h or "All the time in the world". By default it's set to "All the time in the world" which is actually the highest runtime of all the films on the database, calculated on the JavaSCript file.
Clicking on any of the other filters will show films when the runtime is lesser or equal than the selected option. E.g.: If a film is 91 minutes long you'll need to select 2h to see it.

# Filter by Genre
It allows the users the filter films based on their favourite genres, the ones I considered more common: action, comedy, drama, horror and sci-fi are visible from the start and all the rest are visible when the users click on 
"See all genres". The way the filter works is that the films need to have at least one of the selected genres so they don't to have all the selected genres. E.g.: if the users select action and comedy the films can have either action, comedy or both.

Clicking on any genre that appears in a film card will also filter films based on that genre.

# Filter by Decade
It allows the users to narrow the results to a determined time frame, e.g.: dramas from 70s or horror films from 80s. The users need to defined to oldest and newest decade and all the films within that time frame that fulfill the rest of the filters will be shown.

# Filter by Director
If you click on any director that appears on the film card, the results will show all the films directed by that person. 

# Filter by Year
If you click on the year that appears on the film card, the results will show all the films from that year. 

# Search by film title & autocomplete
The searchbox reacts to the text you enter showing you a list of films that match your query on a pop-up below it. This films show title and year to differentiate films that share the same title, the more detailed the search the more exact the suggestions will be. Clicking on any of the suggestions will show its film card below. Making a query will show all the results match the query, at least partially, below.

# Mark as watched/unwatched
Clicking on the eye icon will mark a film as watched. Clickin on the "The End" text will mark it as unwatched.

# Results
Every time the users interact with the filters the results area will update with the matches.

# Tools used
JavaScript (ES6), React, Axios, Boostrap, HTML5 and CSS3. 

# JavaScript
In order to optimise the experience JavaScript was used to convert the runtimes from minutes to hours and minutes to make it easier for the users when reading the film cards.
The arrays that contain the extraGenres and decades are dynamically generated based on the information obtained from the JSON file thus ensuring they're always up to date.
