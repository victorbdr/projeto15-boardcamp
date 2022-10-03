import joi from "joi";

const gameSchema = joi.object({
  name: joi.string().required(),
  stockTotal: joi.number().required().positive(),
  pricePerDay: joi.number().required().positive(),
});

export { gameSchema };
