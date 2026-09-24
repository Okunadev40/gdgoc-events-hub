import { useParams } from "react-router-dom";

export default function EventDetailPage() {
  const { id } = useParams();
  return <p>Event detail for #{id}</p>;
}