export function convertMobileNumber(mobile: string) {
  return mobile;
  if (mobile.length > 11 || mobile.length < 11) {
    throw new Error(
      'Invalid mobile number. Enter your 11 character mobile number',
    );
  }
  const convertedMobileNumber = '+88' + mobile;
  return convertedMobileNumber;
}
