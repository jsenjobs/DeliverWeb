<template>
  <div class="hello">
    <div class="cont">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="getOrders" type="text">所有订单点击查询</el-button>
        <div data-v-3d839929="" class="el-input" style="float: right; width: 300px;">
          <input autocomplete="off" v-model="searchTxt" @keyup.13="searchByID($event)" placeholder="搜索手机号" rows="2" validateevent="true" class="el-input__inner" type="text">
        </div>
      </div>
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
        <div class="block" style="float: right;margin:20px;">
          <el-pagination
            :page-size="capacity"
            @current-change="changePage"
            layout="prev, pager, next"
            :total="totalCount">
          </el-pagination>
        </div>
      </el-card>
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
        page:1,
        totalCount:1,
        capacity: 100,
        tableData: [
          /*
          {
            id:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',date:'yy年MM月dd日 HH时mm分ss秒',openid:'17682490309',name:'沈国权',address:'浙江省嘉兴市平湖市曹桥街道马厩村1号',price:'500元',introduce:'大桶饮用水600桶', stat:'等待客户确认'
          }*/
        ],
        searchTxt:''
      }
    },
    methods: {
      showData: function(orderArray) {
        this.tableData = []
        let statstrs = ['已完成', '等待用户确认']
        orderArray.forEach(order => {
          let oData = Common.createTableItem(order)
          oData.stat = statstrs[order.stat]
          this.tableData.push(oData)
        })
      },
      searchByID: function() {
        this.requestOrder(apis.SearchOrderByID + '/' + this.searchTxt)
      },
      changePage: function(val) {
        this.page = val
        this.getOrders()
      },
      getOrders: function() {
        this.requestOrder(apis.GetOrderByPage + '/' + this.capacity + '/' + this.page, data => {
          if(data.totalCount) {
            this.totalCount = data.totalCount
          }
        })
      },
      requestOrder: function(url, callback) {
        this.$http.get(url).then(res => {
          let data = res.data
          if(data.code === 0) {
            this.showData(data.data)
            this.totalCount = 1
            if(callback) callback(data)
            this.showInfo('获取信息成功')
          } else {
            this.showInfo('获取信息失败-1')
          }
        }, e => {
          console.error(e)
          this.showInfo('获取信息失败-2')
        })
      },
      showInfo: function(info) {
          this.$message({
            message: info,
            type: 'success'
          })
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
  text-align: center;
}
.cont {
  padding-bottom: 60px;
}
</style>
