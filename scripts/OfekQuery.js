function $(name) {

	return new ofekQuery(name);
}/**/
var ofekQuery = function (query) {
	this.elements =[];

	if (query.split(" ").length > 1)
	{
        var query = query.split(" ");
        var potentialElements = [];
        var potentialPElements= [];
        var elementsArray = [];
        var deleteArr= [];

        var last = query[query.length - 1];


        if (last.match(/^\..*/i)){
            elementsArray = document.getElementsByClassName(last.substring(1, last.length));
        }
        else if (last.match(/^#.*/i)) {
            elementsArray = document.getElementById(last.substring(1, last.length));
        }
        else if (last.match(/^\w.*/i)){
            elementsArray = document.getElementsByTagName(last);
        }

        for (var qIndex = query.length - 2; qIndex >= 0 ; qIndex--){

            for (var elIndex = 0; elIndex < elementsArray.length; elIndex++){

                var parentElementName;

                // First iteration
                if (qIndex === query.length - 2) {

                    if (query[qIndex].match(/^\..*/i)){
                        parentElementName = elementsArray[elIndex].parentElement.classList;

                        if (parentElementName.contains(query[qIndex].toLowerCase().substring(1, query[qIndex].length))) {
                            potentialElements.push(elementsArray[elIndex]);
                            potentialPElements.push(elementsArray[elIndex].parentElement);
                        }

                    }
                    else if (query[qIndex].match(/^#.*/i)){
                        parentElementName = elementsArray[elIndex].parentElement.id;

                        if (parentElementName === query[qIndex].toLowerCase().substring(1, query[qIndex].length)) {
                            potentialElements.push(elementsArray[elIndex]);
                            potentialPElements.push(elementsArray[elIndex].parentElement);
                        }
                    }
                    else if (query[qIndex].match(/^\w.*/i)){
                        parentElementName = elementsArray[elIndex].parentElement.tagName;
                    }

                    if (parentElementName === query[qIndex].toUpperCase()) {
                        potentialElements.push(elementsArray[elIndex]);
                        potentialPElements.push(elementsArray[elIndex].parentElement);
                    }
                }
                // Other iterations
                else {

                    if (query[qIndex].match(/^\..*/i)){
                        parentElementName = elementsArray[elIndex].parentElement.classList;

                        if (parentElementName.contains(query[qIndex].toLowerCase().substring(1, query[qIndex].length))) {
                            potentialPElements.push(elementsArray[elIndex].parentElement);
                        }
                    }
                    else if (query[qIndex].match(/^#.*/i)){
                        parentElementName = elementsArray[elIndex].parentElement.id;

                        if (parentElementName === query[qIndex].toLowerCase().substring(1, query[qIndex].length)) {
                            potentialPElements.push(elementsArray[elIndex].parentElement);
                        }
                    }
                    else if (query[qIndex].match(/^\w.*/i)) {
                        parentElementName = elementsArray[elIndex].parentElement.tagName;
                    }

                    if (query[qIndex].startsWith('.') &&
                        (parentElementName.contains(query[qIndex].toLowerCase().substring(1, query[qIndex].length)))){

                        potentialPElements.push(elementsArray[elIndex].parentElement);
                    }
                    else if (query[qIndex].startsWith('#') &&
                        parentElementName === query[qIndex].toLowerCase().substring(1, query[qIndex].length)){
                        potentialPElements.push(elementsArray[elIndex].parentElement);
                    }
                    else if (parentElementName !== query[qIndex].toUpperCase()) {
                        deleteArr.push(elIndex);
                    }
                    else {
                        potentialPElements.push(elementsArray[elIndex].parentElement);
                    }
                }
            }

            // Delete the elements
            for (var deleteIndex = deleteArr.length - 1; deleteIndex >= 0; deleteIndex--){
                potentialElements.splice(deleteArr[deleteIndex], 1);
            }

            deleteArr= [];
            elementsArray = potentialPElements;
            potentialPElements= [];
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

function doHirarchy(query) {


}