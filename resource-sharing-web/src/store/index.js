import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 100,
        visitedViews: [],
        routes: [],
        Nav:''
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
        saveNav(state,val){
            state.Nav=val
        }
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
    },
})