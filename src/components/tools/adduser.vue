<template>
  <div class="hello">
    <h1 class="head">用户操作</h1>
    <div class="cont">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>创建用户</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="createUser">创建</el-button>
        </div>
        <el-row>
          <el-col :span="12">
            <div>
              <el-input v-model="openid" class="item text" placeholder="手机号"></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-input v-model="name" class="item text" placeholder="名字"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div>
              <el-input v-model="address" class="item text" placeholder="送货地址"></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-input v-model="password" class="item text" placeholder="密码"></el-input>
            </div>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>重置用户密码</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="resetPass">确定重置</el-button>
        </div>
        <div>
          <el-input v-model="r1openid" class="item text" placeholder="手机号"></el-input>
        </div>
        <div>
          <el-input v-model="r1password" class="item text" placeholder="重置密码"></el-input>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>重置用户送货地址</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="resetAddress">确定重置</el-button>
        </div>
        <div>
          <el-input v-model="r2openid" class="item text" placeholder="手机号"></el-input>
        </div>
        <div>
          <el-input v-model="r2address" class="item text" placeholder="重置地址"></el-input>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import api from '../../apis.json'
  import SH from './SocketHelp.js'
  import Common from '../../utils/Common.js'
  let canShow = true
  export default {
    data () {
      return {
        openid:'',
        name:'',
        address:'',
        password:'',

        r1openid:'',
        r1password:'',

        r2openid:'',
        r2address:'',
      }
    },
    methods: {
      resetPass() {
        if(!this.r1openid || !this.r1password) {
          this.$message({
            message: '请输入用户名和密码',
            type: 'warning'
          })
          return
        }
        this.$confirm('确定要修改['+ this.r1openid +']的密码吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(api.resetPass + '/' + this.r1openid + '/' + this.r1password, {}, {emulateJSON: true}).then(res => {
            if(res.body.code !== 0) {
              this.$message({
                type: 'error',
                message: '重置用户[' + this.r1openid + ']的密码失败:' + res.body.msg
              })
            } else {
              if(res.body.msg) {
                this.$message({
                  type: 'warning',
                  message: '用户[' + this.r1openid + ']不存在'
                });
                return
              }
              this.$message({
                type: 'success',
                message: '重置用户[' + this.r1openid + ']的密码成功'
              });
              this.r1openid = ''
              this.r1password = ''
            }
          }, _ => {
              this.$message({
                type: 'error',
                message: '重置用户[' + this.r1openid + ']的密码失败-1'
              })
          })
        })
      },
      resetAddress() {
        if(!this.r2openid || !this.r2address) {
          this.$message({
            message: '请输入用户名和地址',
            type: 'warning'
          })
          return
        }
        this.$confirm('确定要修改['+ this.r2openid +']的地址吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(api.resetAddress + '/' + this.r2openid + '/' + this.r2address, {}, {emulateJSON: true}).then(res => {
            if(res.body.code !== 0) {
              this.$message({
                type: 'error',
                message: '重置用户[' + this.r2openid + ']的地址失败:' + res.body.msg
              })
            } else {
              if(res.body.msg) {
                this.$message({
                  type: 'warning',
                  message: '用户[' + this.r2openid + ']不存在'
                });
                return
              }
              this.$message({
                type: 'success',
                message: '重置用户[' + this.r2openid + ']的地址成功'
              });
              this.r2openid = ''
              this.r2address = ''
            }
          }, e => {
            console.log(e)
              this.$message({
                type: 'error',
                message: '重置用户[' + this.r1openid + ']的地址失败-1'
              })
          })
        })
      },
      createUser() {
        if(!this.openid || !this.password || !this.name || !this.address) {
          this.$message({
            message: '有空的参数',
            type: 'warning'
          })
          return
        }
        this.$confirm('确定要创建['+ this.openid +']该用户吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(api.createUser + '/' + this.openid + '/' + this.password + '/' + this.name + '/' + this.address, {}, {emulateJSON: true}).then(res => {
            if(res.body.code !== 0) {
              this.$message({
                type: 'error',
                message: '创建用户[' + this.openid + ']失败:' + res.body.msg
              })
            } else {
              this.$message({
                type: 'success',
                message: '创建用户[' + this.openid + ']成功'
              })
              this.openid = ''
              this.name = ''
            }
          }, e => {
            console.error(e)
              this.$message({
                type: 'error',
                message: '创建用户[' + this.openid + ']失败-1' + JSON.stringify(e)
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
          this.$store.commit('pushtableData', Common.createTableItem(data.data))
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
  padding: 10px;
  margin: 0px;
  text-align: center;
}
.cont {
  padding: 0px 60px 10px 60px;
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
