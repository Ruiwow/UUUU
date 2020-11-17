import {getBannerList}  from '../../util'

const state={
    bannerlist:[]
}

const  getters={
    getBannerList(state){
        return state.bannerlist
    }
}
const mutations={
    REQ_bannerlist(state,payload){
        state.bannerlist=payload
    }
}

const actions={
    getBannerListAct({commit}){
        getBannerList()
        .then(res=>{
            if(res.data.code==200){
                commit('REQ_bannerlist',res.data.list)
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