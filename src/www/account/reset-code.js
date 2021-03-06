const dashboard = require('../../../index.js')

module.exports = {
  before: beforeRequest,
  get: renderPage
}

async function beforeRequest (req) {
  if (!req.query || !req.query.codeid) {
    throw new Error('invalid-reset-codeid')
  }
  const resetCode = await global.api.user.ResetCode.get(req)
  resetCode.createdFormatted = dashboard.Format.date(resetCode.created)
  req.data = { resetCode }
}

async function renderPage (req, res) {
  const doc = dashboard.HTML.parse(req.route.html, req.data.resetCode, 'resetCode', req.language)
  return dashboard.Response.end(req, res, doc)
}
