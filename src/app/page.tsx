import Image from "next/image";
import AdminTable from "./components/admintable";

export default function Home() {
  return (
    <div>
      <AdminTable data={[]} />
    </div>
  );
}
