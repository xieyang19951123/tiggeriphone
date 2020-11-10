import {
	UPDATE_HEAD,
	UPDATE_LOADING,
	UPDATE_FOOTER,
	UPDATE_PAGE_TITLE,
	UPDATE_PAGE_FOOTER
} from './data'

const state={
	headShow:true,
	loading:false,
	footerShow:true,
	pageTitle:'首页',
	pageFooter: 0
};


const mutations={
	/*head*/
	[UPDATE_HEAD](state,type){
		state.headShow=type;
	},
	/*loading*/
	[UPDATE_LOADING](state,type){
		state.loading=type;
	},
	/*footer*/
	[UPDATE_FOOTER](state,type){
		state.footerShow=type;
	},
	/*title*/
	[UPDATE_PAGE_TITLE](state,type){
		state.pageTitle=type;
	},
	[UPDATE_PAGE_FOOTER](state,type){
		state.pageFooter=type
	}
};

const getters={
	headShow(state){
		return state.headShow;
	},
	loading(state){
		return state.loading;
	},
	footerShow(state){
		return state.footerShow;
	},
	pageTitle(state){
		return state.pageTitle;
	},
	pageFooter(state){
		return state.pageFooter
	}
};

export default{
	state,
	mutations,
	getters
}