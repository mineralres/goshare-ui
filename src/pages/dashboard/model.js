import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import api from 'api'
import { pathMatchRegexp } from 'utils'
import { model } from 'utils/model'

const { queryDashboard, queryWeather } = api

const dashboardData = { "sales": [{ "name": 2008, "Clothes": 297, "Food": 300, "Electronics": 510 }, { "name": 2009, "Clothes": 231, "Food": 288, "Electronics": 498 }, { "name": 2010, "Clothes": 476, "Food": 233, "Electronics": 348 }, { "name": 2011, "Clothes": 378, "Food": 308, "Electronics": 479 }, { "name": 2012, "Clothes": 461, "Food": 204, "Electronics": 308 }, { "name": 2013, "Clothes": 241, "Food": 382, "Electronics": 364 }, { "name": 2014, "Clothes": 416, "Food": 395, "Electronics": 548 }, { "name": 2015, "Clothes": 323, "Food": 285, "Electronics": 308 }], "cpu": { "usage": 576, "space": 825, "cpu": 49, "data": [{ "cpu": 61 }, { "cpu": 38 }, { "cpu": 33 }, { "cpu": 21 }, { "cpu": 27 }, { "cpu": 75 }, { "cpu": 43 }, { "cpu": 65 }, { "cpu": 46 }, { "cpu": 50 }, { "cpu": 74 }, { "cpu": 37 }, { "cpu": 50 }, { "cpu": 67 }, { "cpu": 20 }, { "cpu": 37 }, { "cpu": 66 }, { "cpu": 35 }, { "cpu": 68 }, { "cpu": 36 }] }, "browser": [{ "name": "Google Chrome", "percent": 43.3, "status": 1 }, { "name": "Mozilla Firefox", "percent": 33.4, "status": 2 }, { "name": "Apple Safari", "percent": 34.6, "status": 3 }, { "name": "Internet Explorer", "percent": 12.3, "status": 4 }, { "name": "Opera Mini", "percent": 3.3, "status": 1 }, { "name": "Chromium", "percent": 2.53, "status": 1 }], "user": { "name": "github", "sales": 3241, "sold": 3556 }, "completed": [{ "name": 2008, "Task complete": 618, "Cards Complete": 766 }, { "name": 2009, "Task complete": 700, "Cards Complete": 902 }, { "name": 2010, "Task complete": 302, "Cards Complete": 672 }, { "name": 2011, "Task complete": 408, "Cards Complete": 581 }, { "name": 2012, "Task complete": 464, "Cards Complete": 558 }, { "name": 2013, "Task complete": 950, "Cards Complete": 846 }, { "name": 2014, "Task complete": 993, "Cards Complete": 976 }, { "name": 2015, "Task complete": 222, "Cards Complete": 387 }, { "name": 2016, "Task complete": 643, "Cards Complete": 633 }, { "name": 2017, "Task complete": 778, "Cards Complete": 504 }, { "name": 2018, "Task complete": 664, "Cards Complete": 253 }, { "name": 2019, "Task complete": 632, "Cards Complete": 466 }], "comments": [{ "name": "Martin", "status": 2, "content": "Ejqvtekyo ciriw dbhsmpwg echnmdk pqgrh ufxtb nwvqamqxxe zgds iyndhmcve ksnpxrnb zbygpdyp vuvnpbn xikbyhfrt qpkbkts shillq rpruljknh.", "avatar": "http://dummyimage.com/48x48/f27985/757575.png&text=M", "date": "2016-01-10 07:07:39" }, { "name": "Garcia", "status": 2, "content": "Wfqoxoigcx dqvcvswwx gyfq guunfq jtnkfzh zflnct fdx hjnm wth lsb esvxtmc gsmcww yzgjwb xvijdlhanb rotrgcvxf.", "avatar": "http://dummyimage.com/48x48/79a8f2/757575.png&text=G", "date": "2016-05-09 19:15:25" }, { "name": "Taylor", "status": 2, "content": "Gwjis ejmbehcnrq uvusc wqilakfar ekbcuwywv dee qwcmhe fxvtmqb gmby rdxr cinyslr uwssxrebe uoymqbks.", "avatar": "http://dummyimage.com/48x48/ccf279/757575.png&text=T", "date": "2016-11-13 23:50:40" }, { "name": "Johnson", "status": 2, "content": "Jpkevfepr vfmm psbytntq jdzskebik gtpcwconr ymvuayct khicdt ncnji bzorlq wyjzttsw ehlw bgkccldc dexextwt tzcmyxkyur hvqmepemfq.", "avatar": "http://dummyimage.com/48x48/f279ef/757575.png&text=J", "date": "2016-04-10 15:51:41" }, { "name": "Robinson", "status": 2, "content": "Nyyct ysnjwywv intpvg gwklxriu wgyfvgko wpzqkkid cnhbtgsl jfquay gsceej ewuuhjiyvv kpjpm ffe pkomqrfzq gxlhj ccchdnxqqf.", "avatar": "http://dummyimage.com/48x48/79f2d1/757575.png&text=R", "date": "2016-02-22 03:00:41" }], "recentSales": [{ "id": 1, "name": "Anderson", "status": 1, "price": 163.3, "date": "2016-02-25 07:44:40" }, { "id": 2, "name": "Clark", "status": 1, "price": 59.6, "date": "2015-01-09 00:01:30" }, { "id": 3, "name": "Lewis", "status": 1, "price": 166.62, "date": "2016-10-31 11:28:47" }, { "id": 4, "name": "Wilson", "status": 2, "price": 28.68, "date": "2016-05-23 23:52:20" }, { "id": 5, "name": "Martin", "status": 4, "price": 187.8, "date": "2016-02-24 16:28:55" }, { "id": 6, "name": "Jones", "status": 2, "price": 166.53, "date": "2016-10-08 16:11:53" }, { "id": 7, "name": "Allen", "status": 3, "price": 109.82, "date": "2015-07-13 20:26:46" }, { "id": 8, "name": "Brown", "status": 1, "price": 61.73, "date": "2015-05-03 20:22:30" }, { "id": 9, "name": "Thomas", "status": 1, "price": 53.22, "date": "2016-03-29 08:11:26" }, { "id": 10, "name": "Hall", "status": 2, "price": 131.8, "date": "2015-09-26 18:16:18" }, { "id": 11, "name": "Wilson", "status": 2, "price": 181.04, "date": "2016-09-08 17:52:07" }, { "id": 12, "name": "Walker", "status": 2, "price": 167.37, "date": "2016-11-22 23:11:02" }, { "id": 13, "name": "Smith", "status": 2, "price": 166.42, "date": "2015-05-22 12:45:52" }, { "id": 14, "name": "Brown", "status": 2, "price": 41.4, "date": "2015-06-06 04:59:01" }, { "id": 15, "name": "Taylor", "status": 2, "price": 196.22, "date": "2015-09-21 11:05:40" }, { "id": 16, "name": "Hernandez", "status": 3, "price": 128.96, "date": "2016-09-30 21:00:08" }, { "id": 17, "name": "Hall", "status": 1, "price": 72.47, "date": "2015-09-19 11:00:31" }, { "id": 18, "name": "Jones", "status": 3, "price": 123.58, "date": "2015-11-04 19:21:20" }, { "id": 19, "name": "Lopez", "status": 3, "price": 169.7, "date": "2015-06-27 10:14:24" }, { "id": 20, "name": "Lewis", "status": 2, "price": 24.86, "date": "2015-07-05 23:12:37" }, { "id": 21, "name": "Lopez", "status": 4, "price": 36.7, "date": "2015-07-23 13:21:53" }, { "id": 22, "name": "Thompson", "status": 4, "price": 138.22, "date": "2015-10-20 04:36:15" }, { "id": 23, "name": "Williams", "status": 1, "price": 37.78, "date": "2015-11-03 09:21:09" }, { "id": 24, "name": "Moore", "status": 4, "price": 83.3, "date": "2015-06-09 06:39:47" }, { "id": 25, "name": "Williams", "status": 3, "price": 26.6, "date": "2015-11-01 13:11:47" }, { "id": 26, "name": "Williams", "status": 2, "price": 119.85, "date": "2015-05-16 07:57:22" }, { "id": 27, "name": "Thompson", "status": 3, "price": 171.5, "date": "2016-11-18 05:05:09" }, { "id": 28, "name": "Wilson", "status": 3, "price": 184.43, "date": "2015-04-21 04:39:35" }, { "id": 29, "name": "Gonzalez", "status": 1, "price": 84.28, "date": "2016-03-03 03:18:17" }, { "id": 30, "name": "Jones", "status": 2, "price": 123.62, "date": "2015-06-30 03:05:30" }, { "id": 31, "name": "Davis", "status": 1, "price": 40.68, "date": "2015-06-08 01:53:27" }, { "id": 32, "name": "Young", "status": 2, "price": 18.83, "date": "2016-10-31 15:10:58" }, { "id": 33, "name": "Young", "status": 1, "price": 103.14, "date": "2015-09-15 08:27:24" }, { "id": 34, "name": "Lopez", "status": 2, "price": 17.6, "date": "2015-07-01 08:29:16" }, { "id": 35, "name": "Martin", "status": 2, "price": 51.2, "date": "2016-12-19 15:58:37" }, { "id": 36, "name": "Moore", "status": 3, "price": 176.52, "date": "2015-10-20 05:47:11" }], "quote": { "name": "Joho Doe", "title": "Graphic Designer", "content": "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.", "avatar": "http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236" }, "numbers": [{ "icon": "pay-circle-o", "color": "#64ea91", "title": "Online Review", "number": 2781 }, { "icon": "team", "color": "#8fc9fb", "title": "New Customers", "number": 3241 }, { "icon": "message", "color": "#d897eb", "title": "Active Projects", "number": 253 }, { "icon": "shopping-cart", "color": "#f69899", "title": "Referrals", "number": 4324 }] }

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
