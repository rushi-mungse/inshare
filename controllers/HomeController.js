class HomeController {
  async home(req, res, next) {
    return res.render("home");
  }
}

module.exports = new HomeController();
