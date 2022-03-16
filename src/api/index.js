import service from "@/utils/request";
import mockService from '@/utils/mockRequest';

// api管理
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