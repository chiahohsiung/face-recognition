import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';

import './App.css';

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

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    // get image through DOM manipulation
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = (event) => {
    this.setState({imageUrl: this.state.input})
    const imageurlRequestOptions = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({input: this.state.input})
    };

    const imageRequestOptions = {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: this.state.user.id})
    };
    
    fetch('https://evening-ridge-99613.herokuapp.com/imageurl', imageurlRequestOptions)
      .then(response => response.json())
      .then(response => {
        fetch('https://evening-ridge-99613.herokuapp.com/image', imageRequestOptions)
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count})); // modify only one attribute  
          });
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'singout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  updateUser = (data) => {
    this.setState({user: data});
  }

  render() {
    const { isSignedIn, box, imageUrl, route, user } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particleSetting} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank userName={user.name} userEntries={user.entries}/>
              <ImageLinkForm 
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box} imageUrl={ imageUrl }/> 
            </div> 
          : ( route === 'signin' 
            ? <Signin onRouteChange={this.onRouteChange} updateUser={this.updateUser}/> 
            : <Register onRouteChange={this.onRouteChange} updateUser={this.updateUser}/>)
        } 
      </div>
    );
  }

}

export default App;
