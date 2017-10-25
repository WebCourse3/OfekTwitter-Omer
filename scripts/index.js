var posts = [
	{username: 'Son', text: 'Dad, wanna hear a joke?'},
	{username: 'Dad', text: 'sure'},
	{username: 'Son', text: 'MVP'},
	{username: 'Dad', text: 'I don\'t get it...'},
	{username: 'Son', text: 'I know you don\'t, you scrub'}
];

function populateFeed() {
	var feed = document.getElementById("feed");
	for (var i = 0; i < posts.length; i++) {
		var div = createPostdiv(posts[i].username,posts[i].text);
		feed.appendChild(div);
	}
}

function addTweet() {
	var textBox = document.getElementById("tweetBox");
	var feed = document.getElementById("feed");

	var div = createPostdiv("someone",textBox.value);
	feed.appendChild(div);
	textBox.value = "";
}

function createPostdiv(person,text) {
	var div = document.createElement('div');
	div.className = "row post";

	var ul = document.createElement('ul');
	var img = document.createElement('img');
	img.src = "../images/useravatar_preview.png";

	div.appendChild(img);

	var li1 = document.createElement('li');
	var b = document.createElement('b');
	b.innerText = person;
	li1.appendChild(b);

	var li2 = document.createElement('li');
	li2.innerText= text;

	ul.appendChild(li1);
	ul.appendChild(li2);
	div.appendChild(ul);

	return div;
}