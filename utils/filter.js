module.exports = function filter(month, category) {

  let filters

  if ((!month && !category) || (month === 'all' && category === 'all')) {
    filters = null
  } else {
    if (month === 'all') {
      filters = {
        $expr: {
          $eq: ["$category", category]
        }
      }
    }

    if (category === 'all') {
      filters = {
        $expr: {
          $eq: [{ "$month": "$date" }, Number(month)]
        }
      }
    }

    if (month !== 'all' && category !== 'all') {
      filters = {
        $expr: {
          $and: [
            { $eq: [{ "$month": "$date" }, Number(month)] },
            { $eq: ["$category", category] }
          ]
        },
      }
    }
  }

  return filters
}