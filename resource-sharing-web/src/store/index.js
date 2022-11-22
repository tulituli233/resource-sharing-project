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
        CateList: [
            {
                value: "A",
                label: "影视",
                children: [
                    {
                        value: "A001",
                        label: "电影",
                    },
                    {
                        value: "A002",
                        label: "电视剧",
                    },
                    {
                        value: "A003",
                        label: "纪录片",
                    },
                    {
                        value: "A004",
                        label: "动漫",
                    },
                    {
                        value: "A005",
                        label: "综艺",
                    },
                    {
                        value: "A006",
                        label: "短视频",
                    },
                ],
            },
            {
                value: "B",
                label: "图片",
                children: [
                    {
                        value: "B001",
                        label: "国漫",
                    },
                    {
                        value: "A002",
                        label: "日漫",
                    },
                    {
                        value: "A003",
                        label: "美漫",
                    },
                ],
            },
            {
                value: "C",
                label: "书籍",
                children: [
                    {
                        value: "C001",
                        label: "教材",
                    },
                    {
                        value: "C002",
                        label: "名著",
                    },
                    {
                        value: "C003",
                        label: "小说",
                    },
                ],
            },
            {
                value: "D",
                label: "游戏",
                children: [
                    {
                        value: "D001",
                        label: "单机",
                    },
                    {
                        value: "D002",
                        label: "RPG",
                    },
                    {
                        value: "D003",
                        label: "RogueLike",
                    },
                ],
            },
            {
                value: "E",
                label: "音乐",
                children: [
                    {
                        value: "E001",
                        label: "古典",
                    },
                    {
                        value: "E002",
                        label: "摇滚",
                    },
                    {
                        value: "E003",
                        label: "流行",
                    },
                ],
            },
            {
                value: "F",
                label: "其他",
            },
        ],
        indexArticleList: [],
        Article: {},
        Comment: [],
        ArticleInfo: {},
        inputTopVal:'',
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
        saveComment(state, val) {
            state.Comment = val
        },
        saveArticleInfo(state, val) {
            state.ArticleInfo = val
        },
        saveinputTopVal(state, val) {
            state.inputTopVal = val
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
        saveCommentAys(context, Comment) {
            context.commit('saveComment', Comment)
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