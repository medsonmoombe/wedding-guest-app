import { Box, Image } from "@chakra-ui/react";
import portugalFlag from "../../assets/images/portug_flag.png";
import ukFlag from "../../assets/images/flag_Uk.png";

interface ToggleBoxProps {
    isPortugal: boolean;
    setIsPortugal: (isPortugal: any) => void;
}

const ToggleBox = ({isPortugal, setIsPortugal }: ToggleBoxProps  ) => {
 

  const handleClick = () => {
    setIsPortugal((prevIsPortugal: boolean) => !prevIsPortugal);
  };

  return (
    <Box
      width="90px"
      height="15px"
      bg="transparent"
      display="flex"
      alignItems="center"
      gap={2}
      justifyContent="center"
      cursor="pointer"
      // style={{boxShadow: '2px 2px 2px 2px'}}
      onClick={handleClick}
    >
        <Image src={portugalFlag} alt="Portugal Flag" width="50%" height="20px" bg={'transparent'} style={{boxShadow: !isPortugal ? '2px 2px 2px 2px': ''}} />
        <Image src={ukFlag} alt="UK Flag" width="50%" height="20px" bg={'transparent'} style={{boxShadow: isPortugal ? '2px 2px 2px 2px': ''}}/>
    </Box>
  );
};

export default ToggleBox;
