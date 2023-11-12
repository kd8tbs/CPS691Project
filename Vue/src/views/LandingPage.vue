<template>
  <div class="landing-page">
    <h1>CPS 691 Project</h1>
    <h2>on</h2>
    <h1>A Comparison of Performance Metrics of Modern Web Frameworks featuring React, Angular, Vue and Blazor WebAssembly</h1>
       
    <p>Choose the Animation you would like to Perform using VUE.JS</p>

    <ul>
      <li><router-link to="/bouncing-balls">Bouncing Balls</router-link></li>
      <li><router-link to="/fade-in-fade-out">Fade In Fade Out</router-link></li>
      <li><router-link to="/pulse-effect">Pulse Effect</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
};
</script>

<style scoped>
/* Add your custom styles here if needed */
</style>
