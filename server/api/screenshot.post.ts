import puppeteer from 'puppeteer'

export default defineEventHandler(async (event) => {
  try {
    const { html, width = 480, height = 1920 } = await readBody(event)

    if (!html) {
      throw createError({
        statusCode: 400,
        message: 'HTML content is required'
      })
    }

    // Запускаємо Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    })

    const page = await browser.newPage()

    // Встановлюємо розмір viewport (Instagram Story розмір)
    await page.setViewport({
      width: width,  // Instagram story width
      height: height, // Instagram story height
      deviceScaleFactor: 1
    })

    // Встановлюємо контент
    await page.setContent(html, {
      waitUntil: 'networkidle0' // Чекаємо поки всі ресурси завантажаться
    })

    // Чекаємо трохи для застосування всіх фільтрів і анімацій
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Знаходимо елемент story-container для точного скріншота
    const element = await page.$('.story-container')
    
    if (!element) {
      throw new Error('Story container not found')
    }

    // Робимо скріншот тільки потрібного елемента
    const screenshot = await element.screenshot({
      type: 'png',
      encoding: 'base64'
    })

    await browser.close()

    // Повертаємо base64 зображення
    return {
      success: true,
      image: `data:image/png;base64,${screenshot}`
    }

  } catch (error) {
    console.error('Puppeteer error:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to generate screenshot',
      data: error.message
    })
  }
})