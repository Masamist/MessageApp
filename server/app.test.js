
const app = require('./app') 

const request = require('supertest') 


describe('API test', () => {
  // Get all messages
    describe('retrive all message data', () => {
      test('should respond with a 200 status code', async() => {
        const response = await request(app).get('/api/messages').send()
        expect(response.statusCode).toBe(200)
    })
  })
  // Get singlmessage
  describe('retrive all message data', () => {
    test('should respond with a 200 status code', async() => {
      const response = await request(app).get('/api/messages/1').send()
      expect(response.statusCode).toBe(200)
    })
  })
  // Create message
  describe('retrive all message data', () => {
    test('should respond with a 201 status code', async() => {
      const response = await request(app).post('/api/messages').send({
        "admin_title": "General Admin",
        "country_code": "NZL",
        "text_message": "Happy Holiday",
        "start_date": "2023-12-23T11:00:00.000Z",
        "end_date": "2024-01-09T11:00:00.000Z"
      })
      expect(response.statusCode).toBe(201)
    })
  })
  // Create message
  describe('retrive all message data', () => {
    test('should respond with a 201 status code', async() => {
      const response = await request(app).put('/api/messages/11').send({
        "id": 11,
        "admin_title": "Jest Test",
        "country_code": "NZL",
        "text_message": "Happy Holiday",
        "start_date": "2023-12-23T11:00:00.000Z",
        "end_date": "2024-01-09T11:00:00.000Z"
      })
      expect(response.statusCode).toBe(200)
    })
  })


})

