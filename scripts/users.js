var users = [
	{ "username": "Rick Sanches", "isFollowing": true},
	{ "username": "Bird Person", "isFollowing": true},
	{ "username": "Deadpool", "isFollowing": false},
	{ "username": "Morty Smith", "isFollowing": false},
	{ "username": "Abradolf Linkler", "isFollowing": false},
	{ "username": "Summer Smith", "isFollowing": false},
	{ "username": "Jack Sparrow", "isFollowing": false},
	{ "username": "Noob Noob", "isFollowing": false}
];

function populateUsers() {
	var usersArea = document.getElementById("usersArea");

	for (var i = 0; i < users.length; i++) {
		var div = createUserDiv(users[i].username,users[i].isFollowing);


		if (users[i].isFollowing){
			div.firstChild.className = "panel panel-default userBox";
			var followersArea = document.getElementById('followersArea');
			followersArea.appendChild(div);
		}
		else {
            usersArea.appendChild(div);
        }
	}
}

function createUserDiv(username,isFollowing) {
	var df = document.createDocumentFragment();
	var div1 = document.createElement('div');
	div1.className = "panel panel-default col-xs-2 userBox";
    df.appendChild(div1);

	var div2 = document.createElement('div');
	div2.className = "panel-body";
    div1.appendChild(div2);

	var img = document.createElement('img');
	img.src = "../images/useravatar_preview.png";
    div2.appendChild(img);

	var br = document.createElement('br');
    div2.appendChild(br);

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
    div2.appendChild(button);

	var p = document.createElement('p');
	p.innerText = username;
	div2.appendChild(p);

	return df;
}

function toggleFollow(element) {
    var followers = document.getElementById("followersArea");
    var usersArea = document.getElementById("usersArea");

	if (element.innerText === "Follow") {
		for (var i = 0; i < users.length; i++)
		{
			if (element.id === users[i].username + "Btn"){
				users[i].isFollowing = false;
                break;
			}
		}
		element.innerText = "Unfollow";
		element.parentNode.parentNode.classList.remove("col-xs-2");
		followers.appendChild(element.parentNode.parentNode);
	}
	else if (element.innerText === "Unfollow") {
		for (var i = 0; i < users.length; i++)
		{
			if (element.id === users[i].username + "Btn"){
				users[i].isFollowing = true;
				break;
			}
		}
		element.innerText = "Follow";
        element.parentNode.parentNode.classList.add("col-xs-2");
        usersArea.appendChild(element.parentNode.parentNode);
	}
}

function filterUsers(textbox) {
    var allUsers = document.getElementsByClassName("userBox");
    var element = document.getElementById("search_txtbx");
    var name = element.value;

    if (name == '') {
        for (var i=0; i < allUsers.length; i++) {
            allUsers[i].style.display = "block";
        }
    }
    else {
        for (var i=0; i < allUsers.length; i++) {
            if (allUsers[i].style.display != "none") {
                if (allUsers[i].firstChild.children[3].innerText.indexOf(name) == -1 ) {
                    allUsers[i].style.display = "none";
                }
            }
        }
    }
}