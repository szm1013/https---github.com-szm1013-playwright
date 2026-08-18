import { test, expect } from '@playwright/test';
import pageTwoAllUsers from './test-data/reqres_users_page2_response.json'

declare const process: {
    env: {
        REQRES_API_KEY?: string;
    };
};

test.describe.only('API Testing', () => {
    //GET all users - compare to saved response
    test.skip('GET all users - compare to saved response', async ({ request }) => {
        const apiKey = process.env.REQRES_API_KEY || 'reqres_1b583684f1cf4c04b9a192d37eff843e';

        const response = await request.get('https://reqres.in/api/users?page=2', {
            headers: {
                'x-api-key': apiKey,
            }
        });
 
        console.log(response);
        console.log(response.status());
        console.log(await response.json());

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toEqual(pageTwoAllUsers);
    });

    //GET One user
    test.skip('GET single user', async ({ request }) => {
        const apiKey = process.env.REQRES_API_KEY || 'reqres_1b583684f1cf4c04b9a192d37eff843e';
        const response = await request.get('https://reqres.in/api/users/2', {
            headers: {
                'x-api-key': apiKey,
                'Authorization': `Bearer ${apiKey}`
            }
        });
        const responseBody = await response.json();
        
        console.log(responseBody);

        expect(response.status()).toBe(200);
        expect(responseBody.data.id).toBe(2);
        expect(responseBody.data.first_name).toBe('Janet');
        expect(responseBody.data.last_name).toBe('Weaver');
        expect(responseBody.data.email).toBe('janet.weaver@reqres.in');
        expect(responseBody.data.avatar).toBe('https://reqres.in/img/faces/2-image.jpg');
        expect(responseBody.support.text).toBe('Become a better CTO. A playbook of painful stories and practical advice from a two-time startup CTO.');

});

    //3. POST - Create a new user
    test.skip('POST - Create a new user', async ({ request }) => {
        const apiKey = process.env.REQRES_API_KEY || 'reqres_1b583684f1cf4c04b9a192d37eff843e';
        const newUser = {"name": "Mihály Szilágyi","job": "QA Engineer", "email": "msz@reqres.in", "password": "jelszo"}
        const response = await request.post('https://reqres.in/api/users', {
            headers: {
                'x-api-key': apiKey,
            },
            data: newUser
        });

        const responseBody = await response.json();

        console.log(responseBody);


        expect(response.status()).toBe(201);
        expect(responseBody.name).toBe('Mihály Szilágyi');
        expect(responseBody.job).toBe('QA Engineer');
        expect(responseBody.email).toBe('msz@reqres.in');
        expect(responseBody.password).toBe('jelszo');
    });

        //4. PUT - Update an existing user
    test.skip('PUT - Update an existing user', async ({ request }) => {
        const apiKey = process.env.REQRES_API_KEY || 'reqres_1b583684f1cf4c04b9a192d37eff843e';
        const updatedUser = {"name": "Mihály Szilágyi","job": "QA Engineer", "email": "msz@reqres.in", "password": "jelszo"}
        const response = await request.put('https://reqres.in/api/users/2', {
                    headers: {
                'x-api-key': apiKey,
            },
            data: updatedUser
        });
        const responseBody = await response.json();

        console.log(responseBody);


        expect(response.status()).toBe(200);
        expect(responseBody.name).toBe('Mihály Szilágyi');
        expect(responseBody.job).toBe('QA Engineer');
        expect(responseBody.email).toBe('msz@reqres.in');
        expect(responseBody.password).toBe('jelszo');
        
});

    //5. Delete - Delete an existing user
    test.skip('DELETE - Delete an existing user', async ({ request }) => {
        const apiKey = process.env.REQRES_API_KEY || 'reqres_1b583684f1cf4c04b9a192d37eff843e';
        const response = await request.delete('https://reqres.in/api/users/2', {
            headers: {
                'x-api-key': apiKey,
            }
        });
      //  const responseBody = await response.json();
              console.log("Response status:", response.status());
        expect(response.status()).toBe(204);
})

});