import {getCateList}  from '../../util'

const state={
    catelist:[]
}

const  getters={
    getCateList(state){
        return state.catelist
    }
}
const mutations={
    REQ_catelist(state,payload){
        state.catelist=payload
    }
}

const actions={
    getCateListAct({commit}){
        getCateList({
            istree:true
        })
        .then(res=>{
            if(res.data.code==200){
                commit('REQ_catelist',res.data.list)
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }
}

export default{
    state,
    getters,
    mutations,
    actions,
    namespaced:true 
}