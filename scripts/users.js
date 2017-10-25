var users = [
	{ "username": "Rick Sanches", "isFollowing": true},
	{ "username": "Bird Person", "isFollowing": false},
	{ "username": "Deadpool", "isFollowing": false},
	{ "username": "Morty Smith", "isFollowing": true},
	{ "username": "Abradolf Linkler", "isFollowing": false},
	{ "username": "Summer Smith", "isFollowing": false},
	{ "username": "Jack Sparrow", "isFollowing": false},
	{ "username": "Noob Noob", "isFollowing": false}
];

function populateUsers() {
	var usersArea = document.getElementById("usersArea");

	for (var i = 0; i < users.length; i++) {
		var div = createUserdiv(users[i].username,users[i].isFollowing);
		usersArea.appendChild(div);

		if (users[i].isFollowing){
			div.className = "panel panel-default userBox";
			var followersArea = document.getElementById('followersArea');
			followersArea.appendChild(div);
		}
	}
}

function createUserdiv(username,isFollowing) {
	var div1 = document.createDocumentFragment('div');
	div1.className = "panel panel-default col-xs-2 userBox";

	var div2 = document.createElement('div');
	div2.className = "panel-body";

	var img = document.createElement('img');
	img.src = "../images/useravatar_preview.png";

	var br = document.createElement('br');

	var button = document.createElement('button');
	button.className = "btn btn-primary";
	button.id = username + "Btn";
	button.addEventListener("click", function () {toggleFollow(this) });

	if (isFollowing) {
		button.innerText = "Unfollow";
	}
	else {
		button.innerText = "Follow";
	}

	var p = document.createElement('p');
	p.innerText = username;

	div2.appendChild(img);
	div2.appendChild(br);
	div2.appendChild(button);
	div2.appendChild(p);

	div1.appendChild(div2);
	return div1;
}


function toggleFollow(element) {
	if (element.innerText == "Follow") {
		for (var i = 0; i < users.length; i++)
		{
			if (element.id == users[i].username + "Btn"){
				users[i].isFollowing = false;
				break;
			}
		}
		element.innerText = "Unfollow";
	}
	else if (element.innerText == "Unfollow") {
		for (var i = 0; i < users.length; i++)
		{
			if (element.id == users[i].username + "Btn"){
				users[i].isFollowing = true;
				break;
			}
		}
		element.innerText = "Follow";
	}
}