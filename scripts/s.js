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