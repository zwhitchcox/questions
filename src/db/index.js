export default function attach(app) {
  app.use(function intercept(req, res, next) {
    next()
  })
}
