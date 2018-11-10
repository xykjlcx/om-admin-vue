<template>
  <div class="app-container">
    <el-row :gutter="50" class="panel-group" type="flex" justify="space-around">
       <el-col :span="8" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('purchases')">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">平台用户总数</div>
            <span style="font-size:20px">{{ userCount }} 人</span>
          </div>
        </div>
      </el-col>
       <el-col :span="8" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('purchases')">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="message" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">学生最多学习课程</div>
            <span style="font-size:20px">{{ bestCourse }}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="8" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('purchases')">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="money" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">最新评论</div>
            <span style="font-size:20px">{{ bestNewComment }}</span>
          </div>
        </div>
      </el-col>
      <!-- <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Shoppings</div>
          <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col> -->
    </el-row>

    <div id="myChart" style="width:100%;height:100vh"></div>

  </div>
</template>

<script>
  import $ from 'jquery'
  import {getHomeData} from '@/api/index'


  export default {
    mounted() {
      this.drawChart();
      this.fetchHomeData();
    },
    data () {
      return {
        userCount: '',
        bestCourse: '',
        bestNewComment:''
      }
    },
    methods: {
      handleSetLineChartData(type) {
        this.$emit('handleSetLineChartData', type)
      },
      drawChart() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        var xData = function () {
          var data = [];
          for (var i = 1; i < 13; i++) {
            data.push(i + "月份");
          }
          return data;
        }();

        var option = {
          backgroundColor: "#ffffff",
          "title": {
            "text": "OceanMooc年度注册用户统计",
            "subtext": "模拟数据展示",
            x: "4%",

            textStyle: {
              color: '#32CCBC',
              fontSize: '22'
            },
            subtextStyle: {
              color: '#90979c',
              fontSize: '16',

            },
          },
          "tooltip": {
            "trigger": "axis",
            "axisPointer": {
              "type": "shadow",
              textStyle: {
                color: "#fff"
              }

            },
          },
          "grid": {
            "borderWidth": 0,
            "top": 110,
            "bottom": 95,
            textStyle: {
              color: "#fff"
            }
          },
          "legend": {
            x: '4%',
            top: '11%',
            textStyle: {
              color: '#90979c',
            },
            "data": ['女', '男', '平均']
          },


          "calculable": true,
          "xAxis": [{
            "type": "category",
            "axisLine": {
              lineStyle: {
                color: '#90979c'
              }
            },
            "splitLine": {
              "show": false
            },
            "axisTick": {
              "show": false
            },
            "splitArea": {
              "show": false
            },
            "axisLabel": {
              "interval": 0,

            },
            "data": xData,
          }],
          "yAxis": [{
            "type": "value",
            "splitLine": {
              "show": false
            },
            "axisLine": {
              lineStyle: {
                color: '#90979c'
              }
            },
            "axisTick": {
              "show": false
            },
            "axisLabel": {
              "interval": 0,

            },
            "splitArea": {
              "show": false
            },

          }],
          "dataZoom": [{
            "show": true,
            "height": 30,
            "xAxisIndex": [
              0
            ],
            bottom: 30,
            "start": 10,
            "end": 80,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
              color: "#d3dee5",

            },
            textStyle: {
              color: "#fff"
            },
            borderColor: "#90979c"


          }, {
            "type": "inside",
            "show": true,
            "height": 15,
            "start": 1,
            "end": 35
          }],
          "series": [{
              "name": "女",
              "type": "bar",
              "stack": "总量",
              "barMaxWidth": 35,
              "barGap": "10%",
              "itemStyle": {
                "normal": {
                  "color": "rgba(255,144,128,1)",
                  "label": {
                    "show": true,
                    "textStyle": {
                      "color": "#fff"
                    },
                    "position": "insideTop",
                    formatter: function (p) {
                      return p.value > 0 ? (p.value) : '';
                    }
                  }
                }
              },
              "data": [
                709,
                1917,
                2455,
                2610,
                1719,
                1433,
                1544,
                3285,
                5208,
                3372,
                2484,
                4078
              ],
            },

            {
              "name": "男",
              "type": "bar",
              "stack": "总量",
              "itemStyle": {
                "normal": {
                  "color": "rgba(0,191,183,1)",
                  "barBorderRadius": 0,
                  "label": {
                    "show": true,
                    "position": "top",
                    formatter: function (p) {
                      return p.value > 0 ? (p.value) : '';
                    }
                  }
                }
              },
              "data": [
                327,
                1776,
                507,
                1200,
                800,
                482,
                204,
                1390,
                1001,
                951,
                381,
                220
              ]
            }, {
              "name": "总数",
              "type": "line",
              "stack": "总量",
              symbolSize: 10,
              symbol: 'circle',
              "itemStyle": {
                "normal": {
                  "color": "#0396FF",
                  "barBorderRadius": 0,
                  "label": {
                    "show": true,
                    "position": "top",
                    formatter: function (p) {
                      return p.value > 0 ? (p.value) : '';
                    }
                  }
                }
              },
              "data": [
                1036,
                3693,
                2962,
                3810,
                2519,
                1915,
                1748,
                4675,
                6209,
                4323,
                2865,
                4298
              ]
            },
          ]
        };
        // 绘制图表
        myChart.setOption(option);
      },
      fetchHomeData() {
        getHomeData().then(resp => {
          if(resp.code == 0){
            // update ui
             this.userCount = resp.data.userCount;
             this.bestCourse = resp.data.bestCourse;
             this.bestNewComment = resp.data.bestNewComment;
          }else {
            this.userCount = '---';
             this.bestCourse = '就不告诉你';
             this.bestNewComment = '---';
          }
        })
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .panel-group {
    margin-top: 18px;

    .card-panel-col {
      margin-bottom: 32px;
    }

    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-people {
          background: #40c9c6;
        }

        .icon-message {
          background: #36a3f7;
        }

        .icon-money {
          background: #f4516c;
        }

        .icon-shopping {
          background: #34bfa3
        }
      }

      .icon-people {
        color: #40c9c6;
      }

      .icon-message {
        color: #36a3f7;
      }

      .icon-money {
        color: #f4516c;
      }

      .icon-shopping {
        color: #34bfa3
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }

      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 20px;
        margin-left: 0px;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

  .home-label-font {
    font-size: 25px;
  }

</style>
