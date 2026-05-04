import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import apikey from '../api-key.json';
const COLLECTIONNAME = "MyGadgets";
const APIUNIQUETESTDATA = './api_test_data/apitestdata.json';

test.describe.skip('API Tests', { tag: '@API' }, () => {
    test('POST Test', async ({ request }) => {
        const response = await request.post(
            `https://api.restful-api.dev/collections/${COLLECTIONNAME}/objects`,
            {
                headers: {
                    "x-api-key": apikey.key,
                    "Content-Type": "application/json"
                },
                data: {
                    "name": "Apple MacBook Pro 16",
                    "data": {
                        "year": 2019,
                        "price": 1849.99,
                        "CPU model": "Intel Core i9",
                        "Hard disk size": "1 TB"
                    }
                }
            }
        );
        expect(response.status()).toBe(200);
        const responsebody = await response.json();
        console.log(responsebody);
        fs.writeFileSync(APIUNIQUETESTDATA, JSON.stringify(responsebody));
    });
    test('GET Test', async ({ request }) => {
        const response = await request.get(
            'https://api.restful-api.dev/collections',
            {
                headers: {
                    "x-api-key": apikey.key
                }
            }
        );
        expect(response.status()).toBe(200);
        const responsebody = await response.json();
        console.log(responsebody);
    });
    test('GET Test Unique', async ({ request }) => {
        const apiuniquetestdatabody = fs.readFileSync(APIUNIQUETESTDATA, 'utf8');
        const data = JSON.parse(apiuniquetestdatabody);
        const response = await request.get(
            `https://api.restful-api.dev/collections/${COLLECTIONNAME}/objects/${data.id}`,
            {
                headers: {
                    "x-api-key": apikey.key
                }
            }
        );
        expect(response.status()).toBe(200);
        const responsebody = await response.json();
        console.log(responsebody);
        console.log(response.status());
        expect(responsebody.id).toBe(data.id);
        expect(responsebody.name).toBe(data.name);
    });
});