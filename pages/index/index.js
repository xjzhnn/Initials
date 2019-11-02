// pages/demo/demo.js
let cityData = require('../../utils/city.js');

Page({

	data: {
		config: {
			search: true, // 是否开启搜索
			searchHeight: 45, // 搜索条高度
			hidden: true,
			letter: 'A' //
		},
		city: [],
		rightArr: [] // 右侧字母展示

	},
	onLoad() {

		this.resetRight()

	},
	resetRight() {
		let storeCity = new Array(26);
		const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
			"U", "V", "W", "X", "Y", "Z"
		]
		words.forEach((item, index) => {
			storeCity[index] = {
				title: item,
				list: []
			}
		})
		cityData.cities.forEach((item) => {
			let firstName = item.pinyin.substring(0, 1);
			let index = words.indexOf(firstName);
			storeCity[index].list.push({
				name: item.name,
				title: firstName
			});
		})
		this.setData({
			city: storeCity,
			rightArr: words
		}, () => {
			if (cityData.cities.length != 0) {
				this.queryMultipleNodes();
			}
		})
	},
	// 侧边栏点击事件里start，外start，里end，外end
	// 外start
	handlerTouchstart() {},
	// 外end
	handlerTouchEnd() {
		this.setData({
			'config.hidden': true
		})
	},
	// 里start
	jumpMtstart(e) {
		console.log(e.currentTarget.dataset)
		let letter = e.currentTarget.dataset.letter;
		this.setData({
			'config.hidden': false,
			'config.letter': letter
		});
	},
	// 里end
	jumpMtEnd(e) {},
	/**
	 * 列表点击事件
	 */
	detailMt(e) {
		console.log(e.currentTarget.dataset.detail)
	},
	/**
	 * 获取节点信息
	 */
	queryMultipleNodes() {
		let self = this
		const query = wx.createSelectorQuery().in(this);
		query.selectAll('.fixed-title-hock').boundingClientRect((res) => {
			res.forEach(function(rect) {
				rect.top // 26个字母节点的上边界坐标
			})
		}).exec()
	}
})
