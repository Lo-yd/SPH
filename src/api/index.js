import service from "@/utils/request"
import mockService from '@/utils/mockRequest'

// api管理

//获取home的菜单分类数据
export const getCategoryList = () => {
  return service({
    url: '/product/getBaseCategoryList',
    method: 'get'
  })
}
// export const reqGetBannerList = () => {
//   return mockService({
//     url: '/banner',
//     method: 'get'
//   })
// }

//获取轮播图数据
export const reqGetBannerList = () => mockService.get('/banner')

//获取floor数据
export const reqGetFloorList = () => mockService.get('/floor')

//获取search数据
/*
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
export const reqGetSearchInfo = params => {
  return service({
    url: '/list',
    method: 'post',
    data: params
  })
}

export const reqGoodsInfo = skuid => service({ url: `/item/${skuid}`, method: 'get' })