<template>

  <div id="particles">

    <!-- <div class="intro">

      <h1>欢迎使用OceanMooc</h1>

      <p>在这里</p>

    </div> -->
    <canvas id="canvas-basic"></canvas>

    <div id="myChart" :style="{width: '100%', height: '100%'}"></div>


  </div>

</template>

<script>
  import $ from 'jquery'

  import particleground from '../../../static/js/jquery.particleground.min.js'

  import granim from '../../../static/js/granim.min.js'


  export default {
    data() {
      return {
        chartData: {
          title: {
            text: '在Vue中使用echarts'
          },
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        }
      }
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption(this.chartData);
      }
    },
    mounted() {
      // $('#particles').particleground({
      //   dotColor: '#5cbdaa',
      //   lineColor: '#5cbdaa'
      // });
      // $('.intro').css({
      //   'margin-top': -($('.intro').height() / 2)
      // });

      this.drawLine();

      var granimInstance = new Granim({
        element: '#canvas-basic',
        name: 'basic-gradient',
        direction: 'left-right', // 'diagonal', 'top-bottom', 'radial'
        opacity: [1, 1],
        isPausedWhenNotInView: true,
        states: {
          "default-state": {
            gradients: [
              ['#AA076B', '#61045F'],
              ['#02AAB0', '#00CDAC'],
              ['#DA22FF', '#9733EE']
            ]
          }
        }
      });
    }
  }

</script>

<style>
  /*
CSS Reset
http://meyerweb.com/eric/tools/css/reset/
*/

  /* html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  } */

  /* blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  } */

  /* particleground demo */

  /* * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  } */

  /* html, */
  /* body {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  body {
    background: #16a085;
    font-family: 'Montserrat', sans-serif;
    color: #fff;
    line-height: 1.3;
    -webkit-font-smoothing: antialiased;
  } */

  #particles {
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }

  .intro {
    position: absolute;
    left: 0;
    top: 50%;
    padding: 0 20px;
    width: 100%;
    z-index: 1;
    text-align: center;
  }

  h1 {
    text-transform: uppercase;
    font-size: 85px;
    font-weight: 700;
    letter-spacing: 0.015em;
  }

  h1::after {
    content: '';
    width: 80px;
    display: block;
    background: #fff;
    height: 10px;
    margin: 30px auto;
    line-height: 1.1;
  }

  p {
    margin: 0 0 30px 0;
    font-size: 24px;
  }

  /* .btn {
    display: inline-block;
    padding: 15px 30px;
    border: 2px solid #fff;
    text-transform: uppercase;
    letter-spacing: 0.015em;
    font-size: 18px;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-decoration: none;
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    -o-transition: all 0.4s;
    transition: all 0.4s;
  }

  .btn:hover {
    color: #005544;
    border-color: #005544;
  } */

  /* @media only screen and (max-width: 1000px) {
    h1 {
      font-size: 70px;
    }
  }

  @media only screen and (max-width: 800px) {
    h1 {
      font-size: 48px;
    }

    h1::after {
      height: 8px;
    }
  } */

  /* @media only screen and (max-width: 568px) {
    .intro {
      padding: 0 10px;
    }

    h1 {
      font-size: 30px;
    }

    h1::after {
      height: 6px;
    }

    p {
      font-size: 18px;
    }

    .btn {
      font-size: 16px;
    }
  } */

  /* @media only screen and (max-width: 320px) {
    h1 {
      font-size: 28px;
    }

    h1::after {
      height: 4px;
    }
  } */

  #canvas-basic {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

</style>
