import { useParams } from "react-router-dom";
import { PartnerLoginPage } from "@/components/partners/PartnerLoginPage";

const DynamicPartnerLogin = () => {
  const { partnerSlug } = useParams();
  return <PartnerLoginPage partnerSlug={partnerSlug || ""} />;
};

export default DynamicPartnerLogin;
