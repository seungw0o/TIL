import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About-us ",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      &copy;Next Js is Great!
    </div>
  );
}
