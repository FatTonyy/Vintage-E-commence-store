"use strict";

const stripe = require("stripe")("sk_test_vw5LeVwa9nQKlmpBnu5x30yj00LCBan5L8");

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  create: async ctx => {
    const { name, total, items, stripeTokenId } = ctx.request.body;
    const { id } = ctx.state.user;

    const change = await stripe.charges.create({
      amount: Math.round(total * 100),
      currency: "usd", //does not support Ghana cedis yet
      source: stripeTokenId,
      description: `order ${new Date()} by ${ctx.state.user.username}`
    });
    const order = await strapi.services.order.create({
      name,
      total,
      items,
      user: id
    });
    return order;
  }
};
