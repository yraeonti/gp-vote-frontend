import Header from "@/components/dashboard/header";
import Wrapper from "@/components/dashboard/wrapper";
import AppContext from "@/context/app-context";
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppContext>
      <Wrapper>
        <Header />
        {children}
      </Wrapper>
    </AppContext>
  );
}
