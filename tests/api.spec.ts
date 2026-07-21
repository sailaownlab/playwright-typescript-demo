import { test, expect } from '@playwright/test';

test('create and retrieve a pet using the Swagger Petstore API', async ({
  request,
}) => {
  const petId = Date.now();

  const newPet = {
    id: petId,
    name: `playwright-pet-${petId}`,
    status: 'available',
  };

  const createResponse = await request.post(
    'https://petstore.swagger.io/v2/pet',
    {
      data: newPet,
    },
  );

  expect(createResponse.ok()).toBeTruthy();

  const getResponse = await request.get(
    `https://petstore.swagger.io/v2/pet/${petId}`,
  );

  expect(getResponse.status()).toBe(200);

  const responseBody = await getResponse.json();

  expect(responseBody.id).toBe(petId);
  expect(responseBody.name).toBe(newPet.name);
  expect(responseBody.status).toBe('available');
});