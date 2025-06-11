import {
  ProductOutlined,
  SettingOutlined,
  LineChartOutlined,
  UsergroupAddOutlined,
  ArrowUpOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useMemo } from "react";

export const StatsCard = () => {
  const companiesCount = useSelector(
    (state: RootState) => state.companyList.companies
  ).length;
  const techniciansCount = useSelector(
    (state: RootState) => state.technician.technicians
  ).length;
  const unVerifiedCompaniesCount = useSelector(
    (state: RootState) => state.companyList.companies
  ).filter((c) => !c.isVerified).length;
  const unVerifiedTechniciansCount = useSelector(
    (state: RootState) => state.technician.technicians
  ).filter((c) => !c.isVerified).length;
  const jobPostingsCount = useSelector(
    (state: RootState) => state.job.jobs
  ).length;

  const statCards = useMemo(() => {
    return [
      {
        title: "Companies",
        value: companiesCount,
        icon: <ProductOutlined className="text-white text-2xl" />,
        color: "bg-purple-600",
        info: "3% than last month",
        infoColor: "text-green-500",
        bottomLabel: "",
      },
      {
        title: "Technicians",
        value: techniciansCount,
        icon: <SettingOutlined className="text-white text-2xl" />,
        color: "bg-blue-600",
        info: "100% than last week",
        infoColor: "text-green-500",
        bottomLabel: "",
      },
      {
        title: "Job postings",
        value: jobPostingsCount,
        icon: <LineChartOutlined className="text-white text-2xl" />,
        color: "bg-green-600",
        info: "",
        infoColor: "",
        bottomLabel: "View",
      },
      {
        title: "Unverified accounts",
        value: unVerifiedCompaniesCount + unVerifiedTechniciansCount,
        icon: <UsergroupAddOutlined className="text-white text-2xl" />,
        color: "bg-orange-600",
        info: "",
        infoColor: "",
        bottomLabel: "View",
      },
    ];
  }, [
    companiesCount,
    jobPostingsCount,
    techniciansCount,
    unVerifiedCompaniesCount,
    unVerifiedTechniciansCount,
  ]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
        >
          <div className={`p-4 ${card.color} text-white`}>
            <div className="flex justify-between items-start">
              {card.icon}
              <div className="text-right">
                <p className="text-sm font-semibold">{card.title}</p>
                <p className="text-2xl font-bold">{card.value}</p>
              </div>
            </div>
          </div>
          <div className="bg-white px-4 py-3 text-sm flex justify-between items-center">
            {card.info ? (
              <span className={`flex items-center ${card.infoColor}`}>
                <ArrowUpOutlined className="mr-1 text-base" />
                {card.info}
              </span>
            ) : (
              <span className="text-gray-600 flex items-center gap-1 font-medium">
                <SendOutlined />
                {card.bottomLabel}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
