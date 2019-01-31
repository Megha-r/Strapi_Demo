'use strict';

/**
 * Cmslabel.js controller
 *
 * @description: A set of functions called "actions" for managing `Cmslabel`.
 */

module.exports = {

  /**
   * Retrieve cmslabel records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.cmslabel.search(ctx.query);
    } else {
      return strapi.services.cmslabel.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a cmslabel record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.cmslabel.fetch(ctx.params);
  },

  /**
   * Count cmslabel records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.cmslabel.count(ctx.query);
  },

  /**
   * Create a/an cmslabel record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.cmslabel.add(ctx.request.body);
  },

  /**
   * Update a/an cmslabel record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.cmslabel.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an cmslabel record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.cmslabel.remove(ctx.params);
  }
};
