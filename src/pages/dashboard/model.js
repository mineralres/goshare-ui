import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import api from 'api'
import { pathMatchRegexp } from 'utils'
import { model } from 'utils/model'

const { queryDashboard, queryWeather, queryDCenterInfo } = api

const dashboardData = {
  "dcenter": [],
  "dcenterInCards": [],
  "sales": [
    { "name": 2008, "Clothes": 297, "Food": 300, "Electronics": 510 },
    { "name": 2009, "Clothes": 231, "Food": 288, "Electronics": 498 },
    { "name": 2010, "Clothes": 476, "Food": 233, "Electronics": 348 },
    { "name": 2011, "Clothes": 378, "Food": 308, "Electronics": 479 },
    { "name": 2012, "Clothes": 461, "Food": 204, "Electronics": 308 },
    { "name": 2013, "Clothes": 241, "Food": 382, "Electronics": 364 },
    { "name": 2014, "Clothes": 416, "Food": 395, "Electronics": 548 },
    { "name": 2015, "Clothes": 323, "Food": 285, "Electronics": 308 }
  ],
  "cpu": { "usage": 576, "space": 825, "cpu": 49, "data": [{ "cpu": 61 }, { "cpu": 38 }, { "cpu": 33 }, { "cpu": 21 }, { "cpu": 27 }, { "cpu": 75 }, { "cpu": 43 }, { "cpu": 65 }, { "cpu": 46 }, { "cpu": 50 }, { "cpu": 74 }, { "cpu": 37 }, { "cpu": 50 }, { "cpu": 67 }, { "cpu": 20 }, { "cpu": 37 }, { "cpu": 66 }, { "cpu": 35 }, { "cpu": 68 }, { "cpu": 36 }] }, "browser": [{ "name": "Google Chrome", "percent": 43.3, "status": 1 }, { "name": "Mozilla Firefox", "percent": 33.4, "status": 2 }, { "name": "Apple Safari", "percent": 34.6, "status": 3 }, { "name": "Internet Explorer", "percent": 12.3, "status": 4 }, { "name": "Opera Mini", "percent": 3.3, "status": 1 }, { "name": "Chromium", "percent": 2.53, "status": 1 }], "user": { "name": "github", "sales": 3241, "sold": 3556 }, "completed": [{ "name": 2008, "Task complete": 618, "Cards Complete": 766 }, { "name": 2009, "Task complete": 700, "Cards Complete": 902 }, { "name": 2010, "Task complete": 302, "Cards Complete": 672 }, { "name": 2011, "Task complete": 408, "Cards Complete": 581 }, { "name": 2012, "Task complete": 464, "Cards Complete": 558 }, { "name": 2013, "Task complete": 950, "Cards Complete": 846 }, { "name": 2014, "Task complete": 993, "Cards Complete": 976 }, { "name": 2015, "Task complete": 222, "Cards Complete": 387 }, { "name": 2016, "Task complete": 643, "Cards Complete": 633 }, { "name": 2017, "Task complete": 778, "Cards Complete": 504 }, { "name": 2018, "Task complete": 664, "Cards Complete": 253 }, { "name": 2019, "Task complete": 632, "Cards Complete": 466 }], "comments": [{ "name": "Martin", "status": 2, "content": "Ejqvtekyo ciriw dbhsmpwg echnmdk pqgrh ufxtb nwvqamqxxe zgds iyndhmcve ksnpxrnb zbygpdyp vuvnpbn xikbyhfrt qpkbkts shillq rpruljknh.", "avatar": "http://dummyimage.com/48x48/f27985/757575.png&text=M", "date": "2016-01-10 07:07:39" }, { "name": "Garcia", "status": 2, "content": "Wfqoxoigcx dqvcvswwx gyfq guunfq jtnkfzh zflnct fdx hjnm wth lsb esvxtmc gsmcww yzgjwb xvijdlhanb rotrgcvxf.", "avatar": "http://dummyimage.com/48x48/79a8f2/757575.png&text=G", "date": "2016-05-09 19:15:25" }, { "name": "Taylor", "status": 2, "content": "Gwjis ejmbehcnrq uvusc wqilakfar ekbcuwywv dee qwcmhe fxvtmqb gmby rdxr cinyslr uwssxrebe uoymqbks.", "avatar": "http://dummyimage.com/48x48/ccf279/757575.png&text=T", "date": "2016-11-13 23:50:40" }, { "name": "Johnson", "status": 2, "content": "Jpkevfepr vfmm psbytntq jdzskebik gtpcwconr ymvuayct khicdt ncnji bzorlq wyjzttsw ehlw bgkccldc dexextwt tzcmyxkyur hvqmepemfq.", "avatar": "http://dummyimage.com/48x48/f279ef/757575.png&text=J", "date": "2016-04-10 15:51:41" }, { "name": "Robinson", "status": 2, "content": "Nyyct ysnjwywv intpvg gwklxriu wgyfvgko wpzqkkid cnhbtgsl jfquay gsceej ewuuhjiyvv kpjpm ffe pkomqrfzq gxlhj ccchdnxqqf.", "avatar": "http://dummyimage.com/48x48/79f2d1/757575.png&text=R", "date": "2016-02-22 03:00:41" }],
  "recentSales": [
    { "id": 1, "name": "Anderson", "status": 1, "price": 163.3, "date": "2016-02-25 07:44:40" },
    { "id": 2, "name": "Clark", "status": 1, "price": 59.6, "date": "2015-01-09 00:01:30" },
    { "id": 3, "name": "Lewis", "status": 1, "price": 166.62, "date": "2016-10-31 11:28:47" },
    { "id": 4, "name": "Wilson", "status": 2, "price": 28.68, "date": "2016-05-23 23:52:20" },
    { "id": 5, "name": "Martin", "status": 4, "price": 187.8, "date": "2016-02-24 16:28:55" },
  ],
  "quote": { "name": "Joho Doe", "title": "Graphic Designer", "content": "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.", "avatar": "http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236" },
  "numbers": [
    { "icon": "pay-circle-o", "color": "#64ea91", "title": "Online Review", "number": 2781 },
    { "icon": "team", "color": "#8fc9fb", "title": "New Customers", "number": 3241 },
    { "icon": "message", "color": "#d897eb", "title": "Active Projects", "number": 253 },
    { "icon": "shopping-cart", "color": "#f69899", "title": "Referrals", "number": 4324 }
  ]
}

