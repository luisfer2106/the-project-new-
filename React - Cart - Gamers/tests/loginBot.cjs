const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();

  // 1. Ir a la página de login
  await page.goto('http://localhost:5175/login');

  // 2. Completar formulario de login
  await page.type('input[type="text"]', 'admin01');
  await page.type('input[type="password"]', 'OperEvert1974!!');

  // 3. Hacer clic en botón de login y esperar navegación
  await Promise.all([
    page.click('button'),
    page.waitForNavigation({ waitUntil: 'networkidle0' })
  ]);

  // 4. Verificar login exitoso
  try {
    await page.waitForSelector('text=Bienvenido', { timeout: 3000 });
    console.log('✅ Login exitoso');
  } catch {
    const errorVisible = await page.$('text=Credenciales incorrectas');
    if (errorVisible) {
      console.log('❌ Credenciales inválidas');
      await browser.close();
      return;
    }
  }

  // 5. Abrir modal con el botón "Agregar producto"
  await page.waitForSelector('.admin-button', { visible: true });
  await page.click('.admin-button');
  console.log("🟢 Botón 'Agregar' clickeado");

  // 6. Esperar el modal
  await page.waitForSelector('.ant-modal', { visible: true });
  console.log("✅ Modal abierto");

  // 7. Llenar campos del modal (por orden)
  const inputs = await page.$$('.ant-modal input');
  if (inputs.length >= 5) {
    await inputs[0].type('Producto Test Bot');                  // Nombre
    await inputs[1].type('Descripción automática');             // Descripción
    await inputs[2].type('5');                                  // Cantidad
    await inputs[3].type('PC');                                 // Plataforma
    await inputs[4].type('https://via.placeholder.com/100');    // Imagen URL
    console.log('✍️ Campos completados');
  } else {
    console.log('❌ No se encontraron todos los inputs del modal');
    await browser.close();
    return;
  }

  // 8. Click en OK del modal (botón Ant Design)
  await page.click('.ant-modal-footer button.ant-btn-primary');
  console.log('📤 Modal enviado');

  // 9. Esperar unos segundos
  await new Promise(resolve => setTimeout(resolve, 3000));

  // 10. Click en botón cerrar sesión
  await page.waitForSelector('.logout-button', { visible: true });
  await page.click('.logout-button');
  console.log('🔒 Cierre de sesión solicitado');

  // 11. Esperar navegación al login
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  // 12. Validar URL final
  const finalUrl = page.url();
  if (finalUrl.includes('/login')) {
    console.log('✅ Sesión cerrada correctamente');
  } else {
    console.log('⚠️ No se redirigió al login');
  }

  // 13. Cerrar navegador
  await browser.close();
  console.log("👋 Bot finalizado");
})();
