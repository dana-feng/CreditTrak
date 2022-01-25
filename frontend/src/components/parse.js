
export default function parse (text) {
  // Find price
  let priceS = text.indexOf("otal")
  let priceText = text.substring(priceS)
  let d = priceText.match(/\d/)
  priceS = priceText.indexOf(d)
  priceText = priceText.substring(priceS)
  let priceE = priceText.indexOf(" ")
  let price = priceText.substring(0, priceE)
  console.log("price", price)

  // Find the date
  let date_regex = /\d{2}([/.-])\d{2}\1\d{4}/g
  let date = text.match(date_regex)
  if (date) {
    date = date[0]
  }

  // Find Name of Store
  let name_regex =  /[A-ZÖ][a-zö]+/g
  let store = text.match(name_regex)
  if (store) {
    store = store[0]
  }

  // Find credit card
  const creditCards = ["american express", "bank of america", "barclays", "capital one", "chase", "citibank", "discover", "mastercard", "navy federal credit union", "pentagon federal credit union", "pnc", "usaa", "u.s. bank", "visa", "wells fargo"]
  let creditCard = ""
  let newText = text.toLowerCase()
  creditCards.map(card => {
      if (newText.indexOf(card) != -1) {
          creditCard = card
      }
  })
  const card = creditCard.split(" ");
  if (card != '') {
    for (let i = 0; i < card.length; i++) {
        card[i] = card[i][0].toUpperCase() + card[i].substr(1);
    }
  }
card.join("")
      
  return {
      "price": price,
      "date": date,
      "item": store,
      "card": card
    }
}