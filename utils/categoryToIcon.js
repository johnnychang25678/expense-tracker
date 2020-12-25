function categoryToIcon(category) {
  const categories = {
    home: 'fas fa-home',
    traffic: 'fas fa-shuttle-van',
    entertainment: 'fas fa-grin-beam',
    food: 'fas fa-utensils',
    others: 'fas fa-pen'
  }
  switch (category) {
    case '家居物業':
      return categories.home
    case '交通出行':
      return categories.traffic
    case '休閒娛樂':
      return categories.entertainment
    case '餐飲食品':
      return categories.food
    case '其他':
      return categories.others
    default:
      return category
  }
}

module.exports = categoryToIcon
