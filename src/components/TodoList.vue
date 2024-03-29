<template>
  <div>
    <input type="text" class="todo-input" placeholder="What's on mind" v-model="newTodo" @keyup.enter="addTodo">
    <div v-if="$store.state.loading" class="lds-ring">
      <div></div><div></div><div></div><div></div>
    </div>
    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
    <todo-item v-for="todo in todosFiltered" :key="todo.id" :todo="todo" :checkAll="!anyRemaining">
    </todo-item>
    </transition-group>

    <div class="extra-container">
      <todo-check-all></todo-check-all>
      <todo-items-remaining></todo-items-remaining>
    </div> 

    <div class="extra-container">
      <todo-filtered></todo-filtered>

      <div>
        <transition name="fade">
        <todo-clear-completed></todo-clear-completed>
        </transition>
      </div>
    </div> 
  </div>
</template>

<script>
import TodoItem from './TodoItem'
import TodoItemsRemaining from './TodoItemsRemaining'
import TodoCheckAll from './TodoCheckAll'
import TodoFiltered from './TodoFiltered'
import TodoClearCompleted from './TodoClearCompleted'

export default {
  name: 'todo-list',
  components: {
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoFiltered,
    TodoClearCompleted,
  },
  data() {
    return {
      newTodo: '',
      idForTodo: 3,
    }
  },
  created() {
    this.$store.dispatch('initRealtimeListeners')
    this.$store.dispatch('retrieveTodos')
  },
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining
    },
    todosFiltered() {
      return this.$store.getters.todosFiltered
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return
      }

      this.$store.dispatch('addTodo', {
        id: this.idForTodo,
        title: this.newTodo,
      })

      this.newTodo = ''
      this.idForTodo++
    },
  }
}
</script>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;

  &:focus {
    outline: 0;
  }
}

.todo-item {
  margin-bottom: 1s12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.2s;
}

.remove-item {
  cursor: pointer;
  margin-left: 14px;
  &:hover {
    color: black;
  }
}

.todo-item-left {
  display: flex;
  align-items: center;
}

 .todo-item-label {
    align-items: left;
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
  }

.todo-item-edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc; 
  font-family: "Avenir", Helvetica, Arial, sans-serif;

  &:focus {
    outline: none;
  }
}

.completed {
  text-decoration: line-through;
  color: red;
}

.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid grey;
  padding-top: 14px;
  margin-bottom: 14px;
}

button {
    font-size: 16px;
    background-color: white;
    appearance: none;
    border-radius: 25px;
    margin-left: 30px;
    margin-bottom: 20px; 
    &:hover {
      background: lightgreen;
    }

    &:focus {
      outline: none;
    }
  }

.active {
  background: lightblue;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.lds-ring {
  display: block;
  position: relative;
  width: 64px;
  height: 64px;
  margin: auto;
  margin-bottom: 16px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  margin: 6px;
  border: 6px solid grey;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: grey transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
