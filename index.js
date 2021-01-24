const mongoose=require('mongoose')

require('dotenv').config({path:'.env'});

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error");
  });


let personSchema = new mongoose.Schema({
  name:{type:String,required:true},
  age:Number,
  favoriteFoods:[String]
});

let personModel=mongoose.model('Person',personSchema); 

//Create and Save a Record of a Model:
let person=personModel({
  name:"Mejdi",
  age:32,
  favoriteFoods:["koskski","ma9arouna"]
});
person.save((err,data) => {
  if(err) console.log(err)
  console.log('data', data)
})

//Create Many Records 
personModel.create([
  {name:"Mary",age:25,favoriteFoods:["pizza","ma9loub"]},
  {name:"Mohamed",age:27,favoriteFoods:["poulet","escalope"]},
  {name:"Sami",age:35,favoriteFoods:["fruits de mer","ma9arouna"]}
])
.then(docs=>console.log('docs', docs))
.catch(err=> console.log(err))

//Search Database
personModel.find({name:'Ali'})
.then(doc => {
  console.log(doc)
})
.catch(err => {
  console.error(err)
})

//Return a Single Matching Document from Database
personModel.findOne({favoriteFoods:{$in:['ma9arouna']}})
.then(doc=>console.log(doc))
.catch(err=>console.log(err))

//Search Database By _id
personModel.findById({_id: '600591291de53e32a84fbb51'})
.then(doc=>console.log(doc))
.catch(err=>console.log(err))

//Perform Classic Updates by Running Find, Edit, then Save
personModel.findById({_id: '600591291de53e32a84fbb51'}, (err, person) => {
  if (err) console.log(err)
  else console.log(person.favouriteFoods.push('humburger'))
  person.save()
  .then(doc=>console.log(doc))
  .catch(err=>console.log(err))
})

//Perform New Updates on a Document Using model.findOneAndUpdate()
personModel.findByIdAndUpdate({name:'Mohamed'}, {age:20}, {new:true})
.then(doc=>console.log(doc))
.catch(err=>console.log(err))

//Delete One Document Using model.findByIdAndRemove
personModel.findOneAndRemove({_id: '600591291de53e32a84fbb51'})
.then(doc=>console.log(doc))
.catch(err=>console.log(err))

//Delete Many Documents with model.remove()
personModel.remove({name:'Mary'})
.then(doc=>console.log(doc))
.catch(err=>console.log(err))

//Chain Search Query Helpers to Narrow Search Results
personModel.find({favouriteFoods:{$in: ['burrito']}})
.sort({name:1})
.limit(2)
.select({age:false})
.exec((err,data) => {
  if (err) console.log(err)
  else console.log(data)
})

