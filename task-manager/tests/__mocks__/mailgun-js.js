const mailgun = (apiKey, domain) => {
  return {
    messages () {
      return {
        send () {}
      }
    }
  }
}

module.exports = mailgun;

// module.exports = function (apiKey, domain) {
//   const object2 = {
//     send() {
 
//     }
//   }
 
//   const object1 = {
//     messages() {
//       return object2
//     }
//   }
 
//   return object1
// }
