<template>
  <div class="list-items">
    <div v-if="this.$store.getters.getItems && this.$store.getters.getItems.length > 0">

      <div class="title">Today, you've go to do...</div>

      <ul class="rolldown-list" id="myList">
        <li v-for="item in this.$store.getters.getItems" :key="item.id">
          <div class="todo-item">
            <span class="item-text">{{ item.title }}</span>
            <span class="item-delete" style="text-decoration:underline;" @click="deleteItem(item.id)">Delete</span>
          </div>
        </li>
      </ul> 

    </div>
  </div>
</template>

<script lang="ts">
import { db } from '@/main';
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as $ from 'jquery';

@Component({
  props: {
    method: { type: Function },
  },
  name: 'ListItems',
  updated: function () {
    // Increments the delay on each item.
    $('.rolldown-list li').each(function () {
      var delay = ($(this).index() / 4) + 's';
      $(this).css({
        webkitAnimationDelay: delay,
        mozAnimationDelay: delay,
        animationDelay: delay
      });
    });

    $('#btnReload').click(function () {
      $('#myList').removeClass('rolldown-list');
      setTimeout(function () {
        $('#myList').addClass('rolldown-list');
      }, 1);
    });
  },
  methods: {
    deleteItem(id) {
      if (id) {
        db.collection('items').doc(id).delete().then(() => {
          console.log('Document successfully deleted');
        }).catch((error) => {
          this.$emit('error', error);
        });
      } else {
        this.$emit('error', 'Invalid ID');
      }
    },
  },
})
export default class ListItems extends Vue {
  @Prop() private msg!: string;
}
</script>

<style scoped>
.todo-item {
  display: inline-block; 
  color: #fff;
  width: 100%;
}
.todo-item .item-text {
  display: block;
}

.todo-item .item-delete {
  display: block;
  float: right;
}

.rolldown-list {
  text-align: left;
  padding: 0;
  margin: 0;
}

.rolldown-list li {
  padding: 1em;
  margin-bottom: .125em;
  display: block;
  list-style: none;
  text-transform: uppercase;
}

.rolldown-list li {
  visibility: hidden;
  animation: rolldown .7s 1;
  transform-origin: 50% 0;
  animation-fill-mode: forwards;
}

.rolldown-list li:nth-child(2n) {
  /* background-color: #24f886; */
  background-color: #40b883;
}

.rolldown-list li:nth-child(2n+1) {
  background-color: #02d664;
  background-color: #35495e;
}

#myList {
  /* position: absolute; */
  /* width: 50%;  */
  /* left: 50%; */
  /* margin-left: -25%; */
}

#btnReload {
  float: right;
  color: #333;
  background: #ccc;
  text-transform: uppercase;
  border: none;
  padding: .5em 1em;
}

#btnReload:hover {
  background: #ddd;
}

@keyframes rolldown {
  0% {
    visibility: visible;
    transform: rotateX(180deg) perspective(500px);
  }
  70% {
    visibility: visible;
    transform: rotateX(-20deg);
  }
  100% {
    visibility: visible;
    transform: rotateX(0deg);
  }
}
</style>
