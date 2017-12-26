<template>
    <div class="header">
        <div class="logo" v-show='!collapsed'>通知</div>
        <div class="tools" :class='{collapsed:collapsed}' @click.prevent="collapse">
            <i v-if="!collapsed" class="fa fa-align-justify"></i>
            <img v-if="collapsed"  style="width:32px;height:32px;" src='../../../static/img/jlogo.png'>
        </div>
        <div class="menus">
        </div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/head.png">
                    {{username}}
                    <img class="user-logo2" src="../../../static/img/ai.png">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
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
      handleCommand (command) {
        let self = this
        if (command === 'loginout') {
          self.delCookie('usession')
          self.delCookie('token')
          self.delCookie('principal')
          delete Vue.http.headers.common['token']
          delete Vue.http.headers.common['principal']
          self.$router.push('/login')
        }
      },
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
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        padding-right: 14px;
        font-size: 20px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:10px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .user-info .user-logo2{
        position: absolute;
        right:0;
        top:20px;
        width:12px;
        height:12px;
    }
    .user-info .el-dropdown-link {
      position: unset;
    }
</style>
