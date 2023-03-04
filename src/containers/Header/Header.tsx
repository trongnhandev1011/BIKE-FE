import { HeaderComponent } from "@components/Header";
import useAuth from "@hooks/useAuth";
import { Button, MenuProps } from "antd";
import { useRouter } from "next/router";

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

function Header() {
  const route = useRouter();
  const { logout, isAuthUser } = useAuth();

  return (
    <>
      <HeaderComponent
        button={
          isAuthUser ? (
            <Button onClick={() => logout()}>Logout</Button>
          ) : (
            <Button onClick={() => route.push("/")}>Login</Button>
          )
        }
        navElements={items1}
      />
    </>
  );
}

export default Header;
