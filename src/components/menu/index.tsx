import React, { useState } from 'react';
// import menuList from '../../assets/svg/menu-compressed.svg';
// import svg from '../../assets/svg/pt-compressed.svg';
import { Box} from '@chakra-ui/react';
import ToggleBox from '../planning/Toggle';
import MenuItems from './MenuItem';
import EnglishMenu from './English';


const menuItems = [
  {
      "ID": "001",
      "Description": "Menu",
      "Font": "Stalemate"
  },
  {
      "ID": "002",
      "Description": "Entradas",
      "Font": "Marcellus SC"
  },
  {
      "ID": "003",
      "Description": "Chamussas, Rissois, Coxinhas, almofadinhas de frango",
      "Font": "Bilbo"
  },
  {
      "ID": "004",
      "Description": "Buffet",
      "Font": "Marcellus SC"
  },
  {
      "ID": "005",
      "Description": "Saladas",
      "Font": "Marcellus"
  },
  {
      "ID": "006",
      "Description": "Salada de beringela, Salada de beterraba, Salada de maionese, Salada mista, Salada de lascas de frango, Salada grega",
      "Font": "Bilbo"
  },
  {
      "ID": "007",
      "Description": "Quentes",
      "Font": "Marcellus"
  },
  {
      "ID": "008",
      "Description": "Peixe no forno, Frango grelhado, Caldeirada de Cabrito, Caril de vaca e indiana, Feijoada a dona Chinha, Bacalhau a gomes de Sa, Briyani de frango, Mini Rodizio",
      "Font": "Bilbo"
  },
  {
      "ID": "009",
      "Description": "Pratos Tradicionais",
      "Font": "Marcellus"
  },
  {
      "ID": "010",
      "Description": "Matapa con caraguejo, Matapa sem nada, Mbao selteada",
      "Font": "Bilbo"
  },
  {
      "ID": "011",
      "Description": "Guarnicoes",
      "Font": "Marcellus"
  },
  {
      "ID": "012",
      "Description": "Arroz branco, Arroz com legumes, Batata Frita, Xima",
      "Font": "Bilbo"
  },
  {
      "ID": "013",
      "Description": "Sobremesas",
      "Font": "Marcellus SC"
  },
  {
      "ID": "014",
      "Description": "Bolos diversos, Buffet completo, Loica completo",
      "Font": "Bilbo"
  }
];

const englishMenuItems = [
  {
      "ID": "001",
      "Description": "Menu",
      "Font": "Stalemate"
  },
  {
      "ID": "002",
      "Description": "Starters",
      "Font": "Marcellus SC"
  },
  {
      "ID": "003",
      "Description": "Samosas, Rissoles, Chicken Coxinha, Chicken Pillows",
      "Font": "Bilbo"
  },
  {
      "ID": "004",
      "Description": "Buffet",
      "Font": "Marcellus SC"
  },
  {
      "ID": "005",
      "Description": "Salads",
      "Font": "Marcellus"
  },
  {
      "ID": "006",
      "Description": "Eggplant Salad, Beetroot Salad, Potato Salad, Mixed Salad, Chicken Flake Salad, Greek Salad",
      "Font": "Bilbo"
  },
  {
      "ID": "007",
      "Description": "Hot Dishes",
      "Font": "Marcellus"
  },
  {
      "ID": "008",
      "Description": "Baked Fish, Grilled Chicken, Goat Stew, Indian Beef Curry, Dona Chinha's Feijoada, Bacalhau a Gomes de Sa (Portuguese Codfish Dish), Chicken Biryani, Mini Rodizio",
      "Font": "Bilbo"
  },
  {
      "ID": "009",
      "Description": "Traditional Dishes",
      "Font": "Marcellus"
  },
  {
      "ID": "010",
      "Description": "Matapa con caraguejo, Matapa sem nada, Mbao selteada",
      "Font": "Bilbo"
  },
  {
      "ID": "011",
      "Description": "Side Dishes",
      "Font": "Marcellus"
  },
  {
      "ID": "012",
      "Description": "White Rice, Rice with Vegetables, French Fries, Xima (Maize Porridge)",
      "Font": "Bilbo"
  },
  {
      "ID": "013",
      "Description": "Desserts",
      "Font": "Marcellus SC"
  },
  {
      "ID": "014",
      "Description": "Various Cakes, Complete Dessert Buffet, Complete Fruit Platter",
      "Font": "Bilbo"
  }
];

const MenuList: React.FC = () => {
  // const [imageLoaded, setImageLoaded] = useState(false);
  const [isPortugal, setIsPortugal] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // const handleImageLoad = () => {
  //   setImageLoaded(true);
  //   setIsLoading(false); // Set loading to false when image is loaded
  // };

  const toggleLanguage = () => {
    // setIsLoading(true); // Set loading to true when language is toggled
    // setImageLoaded(false); // Reset imageLoaded state
    setIsPortugal((prevIsPortugal: boolean) => !prevIsPortugal);
  };

  return (
    <Box width={'full'} pos={'relative'}>
       <Box
        display={'flex'}
        justifyContent={'flex-end'}
        width={'100%'}
        pr={5}
        position={'absolute'}
        top={10}
      >
        <ToggleBox setIsPortugal={toggleLanguage} isPortugal={isPortugal} />
      </Box>
      {/* {isLoading && (
        <Box position="fixed" top="100" left="50%" transform="translate(-50%, -50%)">
          <Spinner size="lg" />
        </Box>
      )} */}

    {isPortugal ? (
      <Box>
        <EnglishMenu menuItems={englishMenuItems} />
        </Box>
      ) : (
       <Box>
        <MenuItems menuItems={menuItems} />
       </Box>
      )}
      {/* <Image src={menuList} alt="Menu" width={'100%'} onLoad={handleImageLoad} style={{ display: imageLoaded ? 'block' : 'none' }} /> */}
    </Box>
  );
};

export default MenuList;
