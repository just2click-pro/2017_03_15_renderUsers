function loadDoc(url) {
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function () {
		if ((this.readyState == 4) && (this.status == 200)) {
			renderUsers(JSON.parse(this.responseText));
		}
	};

	xhttp.open('GET', url, true);
	xhttp.send();
}

function renderUsers (users) {
	renderTable(users);
	for (var user of users) {
		//renderUser(user);
		renderUserRow(user);
	}
}

function renderTable(users) {
	var table = document.createElement('table');
	table.setAttribute('class', 'main-table');

	var tr = document.createElement('tr');

	if (users.length) {
		var columns = users[0];
		for (var key in columns) {
			if (columns.hasOwnProperty(key)) {
				var column = document.createElement('th');
				column.textContent = key;
				tr.appendChild(column);
			}
		}
		table.appendChild(tr);
	}
	demo.appendChild(table);
}

function renderObject(obj) {
	var result = '';
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			if (typeof obj[key] == 'object') {
				result += key + ":" + renderObject(obj[key]);
			} else {
				result += key + ": " + obj[key] + ' ';
			}
		}
	}

	// if (result.length > 40) {
	// 	result = result.slice(0, 37) + '...';
	// }

	return result.trim();
}

function renderUserRow(user) {
		var tableReference = document.querySelector('.main-table');
		var tr = document.createElement('tr');

		for (var key in user) {
			if (user.hasOwnProperty(key)) {
				var column = document.createElement('td');
				if (typeof user[key] == 'object') {
					column.textContent = renderObject(user[key]);
				} else {
					column.textContent = user[key];
				}
				tr.appendChild(column);
			}
		}
		tableReference.appendChild(tr);
}

function renderUser (user) {
	document.querySelector('.demo').innerHTML += user.id +
		') Title: ' + user.title + '<br/>Content: ' + user.body + '<br/><br/>';
}

var input = document.querySelector('.input');
var submit = document.querySelector('.submit');
var demo = document.querySelector('.demo');

submit.addEventListener('click', function (e) {
	e.preventDefault();
	if (input && input.value) {
		loadDoc('https://jsonplaceholder.typicode.com/users/' + input.value);
		input.value = '';
	} else {
		loadDoc('https://jsonplaceholder.typicode.com/users');
	}
});
