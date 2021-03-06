import Ember from 'ember';

import breadCrumbMixin from '../../../mixins/bread-crumb-mixin';
export default Ember.Route.extend(breadCrumbMixin,{
    breadCrumb: {
        title: "修改个人信息",
        isShow:true,
    },
	userSrv: Ember.inject.service('api/user/service'),
	model: function(params) {
    	return Ember.RSVP.hash({id:this.get('userSrv').getLocalSessionUID(),
			info:this.get('userSrv').get(this.get('userSrv').getLocalSessionUID()).then(function(data){return data.Content;}),
			statusData:[{id:"Enable",name:"正常"},{id:"Disable",name:"锁定"}],
			roleData:[{id:"Administrator",name:"超级管理员"},{id:"User",name:"普通用户"}],
			session:this.get("userSrv").getLocalSession(),
		});
    },

    setupController: function(controller, model) {
    	model.info.Password = null;
    	controller.set("model",model);
    }
});
