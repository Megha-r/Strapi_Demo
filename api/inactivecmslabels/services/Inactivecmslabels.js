'use strict';

/**
 * Inactivecmslabels.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all inactivecmslabels.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
     console.log('------------- in inactivecmslabels sevices fetchAll----->', params);

    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('inactivecmslabels', params);
    // Select field to populate.
    const populate = Inactivecmslabels.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');
      console.log('--- populate---->', populate);

    return Inactivecmslabels
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /**
   * Promise to fetch a/an inactivecmslabels.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    console.log('----------- in inactivelabels services fetch----------->', params);
    // Select field to populate.
    const populate = Inactivecmslabels.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Inactivecmslabels
      .findOne(_.pick(params, _.keys(Inactivecmslabels.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to count inactivecmslabels.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('inactivecmslabels', params);

    return Inactivecmslabels
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an inactivecmslabels.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Inactivecmslabels.associations.map(ast => ast.alias));
    const data = _.omit(values, Inactivecmslabels.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Inactivecmslabels.create(data);

    // Create relational data and return the entry.
    return Inactivecmslabels.updateRelations({ _id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an inactivecmslabels.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Inactivecmslabels.associations.map(a => a.alias));
    const data = _.omit(values, Inactivecmslabels.associations.map(a => a.alias));
    // Update entry with no-relational data.
    const entry = await Inactivecmslabels.update(params, data, { multi: true });
    
    // const entryval = await Cmslabel.update(params, data, { multi: true });
    // await Cmslabel.updateRelations(Object.assign(params, { values: relations }));
    
    const populate = Inactivecmslabels.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');
    const retVal = await Inactivecmslabels
      .findOne(_.pick(params, _.keys(Inactivecmslabels.schema.paths)))
      .populate(populate);

    // Update relational data and return the entry.
    return Inactivecmslabels.updateRelations(Object.assign({}, { values: relations }));
  },

  /**
   * Promise to remove a/an inactivecmslabels.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Inactivecmslabels.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Inactivecmslabels
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Inactivecmslabels.associations.map(async association => {
        if (!association.via || !data._id) {
          return true;
        }

        const search = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
        const update = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

        // Retrieve model.
        const model = association.plugin ?
          strapi.plugins[association.plugin].models[association.model || association.collection] :
          strapi.models[association.model || association.collection];

        return model.update(search, update, { multi: true });
      })
    );

    return data;
  },

  /**
   * Promise to search a/an inactivecmslabels.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('inactivecmslabels', params);
    // Select field to populate.
    const populate = Inactivecmslabels.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Inactivecmslabels.attributes).reduce((acc, curr) => {
      switch (Inactivecmslabels.attributes[curr].type) {
        case 'integer':
        case 'float':
        case 'decimal':
          if (!_.isNaN(_.toNumber(params._q))) {
            return acc.concat({ [curr]: params._q });
          }

          return acc;
        case 'string':
        case 'text':
        case 'password':
          return acc.concat({ [curr]: { $regex: params._q, $options: 'i' } });
        case 'boolean':
          if (params._q === 'true' || params._q === 'false') {
            return acc.concat({ [curr]: params._q === 'true' });
          }

          return acc;
        default:
          return acc;
      }
    }, []);

    return Inactivecmslabels
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  }
};
