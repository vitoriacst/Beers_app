const errorTreatment = async (err, _req, res, next) => {
  const { status, message } = err;

  const code = status || 500;
  const info = message || 'Internal Server Error';

  res.status(code).json({ message: info });

  next();
};

module.exports = { errorTreatment };

// module.exports = (err, _req, res, _next) => {
//   const { name, message } = err;
//   console.log(err);

//   switch (name) {
//     case 'not found':
//       res.status(404).json({ message });
//       break;
//     case 'non existant token':
//       res.status(401).json({ message });
//       break;
//     case 'invalid token':
//       res.status(401).json({ message });
//       break;
//     case 'invalid login':
//       res.status(404).json({ message });
//       break;
//     default:
//       res.status(500).json({ message: 'Internal error' });
//   }
// };