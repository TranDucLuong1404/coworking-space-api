export class CreateBookingDto {
    venueId: string; // ID của địa điểm/bàn
    date: string; // Ngày đặt (YYYY-MM-DD)
    time: string; // Giờ đặt (HH:MM)
    userId?: string; // ID của user (có thể lấy từ JWT, không bắt buộc trong DTO)
  }