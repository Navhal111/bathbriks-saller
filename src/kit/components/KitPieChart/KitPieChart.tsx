import { Label, Pie, PieChart, ResponsiveContainer } from "recharts";

interface Props {
  audienceCount: number;
}

const KitPieChart = ({ audienceCount }: Props) => {
  return (
    <div className="h-[373px] w-full @sm:py-3">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={[{ name: "Total", value: 100 }]}
            dataKey="value"
            innerRadius={90}
            outerRadius={140}
            fill="#0070F3"
            stroke="rgba(0,0,0,0)"
          >
            <Label
              position="center"
              content={() => (
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xl fill-gray-800 dark:fill-white"
                >
                  {audienceCount} items
                </text>
              )}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default KitPieChart;
