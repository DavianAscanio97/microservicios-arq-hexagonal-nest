// encrypt-password.js
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const publicKeyPath = path.join(__dirname, 'public.pem');
const publicKey = fs.readFileSync(publicKeyPath);

// Secreto compartido para HMAC
const HMAC_SECRET = 'd55e2e5b8d62e480455bb9a28c30b5946a6efba074db073ab74587c23294c665';

// Captura la contraseña desde los argumentos
const password = process.argv[2];

if (!password) {
    console.error('❌ Debes ingresar una contraseña. Ejemplo: node encrypt-password.js MiS3cretaC0ntraseña');
    process.exit(1);
}

const payload = {
    password,
    check: 'secure-v1',
};

const hmac = crypto
    .createHmac('sha256', HMAC_SECRET)
    .update(JSON.stringify(payload))
    .digest('hex');

const wrapped = {
    data: payload,
    hmac,
};

const buffer = Buffer.from(JSON.stringify(wrapped), 'utf8');
const encrypted = crypto.publicEncrypt(
    {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
    },
    buffer,
);

const encryptedBase64 = encrypted.toString('base64');
console.log('\n🔐 Contraseña cifrada (base64):\n');
console.log(encryptedBase64);
