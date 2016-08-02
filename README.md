# Bookshelf-crud
Simple CRUD for Bookshelf models

## How to use
```javascript
var bookshelf = require("bookshelf");
// ...
bookshelf.plugin(require("bookshelf-crud"));
```

## Examples
```javascript
	User.findAll({password: "12345678"})
	User.findAll({password: "12345678", "email": "ccrisrober@gmail.com"})
	User.findOne({email: "ccrisrober@gmail.com"})
	User.findOne({id: 2})
	User.findById(2)
	User.create({
		email: "jojo@jojo.com",
		password: "666666666",
		name: "Follow the leader"
	})
	User.updateOrCreate({
		id: 115
	}, {
		email: "whatthefuck@gmail.com",
		password: "666666666",
		name: "Follow me"
	})
	User.destroy({id: 4})
	User.update({
		id: 500
	}, {
		username: "Joselito1"
	})
	.then(function(user) {
		res.json(user);
	})
	.catch(function(err) {
		res.json(err);
	});
```