<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0
}
html, body {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
ul, li {
  list-style-type: none
}
a {
  text-decoration: none;
  transition: all 0.5s ease;
  letter-spacing: 0.02em;
}
label {
  font-weight: 700;
}
</style>
