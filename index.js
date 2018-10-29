base_url = 'https://api.github.com/search/issues?q=-label:invalid+created:2018-09-30T10%3A00%3A00%2B00%3A00..2018-11-01T12%3A00%3A00%2B00%3A00+type:pr+is:public+author:';

function checkStatus() {
	const http = new XMLHttpRequest();

	http.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.responseText);
			document.getElementById("response").innerText = obj.total_count;
		}
	};

	username = document.getElementById('username').value;
	request_url = base_url + username;

	http.open('GET', request_url, true);
	http.send();
}