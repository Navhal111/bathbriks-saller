import { routes } from "@/config/routes";
import {
  PiShoppingCartDuotone,
  PiHeadsetDuotone,
  PiPackageDuotone,
  PiChartBarDuotone,
  PiCreditCardDuotone,
  PiFolderLockDuotone,
  PiCalendarPlusDuotone,
  PiCurrencyCircleDollarDuotone,
  PiBriefcaseDuotone,
  PiFolder,
  PiShapesDuotone,
  PiNewspaperClippingDuotone,
} from "react-icons/pi";

type MenuItem = {
  name: string;
  href?: string;
  icon?: React.ReactElement;
  badge?: string;
  dropdownItems?: {
    name: string;
    href: string;
  }[];
};

export const menuItems: MenuItem[] = [
  // label start
  {
    name: "Overview",
  },
  {
    name: "Dashboard",
    href: "/",
    icon: <PiFolder />,
  },
  {
    name: "Product Management",
    href: "#",
    icon: <PiShoppingCartDuotone />,
    dropdownItems: [
      {
        name: "Product List",
        href: "/products",
      },
      {
        name: "New Product",
        href: "/products/new",
      },
    ],
  },
  // {
  //   name: "Reports",
  //   href: "/reports",
  //   icon: <PiPackageDuotone />,
  //   dropdownItems: [
  //     { name: "Daily Report", href: "/reports/daily" },
  //     { name: "Monthly Report", href: "/reports/monthly" },
  //   ],
  // },
];
