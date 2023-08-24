import { test, expect } from '@playwright/test'

test.describe('API testing', () => {
    
    const baseUrl = 'https://reqres.in/api'
    
    test('Simple api test - assert response status', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/2`)
        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)
    })

    test('Simple api test - assert invalid endpoint', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/2dgsds`)
        expect(response.status()).toBe(404)
    })

    test('GET request - Get user details', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/1`)
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(1)
        expect(responseBody.data.first_name).toBe('George')
        expect(responseBody.data.last_name).toBe('Bluth')
        expect(responseBody.data.email).toBeTruthy()
    })

    test('POST request - Create new user', async ({ request }) => {
        const response = await request.post(`${baseUrl}/users`, {
            data: {
                id: 1008
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(responseBody.id).toBe(1008)
        expect(responseBody.createdAt).toBeTruthy()
    })

    test('POST request - Login', async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                email: 'eve.holt@reqres.in',
                password: 'cityslicka'
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.token).toBeTruthy()
    })

    test('POST request - Login fail', async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                email: 'eve.holt@reqres.in'
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(400)
        expect(responseBody.error).toBe('Missing password')
    })

    test('PUT Request - Update User', async ({ request }) => {
        const response = await request.put(`${baseUrl}/users/2`, {
          data: {
            name: 'new name',
            job: 'new job',
          },
        })
        const responseBody = JSON.parse(await response.text())
    
        expect(response.status()).toBe(200)
        expect(responseBody.name).toBe('new name')
        expect(responseBody.job).toBe('new job')
        expect(responseBody.updatedAt).toBeTruthy()
    })
    
    test('DELETE Request - Delete User', async ({ request }) => {
        const response = await request.delete(`${baseUrl}/users/2`)
        expect(response.status()).toBe(204)
    })
})