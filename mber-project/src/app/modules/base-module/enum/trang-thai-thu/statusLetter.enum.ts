export enum StatusLetterFrom {
  NEW = 1, // mơi
  WRITING, // đang soạn
  RETURN, // trả lại
  PENDING, // chờ xử lý
  SENT = 5, // đã gửi
  VERIFIED = 6, // đã nhận
}

export enum StatusLetterTo {
  NEW = 1, // mơi
  NOT_RECEIVED, // chưa nhận
  RECEIVED, // đã nhận
}

