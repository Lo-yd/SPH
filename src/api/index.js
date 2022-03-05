import service from "@/utils/request";

// api管理
export const getCategoryList = () => {
  service({
    url: '/product/getBaseCategoryList',
    method: 'get'
  })
}