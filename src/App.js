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
        src="src\project.mp4"
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
