exports.home = async (req, res, next) => {
  if (process.env.REACT) {
    const games = [
      {
        game: 'Words in Order',
        url: '/wio',
      },
    ]
    res.json(games)
  } else {
    res.render('home/home', {
      layout: 'layout',
      tabTitle: 'Round English - Home',
      title: {
        main: 'Language Games',
        // subtitle: 'A collection of ELT Games',
      },
    })
  }
}
