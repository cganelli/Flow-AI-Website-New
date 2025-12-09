/**
 * Security utility functions for sanitizing user input
 * Prevents XSS attacks by escaping HTML entities
 */

/**
 * Escapes HTML entities to prevent XSS attacks
 * @param text - The text to escape
 * @returns Escaped text safe for HTML insertion
 */
export function escapeHtml(text: string | undefined | null): string {
  if (!text) return '';
  
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Validates email format
 * @param email - Email address to validate
 * @returns true if email format is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates phone number format (basic validation)
 * @param phone - Phone number to validate
 * @returns true if phone format is reasonable
 */
export function isValidPhone(phone: string): boolean {
  // Allow digits, spaces, dashes, parentheses, and + for international
  const phoneRegex = /^[\d\s\-\(\)\+]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

/**
 * Input length limits for form fields
 */
export const MAX_LENGTHS = {
  name: 100,
  email: 254, // RFC 5321 limit
  company: 200,
  phone: 20,
  subject: 200,
  message: 5000,
  inquiryType: 50,
} as const;

/**
 * Validates input length
 * @param field - Field name
 * @param value - Value to validate
 * @returns true if within limits
 */
export function isValidLength(field: keyof typeof MAX_LENGTHS, value: string): boolean {
  const maxLength = MAX_LENGTHS[field];
  return value.length <= maxLength;
}

/**
 * Sanitizes and validates contact form data
 * @param data - Form data to sanitize
 * @returns Sanitized data and validation errors
 */
export function sanitizeContactForm(data: {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  subject?: string;
  message?: string;
  inquiryType?: string;
}): {
  sanitized: {
    name: string;
    email: string;
    company: string;
    phone: string;
    subject: string;
    message: string;
    inquiryType: string;
  };
  errors: string[];
} {
  const errors: string[] = [];
  const sanitized = {
    name: (data.name || '').trim(),
    email: (data.email || '').trim().toLowerCase(),
    company: (data.company || '').trim(),
    phone: (data.phone || '').trim(),
    subject: (data.subject || '').trim(),
    message: (data.message || '').trim(),
    inquiryType: (data.inquiryType || 'general').trim(),
  };

  // Validate required fields
  if (!sanitized.name) {
    errors.push('Name is required');
  } else if (!isValidLength('name', sanitized.name)) {
    errors.push(`Name must be ${MAX_LENGTHS.name} characters or less`);
  }

  if (!sanitized.email) {
    errors.push('Email is required');
  } else if (!isValidEmail(sanitized.email)) {
    errors.push('Invalid email format');
  } else if (!isValidLength('email', sanitized.email)) {
    errors.push(`Email must be ${MAX_LENGTHS.email} characters or less`);
  }

  // Validate optional fields
  if (sanitized.company && !isValidLength('company', sanitized.company)) {
    errors.push(`Company must be ${MAX_LENGTHS.company} characters or less`);
  }

  if (sanitized.phone && !isValidPhone(sanitized.phone)) {
    errors.push('Invalid phone number format');
  } else if (sanitized.phone && !isValidLength('phone', sanitized.phone)) {
    errors.push(`Phone must be ${MAX_LENGTHS.phone} characters or less`);
  }

  if (sanitized.subject && !isValidLength('subject', sanitized.subject)) {
    errors.push(`Subject must be ${MAX_LENGTHS.subject} characters or less`);
  }

  if (sanitized.message && !isValidLength('message', sanitized.message)) {
    errors.push(`Message must be ${MAX_LENGTHS.message} characters or less`);
  }

  if (sanitized.inquiryType && !isValidLength('inquiryType', sanitized.inquiryType)) {
    errors.push(`Inquiry type must be ${MAX_LENGTHS.inquiryType} characters or less`);
  }

  return { sanitized, errors };
}

