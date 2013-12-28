module.exports = {
	init: function () {
		this.$wrapper = $('#jsi-tab-wrapper');
		this.$tabList = this.$wrapper.find('.jsc-tab-list');
		this.$tabContentList = this.$wrapper.find('.jsc-tab-content-list');

		this.attachEvent();
	},

	attachEvent: function () {
		var self = this;

		this.$tabList.on('click', 'a', function (e) {
			e.preventDefault();
			self.toggleTab(this);
		});
	},

	getCurrentIdx: function () {
		return this.$tabList.find('.tab-list-current').index();
	},
	
	toggleTab: function (target) {
		var targetIdx = $(target).closest('li').index();

		if (targetIdx === this.getCurrentIdx()) {
			return;
		}

		var $tabLi = this.$tabList.find('li'),
			$tabContentLi = this.$tabContentList.find('li');

		$tabLi.filter('.tab-list-current').removeClass('tab-list-current');
		$tabLi.eq(targetIdx).addClass('tab-list-current');

		$tabContentLi.filter('.tab-content-current').removeClass('tab-content-current').addClass('jsc-dn');
		$tabContentLi.eq(targetIdx).addClass('tab-content-current').removeClass('jsc-dn');
	}
};
