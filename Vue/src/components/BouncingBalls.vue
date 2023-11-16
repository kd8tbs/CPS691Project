<template>
  <div>
    <canvas ref="canvas" width="900" height="400"></canvas>
    <button @click="startAnimation" :disabled="isAnimating">Start Test</button>
    <button @click="stopAnimation" :disabled="!isAnimating">End Test</button>

    <!-- Text fields and buttons for settings -->
    <div>
      <label for="numBalls">Starting Number of Animations:</label>
      <input type="number" id="numBalls" v-model="numBalls" />
    </div>
    <div>
      <label for="speed">Starting Speed:</label>
      <input type="number" id="speed" v-model="speed" />
    </div>
    <div>
      <label for="incrementTime">Time before increment (seconds):</label>
      <input type="number" id="incrementTime" v-model="incrementTime" />
    </div>
    <div>
      <label for="testDuration">Duration of Test (seconds):</label>
      <input type="number" id="testDuration" v-model="testDuration" />
    </div>
    <div>
      <label for="incrementAmount">Number to add per increment:</label>
      <input type="number" id="incrementAmount" v-model="incrementAmount" />
    </div>
    <div>
      <label for="speedIncrement">Amount to increment animation speed by:</label>
      <input type="number" id="speedIncrement" v-model="speedIncrement" />
    </div>
    <button @click="incrementBalls">Increment Balls</button>
    <button @click="downloadStats">Download Statistics</button>
  </div>
  <!-- Display Framerate -->
  <div>
    <p>Framerate: {{ fps }} FPS</p>
  </div>
  <!-- Display Memory Usage -->
  <div>
    <p>Total JS Heap Size: {{ memoryUsage.totalJSHeapSize }} bytes</p>
    <p>Used JS Heap Size: {{ memoryUsage.usedJSHeapSize }} bytes</p>
    <p>JS Heap Size Limit: {{ memoryUsage.jsHeapSizeLimit }} bytes</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      balls: [], // An array to store ball objects
      isAnimating: false,
      animationFrame: null,
      canvas: null, // Reference to the canvas element
      context: null, // Canvas rendering context
      numBalls: 0, // Initialize with 0
      speed: 0, // Initialize with 0
      incrementTime: 0, // Initialize with 0
      testDuration: 0, // Initialize with 0
      incrementAmount: 0, // Initialize with 0
      speedIncrement: 0, // Initialize with 0
      stats: [], // Array to store statistics
      lastFrameTime: 0,
      frames: 0,
      fps: 0,
      memoryUsage: {
        totalJSHeapSize: 0,
        usedJSHeapSize: 0,
        jsHeapSizeLimit: 0,
      },
    };
  },

  methods: {
    initializeCanvas() {
      // Initialize the canvas and context
      this.canvas = this.$refs.canvas;
      this.context = this.canvas.getContext("2d");
    },
    createBall(x, y, radius, dx, dy) {
      // Create a new ball object
      return { x, y, radius, dx, dy };
    },
    drawBall(ball) {
      // Draw a ball on the canvas
      this.context.beginPath();
      this.context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      this.context.fillStyle = "blue"; // Change the ball color
      this.context.fill();
      this.context.closePath();
    },
    animate() {
      // Your animation logic
      if (this.isAnimating) {
        // Clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Implement your animation logic here
        for (let ball of this.balls) {
          // Update ball position
          ball.x += ball.dx;
          ball.y += ball.dy;

          // Check for collisions with canvas boundaries
          if (ball.x - ball.radius < 0 || ball.x + ball.radius > this.canvas.width) {
            ball.dx = -ball.dx;
          }
          if (ball.y - ball.radius < 0 || ball.y + ball.radius > this.canvas.height) {
            ball.dy = -ball.dy;
          }

          this.drawBall(ball);
        }

        this.animationFrame = requestAnimationFrame(this.animate);
      }
    },

    // Measure Framerate
    measureFramerate() {
      const currentTime = performance.now();
      const deltaTime = currentTime - this.lastFrameTime;
      this.frames++;

      if (deltaTime >= 1000) {
        this.fps = Math.round((this.frames * 1000) / deltaTime);
        this.frames = 0;
        this.lastFrameTime = currentTime;
      }
    },

    // Measure Memory Usage
    measureMemoryUsage() {
      const memory = window.performance.memory;
      if (memory) {
        this.memoryUsage = {
          totalJSHeapSize: memory.totalJSHeapSize,
          usedJSHeapSize: memory.usedJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
        };
      }
    },

    startAnimation() {
      this.lastFrameTime = performance.now();
      setInterval(this.measureFramerate, 1000); // Measure framerate every second
      setInterval(this.measureMemoryUsage, 1000); // Measure memory usage every second

      this.initializeCanvas();

      // Set a timer for the specified time before incrementing
      this.animationTimer = setTimeout(() => {
        this.isAnimating = true; // Set to true to indicate animation is active
        this.animate(); // Start animation
      }, this.incrementTime * 1000); // Convert seconds to milliseconds
    },
    stopAnimation() {
      this.isAnimating = false; // Set to false to stop the animation
      clearTimeout(this.animationTimer); // Clear the timer
      cancelAnimationFrame(this.animationFrame); // Stop the animation loop
    },
    incrementBalls() {
      if (!this.canvas) {
        console.error("Canvas is not initialized. Make sure it's initialized");
        return;
      }

      // Implement logic to increment the number of balls
      for (let i = 0; i < this.incrementAmount; i++) {
        const radius = 10;
        const x = Math.random() * (this.canvas.width - radius * 2) + radius;
        const y = Math.random() * (this.canvas.height - radius * 2) + radius;
        const dx = (Math.random() - 0.5) * this.speed;
        const dy = (Math.random() - 0.5) * this.speed;
        this.balls.push(this.createBall(x, y, radius, dx, dy));
      }
    },
    downloadStats() {
      const statsText = `Framerate: ${this.fps} FPS\n` +
        `Total JS Heap Size: ${this.memoryUsage.totalJSHeapSize} bytes\n` +
        `Used JS Heap Size: ${this.memoryUsage.usedJSHeapSize} bytes\n` +
        `JS Heap Size Limit: ${this.memoryUsage.jsHeapSizeLimit} bytes`;

      const blob = new Blob([statsText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "animation_stats.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
  },
  beforeUnmount() {
    // Clean up when the component is destroyed
    this.stopAnimation();
  },
};
</script>

<style>
canvas {
  border: 1px solid #000; /* Add a border to the canvas for visualization */
}
</style>
