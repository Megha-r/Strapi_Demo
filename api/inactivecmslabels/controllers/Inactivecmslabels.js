'use strict';

/**
 * Inactivecmslabels.js controller
 *
 * @description: A set of functions called "actions" for managing `Inactivecmslabels`.
 */

module.exports = {

  /**
   * Retrieve inactivecmslabels records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.inactivecmslabels.search(ctx.query);
    } else {
      return strapi.services.inactivecmslabels.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a inactivecmslabels record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.inactivecmslabels.fetch(ctx.params);
  },

  /**
   * Count inactivecmslabels records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.inactivecmslabels.count(ctx.query);
  },

  /**
   * Create a/an inactivecmslabels record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.inactivecmslabels.add(ctx.request.body);
  },

  /**
   * Update a/an inactivecmslabels record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.inactivecmslabels.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an inactivecmslabels record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.inactivecmslabels.remove(ctx.params);
  }
};
