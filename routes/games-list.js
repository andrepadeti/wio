// index of activities route
router.get('/', async (req, res, next) => {
	const db = req.app.locals.db
  const wio = db.collection('wio')
  const options = { 
    projection: { description: 1 }, 
    sort: { description: 1 } 
  }
  const data = await wio.find({}, options).toArray()
  res.render('wio/index', 
    { 
			layout: 'layout',
      tabTitle: 'Round English - Words in Order',
      data
		}
	)
})
