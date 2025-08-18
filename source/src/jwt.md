## jwt.sign là gì? ##
->  Đây là hàm dùng để tạo ra 1 chuỗi JWT token từ payload + secret key.
-> cấu trúc: const token = jwt.sign(payload, secretKey, options);
Giải thích:
payload: dữ liệu mà bạn muốn "bỏ" vào trong token (ví dụ user id, email, role,...)
secretKey: khóa bí mật dùng để "ký" token (mã hóa token để bảo mật)
options: cấu hình thêm như expiresIn: '1h', issuer,...
