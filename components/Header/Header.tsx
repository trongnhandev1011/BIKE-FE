interface IHeaderProps {
  placement?: any;
  name: string;
  subName: string;
  onPress: Function;
}

function Header({ placement, name, subName, onPress }: IHeaderProps) {
  return (
    <>
      <h1>Sidenav</h1>
    </>
  );
}

export default Header;
