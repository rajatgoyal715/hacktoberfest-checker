function checkStatus() {
	const http = new XMLHttpRequest();

	http.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.responseText);
			document.getElementById("response").innerText = obj.total_count;
		}
	};

	year = new Date().getFullYear();
	month = new Date().getMonth() + 1; // 0 based indexing
	if(month < 10) year--;

	username = document.getElementById('username_text').value;
	request_url = `https://api.github.com/search/issues?q=-label:invalid+created:${year}-09-30T10%3A00%3A00%2B00%3A00..${year}-11-01T12%3A00%3A00%2B00%3A00+type:pr+is:public+author:${username}`;

	http.open('GET', request_url, true);
	http.send();
}