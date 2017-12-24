<template>
  <div class="hello">
    <h1 class="head">用户操作</h1>
    <div class="cont">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>创建用户</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="createUser">创建</el-button>
        </div>
        <div>
          <el-input v-model="username" class="item text" placeholder="用户名"></el-input>
        </div>
        <div>
          <el-input v-model="password" class="item text" placeholder="密码"></el-input>
        </div>
      </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>重置用户密码</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="resetPass">确定重置</el-button>
          </div>
          <div>
            <el-input v-model="rusername" class="item text" placeholder="用户名"></el-input>
          </div>
          <div>
            <el-input v-model="rpassword" class="item text" placeholder="重置密码"></el-input>
          </div>
        </el-card>
    </div>
  </div>
</template>

<script>
  import api from '../../apis.json'
  import SH from './SocketHelp.js'
  let canShow = true
  export default {
    data () {
      return {
        username:'',
        password:'',
        rusername:'',
        rpassword:''
      }
    },
    methods: {
      resetPass() {
        if(!this.rusername || !this.rpassword) {
          this.$message({
            message: '请输入用户名和密码',
            type: 'warning'
          })
          return
        }
        this.$confirm('确定要修改['+ this.rusername +']的密码吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(api.resetPass + '/' + this.rusername + '/' + this.rpassword, {}, {emulateJSON: true}).then(res => {
            if(res.body.code !== 0) {
              this.$message({
                type: 'error',
                message: '重置用户[' + this.rusername + ']的密码失败:' + res.body.msg
              })
            } else {
              if(res.body.msg) {
                this.$message({
                  type: 'warning',
                  message: '用户[' + this.rusername + ']不存在'
                });
                return
              }
              this.$message({
                type: 'success',
                message: '重置用户[' + this.rusername + ']的密码成功'
              });
              this.rusername = ''
              this.rpassword = ''
            }
          }, _ => {
              this.$message({
                type: 'error',
                message: '重置用户[' + this.rusername + ']的密码失败-1'
              })
          })
        })
      },
      createUser() {
        if(!this.username || !this.password) {
          this.$message({
            message: '请输入用户名和密码',
            type: 'warning'
          })
          return
        }
        this.$confirm('确定要创建['+ this.rusername +']该用户吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(api.createUser + '/' + this.username + '/' + this.password, {}, {emulateJSON: true}).then(res => {
            if(res.body.code !== 0) {
              this.$message({
                type: 'error',
                message: '创建用户[' + this.username + ']失败:' + res.body.msg
              })
            } else {
              this.$message({
                type: 'success',
                message: '创建用户[' + this.username + ']成功'
              })
              this.username = ''
            }
          }, _ => {
              this.$message({
                type: 'error',
                message: '创建用户[' + this.rusername + ']失败-1'
              })
          })
        })

      },
      showNewOrder: function() {
        if(canShow) {
          canShow = false
          this.$message({
            message: '您有新的订单',
            type: 'success',
            onClose: function() {
              canShow = true
            }
          });

        }
      }
    },
    mounted: function() {

      SH.bind(data => {
        if(data.type === 'snotify') {
          this.showNewOrder()
          let nData = data.data
          let oData = {
            id: nData._id,
            date: new Date(nData.date).format('yy年MM月dd日 HH时mm分ss秒'),
            price: (price[nData.type] * nData.num / 100) + '元',
            introduce: '购买' + desc[nData.type] + '饮用水' + nData.num + '箱',
            openid: nData.openid
          }
          this.$store.commit('pushtableData', oData)
        }
      })
    },
    beforeDestory: function() {
      SH.unbind()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type="file"] {
  display: none !important;
}
.head {
  width:100%;
  text-align: center;
}
.cont {
  padding: 60px;
}
.text {
  font-size: 14px;
}
.box-card {
  margin-bottom: 30px;
}

.item {
  margin-bottom: 18px;
  max-width: 320px;
}

</style>
