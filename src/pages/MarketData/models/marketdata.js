import { mainContract, instrumentList } from '@/services/api';

const decimalDigits = src => {
    let v = src.toString().split('.')
    if (v.length > 1) {
        return v[1].length
    }
    return 0
}

const checkTick = md => {
    md.time = md.time * 1000
    md.digits = decimalDigits(md.priceTick)
    md.price = md.price.toFixed(md.digits)

    if (md.preSettlementPrice > 0) {
        md.upDownRatio = (md.price - md.preSettlementPrice) / md.preSettlementPrice
        md.upDownRatio = (md.upDownRatio * 100).toFixed(2)
    } else {
        md.upDownRatio = '--'
    }
    md.preSettlementPrice = md.preSettlementPrice.toFixed(md.digits)
    return md
}

export default {
    namespace: 'marketdata',

    state: {
        ws: 0,
        list: [],
        filter: {
            exchange: -1
        },
        mainContract: []
    },

    effects: {
        *fetchMainContract({ payload, callback }, { call, put }) {
            const response = yield call(mainContract, payload);
            if (!response.success || !response.data) {
                return
            }
            yield put({
                type: 'setMainContract',
                payload: response.data
            })
            if (callback) callback(response.data);
        },
        *fetch({ payload }, { call, put }) {
            const response = yield call(instrumentList, payload);
            yield put({
                type: 'save',
                payload: response.data,
            });
        },
    },

    reducers: {
        updateState(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        setMainContract(state, action) {
            action.payload.sort((a, b) => {
                return b.prePosition - a.prePosition  
            })
            for (let i = 0; i < action.payload.length; i++) {
                action.payload[i] = checkTick(action.payload[i])
                action.payload[i].index = i + 1
            }
            console.log(action.payload)
            return {
                ...state,
                mainContract: action.payload
            }
        },
        save(state, action) {
            for (let i = 0; i < action.payload.length; i++) {
                action.payload[i].index = i + 1
            }
            return {
                ...state,
                list: action.payload,
            };
        },
        onTick(state, action) {
            const md = action.payload
            let newData = [...state.mainContract]
            let index = newData.findIndex(el => el.symbol.exchange === md.symbol.exchange && el.symbol.code === md.symbol.code)
            if (md.symbol.exchange == 'SSE') {
                console.log("Received Message: " + `${md.price} ${md.symbol.exchange}`, index);
            }
            if (index >= 0) {
                md.index = index + 1
                newData[index] = md
            }
            return {
                ...state,
                mainContract: newData
            }
        }
    },

    subscriptions: {
        setupHistory({ dispatch, history }) {
            history.listen((location) => {
                console.log(location.pathname, location.pathname.indexOf('marketdata/main-contract'))
                if (location.pathname.indexOf('marketdata/main-contract') > 0) {
                    dispatch({
                        type: 'fetchMainContract',
                        payload: 0,
                        callback: (l) => {
                            return
                            var url = `ws://${window.location.host}/api/v1/ws/stream`
                            if (window.location.protocol.includes('https')) {
                                url = `wss://${window.location.host}/api/v1/ws/stream`
                            }
                            if (window.location.host.includes('localhost')) {
                                url = `ws://localhost:9090/api/v1/ws/stream`
                            }
                            const ws = new WebSocket(url);
                            ws.onopen = function (evt) {
                                console.log("Connection open ...");
                                const list = []
                                l.forEach(e => {
                                    list.push(e.symbol)
                                })
                                ws.send(JSON.stringify({ type: 'REQ_SUBSCRIBE_MARKET_DATA', data: { list } }));
                            };

                            ws.onmessage = function (evt) {
                                const msg = JSON.parse(evt.data)
                                const md = checkTick(msg.data)
                                dispatch({
                                    type: 'onTick',
                                    payload: md,
                                });
                            };
                            ws.onclose = function (evt) {
                                console.log("Connection closed. reopen ", new Date());
                            }
                            ws.onerror = (err) => {
                                console.log('err', err)
                            }
                            dispatch({
                                type: 'udpateState',
                                payload: { ws: ws },
                            });
                        }
                    });
                }
            })
        },
    },
};
