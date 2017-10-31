function $(name) {

	return new ofekQuery(name);
}
var ofekQuery = function (query) {
	this.elements =[];

	if (query.split(" ").length > 1)
	{
		this.elements = recurseQuery(query);
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

function doHirarchy(query) {
	var elementsArray = [];
	var potentialElements = [];
	var potentialPElements = [];
	var delArr = [];
	var query = query.split(" ");

	var last = query.pop();

	if (last.match(/^#.*/i))
	{
		elementsArray = [document.getElementById(last.substring(1))];
	}
	else if (last.match(/^\..*/i)){
		elementsArray = [document.getElementsByClassName(last.substring(1))];
	}
	else if (last.match(/^\w.*/i)) {
		elementsArray = [document.getElementsByTagName(last)];
	}

	for (var q = query.length -1; q >= 0; q--) {
		for (var e = 0; e < elementsArray.length; e++) {
			var parentEl;
			var curr_q = query[queryIndex];

			if (q === arr.length -1) {
				if (curr_q.match(/^#.*/i))
				{
					parentEl = elementsArray[e].parentElement.id;
					if(parentEl.id === q.toLowerCase().substring(1)) {
						potentialElements.push(elementsArray[e]);
						potentialPElements.push(elementsArray[e].parentElement);
					}

				}
				else if (curr_q.match(/^\..*/i)){
					parentEl = elementsArray[e].parentElement.classList;
					if(parentEl.contains(q.toLowerCase().substring(1,q.length))) {
						potentialElements.push(elementsArray[e]);
						potentialPElements.push(elementsArray[e].parentElement);
					}
				}
				else if (curr_q.match(/^\w.*/i)) {
					parentEl = elementsArray[e].parentElement.tagName;
					if(parentEl === q.toLowerCase()) {
						potentialElements.push(elementsArray[e]);
						potentialPElements.push(elementsArray[e].parentElement);
					}
				}
			}
			else {

				if (curr_q.match(/^\..*/i)) {
					parentElementName = elementsArr[innerIndex].parentElement.classList;

					if (parentElementName.contains(arr[currIndex].toLowerCase().substring(1, arr[currIndex].length))) {
						checkHierarchialList.push(elementsArr[innerIndex].parentElement);
					}
				}
				else if (curr_q.match(/^#.*/i)){
					parentElementName = elementsArr[innerIndex].parentElement.id;

					if (parentElementName == arr[currIndex].toLowerCase().substring(1, arr[currIndex].length)) {
						checkHierarchialList.push(elementsArr[innerIndex].parentElement);
					}
				}
				else {
					parentElementName = elementsArr[innerIndex].parentElement.tagName;
				}

				if (arr[currIndex].startsWith('.') &&
					(parentElementName.contains(arr[currIndex].toLowerCase().substring(1, arr[currIndex].length)))){

					checkHierarchialList.push(elementsArr[innerIndex].parentElement);
				}
				else if (arr[currIndex].startsWith('#') &&
					parentElementName == arr[currIndex].toLowerCase().substring(1, arr[currIndex].length)){
					checkHierarchialList.push(elementsArr[innerIndex].parentElement);
				}
				else if (parentElementName != arr[currIndex].toUpperCase()) {
					elementsToDelete.push(innerIndex);
				}
				else {
					checkHierarchialList.push(elementsArr[innerIndex].parentElement);
				}
			}
		}

	}


	///////////////////////////////////
	for (var currIndex = arr.length - 2; currIndex >= 0 ; currIndex--){

		for (var innerIndex = 0; innerIndex < elementsArr.length; innerIndex++){

			if (currIndex == arr.length - 2) {

				var parentElementName;

				if (arr[currIndex].startsWith('.')){
					parentElementName = elementsArr[innerIndex].parentElement.classList;

					if (parentElementName.contains(arr[currIndex].toLowerCase().substring(1))) {
						hierarchialList.push(elementsArr[innerIndex]);
						checkHierarchialList.push(elementsArr[innerIndex].parentElement);
					}

				}
				else if (arr[currIndex].startsWith('#')){
					parentElementName = elementsArr[innerIndex].parentElement.id;

					if (parentElementName == arr[currIndex].toLowerCase().substring(1)) {
						hierarchialList.push(elementsArr[innerIndex]);
						checkHierarchialList.push(elementsArr[innerIndex].parentElement);
					}
				}
				else {
					parentElementName = elementsArr[innerIndex].parentElement.tagName;
					if (parentElementName === arr[currIndex].toUpperCase()) {
						hierarchialList.push(elementsArr[innerIndex]);
						checkHierarchialList.push(elementsArr[innerIndex].parentElement);
					}
				}


			}
			else {

				var parentElementName;

				if (arr[currIndex].startsWith('.')){
					parentElementName = elementsArr[innerIndex].parentElement.classList;

					if (parentElementName.contains(arr[currIndex].toLowerCase().substring(1, arr[currIndex].length))) {
						checkHierarchialList.push(elementsArr[innerIndex].parentElement);
					}
				}
				else if (arr[currIndex].startsWith('#')){
					parentElementName = elementsArr[innerIndex].parentElement.id;

					if (parentElementName == arr[currIndex].toLowerCase().substring(1, arr[currIndex].length)) {
						checkHierarchialList.push(elementsArr[innerIndex].parentElement);
					}
				}
				else {
					parentElementName = elementsArr[innerIndex].parentElement.tagName;
				}

				if (arr[currIndex].startsWith('.') &&
					(parentElementName.contains(arr[currIndex].toLowerCase().substring(1, arr[currIndex].length)))){

					checkHierarchialList.push(elementsArr[innerIndex].parentElement);
				}
				else if (arr[currIndex].startsWith('#') &&
					parentElementName == arr[currIndex].toLowerCase().substring(1, arr[currIndex].length)){
					checkHierarchialList.push(elementsArr[innerIndex].parentElement);
				}
				else if (parentElementName != arr[currIndex].toUpperCase()) {
					elementsToDelete.push(innerIndex);
				}
				else {
					checkHierarchialList.push(elementsArr[innerIndex].parentElement);
				}
			}
		}

		// Delete the elements
		for (var deleteIndex = elementsToDelete.length - 1; deleteIndex >= 0; deleteIndex--){
			hierarchialList.splice(elementsToDelete[deleteIndex], 1);
		}

		elementsToDelete = [];
		elementsArr = checkHierarchialList;
		checkHierarchialList = [];
	}

	return (hierarchialList);
}