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
      width="100px"
      height="100px"
      bg="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      onClick={handleClick}
    >
      {isPortugal ? (
        <Image src={portugalFlag} alt="Portugal Flag" width="100%" height="auto" />
      ) : (
        <Image src={ukFlag} alt="UK Flag" width="100%" height="auto" />
      )}
    </Box>
  );
};

export default ToggleBox;
