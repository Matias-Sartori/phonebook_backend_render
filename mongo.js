const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password (at least), name and number as argument (optional)')
  process.exit(1)
}

if (process.argv.length === 4) {
  console.log('missing number argument!')
  process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url =
  `mongodb+srv://matiasgsartori:${password}@cluster0.za8mqan.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3) {
  Person
    .find({})
    .then(result => {
      console.log('phonebook: ')
      result.forEach(person => {
        console.log(person.name, person.number)
      })

    mongoose.connection.close()
  })

  return
}

const person = new Person({
  name: personName,
  number: personNumber,
})

person
  .save()
  .then(result => {
    console.log('result ->', result)
    console.log(`added ${result.name} ${result.number} to phonebook`)
    mongoose.connection.close()
})