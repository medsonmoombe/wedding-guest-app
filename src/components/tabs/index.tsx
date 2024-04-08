import { Tabs, TabList, Tab, IconButton, Flex } from "@chakra-ui/react";
import { FaUsers } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import menu from '../../assets/images/menuIcon.jpg';
import timeline from '../../assets/images/timeline.png';

interface Props {
    activeTabIndex: number;
    setActiveTabIndex: (value: number) => void;
}

const FooterTabs = ({activeTabIndex, setActiveTabIndex }: Props ) => {

    return (
    <Flex justify="center" width="full">
    <Tabs variant='soft-rounded' size={'sm'} bg="transparent" width={'full'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} 
    index={activeTabIndex} onChange={index => setActiveTabIndex(index)}
    >
        <TabList
         display={'flex'}
          justifyContent={'center'}
          bg="rgba(243, 246, 241, 0.73)" 
        //   opacity={0.5}
           py={1} 
           style={{ width: '100%'}}
            px={4} 
            alignItems={'center'}
            // opacity="0.5"
            pb={2}
            // pt={1}
            backdropFilter="blur(2px)"
            >
            <Tab bg={'none'}>
                <IconButton
                    aria-label="Search database"
                    color={'gray.500'}
                    icon={<FaUsers size={30} />}
                    width={'40px'}
                    height={'40px'}
                    variant={'none'}
                    size="md"
                />
            </Tab>  
            <Tab bg={'none'}>
                <IconButton
                    aria-label="Search database"
                    icon={<CiLocationOn size={30}/>}
                    width={'40px'}
                    height={'40px'}
                    variant={'none'}
                    size="md"
                />
            </Tab>
            <Tab bg={'none'}>
                <>
                    <IconButton
                        aria-label="Search database"
                        icon={<img src={menu} alt="menu"  width={'25px'} height={'25px'}/>}
                
                        variant={'none'}
                        width={'40px'}
                        height={'40px'}
                        size="md"
                    />
    
                </>
            </Tab>
            <Tab>
                <IconButton
                    aria-label="Search database"
                    icon={<img src={timeline} alt="menu"  width={'65px'} height={'75px'}/>}
            
                    variant={'none'}
                    width={'40px'}
                    height={'40px'}
                    size="md"
                />
            </Tab>
        </TabList>
        </Tabs>
        </Flex>
    );
};

export default FooterTabs;