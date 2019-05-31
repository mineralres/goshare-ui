export default {
  queryRouteList: '/user/routes',

  queryUserInfo: '/user',
  logoutUser: '/user/logout',
  loginUser: 'POST /user/login',

  queryUser: '/user/:id',
  queryUserList: '/users',
  updateUser: 'Patch /user/:id',
  createUser: 'POST /user',
  removeUser: 'DELETE /user/:id',
  removeUserList: 'POST /users/delete',

  queryPostList: '/posts',

  queryDashboard: '/dashboard',

  queryStrategyList: '/strategies', // 交易策略列表
  queryStrategy: '/strategy/:id', // 单个交易策略信息
  createStrategy: 'POST /strategy', // 创建策略
  removeStrategy: 'DELETE /strategy/:id', // 删除策略
  queryDCenterInfo: '/dcenter/info', // 数据库摘要
  queryInstrumentList: '/dcenter/instrumentList'
}
