/* */
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
	var followersArea = document.getElementById('followersArea');

	for (var i = 0; i < users.length; i++) {
		var df = createUserDiv(users[i].username, users[i].isFollowing);

		if (users[i].isFollowing) {
			df.firstChild.className = 'panel panel-default userBox';
			followersArea.appendChild(df);
		}
		else {
			usersArea.appendChild(df);
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

		isFollowing ? button.innerText = 'Unfollow' : button.innerText = 'Follow';

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

	for (var i = 0; i < users.length; i++) {
		if (element.innerHTML === 'Follow' && users[i].username === div.id) {
			users[i].isFollowing = false;
			element.innerText = 'Unfollow';
			div.classList.remove('col-xs-2');
			followers.appendChild(div);
			return;
		}
		else if (element.innerHTML === 'Unfollow' && users[i].username === div.id) {
			users[i].isFollowing = true;
			element.innerText = 'Follow';
			div.classList.add('col-xs-2');
			usersArea.appendChild(div);
			return;
		}
	}
}

function filterUsers() {
	var input = document.getElementById('search_txtbx');
	var boxes = document.getElementsByClassName('userBox');

	var filter = input.value.toUpperCase();


	for (var i = 0; i < boxes.length; i++) {
		var name = boxes[i].getElementsByTagName('p')[0];
		name.innerHTML.toUpperCase().indexOf(filter) > -1 ? boxes[i].style.display = '' : boxes[i].style.display = 'none';
	}
	/**/
}