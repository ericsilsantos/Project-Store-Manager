const errorHandle = (error, _req, res, _next) => {
  const { message } = error;
  if (message === 'Product not found') return res.status(404).json({ message });

  const { type } = error.details[0];
  switch (type) {
    case 'any.required': res.status(400).json({ message }); break;
    case 'string.min': res.status(422).json({ message }); break;
    case 'number.min': res.status(422).json({ message }); break;
    default: res.sendStatus(500);
  }
};

module.exports = errorHandle;