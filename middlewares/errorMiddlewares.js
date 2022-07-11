const errorHandle = (error, _req, res, _next) => {
  const { details } = error;
  const { type, message } = details[0];
  // console.warn(type);
  switch (type) {
    case 'any.required': res.status(400).json({ message }); break;
    case 'string.min': res.status(422).json({ message }); break;
    default: res.sendStatus(500);
  }
};

module.exports = errorHandle;