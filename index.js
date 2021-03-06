"use strict";

var extend = require('extend');

module.exports = function (Bookshelf) {
  	Bookshelf.Model = Bookshelf.Model.extend({}, {
  		/**
  		 * Find all data for this model
  		 * @return {Promise{[bookshelf.Model]}}
  		 */
		findAll: function(filter, opts) {
			return this.forge().where(filter).fetchAll(opts);
		},
  		/**
  		 * Find one model with query
  		 * @return {Promise{bookshelf.Model}}
  		 */
		findOne: function (query, opts) {
			if(query && query.id && this.prototype.idAttribute !== "id") {
				// Rename "id" if exist in query
				query[this.prototype.idAttribute] = query.id;
				delete query.id;
			}
			// require: Reject the returned response with a NotFoundError if results are empty.
			opts = extend({ require: true }, opts)
			return this.forge(query).fetch(opts)
		},
  		/**
  		 * Find one model by id
  		 * @return {Promise{bookshelf.Model}}
  		 */
		findById: function(id, opts) {
			return this.findOne({ [this.prototype.idAttribute ]: id}, opts);
		},
  		/**
  		 * Create model
  		 * @return {Promise{bookshelf.Model}}
  		 */
		create: function(data, opts) {
			return this.forge(data).save(null, opts);
		},
  		/**
  		 * Destroy model by id
  		 * @return {Promise{bookshelf.Model}} (empty model if ok)
  		 */
		destroy: function(opts) {
			// require: Throw a Model.NoRowsDeletedError if no records are affected by destroy.
			opts = extend({ require: true }, opts);
			return this.forge({ [this.prototype.idAttribute]: opts.id})
				.destroy(opts);
		},
  		/**
  		 * Update model by id and new data
  		 * @return {Promise{bookshelf.Model}} (edited model if ok)
  		 */
		update: function(opts, data) {
			// patch: Only save attributes supplied in arguments to save.
			// require: Throw a Model.NoRowsUpdatedError if no records are affected by save.
			opts = extend({ patch: true, require: true }, opts);
			return this.forge({ [this.prototype.idAttribute]: opts.id }).fetch(opts)
				.then(function (model) {
					return model ? model.save(data, opts) : undefined
				});
		},
  		/**
  		 * Update (or create if not exists) model by id and new data
  		 * @return {Promise{bookshelf.Model}} (edited/created model if ok)
  		 */
		updateOrCreate: function(opts, data) {
			var self = this;
			// patch: Only save attributes supplied in arguments to save.
			opts = extend({ patch: true }, opts);
			return self.forge({ [self.prototype.idAttribute]: opts.id }).fetch(opts)
				.then(function (model) {
					return model ? model.save(data, opts) : self.create(data, {});
			});
  		}
	});
};