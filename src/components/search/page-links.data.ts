import { routes } from "@/config/routes";
import { DUMMY_ID } from "@/config/constants";

// Note: do not add href in the label object, it is rendering as label
export const pageLinks = [
  // label start
  {
    name: "Home",
  },
  // label end
  {
    name: "Profile Settings",
    href: routes.profileSettings.dashboard,
  },
];
