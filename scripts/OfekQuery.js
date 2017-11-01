function $(name) {

	return new ofekQuery(name);
}
var ofekQuery = function (query) {
	this.elements =[];

	if (query.split(" ").length > 1)
	{
		var qArr = query.split(" ");
		var last = query.split(" ")[qArr.length-1];

		var potentialElements = [];
		var potentialPElements = [];
		var currElements = [];
		var delArr = [];
		
		if (last.match(/^\..*/i)){
			currElements = document.getElementsByClassName(last.substring(1, last.length));
		}
		else if (last.match(/^#.*/i)){
			currElements = document.getElementById(last.substring(1, last.length));
		}
		else if (last.match(/^\w.*/i)){
			currElements = document.getElementsByTagName(last);
		}

		for (var qIndex = qArr.length - 2; qIndex >= 0 ; qIndex--) {

			for (var elIndex = 0; elIndex < currElements.length; elIndex++) {
				var parentEl;
				var q = qArr[qIndex];
				if (elIndex === qArr.length - 2) {
					if (q.match(/^\..*/i)){
						parentEl = currElements[elIndex].parentElement.classList;

						if (parentEl.contains(qArr[qIndex].toLowerCase().substring(1, q.length))) {
							potentialElements.push(currElements[elIndex]);
							potentialPElements.push(currElements[elIndex].parentElement);
						}

					}
					else if (q.match(/^#.*/i)){
						parentEl = currElements[elIndex].parentElement.id;

						if (parentEl === q.toLowerCase().substring(1, q.length)) {
							potentialElements.push(currElements[elIndex]);
							potentialPElements.push(currElements[elIndex].parentElement);
						}
					}
					else if (q.match(/^\w.*/i)){
						parentEl = currElements[elIndex].parentElement.tagName;
					}

					if (parentEl === q.toUpperCase()) {
						potentialElements.push(currElements[elIndex]);
						potentialPElements.push(currElements[elIndex].parentElement);
					}
				}
				else {
					if (q.match(/^\..*/i)){
						parentEl = currElements[elIndex].parentElement.classList;

						if (parentEl.contains(qArr[qIndex].toLowerCase().substring(1, qArr[qIndex].length))) {
							potentialPElements.push(currElements[elIndex].parentElement);
						}
					}
					else if (q.match(/^#.*/i)){
						parentEl = currElements[elIndex].parentElement.id;

						if (parentEl == qArr[qIndex].toLowerCase().substring(1, qArr[qIndex].length)) {
							potentialPElements.push(currElements[elIndex].parentElement);
						}
					}
					else if (q.match(/^\w.*/i)){
						parentEl = currElements[elIndex].parentElement.tagName;
					}

					if (q.match(/^\..*/i) &&
						(parentEl.contains(qArr[qIndex].toLowerCase().substring(1, qArr[qIndex].length)))){

						potentialPElements.push(currElements[elIndex].parentElement);
					}
					else if (q.match(/^#.*/i) &&
						parentEl == qArr[qIndex].toLowerCase().substring(1, qArr[qIndex].length)){
						potentialPElements.push(currElements[elIndex].parentElement);
					}
					else if (q.match(/^#.*/i) && parentEl != qArr[qIndex].toUpperCase()) {
						delArr.push(elIndex);
					}
					else {
						potentialPElements.push(currElements[elIndex].parentElement);
					}
				}
			}

			// Delete the elements
			for (var delIndex = delArr.length - 1; delIndex >= 0; delIndex--){
				potentialElements.splice(delArr[delIndex], 1);
			}

			delArr = [];
			currElements = potentialPElements;
			potentialPElements = [];
		}

		this.elements = potentialElements;

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
		console.log(this.elements);
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

function recurseQuery(selector, elements) {
	if (!selector) {
		return false; }

	if (!elements) {
		elements = [document];
	}

	var query = selector.split(" ");
	var first = query.shift();
	var curr_elements = [];
	var els;

	for (var i=0; i < elements.length; i++) {
		var c = elements[i];
		// make sure els gets converted into a real array of nodes
		if (first.match(/^#.*/i)) {
			els = [c.getElementById(first.substring(1))];
		} else if (first.match(/^\..*/i)) {
			els = [].slice.call(c.getElementsByClassName(first.substring(1)));
		} else if (first.match(/^\w.*/i)) {
			els = [].slice.call(c.getElementsByTagName(first));
		}
		curr_elements = curr_elements.concat(els);
	}


	if (query.length) return recurseQuery(query.join(" "), curr_elements);

	return curr_elements;
}
/**/
