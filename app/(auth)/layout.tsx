import { FC } from "react";

interface layoutProps {
  children: React.ReactNode;
}

const AuthLayout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
