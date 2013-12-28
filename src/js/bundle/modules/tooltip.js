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
