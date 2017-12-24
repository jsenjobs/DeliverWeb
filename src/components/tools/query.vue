<template>
  <div class="hello">
    <h1 class="head">查看今日订单</h1>
    <div class="cont">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="id"
          label="编号"
          width="300">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="230">
        </el-table-column>
        <el-table-column
          prop="price"
          label="总价"
          width="100">
        </el-table-column>
        <el-table-column
          prop="introduce"
          label="描述">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="140">
          <template scope="scope">
            <el-button v-if="scope.row.button" @click="handleClick(scope.$index, scope.row)" type="text">点击确认送完</el-button>
            <span v-if="!scope.row.button">已送完</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  const price = [2000, 1000, 500]
  const desc = ['大桶', '中桶', '小桶']
  import SH from './SocketHelp.js'
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
      handleClick (index, row) {
        // SH.ok_notify(this.$socket)
        // https://aaa.bigfacewo.com/dwssserverso/ok_notify/:out_trade_no
        this.$http.get('https://aaa.bigfacewo.com/dwssserverso/order/sended/' + row.id).then(res => {
          let data = res.data
          if(data && data.code === 0) {
            this.tableData[index].button = false
            this.$message({
              message: '送水成功',
              type: 'success',
            })
          } else {
              this.$message({
                message: '网络错误',
                type: 'success',
              })
          }
        }, res => {
          this.$message({
            message: '网络错误',
            type: 'success',
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
      this.$http.get('https://aaa.bigfacewo.com/dwssserverso/order/query/day?date=' + Date.now()).then(res => {
          let data = res.data
          if(data && data.code === 0) {
            this.tableData = []
            data.data.forEach( nData => {
              if(nData.stat === 1) {
                let oData = {
                  id: nData._id,
                  date: new Date(nData.date).format('yy年MM月dd日 HH时mm分ss秒'),
                  price: (price[nData.type] * nData.num / 100) + '元',
                  introduce: '购买' + desc[nData.type] + '饮用水' + nData.num + '箱',
                  openid: nData.openid,
                  button:true
                }
                this.tableData.push(oData)
              } else if(nData.stat === 0) {
                let oData = {
                  id: nData._id,
                  date: new Date(nData.date).format('yy年MM月dd日 HH时mm分ss秒'),
                  price: (price[nData.type] * nData.num / 100) + '元',
                  introduce: '购买' + desc[nData.type] + '饮用水' + nData.num + '箱',
                  openid: nData.openid,
                  button:false
                }
                this.tableData.push(oData)
              }
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
  padding-bottom: 60px;
}
</style>
