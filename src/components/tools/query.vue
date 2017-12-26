<template>
  <div class="hello">
    <h1 class="head">查看今日订单</h1>
    <div class="cont">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="订单号"
          width="290">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="240">
        </el-table-column>
        <el-table-column
          prop="openid"
          label="手机号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="address"
          label="用户地址">
        </el-table-column>
        <el-table-column
          prop="price"
          label="总价"
          width="100">
        </el-table-column>
        <el-table-column
          prop="introduce"
          label="描述"
          width="200">
        </el-table-column>
        <el-table-column
          prop="stat"
          label="状态"
          width="140">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import SH from './SocketHelp.js'
  import apis from '../../apis.json'
  import Common from '../../utils/Common.js'
  let canShow = true
  export default {
    data () {
      return {
        tableData: [],
        tableDataExample: [{
          id: 170001,
          date: '2016-05-03',
          price: 'food.pdf',
          introduce: '数据',
          openid:'123452'
        }]
      }
    },
    methods: {
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
      let statstrs = ['已完成', '等待用户确认']
      this.$http.get(apis.QueryByDay + '/' + Date.now()).then(res => {
          let data = res.data
          if(data && data.code === 0) {
            this.tableData = []
            data.data.forEach( order => {
              let oData = Common.createTableItem(order)
              oData.stat = statstrs[order.stat]
              this.tableData.push(oData)
            })

            this.$message({
              message: '获取信息成功',
              type: 'success'
            })

          } else {
            this.$message({
              message: '获取信息失败',
              type: 'success'
            })
          }
      }, res => {
        console.error(res)
        this.$message({
          message: '获取信息失败',
          type: 'success'
        })
      })


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
  text-align: center;
}
.cont {
  padding-bottom: 60px;
}
</style>
