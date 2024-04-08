import { Tabs, TabList, Tab, IconButton, Divider, Flex } from "@chakra-ui/react";
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
    <Flex justify="center" width="full" position={'fixed'} mb={20}>
    <Tabs variant='soft-rounded' size={'sm'} bg="transparent" width={'full'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} 
    index={activeTabIndex} onChange={index => setActiveTabIndex(index)}
    >

    <Divider my={2} borderWidth={'1px'} borderColor={'gray.200'}/>
        <TabList
         display={'flex'}
          justifyContent={'center'}
           bg={'gray.100'} 
           py={1} 
           style={{ width: '100%'}}
            px={4} 
            alignItems={'center'}
            // opacity="0.5"
            backdropFilter="blur(2px)"
            >
            <Tab bg={'none'}>
                <IconButton
                    aria-label="Search database"
                    color={'gray.500'}
                    icon={<FaUsers size={25} />}
                    width={'30px'}
                    height={'30px'}
                    variant={'none'}
                    size="md"
                />
            </Tab>  
            <Tab bg={'none'}>
                <IconButton
                    aria-label="Search database"
                    icon={<CiLocationOn size={25}/>}
                    width={'30px'}
                    height={'30px'}
                    variant={'none'}
                    size="md"
                />
            </Tab>
            <Tab bg={'none'}>
                <>
                    <IconButton
                        aria-label="Search database"
                        icon={<img src={menu} alt="menu"  width={'20px'} height={'20px'}/>}
                
                        variant={'none'}
                        width={'30px'}
                        height={'30px'}
                        size="md"
                    />
    
                </>
            </Tab>
            <Tab>
                <IconButton
                    aria-label="Search database"
                    icon={<img src={timeline} alt="menu"  width={'45px'} height={'45px'}/>}
            
                    variant={'none'}
                    width={'30px'}
                    height={'30px'}
                    size="md"
                />
            </Tab>
        </TabList>
        </Tabs>
        </Flex>
    );
};

export default FooterTabs;