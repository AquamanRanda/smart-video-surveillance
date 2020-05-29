import React, { Component } from 'react';
import VideoPlayer from 'react-video-markers';
import Particles from 'react-particles-js';
import Logo from './Logo';
import './App.css';

const particlesOptions = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
  }

class App extends Component {
    state = {
      isPlaying: false,
      volume: 0.7
    };

    marks=[
        {
            id: 1,
            time: 20,
            color: '#ffc837',
            title: 'Anomalies'
        }
    ]
    
    handlePlay = () => {
      this.setState({isPlaying: true});
    };
    
    handlePause = () => {
      this.setState({isPlaying: false});
    };
    
    handleVolume = value => {
      this.setState({volume: value});
    };
    
    render () {
      const {isPlaying, volume} = this.state;
        
      return <div>
    <Logo />
    <Particles className='particles'
          params={particlesOptions}
        />
    <h1 className="text-5xl text-center">Intelligent video surveillance</h1>
      <div className="flex justify-center p-10">
      <VideoPlayer
        url="https://scontent-yyz1-1.cdninstagram.com/v/t50.2886-16/65702432_608401809650778_5658085182972887040_n.mp4?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=106&_nc_ohc=AOn7sLtmykIAX-WaPNo&oe=5ED10733&oh=7ca65a4d2610d9a81e43b10e0c5acb92&dl=1"
        isPlaying={isPlaying}
        volume={volume}
        onPlay={this.handlePlay}
        onPause={this.handlePause}
        onVolume={this.handleVolume}
        markers={this.marks}
       />
    </div>

<article>
    <p className="text-center">About the project</p>
</article>
    </div>
    }
  }

export default App;
