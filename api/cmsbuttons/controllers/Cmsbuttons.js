'use strict';

/**
 * Cmsbuttons.js controller
 *
 * @description: A set of functions called "actions" for managing `Cmsbuttons`.
 */

module.exports = {

  /**
   * Retrieve cmsbuttons records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.cmsbuttons.search(ctx.query);
    } else {
      return strapi.services.cmsbuttons.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a cmsbuttons record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.cmsbuttons.fetch(ctx.params);
  },

  /**
   * Count cmsbuttons records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.cmsbuttons.count(ctx.query);
  },

  /**
   * Create a/an cmsbuttons record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.cmsbuttons.add(ctx.request.body);
  },

  /**
   * Update a/an cmsbuttons record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.cmsbuttons.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an cmsbuttons record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.cmsbuttons.remove(ctx.params);
  }
};
