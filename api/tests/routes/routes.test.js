const supertest = require('supertest');

const app = require('../../src/routes/index.js');

const api=supertest(app)

describe('GET /diets',()=>{

    it('responde con 200', async() =>{ 
    await api.get('/diets').expect(200).expect('Content-Type', /application\/json/)
})
    
    it('Devuelve un array',()=>{
        api.get('/diets').then((res)=>{
            expect(res.body).toEqual([{},{}]);
        })
    })

})

describe('GET /otraruta',()=>{
    it('responde con 200', async() =>{ 
        const res =await api.get('/otraruta').expect(200)
    })
    
    it('Devuelve un un json con mensaje hola',async()=>{
        await api.get('/otraruta').then((res)=>{
            expect(res.body.msg).toEqual("hola");
        })
    })

})
