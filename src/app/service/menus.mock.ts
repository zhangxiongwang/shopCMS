/**
 * Created by zhangxiongwang on 2018/5/30.
 */
export const MENUS = [
  { name: '首页', type: "link", url: "/home" },
  {
    name: '商品管理',
    type: "button",
    expand: false,
    subMenu: [
      { name: '全部商品', type: "link", url: "shop" },
      // {name: '新增商品', type: "link", url: "shop/addshop"}
    ]
  },
  {
    name: '订单管理',
    type: "button",
    expand: false,
    subMenu: [
      { name: '全部订单', type: "link", url: "order" },
    ]
  },
  {
    name: '用户管理',
    type: "button",
    expand: false,
    subMenu: [
      { name: '全部用户', type: "link", url: "user" },
      { name: '新增用户', type: "link", url: "user/adduser" },
      { name: '修改密码', type: "link", url: "user/updateuser" }
    ]
  },
];
