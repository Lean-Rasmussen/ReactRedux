
/*jshint esversion: 6 */

// import of libraries
import _ from "lodash";
import React, {Component} from "react";
import ReactDom from "react-dom";
import YTSearch from "youtube-api-search";
//import of own JS
import SearchBar from "./components/search_bar";
import Videolist from "./components/video_list";
import VideoDetail from "./components/video_detail";
// Create a new component 
//some HTML should be made
const API_key = "AIzaSyDT5S6QsgnPcalyB5GIX6dabi_6pFMwGXE";


class App extends Component {
	constructor(props){
		super(props);

		this.state={ 
			videos : [],
			selectedVideo: null,
		};
		this.videoSearch("surfing");
	}
	videoSearch(term){
		YTSearch({key: API_key, term: term},(videos) => {
			this.setState({
				videos : videos,
				selectedVideo: videos[0],

			});
		});
	}

	render(){
		const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
		return (
			<div>
				<SearchBar onSearchTermChange = {videoSearch } />
				<VideoDetail  video = {this.state.selectedVideo}/>
				<Videolist 
					onVideoSelect ={ selectedVideo => this.setState({selectedVideo}) } 
					videos = {this.state.videos} 
				/>
			</div>
		);
	}
}


// make sure the component gets 
//put into the DOM
ReactDom.render(<App />, document.querySelector(".container"));