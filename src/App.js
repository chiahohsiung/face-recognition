import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

// clarifau api
const app = new Clarifai.App({
 apiKey: 'API KEY'
});

const particleSetting = {
	particles: {
		numbers: {
			value: 30,
			density: {
				enable: true,
				value_area: 800
			}
		}
	}
};

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: ''
		}
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
		// console.log(this.state.input)
	}

	onButtonSubmit = (event) => {
		this.setState({imageUrl: this.state.input})

		app.models
			.predict(
				Clarifai.FACE_DETECT_MODEL,
				this.state.input)
			.then(
				function(response) {
					console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
				},
				function(error) {
					// there was an error
				});
	}

	render() {
		return (
	    <div className="App">
        <Particles className='particles' params={particleSetting} />
	      <Navigation />
	      <Logo />
	      <Rank />
	      <ImageLinkForm 
	      	onInputChange={this.onInputChange}
	      	onButtonSubmit={this.onButtonSubmit}
	      />
	      <FaceRecognition imageUrl={ this.state.imageUrl }/> 
	    </div>
  	);
	}

}

export default App;
