import React from "react";
import { UserType } from "../store/slices/authSlice";
import type { RootState } from "../store";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Breadcrumb } from "antd";
import { CompanyStatus } from "../store/slices/companyListSlice";
import { Header } from "./Header";

const MENU_ITEMS = [
  {
    type: UserType.ADMIN,
    label: "Dashboard",
    onClick: () => {},
    route: "/admin/dashboard",
    icon: <MdDashboard size={20} />,
  },
  {
    type: UserType.COMPANY,
    label: "Dashboard",
    onClick: () => {},
    route: "/company/dashboard",
    icon: <MdDashboard size={20} />,
  },
  {
    type: UserType.TECHINICIAN,
    label: "Dashboard",
    onClick: () => {},
    route: "/technician/dashboard",
    icon: <MdDashboard size={20} />,
  },
  {
    type: UserType.COMPANY,
    label: "Profile",
    onClick: () => {},
    route: "/company/profile",
    icon: <FaUser size={20} />,
  },
  {
    type: UserType.TECHINICIAN,
    label: "Profile",
    onClick: () => {},
    route: "/technician/profile",
    icon: <FaUser size={20} />,
  },
];

export const AuthenticatedLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const companies = useSelector(
    (state: RootState) => state.companyList.companies
  );
  const technicians = useSelector(
    (state: RootState) => state.technician.technicians
  );
  const entityStatus =
    user?.type === UserType.COMPANY
      ? companies.find((c) => c.email === user.email)?.status
      : technicians.find((t) => t.username === user?.username)?.status;

  const sidebarItems = MENU_ITEMS.filter((m) => user?.type === m.type);
  const location = useLocation();
  const navigate = useNavigate();

  const breadCrumbs = sidebarItems
    .flatMap((s) => {
      const selected = location.pathname.includes(s.route);
      if (selected) {
        return s.route.split("/").slice(1);
      }
    })
    .filter(Boolean);

  return (
    <div className="flex flex-col h-screen">
      <div className="h-[60px] flex-shrink-0">
        <Header />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-60 bg-white flex flex-col px-2 pt-6">
          {sidebarItems.map((item) => {
            const selected = location.pathname.includes(item.route);
            if (
              item.route.includes("dashboard") &&
              user?.type !== UserType.ADMIN &&
              entityStatus !== CompanyStatus.APPROVED
            ) {
              return null;
            }
            return (
              <div
                key={item.label}
                onClick={() => navigate(item.route)}
                className={clsx(
                  "flex w-full p-3 px-5 items-center cursor-pointer rounded-sm",
                  selected && "bg-[#5D87FF]"
                )}
                style={{ color: selected ? "white" : "black" }}
              >
                <span className="mr-2">{item.icon}</span> {item.label}
              </div>
            );
          })}
        </div>

        <div className="flex-1 bg-gray-100 p-5 overflow-y-auto">
          <Breadcrumb
            items={breadCrumbs.map((b) => ({
              title: b,
            }))}
            className="capitalize"
            style={{ fontSize: 16, marginBottom: 12 }}
          />
          {children}
        </div>
      </div>
    </div>
  );
};
