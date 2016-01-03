import Ember from 'ember';

export default Ember.Controller.extend({
	locationSrv: Ember.inject.service('api/location/service'),
	page:1,
	pageCount:1,
	pageSize:10,
	pid:0,

	actions:{
		queryAction:function(pid){
			this.set('pid',pid);
			this.send("pageChanged",this.get("page"));
		},
		pageChanged:function(page){
			var self = this;
			this.set("page",page);
			var pageSize = this.get("pageSize");
			var pid = this.get("pid");
			this.get("locationSrv").list(pageSize,(page-1)*pageSize,pid).then(function(data){
                self.set('rowList', data.Content.list);
                var pageCount = Math.ceil(data.Content.recordCount/pageSize);
                if(pageCount <= 0){
                	pageCount = 1;
                }
                self.set('pageCount',pageCount);
            });
		},
		deleteAction: function(id) {
            if(confirm("确认删除吗？")){
    			var self = this;
            	self.get("locationSrv").deleteRowById(id).then(function(data) {
                    if(data.Status==="success"){
                        Ember.$.notify({
                        	message: "删除成功!"
                        }, {
                        	animate: {
                        		enter: 'animated fadeInRight',
                        		exit: 'animated fadeOutRight'
                        	},
                        	type: 'success'
                        });
                        //self.transitionToRoute('dashboard.os.list');
                        self.send("pageChanged",self.get("page"),self.get("pid"));
                    } else {
                        Ember.$.notify({
                        	title: "<strong>保存失败:</strong>",
                        	message: data.Message
                        }, {
                        	animate: {
                        		enter: 'animated fadeInRight',
                        		exit: 'animated fadeOutRight'
                        	},
                        	type: 'danger'
                        });
                    }
                });
            }
        },
	}
});
