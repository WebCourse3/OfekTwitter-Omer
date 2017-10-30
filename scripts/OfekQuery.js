function $(name) {
	return new ofekQuery(name);
}
var ofekQuery = function (query) {
	this.elements =[];

	if (query.split(" ").length > 1)
	{
		this.elements = recurseElements(query);
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

function recurseElements(id, context) {
    if (!id) return false;
    // context should be an array of previous nodes we have found.  If it's undefined, assume the single-item array [document] as the starting context
    if (!context) context = [document];

    var s = id.split(" ");
    var first = s.shift();
    var curr_elements = [], els;

    for (var i=0; i < context.length; i++) {
        var cont = context[i];
        // make sure els gets converted into a real array of nodes
        if (first.match(/^#.*/i)) {
            els = [cont.getElementById(first.substring(1))];
        } else if (first.match(/^\..*/i)) {
            els = [].slice.call(cont.getElementsByClassName(first.substring(1)));
        } else if (first.match(/^\w.*/i)) {
            els = [].slice.call(cont.getElementsByTagName(first));
        }
        curr_elements = curr_elements.concat(els);
    }

    // if there are more items in s, then curr_elements is the context in which to find them.  Otherwise, curr_elements is the array of elements we were looking for.
    if (s.length) return recurseElements(s.join(" "), curr_elements);

    return curr_elements;
}