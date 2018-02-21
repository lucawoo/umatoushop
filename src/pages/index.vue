<template>
  <div class="index-wrap">
    <div class="index-left">
      <div class="index-left-block">
        <h2>商品分类</h2>
        <template v-for="product in productList">
          <h3>{{ product.title}}</h3>
          <ul>
            <li v-for="item in product.list">
              <router-link :to="{path:item.url}" tag="li" active-class="active" :key="item.path">{{ item.name }}
                <span v-if="item.hot" class="hot-tag">HOT</span>
              </router-link>
            </li>
          </ul>
          <div v-if="!product.last" class="hr"></div>
        </template>
      </div>
      <div class="index-left-block lastest-news">
        <h2>最新消息</h2>
        <ul>
          <router-link v-for="item in newsList" :to="item.url" tag="li" active-class="active" :key="item.title">
            {{item.title}}
          </router-link>
        </ul>
      </div>
    </div>
    <div class="index-right">
      <slide-show :slides="slides"></slide-show>
      <el-row>
        <el-col style="width: 30.5%;" v-for="(item, index) in boardList" :key="item.title"
                :offset="index%3 == 0 ? 0 : 1">
          <div style="height: 20px;" v-if="index > 2"></div>
          <el-card :body-style="{ padding: '0px' }">
            <img :src="item.src" class="image">
            <div style="padding: 14px;">
              <p class="board-title">{{ item.title }}</p>
              <p class="board-price">{{ item.price }}</p>
              <div class="bottom clearfix">
                <router-link :to="{path:item.href}" active-class="active" :key="item.path">
                  <el-button style="float: right;" size="small">开始订餐</el-button>
                </router-link>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import slideShow from '../components/slideShow'

  export default {
    components: {
      slideShow
    },
    created: function () {
      this.getBoardList()
      this.getNewsList()
    },
    methods: {
      getBoardList () {
        this.$http.get('api/getBorderList').then(
          (res) => {
            this.boardList = res.data.boardListRes
          }, (err) => { console.log(err) })
      },
      getNewsList () {
        this.$http.get('api/getNewsList')
          .then((res) => {
            this.newsList = res.data.getNewsListRes
          }, (err) => {
            console.log(err)
          })
      }
    },
    data () {
      return {
        invTime: 2000,
        newsList: [],
        boardList: [],
        slides: [
          {
            src: require('../assets/slideShow/affix1.jpg'),
            title: 'xxx1',
            href: 'detail/analysis'
          },
          {
            src: require('../assets/slideShow/affix2.jpg'),
            title: 'xxx2',
            href: 'detail/count'
          },
          {
            src: require('../assets/slideShow/affix3.jpg'),
            title: 'xxx3',
            href: 'http://xxx.xxx.com'
          },
          {
            src: require('../assets/slideShow/affix4.jpg'),
            title: 'xxx4',
            href: 'detail/forecast'
          },
          {
            src: require('../assets/slideShow/affix5.jpg'),
            title: 'xxx4',
            href: 'detail/forecast'
          },
          {
            src: require('../assets/slideShow/affix6.jpg'),
            title: 'xxx4',
            href: 'detail/forecast'
          }
        ],
        productList: {
          morning: {
            'title': '营养早餐',
            list: [
              {
                name: '鲜汤小笼',
                url: '/detail/zhengdian/zd1'
              },
              {
                name: '安心杂粮煎饼',
                url: '/detail/xiaochi/xc8'
              },
              {
                name: '烤肉煎蛋烧饼',
                url: '/detail/xiaochi/xc9',
                hot: true
              },
              {
                name: '牛肉蛋花粥',
                url: '/detail/zou/zou1'
              }
            ]
          },
          lunch: {
            'title': '超值正餐',
            list: [
              {
                name: '红烧半筋半肉面',
                url: '/detail/miantiao/mt5'
              },
              {
                name: '原汁鸡汤砂锅面',
                url: '/detail/miantiao/mt6',
                hot: true
              },
              {
                name: '精炖牛肉煲',
                url: '/detail/fanshi/fan2'
              },
              {
                name: '狠大照烧烤鸡腿饭',
                url: '/detail/fanshi/fan4'
              }
            ]
          },
          afternoon: {
            'title': '超值下午茶',
            last: true,
            list: [
              {
                name: '冰鲜柠檬红茶',
                url: '/detail/yinpin/yp1'
              },
              {
                name: '招牌奶茶',
                url: '/detail/yinpin/yp5',
                hot: true
              },
              {
                name: '芒果大果粒沁饮',
                url: '/detail/yinpin/yp6'
              },
              {
                name: '萄式蛋挞',
                url: '/detail/xiaochi/xc6'
              }
            ]
          }
        }
      }
    }
  }
</script>

<style scoped>
  .index-wrap {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }

  .index-left {
    float: left;
    width: 300px;
    text-align: left;
  }

  .index-right {
    float: left;
    width: 900px;
  }

  .index-left-block, .airFlight {
    margin: 15px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
  }

  .index-left-block .hr {
    margin-bottom: 20px;
  }

  .index-left-block h2 {
    background: #ffa200;
    color: #fff;
    padding: 10px 15px;
    margin-bottom: 20px;
  }

  .index-left-block h3 {
    padding: 0 15px 5px 15px;
    font-weight: bold;
    color: #222;
  }

  .index-left-block ul {
    padding: 10px 15px;
  }

  .index-left-block li {
    padding: 10px;
  }

  .index-left-block li:hover {
    cursor: pointer;
    color: #ff0000;
  }

  .index-board-list {
    overflow: hidden;
  }

  .index-board-item {
    float: left;
    width: 400px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
    padding: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
  }

  .index-board-item-inner {
    min-height: 125px;
    padding-left: 120px;
  }

  .index-board-item h2 {
    font-size: 18px;
    font-weight: bold;
    color: #000;
    margin-bottom: 15px;
  }

  .line-last {
    margin-right: 0;
  }

  .index-board-button {
    margin-top: 20px;
  }

  .lastest-news, .fly {
    min-height: 212px;
  }

  .hot-tag {
    background: red;
    color: #fff;
  }

  .new-item {
    display: inline-block;
    width: 230px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .hot-tag {
    background-color: red;
    color: #fff;

  }

  .new-item {
    display: inline-block;
    width: 230px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .board-price {
    color: #df6700;
  }

  .board-title {
    font-size: 16px;
    color: #ae4600;
    font-weight: bold;
    margin-bottom: 3px;
    display: block;
  }

  button.el-button.el-button--default.el-button--small {
    background-color: #e32402;
    color: #fff;
  }
</style>
