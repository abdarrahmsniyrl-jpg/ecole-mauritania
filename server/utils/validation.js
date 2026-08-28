// التحقق من رقم الهاتف الموريتاني (8 أرقام)
export const validateMauritanianPhone = (phone) => {
  const phoneRegex = /^\d{8}$/;
  return phoneRegex.test(phone.toString());
};

// التحقق من كلمة المرور (6 أرقام)
export const validatePassword = (password) => {
  const passwordRegex = /^\d{6}$/;
  return passwordRegex.test(password);
};

// تنسيق رقم الهاتف
export const formatPhone = (phone) => {
  return phone.toString().padStart(8, '0');
};

// التحقق من البيانات المدخلة
export const validateLoginInput = (phone, password) => {
  const errors = {};
  
  if (!phone) {
    errors.phone = 'رقم الهاتف مطلوب';
  } else if (!validateMauritanianPhone(phone)) {
    errors.phone = 'رقم الهاتف يجب أن يكون 8 أرقام';
  }
  
  if (!password) {
    errors.password = 'كلمة المرور مطلوبة';
  } else if (!validatePassword(password)) {
    errors.password = 'كلمة المرور يجب أن تكون 6 أرقام';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
