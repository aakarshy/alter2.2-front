export const create = (userId, token, post) => {
	return fetch (`${process.env.REACT_APP_API_URL}/cdcpost/new/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(post)
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
}

export const list = page => {
    return fetch(`${process.env.REACT_APP_API_URL}/cdcposts/?page=${page}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singlePost = (postId) => {
	return fetch(`${process.env.REACT_APP_API_URL}/cdcpost/${postId}`, {
		method: "GET",
	})
	.then(response => {
		return response.json();
	})
	.catch(err => console.log(err))
}

export const remove = (postId, token) => {
	console.log(postId, token)
	return fetch(`${process.env.REACT_APP_API_URL}/cdcpost/${postId}?_method=DELETE`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})
	.then(response => {
		return response.json();
	})
	.catch(err => console.log(err))
}
