import ProfitSparkline from "../utils/Chart";

interface DelsBoxProps {
  stroke: string;
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const DelsBox = ({  stroke, icon, label, value }: DelsBoxProps) => {
  return (
    <div className="DelsBox flex items-center   gap-4 border py-2 px-3 bg-gray-900/50 rounded-2xl shadow-lg border-gray-800/90">
                <div className="first-row bg-gray-900 p-4 rounded-full shadow " >
                   {icon} 
                </div>
                <div className="second-row" > 
                    <h1 className="text-text-secondary text-lg" > {label} </h1>
                    <h1 className="text-2xl font-bold" > {value} </h1>
                </div>
                {/* <div className="third-row    w-32 h-20" >
                  <ProfitSparkline data={data} stroke={stroke} /> 
                </div> */}
    </div>
  )
}

export default DelsBox