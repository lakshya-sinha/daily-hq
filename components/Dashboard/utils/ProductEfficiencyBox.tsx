import ProductEfficiencyChart from "../utils/ProductEfficiencyChart";

interface ProductEfficiencyBoxProps {
  title: string;
  data: {
    name: string;
    efficiency: number;
  }[];
}

const ProductEfficiencyBox = ({ title, data }: ProductEfficiencyBoxProps) => {
  return (
    <div className="
      bg-gray-900/50
      border border-gray-800/90
      rounded-xl
      p-4
      shadow-lg
    ">
      <h2 className="text-text-secondary mb-4">{title}</h2>

      <div className="">
        <ProductEfficiencyChart data={data} />
      </div>

    </div>
  );
};

export default ProductEfficiencyBox;
