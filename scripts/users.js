var users = [
	{'username': 'Rick Sanches', 'isFollowing': true},
	{'username': 'Bird Person', 'isFollowing': true},
	{'username': 'Deadpool', 'isFollowing': false},
	{'username': 'Morty Smith', 'isFollowing': false},
	{'username': 'Abradolf Linkler', 'isFollowing': false},
	{'username': 'Summer Smith', 'isFollowing': false},
	{'username': 'Jack Sparrow', 'isFollowing': false},
	{'username': 'Noob Noob', 'isFollowing': false}
];

function populateUsers() {
	var usersArea = document.getElementById('usersArea');

	for (var i = 0; i < users.length; i++) {
		var div = createUserDiv(users[i].username, users[i].isFollowing);

		if (users[i].isFollowing) {
			div.firstChild.className = 'panel panel-default userBox';
			var followersArea = document.getElementById('followersArea');
			followersArea.appendChild(div);
		}
		else {
			usersArea.appendChild(div);
		}
	}
}

function createUserDiv(username, isFollowing) {
	var df = document.createDocumentFragment();

	var div1 = document.createElement('div');
	div1.className = 'panel panel-default col-xs-2 userBox';
	div1.id = username;

	var div2 = document.createElement('div');
	div2.className = 'panel-body';

	var img = document.createElement('img');
	img.src = '../images/useravatar_preview.png';

	var br = document.createElement('br');

	var button = document.createElement('button');
	button.className = 'btn btn-primary';
	button.addEventListener('click', function () {
		toggleFollow(this);
	});

	if (isFollowing) {
		button.innerText = 'Unfollow';
	}
	else {
		button.innerText = 'Follow';
	}

	var p = document.createElement('p');
	p.innerText = username;

	df.appendChild(div1);
	div1.appendChild(div2);
	div2.appendChild(img);
	div2.appendChild(br);
	div2.appendChild(button);
	div2.appendChild(p);
	return df;
}

function toggleFollow(element) {
	var usersArea = document.getElementById('usersArea');
	var followers = document.getElementById('followersArea');
	var div = element.parentNode.parentNode;

	if (element.innerText === 'Follow') {
		for (var i = 0; i < users.length; i++) {
			if (users[i].hasOwnProperty(div.id)) {
				users[i].isFollowing = false;
				break;
			}
		}
		element.innerText = 'Unfollow';
		div.classList.remove('col-xs-2');
		followers.appendChild(div);
	}
	else if (element.innerText === 'Unfollow') {
		for (var i = 0; i < users.length; i++) {
			if (users[i].hasOwnProperty(div.id)) {
				users[i].isFollowing = true;
				break;
			}
		}
		element.innerText = 'Follow';
		div.classList.add('col-xs-2');
		usersArea.appendChild(div);
	}
}

function filterUsers() {
	var input = document.getElementById('search_txtbx');
	var boxes = document.getElementsByClassName('userBox');

	var filter = input.value.toUpperCase();


	for (var i = 0; i < boxes.length; i++) {
		var name = boxes[i].getElementsByTagName('p')[0];
		if (name.innerHTML.toUpperCase().indexOf(filter) > -1) {
			boxes[i].style.display = '';
		}
		else  {
			boxes[i].style.display = 'none';
		}
	}
}