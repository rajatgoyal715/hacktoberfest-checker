function checkStatus() {

	year = new Date().getFullYear();
	month = new Date().getMonth() + 1; // 0 based indexing

	// show previous year's stats
	if(month < 10) year--;

	username = document.getElementById('username_text').value;

	const avatar_xhr = new XMLHttpRequest();
	avatar_get_url = `https://api.github.com/search/users?q=${username}+in:login`
	avatar_xhr.open('GET', avatar_get_url, true);
	avatar_xhr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			if (response['items'].length == 0) {
				alert(`No user found with username as ${username}`)
				return
			}
		}
	}
	avatar_xhr.send();

	const pr_xhr = new XMLHttpRequest();
	pull_requests_get_url = `https://api.github.com/search/issues?q=-label:invalid+created:${year}-09-30T10%3A00%3A00%2B00%3A00..${year}-11-01T12%3A00%3A00%2B00%3A00+type:pr+is:public+author:${username}`;
	pr_xhr.open('GET', pull_requests_get_url, true);
	pr_xhr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var obj = JSON.parse(this.responseText);
			document.getElementById("response").innerText = obj.total_count;
		}
	};
	pr_xhr.send();
}