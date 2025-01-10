import Joi from "joi";

const taxiStandSchema = Joi.object({
  name: Joi.string().required(),
  location: Joi.object({
    type: Joi.string().valid("Point").required(),
    coordinates: Joi.array().items(Joi.number()).length(2).required(),
  }).required(),
  address: Joi.string().optional(),
});

export const validateTaxiStand = (data) => {
  const { error } = taxiStandSchema.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }
};
