import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About-us ",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      &copy;Next Js is Great!
    </div>
  );
};

export default Layout;
