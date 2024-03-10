const express = require('express');
const app = express();
const cors =require('cors')

const port =3500;
app.use(cors());

const foodGroup = require('./models/foodSchema')
require('./db/conn');
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('<h1>Welcome to API creation</h1>')
})

app.get('/getfooddata',async(req,res)=>{
    try{
        const fooddata = await foodGroup.find({});
        console.log(fooddata);
        res.status(201).send(fooddata);
    }
    catch(e)
    {
        console.log(e);
        res.status(500).json({error:'Internal Server Error'});
    }
})

app.get('/getfooddata/:food_item_name',async(req,res)=>{
    const food_item_name = req.params.food_item_name;
    try{
        const fooddata = await foodGroup.findOne({food_item_name:food_item_name});
        if(!fooddata){
            return res.status(400).json({error:'Player not found'})
        }
        res.status(201).send(fooddata);
    }
    catch(e)
    {
        console.log(e);
        res.status(500).json({error:'Internal Server Error'});
    }
})

app.post('/foodnutrition',async (req,res)=>{
    try{
        const newfood = await foodGroup.create(req.body);
        console.log(newfood);
        res.status(201).json(newfood);
    }
    catch(e){
        console.log(e);
        res.status(201).json({error:'Internal Server Error'});
        
    }
})

// app.delete('/getfooddata/:food_item_name',async(req,res)=>{
//     const food_item_name = req.params.food_item_name;
//     try{
//         console.log(`Received DELETE request for food_item_name: ${food_item_name}`);
//         const deletedRecord = await foodGroup.findOneAndDelete({food_item_name});
//         if(!deletedRecord)
//         {
//             return res.status(400).json({error:'Player not found'});

//         }
//         res.status(200).json(deletedRecord);
//     }
//     catch(e){
//         console.log(e);
//     }
// })

app.delete('/getfooddata/:food_item_name', async (req, res) => {
    const food_item_name = req.params.food_item_name;
    try {
        console.log(`Received DELETE request for food_item_name: ${food_item_name}`);
        const deletedRecord = await foodGroup.findOneAndDelete({ food_item_name });
        console.log('MongoDB Query:', foodGroup.find({ food_item_name })._conditions);
        console.log('Deleted Record Result:', deletedRecord);

        if (!deletedRecord) {
            return res.status(400).json({ error: 'Player not found' });
        }
        res.status(200).json(deletedRecord);
    } catch (e) {
        console.error('Error during deletion:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.listen(port,()=>{
    console.log(`Server is listening to port number ${port}`);
})
