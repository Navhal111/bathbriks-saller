export const shippingStatuses = {
  Draft: "draft",
  Published: "published",
  Pending: "pending",
  Approved: "approved",
  Rejected: "rejected",
  Delivered: "Delivered",
  DeliveryFailed: "Delivery Failed",
  Started: "started",
  Resolved: "resolved",
  Cancelled: "cancelled"
};

export function getStatusColors(status: string) {
  if (shippingStatuses.Approved === status) {
    return "success";
  }
  if (shippingStatuses.Resolved === status) {
    return "success";
  }
  if (shippingStatuses.Started === status) {
    return "secondary";
  }
  if (shippingStatuses.Published === status) {
    return "secondary";
  }
  if (shippingStatuses.Cancelled === status) {
    return "secondary";
  }
  if (shippingStatuses.Pending === status || shippingStatuses.Draft === status) {
    return "info";
  }
  if (shippingStatuses.Delivered === status) {
    return "success";
  }
  if (shippingStatuses.DeliveryFailed === status || shippingStatuses.Rejected === status) {
    return "danger";
  }
}
