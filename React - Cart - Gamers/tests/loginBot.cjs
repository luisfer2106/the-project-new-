const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Accede al login
  await page.goto('http://localhost:5175/login');

  // Rellenar los campos de usuario
  await page.type('input', 'admin01');
  await page.type('input[type="password"]', 'OperEvert1974!!');

  // Clic en "Ingresar"
  await page.click('button');

  // Esperar navegación
  await page.waitForNavigation();

  // Verificar mensaje de bienvenida (ajusta si usas otro texto)
  try {
    await page.waitForSelector('text=Bienvenido', { timeout: 3000 });
    console.log('✅ Login exitoso: se encontró mensaje de bienvenida.');
  } catch (error) {
    console.log('⚠️ No se encontró el mensaje de bienvenida, verificando errores...');

    const errorVisible = await page.$('text=Credenciales incorrectas');
    if (errorVisible) {
      console.log('❌ Login fallido: credenciales inválidas.');
      await browser.close();
      return;
    }
  }

  // Ir al panel de administración
  ///await page.goto('http://localhost:5175/admin/products');

  // Mantenerse 10 segundos en el panel
  await new Promise(resolve => setTimeout(resolve, 10000));

  // Cierra el navegador sin hacer logout
  await browser.close();
})();
