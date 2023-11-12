<template>
    <div>
      <button @click="startPulseAnimation">Start Pulse Animation</button>
      <button @click="stopPulseAnimation">Stop Pulse Animation</button>
      <div class="pulse-container" ref="pulseContainer">
        <transition name="pulse">
          <div v-if="showPulse" class="pulse-element" :style="{ width: pulseSize + 'px', height: pulseSize + 'px', backgroundColor: pulseColor }"></div>
        </transition>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showPulse: false,
        intervalID: null,
        pulseSize: 50,
        pulseColor: 'lime',
        testDuration: 10000, // 10 seconds for testing purposes
      };
    },
    methods: {
      startPulseAnimation() {
        this.animatePulse();
      },
      stopPulseAnimation() {
        this.endTest();
      },
      animatePulse() {
        const pulseIntervalDuration = 1000; // 1 second interval for testing purposes
        const pulseStartTime = Date.now();
        const maxPulseSize = 200; // Maximum size of the pulse element
  
        this.intervalID = setInterval(() => {
          if (this.isTestOver(pulseStartTime, this.testDuration)) {
            this.endTest();
          }
  
          this.showPulse = true;
          setTimeout(() => this.hidePulse(), pulseIntervalDuration / 2);
  
          // Adjust pulse size and color
          this.pulseSize = Math.min(this.pulseSize + 50, maxPulseSize);
          this.pulseColor = this.getPulseColor();
        }, pulseIntervalDuration);
      },
      isTestOver(startTime, testDur) {
        const elapsedTime = Date.now() - startTime;
        return elapsedTime >= testDur;
      },
      endTest() {
        clearInterval(this.intervalID);
        this.showPulse = false;
        this.resetPulse();
      },
      hidePulse() {
        this.showPulse = false;
        this.resetPulse();
      },
      resetPulse() {
        this.pulseSize = 50; // Reset pulse size
        this.pulseColor = 'lime'; // Reset pulse color
      },
      getPulseColor() {
        // You can implement a logic here to change the pulse color based on your requirements
        // For simplicity, it will alternate between green and red
        return this.pulseColor === 'lime' ? 'red' : 'lime';
      },
    },
  };
  </script>
  
  <style scoped>
  .pulse-element {
    border-radius: 50%;
  }
  .pulse-container {
    position: relative;
    width: 900px;
    height: 400px;
    border: 1px solid #ccc;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pulse-enter-active, .pulse-leave-active {
    transition: transform 1s, background-color 1s;
  }
  .pulse-enter, .pulse-leave-to {
    transform: scale(0.5);
    background-color: lime;
  }
  </style>
  