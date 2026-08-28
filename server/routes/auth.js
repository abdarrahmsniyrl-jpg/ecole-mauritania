import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { validateLoginInput, formatPhone } from '../utils/validation.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Mock Users Database (سيتم استبداله بـ MongoDB)
const users = [
  {
    id: '1',
    phone: '22222222',
    password: '123456', // 6 digits
    name: 'مدير النظام',
    role: 'platform_owner',
    school: null
  }
];

// تسجيل الدخول
router.post('/login', asyncHandler(async (req, res) => {
  const { phone, password } = req.body;
  
  // التحقق من صحة المدخلات
  const validation = validateLoginInput(phone, password);
  
  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      message: 'بيانات غير صحيحة',
      errors: validation.errors
    });
  }
  
  // البحث عن المستخدم
  const formattedPhone = formatPhone(phone);
  const user = users.find(u => u.phone === formattedPhone && u.password === password);
  
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'رقم الهاتف أو كلمة المرور غير صحيحة'
    });
  }
  
  // إنشاء JWT Token
  const token = jwt.sign(
    {
      id: user.id,
      phone: user.phone,
      name: user.name,
      role: user.role,
      school: user.school
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
  
  res.json({
    success: true,
    message: 'تم تسجيل الدخول بنجاح',
    data: {
      token,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        role: user.role,
        school: user.school
      }
    }
  });
}));

// التحقق من التوكن
router.get('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'لا يوجد توكن'
    });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({
      success: true,
      message: 'التوكن صحيح',
      data: decoded
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'التوكن غير صحيح'
    });
  }
});

export default router;
