import { test, expect } from '@playwright/test';

test('load the page and retrieve superheroes', async ({ page, context }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Marvelpedia/)
   
  await page.getByText('3-D Man').waitFor();

  await page.getByRole('textbox').fill('deadpool');

  await page.getByTestId('search-cta').click()
  
  await page.getByText('deadpool').waitFor();

  const pagePromise = context.waitForEvent('page');
  await page.getByTestId('read-more-cta').click()

  const newPage = await pagePromise;
  await newPage.waitForLoadState();
  await expect(newPage).toHaveTitle(/Marvel.com/,)
});