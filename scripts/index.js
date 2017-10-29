var posts = [
	{username: 'Son', text: 'Dad, wanna hear a joke?'},
	{username: 'Dad', text: 'sure'},
	{username: 'Son', text: 'MVP'},
	{username: 'Dad', text: 'I don\'t get it...'},
	{username: 'Son', text: 'I know you don\'t, you scrub'}
];

function populateFeed() {
	var feed = document.getElementById('feed');
	for (var i = 0; i < posts.length; i++) {
		var df = createPostDiv(posts[i].username, posts[i].text);
		feed.appendChild(df);
	}
}

function addTweet() {
	var textBox = document.getElementById('tweetBox');
	var feed = document.getElementById('feed');

	var df = createPostDiv('someone', textBox.value);
	feed.appendChild(df);
	//posts.push({username: '11', test: textBox.value});
	textBox.value = '';
}

function createPostDiv(person, text) {
	var df = document.createDocumentFragment();
	var div = document.createElement('div');
	div.className = 'row post';

	var ul = document.createElement('ul');
	var img = document.createElement('img');
	img.src = '../images/useravatar_preview.png';

	var li1 = document.createElement('li');
	var b = document.createElement('b');
	b.innerText = person + ':';

	var li2 = document.createElement('li');
	li2.innerText = text;

	df.appendChild(div);
	div.appendChild(img);
	div.appendChild(ul);
	ul.appendChild(li1);
	li1.appendChild(b);
	ul.appendChild(li2);
	return df;
}

var unitsDiv;

function assert(result,name) {
	var testP = document.createElement('p');
	testP.innerHTML = name;

	if (result) {
		testP.className = "alert alert-success";
		testP.innerHTML = testP.innerHTML + " Success";
	}
	else  {
		testP.className = "alert alert-danger";
		testP.innerHTML = testP.innerHTML + " Failed";
	}
	unitsDiv.appendChild(testP);
}

function test_group(name, tests) {
	var df = document.createDocumentFragment();

	var row = document.createElement('div');
	row.className = 'row col-xs-offset-2 col-xs-8';
	var div = document.createElement('div');
	div.style.textAlign = "center";
	div.className = "panel panel-default";
	var title = document.createElement('h2');
	title.innerHTML = name;
	unitsDiv = document.createElement('div');
	unitsDiv.className ="panel panel-default";
	unitsDiv.style.backgroundColor = "transparent";

	div.appendChild(title);
	div.appendChild(unitsDiv);
	row.appendChild(div);
	df.appendChild(row);
	document.getElementsByTagName('body')[0].appendChild(df);

	tests();
	var children = unitsDiv.getElementsByTagName('p');

	for (var i = 0; i < children.length; i++) {
		if (children[i].innerHTML.toUpperCase().indexOf("FAILED") != -1) {
			div.style.backgroundColor = "#ef4438";
			return;
		}
		else {
			div.style.backgroundColor = "green";
		}
	}
}