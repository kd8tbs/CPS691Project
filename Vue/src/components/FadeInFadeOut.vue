<template>
  <div>
    <button @click="startAnimation">Start Animation</button>
    <button @click="stopAnimation">Stop Animation</button>
    <label for="animationCount">Animation Count:</label>
    <input type="number" id="animationCount" v-model="animationCount" />
    <br />
    <label for="testDuration">Test Duration (seconds):</label>
    <input type="number" id="testDuration" v-model="testDurationInput" />
    <button @click="updateTestDuration">Set Test Duration</button>
    <div class="animation-container" ref="animationContainer">
      <transition-group name="fade">
        <div v-for="(square, index) in squares" :key="index">
          <div v-if="showAnimation" class="square" :style="{ left: square.x + 'px', top: square.y + 'px' }"></div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showAnimation: false,
      intervalID: null,
      animationCount: 200,
      squares: [],
      testDuration: 5000, // Default 5 seconds for testing purposes
      testDurationInput: '', // Input field value for test duration
    };
  },
  methods: {
    startAnimation() {
      this.squares = Array.from({ length: this.animationCount }, () => ({
        x: 0,
        y: 0,
      }));
      this.animateSquare();
    },
    stopAnimation() {
      this.endTest();
    },
    animateSquare() {
      const animationIntervalDuration = 1000; // 1 second interval for testing purposes
      const animationStartTime = Date.now();

      this.intervalID = setInterval(() => this.intervalFunction(animationStartTime, animationIntervalDuration), animationIntervalDuration);
    },
    intervalFunction(startTime, animationIntervalDuration) {
      if (this.isTestOver(startTime, this.testDuration)) {
        this.endTest();
      }

      this.showSquare();
      setTimeout(() => this.hideSquare(), animationIntervalDuration / 2);
    },
    isTestOver(startTime, testDur) {
      const elapsedTime = Date.now() - startTime;
      return elapsedTime >= testDur;
    },
    endTest() {
      clearInterval(this.intervalID);
    },
    showSquare() {
      this.showAnimation = true;
    },
    hideSquare() {
      this.showAnimation = false;
      this.moveSquares();
    },
    moveSquares() {
      this.squares.forEach((square) => {
        square.x = this.getRandomPosition(0, this.$refs.animationContainer.clientWidth - 10);
        square.y = this.getRandomPosition(0, this.$refs.animationContainer.clientHeight - 10);
      });
    },
    getRandomPosition(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    updateTestDuration() {
      // Update the test duration with the input value
      const newTestDuration = parseInt(this.testDurationInput);
      if (!isNaN(newTestDuration) && newTestDuration > 0) {
        this.testDuration = newTestDuration * 1000; // Convert to milliseconds
      } else {
        alert('Please enter a valid positive number for the test duration.');
      }
    },
  },
};
</script>

<style scoped>
.square {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #ff0000; /* Red color */
  opacity: 1;
  transition: opacity 1s;
}
.animation-container {
  position: relative;
  width: 900px;
  height: 400px;
  border: 1px solid #ccc;
  overflow: hidden; /* Ensure squares stay within the container */
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
