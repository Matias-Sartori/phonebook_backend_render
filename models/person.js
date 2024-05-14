const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

// Formato number:

//Estar formado por dos partes separadas por -, la primera parte tiene dos o tres números y la segunda parte también consiste en números.

//Por ejemplo, 09-1234556 y 040-22334455 son números de teléfono válidos.
//Por ejemplo, 1234556, 1-22334455 y 10-22-334455 son inválidos.

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function(v) {
        return /\d{2,3}-\d{7,}/.test(v) // <- (Formato number)
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)