import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ballX: 0,
      ballY: 0,
      dx: 5, // Horizontal direction
      dy: 5, // Vertical direction
    };
  }

  componentDidMount() {
    this.animateBall();
  }

  animateBall = () => {
    const { ballX, ballY, dx, dy } = this.state;
    const maxX = window.innerWidth - 50;
    const maxY = window.innerHeight - 50;

    let newBallX = ballX + dx;
    let newBallY = ballY + dy;

    // Check if the ball hits the window boundaries
    if (newBallX > maxX || newBallX < 0) {
      this.setState({ dx: -dx }); // Reverse horizontal direction
      newBallX = ballX + dx;
    }

    if (newBallY > maxY || newBallY < 0) {
      this.setState({ dy: -dy }); // Reverse vertical direction
      newBallY = ballY + dy;
    }

    this.setState({
      ballX: newBallX,
      ballY: newBallY,
    });

    requestAnimationFrame(this.animateBall);
  };

  render() {
    const { ballX, ballY } = this.state;
    return (
      <div className="App">
        <div
          className="ball"
          style={{ left: ballX, top: ballY }}
        ></div>
      </div>
    );
  }
}

export default App;
