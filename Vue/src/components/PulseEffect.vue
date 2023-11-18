<template>
  <div>
    <button @click="startPulseAnimation">Start Pulse Animation</button>
    <button @click="stopPulseAnimation">Stop Pulse Animation</button>
    <label for="animationCountInput">Animation Count:</label>
    <input type="number" id="animationCountInput" v-model="animationCountInput" />
    <button @click="updateAnimationCount">Set Animation Count</button>
    <label for="testDurationInput">Test Duration (s):</label>
    <input type="number" id="testDurationInput" v-model="testDurationInput" />
    <button @click="updateTestDuration">Set Test Duration</button>
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
      testDuration: 10000,
      animationCount: 200,
      animationCountInput: "",
      testDurationInput: "",
      currentAnimation: 0,
    };
  },
  methods: {
    startPulseAnimation() {
      this.currentAnimation = 0;
      this.animatePulse();
    },
    stopPulseAnimation() {
      this.endTest();
    },
    animatePulse() {
      const pulseIntervalDuration = 1000;
      const pulseStartTime = Date.now();
      const maxPulseSize = 200;

      this.intervalID = setInterval(() => {
        if (this.currentAnimation >= this.animationCount || this.isTestOver(pulseStartTime, this.testDuration)) {
          this.endTest();
        }

        this.showPulse = true;
        setTimeout(() => this.hidePulse(), pulseIntervalDuration / 2);

        this.pulseSize = Math.min(this.pulseSize + 50, maxPulseSize);
        this.pulseColor = this.getPulseColor();

        this.currentAnimation += 1;

        if (this.currentAnimation >= this.animationCount) {
          this.endTest();
        }
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
      this.pulseSize = 50;
      this.pulseColor = 'lime';
      this.currentAnimation = 0;
    },
    getPulseColor() {
      return this.pulseColor === 'lime' ? 'red' : 'lime';
    },
    updateAnimationCount() {
      const newCount = parseInt(this.animationCountInput);
      if (!isNaN(newCount) && newCount > 0) {
        this.animationCount = newCount;
      } else {
        console.error("Invalid animation count. Please enter a positive number.");
      }
    },
    updateTestDuration() {
      const newDuration = parseInt(this.testDurationInput);
      if (!isNaN(newDuration) && newDuration > 0) {
        this.testDuration = newDuration;
      } else {
        console.error("Invalid test duration. Please enter a positive number.");
      }
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
