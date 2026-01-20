import axios from "axios";
import BirthMain from "@/components/bgPrint/BirthMain";
import ScrollFix from "@/components/Dashboard/utils/ScrollFix";

async function getBirthData(id: string) {
  const baseURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const res = await axios.get(`${baseURL}/api/worker/birth/fetchById`, {
    params: { id },
  });

  return res.data;
}


export default async function Component({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const response = await getBirthData(slug);
  const birthData = response.data;

  console.log(birthData);

  return (
    <main>
      <p>hey {slug}</p>

      {/* Uncomment when ready */}
      
      <ScrollFix>
        <BirthMain data={birthData} />
      </ScrollFix>
     
    </main>
  );
}