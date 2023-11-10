<template>
    <div>
      <button @click="startAnimation">Start Animation</button>
      <div class="animation-container">
        <transition-group name="fade" tag="div">
          <div
            v-for="(square, index) in squares"
            :key="index"
            class="square"
            :style="{ left: square.x + 'px', top: square.y + 'px' }"
          ></div>
        </transition-group>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        squares: [],
        isAnimating: false,
      };
    },
    methods: {
      startAnimation() {
        this.squares = [];
        this.isAnimating = true;
  
        const numSquares = 10; // You can change the number of squares
        for (let i = 0; i < numSquares; i++) {
          this.addSquare();
        }
      },
      addSquare() {
        const container = this.$refs.animationContainer;
        const rect = container.getBoundingClientRect();
  
        const square = {
          x: this.getRandomPosition(rect.left, rect.right),
          y: this.getRandomPosition(rect.top, rect.bottom),
        };
  
        this.squares.push(square);
      },
      getRandomPosition(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      },
    },
  };
  </script>
  
  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .square {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: red;
    opacity: 1;
  }
  .animation-container {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;
  }
  </style>
  