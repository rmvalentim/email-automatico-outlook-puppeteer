const puppeteer = require('puppeteer');

const email = 'seu_email@hotmail.com';
const senha = 'sua senha aqui';

const mensagem = {
    destinatario: 'destinatario@hotmail.com',
    assunto: 'Email Automatico',
    corpo: 'Este é um email enviado automaticamente'
}

const enviaEmail = async () => {

    // Configura o navegador
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 100,
        defaultViewport: {
            width: 1366,
            height: 768
        },
        args: ['--start-maximized']
    });

    // Cria a pagina e acessa a URL
    const page = await browser.newPage();
    await page.goto('https://outlook.live.com/owa/');

    // Seleciona o botão Entrar quando disponivel
    await page.waitForSelector('[data-task="signin"]');
    await page.click('[data-task="signin"]');

    // Digita o email quando o seletor estiver disponivel
    await page.waitForSelector('input[type="email"]');
    await page.type('input[type="email"]', email);

    // Envia o email
    await page.click('input[type="submit"]');

    // Digita a senha quando o seletor estiver disponivel
    await page.waitForSelector('input[name="passwd"]');
    await page.type('input[name="passwd"]', senha);

    // Envia a senha
    await page.click('input[type="submit"]');

    // Clicar em nova mensagem quando disponivel
    await page.waitForSelector('#id__6');
    await page.click('#id__6');

    // Destinatario
    await page.waitForSelector('.ms-BasePicker-input');
    await page.type('.ms-BasePicker-input', mensagem.destinatario);

    // Assunto
    await page.waitForSelector('[aria-label="Adicionar um assunto"]');
    await page.type('[aria-label="Adicionar um assunto"]', mensagem.assunto);

    // Corpo do email
    await page.keyboard.press('Tab');
    await page.keyboard.type(mensagem.corpo);

    // Envia o email
    await page.waitForSelector('[aria-label="Enviar"]');
    await page.click('[aria-label="Enviar"]');

    await browser.close();

}

enviaEmail();