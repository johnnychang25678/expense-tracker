function categoryToIcon(category) {
  const icons = {
    home: 'fas fa-home',
    traffic: 'fas fa-shuttle-van',
    entertainment: 'fas fa-grin-beam',
    food: 'fas fa-utensils',
    others: 'fas fa-pen'
  }
  switch (category) {
    case 'home':
      return icons.home
    case 'traffic':
      return icons.traffic
    case 'entertainment':
      return icons.entertainment
    case 'food':
      return icons.food
    case 'others':
      return icons.others
    default:
      return category
  }
}

module.exports = categoryToIcon
