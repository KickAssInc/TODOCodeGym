<template>
  <div id="app" class="container">
    <h1 class="f1">TODO++</h1>
    <todo-list></todo-list>
  </div>
</template>

<script>
import TodoList from './components/TodoList'
import image from './assets/logo.jpg'
export default {
  name: 'App',
  components: {
    TodoList,
  }
}
</script>

<style>

* {
  box-sizing: border-box;
  background-image: url('assets/logo.jpg')
}

.container {
   margin: 0 auto;
  align-items: left;

}


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 24px;
  text-align: center;
  text-color: black;
}

</style>
