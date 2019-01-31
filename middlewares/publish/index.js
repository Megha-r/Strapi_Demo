//**************************************************************************** */
//      Date:- 31-Jan-2019
//      Use:- Enable the content publishing on UI according to the user.
//            cmslabel collection - Used to read data
//            inactivecmslabel collection - Used to create, update and delete data.
//*************************************************************************** */
module.exports = strapi => {
  return {
    initialize: function (cb) {
      strapi.app.use(async (ctx, next) => {
        const {
          request: {
            body,
            method,
            url
          }
        } = ctx;

        if (body && body.fields) {
          const {
            fields: {
              Status,
              code
            }
          } = body;

          //******************* Handle data from "inactivecmslabels" collection.*********** */
          const isInactiveCmsUrl = url.includes('inactivecmslabels');
          if (isInactiveCmsUrl && method === 'POST' && Status) {
            const data = { ...ctx.request.body };
            const params = { model: 'cmslabel' };

            delete data.fields.Status;

            await strapi.plugins['content-manager'].services['contentmanager'].add(params, data, 'content-manager');
          }
          if (isInactiveCmsUrl && method === 'PUT' && Status) {
            const data = { ...ctx.request.body };

            try {
              const a = await strapi.services.cmslabel.fetch({ code });
              if (a && a.id && Status) {
                const params = {
                  model: 'cmslabel', //************ To be change :- should be dynamic
                  id: a.id
                };
                delete data.fields.Status;
                delete data.fields.id;
                delete data.fields.createdAt;
                delete data.fields.updatedAt;
                delete data.fields.__v;
                delete data.fields._id;

                await strapi.plugins['content-manager'].services['contentmanager'].edit(params, data, 'content-manager');
              } else if (Status) {        
                const params = { model: 'cmslabel' };

                await strapi.plugins['content-manager'].services['contentmanager'].add(params, data, 'content-manager');
              }
            }
            catch (err) {
              console.log('----- error--', err); // eslint-disable-line no-console
            }

          }
        }

        await next();

      });

      cb();
    }
  };
};
