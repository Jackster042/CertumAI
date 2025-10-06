import CertumAILandingPage from "@/components/CertumAILandingPage";

export default function DemoLandingPage() {
  // Toggle this boolean to test different states
  const isUserLoggedIn = true;

  return <CertumAILandingPage user={isUserLoggedIn} />;
}
