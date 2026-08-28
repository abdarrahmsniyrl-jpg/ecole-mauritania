# API Endpoints - مدرسة موريتانيا للإلكترونية

## Authentication (المصادقة)

### تسجيل الدخول
```
POST /api/auth/login

Body:
{
  "phone": "22222222",
  "password": "123456"
}

Response:
{
  "success": true,
  "message": "تم تسجيل الدخول بنجاح",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "1",
      "name": "مدير النظام",
      "phone": "22222222",
      "role": "platform_owner"
    }
  }
}
```

### التحقق من التوكن
```
GET /api/auth/verify

Headers:
{
  "Authorization": "Bearer <token>"
}

Response:
{
  "success": true,
  "message": "التوكن صحيح",
  "data": {
    "id": "1",
    "phone": "22222222",
    "role": "platform_owner"
  }
}
```

## الأدوار (Roles)

- `platform_owner` - صاحب المنصة
- `administrator` - مدير المدرسة
- `teacher` - الأستاذ
- `student` - التلميذ
- `parent` - ولي الأمر

## معايير الأمان

✅ كل طلب يجب أن يحتوي على Authorization Header
✅ التحقق من الدور والصلاحيات
✅ حماية البيانات الشخصية
✅ تسجيل العمليات المهمة

## الرموز (Status Codes)

- `200` - نجح
- `400` - بيانات غير صحيحة
- `401` - غير مصرح (Unauthorized)
- `403` - ممنوع الوصول (Forbidden)
- `404` - غير موجود
- `500` - خطأ في الخادم
