const crypto = require('crypto');

const key = process.env.ENCRYPTION_KEY;
const iv = process.env.ENCRYPTION_IV;

class EncryptionService {
    encrypt(text) {

        if (!key || !iv || key.length !== 16 || iv.length !== 16) {
            throw new Error('Encryption key and IV must be 16 characters long');
        }

        let cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(key), Buffer.from(iv));
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    decrypt(encryptedText) {
        if(!key || !iv || key.length !== 16 || iv.length !== 16) {
            throw new Error('Decryption key and IV must be 16 characters long');
        }

        let decipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(key), Buffer.from(iv));
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}

module.exports = EncryptionService;
