<template>
  <div>
    <button @click="startAnimation">Start Animation</button>
    <button @click="stopAnimation">Stop Animation</button>
    <div class="animation-container" ref="animationContainer">
      <transition name="fade">
        <div v-if="showAnimation" class="square" :style="{ left: square.x + 'px', top: square.y + 'px' }"></div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      square: { x: 0, y: 0 }, // Initial square position
      showAnimation: false,
      intervalID: null,
      testDuration: 5000, // 5 seconds for testing purposes
    };
  },
  methods: {
    startAnimation() {
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
      this.moveSquare(); // Move the square to a new random position after hiding
    },
    moveSquare() {
      const animContainer = this.$refs.animationContainer;
      if (!animContainer) {
        console.error("Animation container is not found.");
        return;
      }

      const divRect = animContainer.getBoundingClientRect();

      const maxPadding = 5;
      const minPadding = 15;

      const top = divRect.top + maxPadding;
      const bottom = divRect.bottom - minPadding;
      const left = divRect.left + maxPadding;
      const right = divRect.right - minPadding;

      this.square = {
        x: this.getRandomPosition(left, right),
        y: this.getRandomPosition(top, bottom),
      };
    },
    getRandomPosition(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
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