


import Dash from "@/layout/Dash";


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Dash>
      <main className="">{children}</main>
    </Dash>
  );
}
