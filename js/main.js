(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var tab = require('./modules/tab'),
	tooltip = require('./modules/tooltip');

tab.init();

tooltip();

},{"./modules/tab":2,"./modules/tooltip":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
module.exports = function () {
	var Tooltip = function ($target) {
		this.$target = $target;
		this.data = this.$target.data('tooltip');
		this.$body = $(document.body);
		this.template = '<div class="jsc-tooltip">' + this.data + '</div>';
	};

	Tooltip.prototype.init = function () {
		this.attachEvent();
	};

	Tooltip.prototype.attachEvent = function () {
		this.$target
			.on('mouseenter', $.proxy(function () {
				this.showTooltip();
			}, this))
			.on('mouseleave', $.proxy(function () {
				this.hideTooltip();
			}, this));
	};

	Tooltip.prototype.showTooltip = function () {
		this.$body.append(this.template);

		this.$tooltip = this.$body.find('.jsc-tooltip');

		var targetPos = this.$target.position();

		this.$tooltip.css({
			position: 'absolute',
			top: targetPos.top + this.$target.height() + 10,
			left: targetPos.left,
			padding: '4px',
			backgroundColor: '#899ED3',
			color: '#FFFFFF'
		});
	};

	Tooltip.prototype.hideTooltip = function () {
		this.$tooltip.remove();
	};


	var $links = $(document.body).find('.jsc-tooltip-link');

	var tooltip;
	
	for (var i = 0, max = $links.length; i < max; i++) {
		tooltip = new Tooltip($links.eq(i));
		tooltip.init();
	}

};

},{}]},{},[1])