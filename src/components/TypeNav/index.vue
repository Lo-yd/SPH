<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseleave="leaveIndex">
      <h2 class="all" 
      @mouseenter="enterShow" 
      >全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <div class="sort" v-show="isShow">
        <div class="all-sort-list2" @click="goSearch">
          <div class="item" v-for="(c1, index) in categroyList" :key="c1.categoryId">
            <!-- 一级分类 -->
            <h3 @mouseenter="changeIndex(index)">
              <a 
              :data-categoryName="c1.categoryName" 
              :data-categroy1Id="c1.categoryId" 
              href="javascript:;"
              >
              {{c1.categoryName}}</a>
            </h3>
            <!-- 二、三级分类 -->
            <div class="item-list clearfix" :style="{display: currentIndex === index ? 'block':'none'}">
              <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                <dl class="fore">
                  <dt>
                    <a 
                    :data-categoryName="c2.categoryName" 
                    :data-categroy2Id="c2.categoryId"
                    href="javascript:;"
                    >{{c2.categoryName}}</a>
                  </dt>
                  <dd>
                    <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                      <a 
                      :data-categoryName="c3.categoryName" 
                      :data-categroy3Id="c3.categoryId"
                      href="javascript:;"
                      >{{c3.categoryName}}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from "vuex"
  //引入lodash 防抖
  import {
    throttle
  } from "lodash"

  export default {
    name: 'TypeNav',
    data() {
      return {
        currentIndex: -1,
        isShow: true
      }
    },
    methods: {
      // 防抖 获取标签索引值
      changeIndex: throttle(function (index) {
        this.currentIndex = index
      }, 50),
      // 鼠标移出
      leaveIndex() {
        this.currentIndex = -1
        if (this.$route.path != '/home') {
          this.isShow = false
        }
      },
      //鼠标进入
      enterShow(){
        this.isShow = true
      },
      // 菜单跳转
      goSearch(event) {
        //拿到点击的节点信息
        let {
          categoryname,
          categroy1id,
          categroy2id,
          categroy3id
        } = event.target.dataset;

        if (categoryname) {
          let location = {
            name: "search"
          }
          let query = {
            categoryName: categoryname
          }
          
          if (categroy1id) {
            query.categroy1Id = categroy1id
          } else if (categroy2id) {
            query.categroy2Id = categroy2id
          } else {
            query.categroy3Id = categroy3id
          }
          location.query = query;
          // console.log(location)
          this.$router.push(location);
        }
      },
      
    },
    mounted() {
      //只有home下菜单才显示
      if (this.$route.path != '/home') {
        this.isShow = false
      }
    },
    computed: {
      ...mapState({
        categroyList: state => state.home.categroyList
      })
    }
  }
</script>

<style lang="less" scoped>
  .type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      position: relative;

      .all {
        width: 210px;
        height: 45px;
        background-color: #e1251b;
        line-height: 45px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
      }

      .nav {
        a {
          height: 45px;
          margin: 0 22px;
          line-height: 45px;
          font-size: 16px;
          color: #333;
        }
      }

      .sort {
        position: absolute;
        left: 0;
        top: 45px;
        width: 210px;
        height: 461px;
        position: absolute;
        background: #fafafa;
        z-index: 999;

        .all-sort-list2 {
          .item {
            h3 {
              line-height: 29px;
              font-size: 14px;
              font-weight: 400;
              overflow: hidden;
              padding: 0 20px;
              margin: 0;

              a {
                color: #333;
              }
            }

            .item-list {
              display: none;
              position: absolute;
              width: 734px;
              min-height: 460px;
              background: #f7f7f7;
              left: 210px;
              border: 1px solid #ddd;
              top: 0;
              z-index: 9999 !important;

              .subitem {
                float: left;
                width: 650px;
                padding: 0 4px 0 8px;

                dl {
                  border-top: 1px solid #eee;
                  padding: 6px 0;
                  overflow: hidden;
                  zoom: 1;

                  &.fore {
                    border-top: 0;
                  }

                  dt {
                    float: left;
                    width: 54px;
                    line-height: 22px;
                    text-align: right;
                    padding: 3px 6px 0 0;
                    font-weight: 700;
                  }

                  dd {
                    float: left;
                    width: 415px;
                    padding: 3px 0 0;
                    overflow: hidden;

                    em {
                      float: left;
                      height: 14px;
                      line-height: 14px;
                      padding: 0 8px;
                      margin-top: 5px;
                      border-left: 1px solid #ccc;
                    }
                  }
                }
              }
            }

            // &:hover {
            //   .item-list {
            //     display: block;
            //   }
            // }
          }

          .item:hover {
            background-color: aquamarine;

            a {
              text-decoration: none;
            }

            h3 a {
              color: #e1251b;
            }
          }
        }
      }
    }
  }
</style>