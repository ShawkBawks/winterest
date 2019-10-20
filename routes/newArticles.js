// const express = require('express');
// const router  = express.Router();

// module.exports = (db) => {
//   router.get("/", (req, res) => {
//     let query = `SELECT * FROM articles`;
//     console.log(query);
//     db.query(query)
//       .then(data => {
//         const articles = data.rows;
//         res.json({ articles });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });
//   return router;
// };
