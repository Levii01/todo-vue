<template>
  <div class="home content-box">
    <img alt="Vue logo" src="@/assets/logo.png" id="vue-logo">
    <div class="title">What do I need to do today?</div>
    <input v-model="myTodo" placeholder="What I have todo.." /><button @click="addToDo">Add</button>

    <div v-if="errors !== ''" id="errors">{{ errors }}</div>

    <!-- <div v-if="this.$store.getters.getItems && this.$store.getters.getItems.length > 0">
      <div class="title">Today, you've go to do...</div>
 
     <div v-for="item in this.$store.getters.getItems" :key="item.id">
       {{ item.title }}<small style="text-decoration:underline;" @click="deleteItem(item.id)">Delete</small>
     </div>
   </div> -->
     <list-items @error="handleError" />
  </div>
</template>

<script>
import { db } from '@/main';
import ListItems from '@/components/ListItems.vue';

export default {
  name: 'home',
  components: { ListItems },
  beforeCreate() {
    this.$store.dispatch('setItems');
  },
  data: () => {
    return {
      myTodo: '',
      errors: '',
    };
  },
  methods: {
    addToDo() {
      this.errors = '';

      if (this.myTodo !== '') {
        db.collection('items').add({
          title: this.myTodo,
          created_at: Date.now(),
          active: true,
        }).then((response) => {
          if (response) {
            this.myTodo = '';
          }
        }).catch((error) => {
          this.handleError(error);
        });
      } else {
        this.handleError('Please enter some text');
      }
    },
    handleError(errorMessage) {
      this.errors = errorMessage;
    },
  },
};
</script>

<style>
* {
  box-sizing:border-box;
}

body, html, #app {
  background:#01d664;
}

.content-box {
  background:#fff;
  width:30rem;
  margin:auto;
  padding: 13px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
}

.content-box:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

#vue-logo {
  width:100px;
}

button {
  border:0;
  width:100%;
  margin:0 0 10px;
  padding:7px;
}

input {
  width:100%;
  margin:0 0 10px;
  padding:10px;
  background-color: #f3f3f3;
}
input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

button {
  background:#43b823;
  border:0;
  text-transform:uppercase;
  color:#fff;
  font-weight:700;
  cursor:pointer;
}

.title {
  font-size:14px;
  font-weight:700;
  padding:0 0 10px 0;
  margin:0 0 10px 0;
  border-bottom:1px solid #666;
}

#errors {
  background:#a52222;
  color:#fff;
  padding:5px;
}
</style>