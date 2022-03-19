import { emailService } from '../../src/services/email.service';

describe('sending OTP emails', () => {
  describe('given the email is fake', () => {
    it('should fail with example.com', async () => {
      const email = 'example.com';
      try {
        const info = await emailService.sendOtpMail(email, '123456');
        expect(info).toBeFalsy();
      } catch (err) {
        expect(err).toBeTruthy();
      }
    });
  });

  describe('given the email is valid', () => {
    it('should pass with example@example.com', async () => {
      const email = 'example@email.com';
      try {
        const info = await emailService.sendOtpMail(email, '123456');
        expect(info).toBeTruthy();
      } catch (err) {
        expect(err).toBeFalsy();
      }
    });
  });
});
