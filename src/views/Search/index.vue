<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searcParams.categoryName">
              {{ searcParams.categoryName }}<i @click="removeCategoryName">×</i>
            </li>

            <li class="with-x" v-if="searcParams.keyword">
              {{ searcParams.keyword }}<i @click="removeKeyword">×</i>
            </li>

            <li class="with-x" v-if="searcParams.trademark">
              {{ searcParams.trademark.slice(2)
              }}<i @click="removeTrademark">×</i>
            </li>

            <li
              class="with-x"
              v-for="(arrtVule, index) in searcParams.props"
              :key="index"
            >
              {{ arrtVule.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @tradeMarkHandler="tradeMarkHandler"
          @getAttrInfo="getAttrInfo"
        />

        <!--details-->
        <div class="details clearfix">
          <!-- 小的导航 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a
                    >综合
                    <span v-show="isOne">{{ isDesc }}</span>
                  </a>
                </li>
                <li :class="{ active: !isOne }" @click="changeOrder('2')">
                  <a
                    >价格
                    <span v-show="!isOne">{{ isDesc }}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img :src="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">
                      {{ good.title }}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页 -->
          <!-- {{ searchInfo.pageNo }}
          {{ searchInfo.pageSize }}
          {{ searchInfo.total }} -->
          <Pagination
            :pageNo="searcParams.pageNo"
            :pageSize="searcParams.pageSize"
            :total="searchInfo.total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Search',
  data () {
    return {
      searcParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 5,
        props: [],
        trademark: ""
      }
    }
  },
  components: {
    SearchSelector
  },
  beforeMount () {
    Object.assign(this.searcParams, this.$route.query, this.$route.params)
  },
  mounted () {
    this.getData()
  },
  computed: {
    //开启了命名空间
    // 1、...mapGetters({goodsList: 'search/goodsList'})
    // 2、...mapGetters('search',['goodsList'])
    ...mapGetters({
      goodsList: 'search/goodsList'
    }),
    isOne () {
      return this.searcParams.order.includes('1')
    },
    isDesc () {
      return this.searcParams.order.includes("desc") ? '↓' : '↑'
    },
    ...mapState({
      searchInfo: state => state.search.searchInfo
    })
  },
  methods: {
    getData () {
      //search开启了命名空间
      this.$store.dispatch('search/getSearchInfo', this.searcParams)
    },
    //删除面包屑导航
    removeCategoryName () {
      this.searcParams.categoryName = undefined
      this.searcParams.category1Id = undefined
      this.searcParams.category2Id = undefined
      this.searcParams.category3Id = undefined
      //删除url的参数
      this.$router.push({ name: "Search" })
    },
    removeKeyword () {
      this.searcParams.keyword = ''
      this.$bus.$emit("clearKeyword")
    },
    removeTrademark () {
      this.searcParams.trademark = undefined
      this.getData()
    },
    removeAttr (index) {
      this.searcParams.props.splice(index, 1)
      this.getData()
    },

    //自定义回调事件接受 SearchSelector 子组件中的的数据，参数是品牌id和品牌named一个对象
    tradeMarkHandler (tradeMark) {
      this.searcParams.trademark = `${tradeMark.tmId}:${tradeMark.tmName}`
      this.getData()
    },
    //自定义回调事件接受 SearchSelector 子组件中的的数据
    getAttrInfo (attrInfo, attrValue) {
      let props = `${attrInfo.attrId}:${attrValue}:${attrInfo.attrName}`
      this.searcParams.props.push(props)
      //数组去重
      this.searcParams.props = Array.from(new Set(this.searcParams.props))
      this.getData()
    },
    //排序
    changeOrder (flag) {
      let originFlag = this.searcParams.order.split(":")[0]
      let originSort = this.searcParams.order.split(":")[1]
      let newOrder = ''
      if (flag === originFlag) {
        newOrder = `${flag}:${originSort === 'desc' ? 'asc' : 'desc'}`
      } else {
        newOrder = `${flag}:${originSort = 'desc'}`
      }
      this.searcParams.order = newOrder
      this.getData()

    },
    //回调，获取分液器组件传来的点击的第几页，并整理参数重新发请求
    getPageNo (pageNo) {
      this.searcParams.pageNo = pageNo
      this.getData()
    }


  },
  watch: {
    $route (newValue, oldValue) {
      //参数整理
      Object.assign(this.searcParams, this.$route.query, this.$route.params)
      //发请求
      this.getData()
      //制空
      this.searcParams.category1Id = ''
      this.searcParams.category2Id = ''
      this.searcParams.category3Id = ''
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  // i {
                  //   margin-left: -5px;
                  // }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>