const { test, expect } = require('@playwright/test');

test('体重記録が保存され再読み込み後も残る', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: '健診まで' })).toBeVisible();
  await page.locator('#weightInput').fill('72.4');
  await page.locator('#memoInput').fill('朝食前');
  await page.getByRole('button', { name: '記録する' }).click();
  await expect(page.locator('#formMessage')).toContainText('保存しました');
  await page.reload();
  await expect(page.locator('#weightInput')).toHaveValue('72.4');
  await expect(page.locator('#recordsList')).toContainText('72.4 kg');
});

test('目標体重を保存できる', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '目標設定' }).click();
  await page.locator('#goalWeightInput').fill('68.0');
  await page.locator('#goalDateInput').fill('2026-10-01');
  await page.getByRole('button', { name: '保存' }).click();
  await expect(page.locator('#goalDateText')).toContainText('2026/10/01');
});
