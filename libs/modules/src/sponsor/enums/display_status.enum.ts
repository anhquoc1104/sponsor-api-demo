export enum DisplayStatus {
  DRAFT = 'DRAFT', // nháp
  PENDING = 'PENDING', // chờ duyệt
  APPROVED = 'APPROVED', // đã duyệt
  LISTED = 'LISTED', // đã đăng
  LEAVING = 'LEAVING', // sắp hết hạn
  EXPIRED = 'EXPIRED', // đã hết hạn
  REFUSE = 'REFUSE', // từ chối
  HIDEN = 'HIDEN', // ẩn
}

export function isTransitionValid(
  currentStatus: any,
  newStatus: DisplayStatus,
): boolean {
  const validTransitions = {
    [DisplayStatus.PENDING]: [
      DisplayStatus.REFUSE,
      DisplayStatus.APPROVED,
      DisplayStatus.LISTED,
    ],
    [DisplayStatus.REFUSE]: [
      DisplayStatus.PENDING,
      DisplayStatus.APPROVED,
      DisplayStatus.LISTED,
    ],
    [DisplayStatus.APPROVED]: [DisplayStatus.LISTED, DisplayStatus.REFUSE],
    [DisplayStatus.LISTED]: [DisplayStatus.HIDEN],
    [DisplayStatus.LEAVING]: [DisplayStatus.HIDEN],
    [DisplayStatus.EXPIRED]: [DisplayStatus.HIDEN],
    [DisplayStatus.HIDEN]: [DisplayStatus.LISTED],
  };

  return validTransitions[currentStatus]?.includes(newStatus) ?? false;
}
