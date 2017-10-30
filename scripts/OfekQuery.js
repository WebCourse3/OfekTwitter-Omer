function $(name) {
	return new ofekQuery(name);
}
var ofekQuery = function (query) {
	this.elements =[];
	if (query.split(" ").length > 1)
	{
		var first = query.split(" ")[0];
		var curr_elements = [];

		if (first.match(/^#.*/i))
		{
			curr_elements = (document.getElementById(first.substring(1)));
		}
		else if (query.match(/^\..*/i)){
			curr_elements = document.getElementsByClassName(first.substring(1));
		}
		else if (query.match(/^\w.*/i)) {
			curr_elements = document.getElementsByTagName(first);
		}

		for (var i = 1; i < query.split(" ").length; i++ ) {
			var temp = query.split(" ")[i];

			if (temp.match(/^#.*/i))
			{
				curr_elements =(document.getElementById(temp.substring(1)));
			}
			else if (temp.match(/^\..*/i)){
				curr_elements = document.getElementsByClassName(temp.substring(1));
			}
			else if (temp.match(/^\w.*/i)) {
				curr_elements = document.getElementsByTagName(temp);
			}
		}
		this.elements = curr_elements;
	}
	else
	{
		if (query.match(/^#.*/i))
		{
			this.elements.push(document.getElementById(query.substring(1)));
		}
		else if (query.match(/^\..*/i)){
			this.elements = document.getElementsByClassName(query.substring(1));
		}
		else if (query.match(/^\w.*/i)) {
			this.elements = document.getElementsByTagName(query);
		}

	}


	this.get = function() {
		for (var i = 0; i< this.elements.length; i++)
		{
			alert(this.elements[i]);
		}
	};
	
	this.addClass = function (className) {
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].classList.add(className);
		}
	};

	this.removeClass = function (className) {
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].classList.remove(className);
		}

	};

	this.each = function(func) {
		for (var i = 0; i < this.elements.length; i++) {
			func(this.elements[i]);
		}
	};

	this.map = function (func) {
		var arr = [];
		for (var i = 0; i < this.elements.length; i++) {
			arr.push(func(this.elements[i]));
		}
		return arr;
	};

	this.any = function () {
		var result;
		for (var i = 0; i < this.elements.length; i++) {
			result = false;
			for (var j = 0; j < arguments.length;j++) {
				if (arguments[j](this.elements[i])) {
					result = true;
				}
				else {
					result = false;
					break;
				}
			}
			if (result === true) {
				return true;
			}
		}
		return false;
	};

	this.all = function() {
		var result;
		for (var i = 0; i < this.elements.length; i++) {
			result = false;
			for (var j = 0; j < arguments.length;j++) {
				if (arguments[j](this.elements[i])) {
					result = true;
				}
				else {
					return false;
				}
			}
		}
		if (result === true) {
			return true;
		}
	};

	this.filter = function() {
		var ele = [].slice.call(this.elements);
		for (var i = 0; i < ele.length; i++) {
			for (var j = 0; j < arguments.length;j++) {
				if (!arguments[j](ele[i])) {
					ele.splice(i,1);
					break;
				}
			}
		}
		return ele;
	};

	this.css = function (property, value) {
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].setAttribute("style", property + " : " + value);
		}
	};

	this.count = function () {
		var count = 0;
		for (var i = 0; i < this.elements.length; i++) {
			count += this.elements[i].childElementCount;
		}
		return count;
	};

	this.appendChild = function(childElement) {
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].append(childElement);
		}
	};

	this.getAttribute = function (attributeName) {
		var attrArr = [];
		for (var i = 0; i < this.elements.length; i++) {
			attrArr.push(this.elements[i].getAttribute(attributeName));
		}
		return attrArr;
	};

	this.setAttribute = function (attributeName, attributeValue) {
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].setAttribute(attributeName,attributeValue);
			alert(this.elements[i].getAttribute(attributeName));
		}
	};

	this.get = function (index) {
		return this.elements[index];
	};
};