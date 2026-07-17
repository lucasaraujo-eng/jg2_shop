function onlyDigits(value: string): string {
  return value.replace(/\D/g, '');
}

function isAllSameDigit(digits: string): boolean {
  return /^(\d)\1+$/.test(digits);
}

function checkDigit(digits: string, weights: number[]): number {
  const sum = weights.reduce((acc, weight, i) => acc + Number(digits[i]) * weight, 0);
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

export function isValidCPF(value: string): boolean {
  const digits = onlyDigits(value);
  if (digits.length !== 11 || isAllSameDigit(digits)) return false;

  const d1 = checkDigit(digits, [10, 9, 8, 7, 6, 5, 4, 3, 2]);
  const d2 = checkDigit(digits, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);
  return d1 === Number(digits[9]) && d2 === Number(digits[10]);
}

export function isValidCNPJ(value: string): boolean {
  const digits = onlyDigits(value);
  if (digits.length !== 14 || isAllSameDigit(digits)) return false;

  const d1 = checkDigit(digits, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const d2 = checkDigit(digits, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  return d1 === Number(digits[12]) && d2 === Number(digits[13]);
}

export function isValidCpfCnpj(value: string): boolean {
  const digits = onlyDigits(value);
  if (digits.length === 11) return isValidCPF(digits);
  if (digits.length === 14) return isValidCNPJ(digits);
  return false;
}

export function isValidBrPhone(value: string): boolean {
  const digits = onlyDigits(value);
  return digits.length === 10 || digits.length === 11;
}
