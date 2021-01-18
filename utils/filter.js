module.exports = function filter(month, category) {

  let filters

  // if month and category both = all, no queries
  if ((!month && !category) || (month === 'all' && category === 'all')) {
    filters = null
  } else {
    // if month = all, query category only
    if (month === 'all') {
      filters = {
        $expr: {
          $eq: ["$category", category]
        }
      }
    }
    // if category = all, query month only
    if (category === 'all') {
      filters = {
        $expr: {
          $eq: [{ "$month": "$date" }, Number(month)]
        }
      }
    }
    // query both fields
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