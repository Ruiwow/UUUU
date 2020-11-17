import  {getMenuList} from '../../util/index'

const state={
    menulist:[],
    menu:[]
}

const getters={
    getMenuList(state){
        return state.menulist
    },
    getM(state){
        return state.menu
    }
}

const mutations={
    M_menulist(state,payload){
        state.menulist=payload
    },
    M(state,payload){
        state.menu=payload
    },
}

const actions={
    getMenuListAction({commit}){
        getMenuList({
            istree:true
        })
        .then(res=>{
            if(res.data.code==200){
              
                commit('M_menulist',res.data.list)
            }
        })
        .catch(err=>{
            console.log(err);
        })
    },
    getMenuAct({commit},payload){
        commit('M_menulist',payload)
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    //命名空间
    namespaced:true
}