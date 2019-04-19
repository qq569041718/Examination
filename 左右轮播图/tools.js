var tools = {
	/* 获取元素的样式
	 * @param  obj <DOM Object> 要获取样式的元素对象
	 * @param  attr <string>  要获取的属性名
	 * @return  <string>  样式的值
	 */
	getStyle : function (obj, attr) {
		if(obj.currentStyle){
			// IE
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj, false)[attr];
		}
		
		// return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
		
	// 	try{
	// 		return obj.currentStyle[attr];
	// 	}catch(){
	// 		return  getComputedStyle(obj, false)[attr];
	// 	}
	},
	
	
	/* 让元素匀速运动到指定终点
	 * obj  <DOM Object>  运动的DOM元素
	 * attr <string>  运动的属性名称
	 * end  <number>  运动的终点值
	 * time <number>  运动的耗时
	 */
	linearMove : function (obj, attr, end, time) {
		// 先清除上一次的定时器
		// 把定时器挂在obj的自定义属性上，确保唯一性
		clearInterval(obj.timer);
		// 获取起点值
		var start = parseInt(this.getStyle(obj, attr));
		// 计算总距离
		var distance = end - start;
		// 计算速度
		// 计算运动的步数，以50ms为一步
		var steps = parseInt(time / 20);
		// 计算 px/步
		var speed = distance / steps;
		obj.timer = setInterval(function () {
			
			// 往前走一步
			start += speed;
			obj.style[attr] = start + "px";
			// 到终点的距离小于了一个速度的距离，那么就结束运动
			if(Math.abs(start - end) < Math.abs(speed)) {
				clearInterval(obj.timer);
				// 有可能会超出一点，手动拉回来
				obj.style[attr] = end + "px";
			}
		},20);
		
	},
}
