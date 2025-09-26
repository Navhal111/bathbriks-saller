export const shippingStatuses = {
  Draft: "draft",
  Published: "published",
  Pending: "pending",
  Delivered: "Delivered",
  DeliveryFailed: "Delivery Failed",
};

export function getStatusColors(status: string) {
  if (shippingStatuses.Draft === status) {
    return "success";
  }
  if (shippingStatuses.Published === status) {
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
