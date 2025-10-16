import { routes } from "@/config/routes";
import {
  PiShoppingCartDuotone,
  PiFolder,
  PiAcorn,
  PiWallet,
  PiGlobe,
  PiSupersetOf,
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
    href: "/dashboard",
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
  {
    name: "Category Management",
    href: "#",
    icon: <PiFolder />,
    dropdownItems: [
      {
        name: "Category",
        href: "/categories",
      },
      {
        name: "Sub Category",
        href: "/sub-categories",
      },
    ],
  },
  {
    name: "Brand",
    href: "/brand",
    icon: <PiGlobe />,
  },
  {
    name: "Orders modules",
    href: "#",
    icon: <PiAcorn />,
    dropdownItems: [
      {
        name: "Live Orders",
        href: "/live-orders",
      },
      {
        name: "Cancelled Orders",
        href: "/cancelled-orders",
      },
      {
        name: "Delivered Orders",
        href: "/delivered-orders",
      },
      {
        name: "Order Reports",
        href: "/order-reports",
      },
    ],
  },
  {
    name: "Payments",
    href: "#",
    icon: <PiWallet />,
    dropdownItems: [
      {
        name: "Transaction",
        href: "/transaction",
      },
      {
        name: "wallet",
        href: "/wallet",
      },
    ],
  },
  {
    name: "Support",
    href: "/support",
    icon: <PiSupersetOf />,
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
