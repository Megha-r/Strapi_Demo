
module.exports = strapi => {
  console.log('--------------IN Middleware------------------------');
  return {
    initialize: function (cb) {
      strapi.app.use(async (ctx, next) => {
        console.log('-------strapi in middleware----------', strapi);
        // console.log('------- ctx.request ---------', ctx.request);
        console.log('------- ctx ---------', ctx);


        console.log('------- ctx.request.body ---------', ctx.request.body);


        if (ctx && ctx.request.method && ctx.request.method === 'PUT') {
          console.log('--------------- Inside if ------------**********');
          if (ctx.request.body && ctx.request.body.fields && ctx.request.body.fields.Status) {
            console.log('---------------------------');
            const uniqueCode = ctx.request.body.fields.code;
            console.log('-----------STRAPIIIIIIIIII-------------', strapi.api.cmslabel.controllers.cmslabel);


            const a = await strapi.services.cmslabel.fetch({ code: uniqueCode });
            console.log('********RESULT********', a);

            const params = {
              model: 'cmslabel',
              id: a.id
            };

            delete ctx.request.body.Status;
            delete ctx.request.body._id;
            delete ctx.request.body.createdAt;
            delete ctx.request.body.updatedAt;
            delete ctx.request.body.__v;
            delete ctx.request.body._id;
            delete ctx.request.body.files;

            console.log('----------- going to call edit---------------------');
            const finalData = await strapi.services.cmslabel.edit(params, ctx.request.body, ctx.query.source);
            console.log('--------------FINAL DATA-------------', finalData);
            // strapi.plugins['content-manager'].services['contentmanager'].edit(params, ctx.request.body, ctx.query.source);

          }

        }

        await next();

      });

      cb();
    }
  };
};
