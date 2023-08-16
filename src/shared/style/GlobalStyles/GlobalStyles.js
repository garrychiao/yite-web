import MainStyles from './MainStyles';
import MenuStyles from './MenuStyles';
// import InputStyles from './InputStyles';
// import ModalStyles from './ModalStyles';
// import RadioStyles from './RadioStyles';
// import ScrollbarStyles from './ScrollbarStyles';
// import SelectStyles from './SelectStyles';
import TableStyles from './TableStyles';
// import TabsStyles from './TabsStyles';

export default function GlobalStyles() {
  return (
    <>
      <MainStyles />
      {/* others */}
      {/* antd styles */}
      <MenuStyles />
      <TableStyles /> 
      {/* <ModalStyles />
      <InputStyles />
      <SelectStyles />
      <RadioStyles />
      <ButtonStyles />
      <TabsStyles />
      
      */}
    </>
  );
}
