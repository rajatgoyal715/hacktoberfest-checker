function fetchProfile() {
	username = document.getElementById('username_text').value;

	fetchUser(username)
	fetchPullRequests(username)
}

function fetchUser(username) {
	const user_xhr = new XMLHttpRequest();
	user_get_url = `https://api.github.com/search/users?q=${username}+in:login`
	user_xhr.open('GET', user_get_url, true);
	user_xhr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			if (response['items'].length == 0) {
				usernameNotFound(username)
				return
			}

            var avatar_url = response['items'][0]['avatar_url']
            updateAvatar(avatar_url)
		}
	}
	user_xhr.send();
}

function fetchPullRequests(username) {
	year = new Date().getFullYear();
	month = new Date().getMonth() + 1; // 0 based indexing

	// show previous year's stats
	if(month < 10) year--;

	const pr_xhr = new XMLHttpRequest();
	pull_requests_get_url = `https://api.github.com/search/issues?q=-label:invalid+created:${year}-09-30T10%3A00%3A00%2B00%3A00..${year}-11-01T12%3A00%3A00%2B00%3A00+type:pr+is:public+author:${username}`;
	pr_xhr.open('GET', pull_requests_get_url, true);
	pr_xhr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			pull_requests_count = JSON.parse(this.responseText).total_count;
			updatePullRequestsCount(pull_requests_count)
		}
	};
	pr_xhr.send();
}

function usernameNotFound(username) {
	alert(`No user found with username as ${username}`)
}

function updateAvatar(avatar_url) {
    console.log(avatar_url)
    imgElement = document.getElementById("user-avatar");
    imgElement.src = avatar_url;
    imgElement.style.visibility = "visible";
}

function updatePullRequestsCount(pull_requests_count) {
	document.getElementById("response").innerText = pull_requests_count;
}