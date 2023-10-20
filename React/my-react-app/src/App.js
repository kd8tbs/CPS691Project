import React, { Component } from 'react';

class App extends Component {
  state = {
    balls: 1,
    ballPositions: [
      {
        x: 50,
        y: 50,
        dx: 5,
        dy: 5,
        color: '#'+Math.floor(Math.random()*16777215).toString(16), // Random color
      },
    ],
  };

  componentDidMount() {
    requestAnimationFrame(this.animateBalls);
  }

  animateBalls = () => {
    const { ballPositions } = this.state;
    const maxX = window.innerWidth;
    const maxY = window.innerHeight;

    const newBallPositions = ballPositions.map(({ x, y, dx, dy, color }) => {
      let newBallX = x + dx;
      let newBallY = y + dy;

      // Check if the ball hits the window boundaries
      if (newBallX > maxX || newBallX < 0) {
        dx = -dx; // Reverse horizontal direction
        newBallX = x + dx;
      }

      if (newBallY > maxY || newBallY < 0) {
        dy = -dy; // Reverse vertical direction
        newBallY = y + dy;
      }

      return { x: newBallX, y: newBallY, dx, dy, color };
    });

    this.setState({ ballPositions: newBallPositions });

    requestAnimationFrame(this.animateBalls);
  };

  increaseBalls = () => {
    const { balls, ballPositions } = this.state;
    const maxX = window.innerWidth;
    const maxY = window.innerHeight;
    const newBall = {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
      dx: Math.floor(Math.random() * 10) - 5, // Random direction
      dy: Math.floor(Math.random() * 10) - 5, // Random direction
      color: '#'+Math.floor(Math.random()*16777215).toString(16), // Random color
    };
    this.setState({
      balls: balls + 1,
      ballPositions: [...ballPositions, newBall],
    });
  };

  decreaseBalls = () => {
    const { balls, ballPositions } = this.state;
    if (balls > 1) {
      this.setState({
        balls: balls - 1,
        ballPositions: ballPositions.slice(0, -1),
      });
    }
  };

  handleInputChange = (event) => {
    const { value } = event.target;
    const { balls, ballPositions } = this.state;

    if (value > balls) {
      const maxX = window.innerWidth;
      const maxY = window.innerHeight;
      const newBalls = value - balls;
      const newBallPositions = Array.from({ length: newBalls }, () => ({
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY),
        dx: Math.floor(Math.random() * 10) - 5, // Random direction
        dy: Math.floor(Math.random() * 10) - 5, // Random direction
        color: '#'+Math.floor(Math.random()*16777215).toString(16), // Random color
      }));
      this.setState({
        balls: parseInt(value),
        ballPositions: [...ballPositions, ...newBallPositions],
      });
    } else if (value < balls) {
      this.setState({
        balls: parseInt(value),
        ballPositions: ballPositions.slice(0, value),
      });
    }
  };

  render() {
    const { balls, ballPositions } = this.state;

    return (
      <div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <label htmlFor="balls-input">Number of balls:</label>
          <input
            id="balls-input"
            type="number"
            value={balls}
            onChange={this.handleInputChange}
          />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <button onClick={this.increaseBalls}>Add ball</button>
          <button onClick={this.decreaseBalls}>Remove ball</button>
        </div>
        <div style={{ position: 'relative', zIndex: -1 }}>
          {ballPositions.map(({ x, y, color }, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                top: y,
                left: x,
                width: 50,
                height: 50,
                borderRadius: '50%',
                backgroundColor: color,
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;