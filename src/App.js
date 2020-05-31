import React, { Component } from 'react';
import VideoPlayer from 'react-video-markers';
import Particles from 'react-particles-js';
import Logo from './Logo';
import axios from 'axios';
import Popup from "reactjs-popup";
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
      volume: 0.7,
      onClick: false,
      loading: false,
      condition: {},
      popup: false
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


    onResponseHandler = () => {
  this.setState({ loading: true }, () => {
      setTimeout(() => {
        axios.get("http://127.0.0.1:5000/")
        .then(res => {
          const condition = res.data;
          this.setState({ condition });
          console.log(condition);
        })
        this.setState({loading: false})
        this.setState({popup: true})
          }, 7000)
          
      } ) 
  }
    
    render () {
      const {isPlaying, volume} = this.state;
        
      return <div>
    <Logo />
    <Particles className='particles'
          params={particlesOptions}
        />
    <h1 className="text-5xl text-center">Smart video surveillance</h1>
    <br />
    <div className="flex justify-center">
    <div className="pl-10 pt-10">
      <VideoPlayer
        url="project2.webm"
        isPlaying={isPlaying}
        volume={volume}
        onPlay={this.handlePlay}
        onProgress={this.onResponseHandler}
        onPause={this.handlePause}
        onVolume={this.handleVolume}
        markers={this.marks}
       /> 
       {this.state.loading ? <p className="text-center pt-4">Loading....</p> : <div className="bg-red-600"><p className="pl-4">{Object.keys(this.state.condition)[0]}</p>
       <p className="pl-5">{Object.values(this.state.condition)[0]}    </p></div>}
      </div>
    </div>

    <Popup open={this.state.popup} modal>
    {close => (
      <div className="modal center">
        <div className="header">Anomaly Alert </div>
        <div className="actions">
          {/* <button
            className="bg-transparent hover:bg-red-400 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={() => {
              console.log("modal closed ");
              close();
            }}
          >
            close Alert
          </button> */}
        </div>
      </div>
    )}
  </Popup>
    
<article>
    <p className="text-center pt-10">About the project</p>
    <p className="text-center pt-10"  >A Short description</p>
</article>
    </div>
    }
  }

export default App;
