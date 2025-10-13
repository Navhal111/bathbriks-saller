export const shippingStatuses = {
  Draft: "draft",
  Published: "published",
  Pending: "pending",
  Delivered: "Delivered",
  DeliveryFailed: "Delivery Failed",
  Started: "started",
  Resolved: "resolved",
  Cancelled: "cancelled"
};

export function getStatusColors(status: string) {
  if (shippingStatuses.Draft === status) {
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
  if (shippingStatuses.Pending === status) {
    return "info";
  }
  if (shippingStatuses.Delivered === status) {
    return "success";
  }
  if (shippingStatuses.DeliveryFailed === status) {
    return "danger";
  }
}
