export default {
  refreshEndpoint: `${process.env.NEXT_PUBLIC_BASE_API}/v1/auth/token/refresh`,
  registerEndpoint: "/jwt/register",
  storageTokenKeyName: "opsifi_token",
  storageGalleryTokenKeyName: "galleryAccessToken",
  storageGalleryIdKeyName: "galleryId",
  onTokenExpiration: "refreshToken", // logout | refreshToken
  storageRefreshKeyName: "refreshToken", // logout | refreshToken
  storageUserDetailName: "opsifi_user_data",
  storageCompanyDetailName: "userCompany",
  storageUserIDName: "userId",
};
