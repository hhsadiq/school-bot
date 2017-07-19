/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('bot', {
    title: 'Bot'
  });
};