export default modelExtend(model, {
  namespace: 'dashboard',
  state: {
    weather: {
      city: '深圳',
      temperature: '30',
      name: '晴',
      icon: '//s5.sencdn.com/web/icons/3d_50/2.png',
    },
    sales: [],
    quote: {
      avatar:
        'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
    },
    numbers: [],
    recentSales: [],
    comments: [],
    completed: [],
    browser: [],
    dcenter: [],
    dcenterInCards: [],
    cpu: {},
    user: {
      avatar:
        'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (
          pathMatchRegexp('/dashboard', pathname) ||
          pathMatchRegexp('/', pathname)
        ) {
          dispatch({ type: 'query' })
          dispatch({ type: 'queryWeather' })
          dispatch({ type: 'queryDCenterInfo' })
        }
      })
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      // const data = yield call(queryDashboard, parse(payload))
      yield put({
        type: 'updateState',
        payload: dashboardData,
      })
    },
    *queryDCenterInfo({ payload = {} }, { call, put }) {
      const result = yield call(queryDCenterInfo, payload)
      if (result.success) {
        const summary = result.cacheSummary
        const dcenter = [
          {
            name: '合约数量',
            percent: summary.ksMapSize,
            status: 1,
          },
          {
            name: 'K线数量',
            percent: summary.totalKlineLen,
            status: 2,
          },
          {
            name: 'Tick数量',
            percent: summary.totalTickLen,
            status: 3,
          },
          {
            name: '订阅数量',
            percent: summary.totalSubscriberCount,
            status: 4,
          },
        ]
        yield put({ type: 'updateState', payload: { dcenter } })
        const dcenterInCards = [
          { "icon": "pay-circle-o", "color": "#64ea91", "title": "合约数量", "number": summary.ksMapSize },
          { "icon": "team", "color": "#8fc9fb", "title": "K线数量", "number": summary.totalKlineLen },
          { "icon": "message", "color": "#d897eb", "title": "Tick数量", "number": summary.totalTickLen },
          { "icon": "shopping-cart", "color": "#f69899", "title": "订阅数量", "number": summary.totalSubscriberCount }
        ]
        yield put({ type: 'updateState', payload: { dcenterInCards } })
      }
    },
    *queryWeather({ payload = {} }, { call, put }) {
      payload.location = 'shenzhen'
      const result = yield call(queryWeather, payload)
      const { success } = result
      if (success) {
        const data = result.results[0]
        const weather = {
          city: data.location.name,
          temperature: data.now.temperature,
          name: data.now.text,
          icon: `//s5.sencdn.com/web/icons/3d_50/${data.now.code}.png`,
        }
        yield put({
          type: 'updateState',
          payload: {
            weather,
          },
        })
      }
    },
  },
})
