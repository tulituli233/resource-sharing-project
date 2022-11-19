import Vue from "vue";
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 100,
        visitedViews: [],
        routes: [],
        Nav: '',
        indexArticleList: [],
        Article:{},
    },
    mutations: {
        add(state) {
            state.count++;
        },
        addView(state, route) {
            if (state.visitedViews.some(v => v.path === route.path)) return
            state.visitedViews.push({
                fullPath: route.fullPath,
                path: route.path,
                title: route.name,
            })
        },
        delView(state, route) {
            for (const [i, v] of state.visitedViews.entries()) {
                if (v.path === route.path) {
                    state.visitedViews.splice(i, 1)//删除
                    break
                }
            }
        },
        saveNav(state, val) {
            state.Nav = val
        },
        indexArticleList(state, val) {
            state.indexArticleList = val
        },
        saveArticle(state, val) {
            state.Article = val
        },
    },
    actions: {
        addViewAsy(context, route) {
            context.commit('addView', route)
        },
        delViewAsy(context, route) {
            context.commit('delView', route)
        },
        delView({ dispatch, state }, view) {
            return new Promise(resolve => {
                dispatch('delViewAsy', view)
                resolve({
                    visitedViews: [...state.visitedViews],
                })
            })
        },
        indexArticleListAys(context, ial) {
            context.commit('indexArticleList', ial)
        },
        saveArticleAys(context, Article) {
            context.commit('saveArticle', Article)
        },
    },
    /* vuex数据持久化配置 */
    plugins: [
        createPersistedState({
            // 存储方式：localStorage、sessionStorage、cookies
            storage: window.sessionStorage,
            // 存储的 key 的key值
            key: "store",
            reducer(state) { //render错误修改
                // 要存储的数据：本项目采用es6扩展运算符的方式存储了state中所有的数据
                return { ...state };
            }
        })
    ]
})