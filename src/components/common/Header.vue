<template>
    <div class="header">
        <div class="logo" v-show='!collapsed'>通知</div>
        <div class="tools" :class='{collapsed:collapsed}' @click.prevent="collapse">
            <i v-if="!collapsed" class="fa fa-align-justify"></i>
            <img v-if="collapsed"  style="width:32px;height:32px;" src='../../../static/img/jlogo.png'>
        </div>
        <div class="menus">
        </div>
    </div>
</template>
<script>
  import Bus from './EventBus.js'
  import Vue from 'vue'
  export default {
    data () {
      return {
        collapsed: false
      }
    },
    computed: {
    },
    methods: {
      collapse () {
        this.collapsed = !this.collapsed
        Bus().$emit('collapse', this.collapsed)
      }
    },
    created: function () {
      Bus().$emit('collapse', this.collapsed)
    }
  }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 60px;
        font-size: 22px;
        line-height: 60px;
        color: #fff;
    }
    .header .logo{
        float: left;
        width:230px;
        text-align: center;
    }
    .menus {
        flex: 1;
        float: left;
    }
    .tools{
        float: left;
        width: 60px;
        height: 60px;
        text-align: center;
    }
    .tools:hover {
        background: #00cca0;
    }
    .collapsed {
        background: #00d1b2;
    }
</style>
