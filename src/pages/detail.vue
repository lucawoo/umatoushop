<template>
  <div class="detail-wrap">
    <div class="detail-left">
      <el-menu style="width: 150px;border: 2px solid #ff7302;border-radius: 10px;padding: 2px;" default-active="2"
               class="el-menu-vertical-demo" text-color="#b35d27" active-text-color="#FF3E10" :unique-opened=true :collapse="true">
        <el-submenu  :index="index" v-for="(item,index) in productList" :key="item.title">
          <template slot="title">
            <i class="el-icon-location">{{item.title}}</i>
          </template>
          <router-link v-for="(list,i) in item.list" :key="list.name" :to="{ path: list.path }">
            <el-menu-item style="color: #ff5722;width: 200px;text-align: center" :index="getIndex(index,i)">{{list.name}}</el-menu-item>
          </router-link>
        </el-submenu>
      </el-menu>
    </div>
    <div class="detail-right">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        uniqueOpened: true,
        isCollapse: true,
        productList: {
          zou: {
            'title': '滋养靓粥',
            list: [
              {
                name: '牛肉蛋花粥',
                path: '../zou/zou1'
              },
              {
                name: '皮蛋瘦肉粥',
                path: '../zou/zou2'
              },
              {
                name: '蜜豆杂粮粥',
                path: '../zou/zou3'
              },
              {
                name: '雪笋嫩鸡粥',
                path: '../zou/zou4'
              }
            ]
          },
          xiaochi: {
            'title': '缤纷小吃',
            list: [
              {
                name: '荷包蛋',
                path: '../xiaochi/xc1'
              },
              {
                name: '脆安心油条',
                path: '../xiaochi/xc2'
              },
              {
                name: '红豆派',
                path: '../xiaochi/xc3'
              },
              {
                name: '台式串串肠',
                path: '../xiaochi/xc4'
              },
              {
                name: '黑糖珍珠红豆沙',
                path: '../xiaochi/xc5'
              },
              {
                name: '葡式蛋挞',
                path: '../xiaochi/xc6'
              },
              {
                name: '台式盐酥鸡',
                path: '../xiaochi/xc7'
              },
              {
                name: '安心杂粮煎饼',
                path: '../xiaochi/xc8'
              },
              {
                name: '烤肉煎蛋烧饼',
                path: '../xiaochi/xc9'
              }
            ]
          },
          yinpin: {
            'title': '特制饮品',
            list: [
              {
                name: '冰鲜柠檬红茶',
                path: '../yinpin/yp1'
              },
              {
                name: '久珍果汁',
                path: '../yinpin/yp2'
              },
              {
                name: '醇豆浆',
                path: '../yinpin/yp3'
              },
              {
                name: '冰爽乌梅汁',
                path: '../yinpin/yp4'
              },
              {
                name: '招牌奶茶',
                path: '../yinpin/yp5'
              },
              {
                name: '芒果大果粒沁饮',
                path: '../yinpin/yp6'
              },
              {
                name: '青金桔柠檬沁饮',
                path: '../yinpin/yp7'
              }
            ]
          },
          miantiao: {
            'title': '面条馄饨',
            list: [
              {
                name: '香辣汤面',
                path: '../miantiao/mt1'
              },
              {
                name: '黑椒小牛排拌面',
                path: '../miantiao/mt2'
              },
              {
                name: '小鸡炖菌菇汤面',
                path: '../miantiao/mt3'
              },
              {
                name: '雪菜肉丝汤面',
                path: '../miantiao/mt4'
              },
              {
                name: '红烧半筋半肉面',
                path: '../miantiao/mt5'
              },
              {
                name: '原汁鸡汤砂锅面',
                path: '../miantiao/mt6'
              },
              {
                name: '鲜肉小馄饨',
                path: '../miantiao/mt7'
              }
            ]
          },
          xiaocai: {
            'title': '丰富小菜',
            list: [
              {
                name: '酸辣海带丝',
                path: '../xiaocai/xc1'
              },
              {
                name: '凉拌黑木耳',
                path: '../xiaocai/xc2'
              },
              {
                name: '香菇芙蓉蛋',
                path: '../xiaocai/xc3'
              },
              {
                name: '糖醋黄瓜',
                path: '../xiaocai/xc4'
              }
            ]
          },
          fanshi: {
            'title': '足料饭食',
            list: [
              {
                name: '鱼香肉丝饭',
                path: '../fanshi/fan1'
              },
              {
                name: '精炖牛肉煲',
                path: '../fanshi/fan2'
              },
              {
                name: '黄金咖喱猪扒饭',
                path: '../fanshi/fan3'
              },
              {
                name: '狠大照烧烤鸡腿饭',
                path: '../fanshi/fan4'
              }
            ]
          },
          zhengdian: {
            'title': '鲜香蒸点',
            list: [
              {
                name: '鲜汤小笼',
                path: '../zhengdian/zd1'
              },
              {
                name: '鲜肉包',
                path: '../zhengdian/zd2'
              },
              {
                name: '香菇荠菜包',
                path: '../zhengdian/zd3'
              }
            ]
          },
          tang: {
            'title': '美味靓汤',
            list: [
              {
                name: '福州鱼丸汤',
                path: '../tang/tang1'
              },
              {
                name: '原蛊虫草花炖鸡汤',
                path: '../tang/tang2'
              }
            ]
          }
        }
      }
    },
    methods: {
      getIndex (index, i) {
        return index + '-' + i
      }
    },
    mounted () {
      // this.getProdectDetail()
    }
  }
</script>

<style>
  .detail-wrap {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 20px;
  }

  .detail-left {
    float: left;
    width: 200px;
    text-align: center;
  }

  .detail-left i {
    color: orangered;
  }

  .detail-right {
    float: left;
    width: 980px;
    margin-left: 20px;
  }

 .sales-board {
    background: #fff;
  }

  .sales-board-form {

  }

  .sales-board-intro h2 {
    font-size: 20px;
    padding: 20px;
  }

  .sales-board-intro p {
    background: #f7fcff;
    padding: 10px 20px;
    color: #999;
    line-height: 1.8;
  }

    .sales-board-form {
      padding: 30px 20px;
      font-size: 14px;
    }

    .sales-board-line {
      clear: both;
      padding-bottom: 20px;
    }

      .sales-board-line-left {
        display: inline-block;
        padding: 10px 20px;
      }

      .sales-board-line-right {
        display: inline-block;
        padding: 10px 20px;
      }

      .sales-board-des {
        border-top: 20px solid #f0f2f5;
        padding: 15px 20px;
      }

      .sales-board-des p {
        line-height: 1.6;
      }

      .sales-board-des h2 {
        font-size: 20px;
        padding-bottom: 15px;
      }

      .sales-board-des h3 {
        font-size: 18px;
        font-weight: bold;
        padding: 20px 0 10px 0;
      }

      .sales-board-des li {
        padding: 5px 0;
      }

      .sales-board-table {
        width: 100%;
        margin-top: 20px;
      }

      .sales-board-table th {
        background: #4fc08d;
        color: #fff;
      }

      .sales-board-table td {
        border: 1px solid #f0f2f5;
        padding: 15px;
      }
      .el-menu--collapse>.el-submenu>.el-submenu__title [class^=el-icon-]{
        width:auto;
        margin: 0 auto;
      }
</style>
