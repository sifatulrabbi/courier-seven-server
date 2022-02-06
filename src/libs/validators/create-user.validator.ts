/**
 * @param body
 * @returns boolean
 * @description takes req.body and validates req.body for creating user account
 */
export function createUserValidator(body: any) {
  const errors = [];

  if (!body.first_name) {
    errors.push("first_name is required");
  }

  if (!body.last_name) {
    errors.push("last_name is required");
  }

  if (!body.email) {
    errors.push("password is required");
  }

  if (!body.mobile) {
    errors.push("mobile is required");
  }

  if (!body.present_address) {
    errors.push("present_address: {district, area, street, house} is required");
  }

  if (!body.permanent_address) {
    errors.push(
      "permanent_address: {district, area, street, house} is required"
    );
  }

  if (!body.account_type) {
    errors.push("account_type is required");
  }

  if (errors.length > 0) {
    return false;
  }

  return true;
}
