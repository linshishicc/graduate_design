<template>
  <div class="profit">
    <div class="content">
      <div class="title">/盈利情况</div>
      <div id="myChart" :style="{width: '600px', height: '400px'}"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Profit',
    data() {
      return {
        money:{
          total:58651,
          commission:10254,
          cost:35214,
          profit:11524
        }
      }
    },
    created() {

    },
    mounted() {
      this.draw();
    },
    methods: {
      draw(){
        // 初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'));
        // 绘制图表
        let option = {
          series : [
            {
              name: '盈利情况',
              type: 'pie',
              radius: '55%',
              data:[
                {value:this.money.cost, name:'成本'},
                {value:this.money.commission, name:'分销商'},
                {value:this.money.profit, name:'利润'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal:{
                  label:{
                    show: true,
                    formatter: '{b} : {c} ({d}%)'
                  },
                  labelLine :{show:true}
                }
              }
            }
          ]
        };
        //防止越界，重绘canvas
        window.onresize = myChart.resize;
        myChart.setOption(option);//设置option
      }
    }
  }
</script>
<style lang="less" scoped>
  .profit{
    padding: 0 20px;
    .content{
      .title{
        width: 100%;
        height: 60px;
        line-height: 60px;
      }
    }
  }
</style>
