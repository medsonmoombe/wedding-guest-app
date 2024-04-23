import { Tabs, TabList, Tab, IconButton, Flex, Text } from "@chakra-ui/react";
import { IoImagesOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { FaUtensils } from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";


interface Props {
    activeTabIndex: number;
    setActiveTabIndex: (value: number) => void;
}

const FooterTabs = ({ activeTabIndex, setActiveTabIndex }: Props) => {



    return (
        <Flex justify="center" width="full">
            <Tabs size={'sm'} bg="transparent" width={'full'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}
                index={activeTabIndex} onChange={index => setActiveTabIndex(index)}
            >
                <TabList
                    zIndex={99}
                    display={'flex'}
                    justifyContent={'center'}
                    bg="rgba(243, 246, 241, 0.73)"
                    //   opacity={0.5}
                    py={1}
                    style={{ width: '100%' }}
                    px={4}
                    alignItems={'start'}
                    // opacity="0.5"
                    pb={2}
                    // pt={1}
                    backdropFilter="blur(2px)"
                >
                    <Flex direction={'column'} justify={'center'} align={'center'} width={'full'} >
                        <Tab bg={'none'} _selected={{ color: 'gray', bg: 'blue.100', borderRadius: '20px', width: '80px', height: '40px', border: '1px solid', borderColor:'gray.500' }} height={'40px'}>
                            <IconButton
                                aria-label="Search database"
                                icon={<IoImagesOutline size={30}  color="gray.600" />}
                                width={'40px'}
                                height={'40px'}
                                variant={'none'}
                                size="md"
                            />
                        </Tab>
                        <Text lineHeight={1} mt={'2px'} fontSize={'12px'}  color={ activeTabIndex === 0 ? 'gray.700' : 'gray.600'} fontWeight={activeTabIndex === 0 ? 'bold': 'normal'} textAlign={'center'}>
                        Lembranças
                        </Text>
                    </Flex>
                    <Flex direction={'column'} justify={'center'} align={'center'} width={'full'}>
                        <Tab bg={'none'} _selected={{ color: 'gray', bg: 'blue.100', borderRadius: '20px', width: '80px', height: '40px', border: '1px solid', borderColor:'gray.500' }} height={'40px'}>
                            <IconButton
                                aria-label="Search database"
                                // color={'gray.500'}
                                icon={<LuUsers size={30}  color="gray.600"/>}
                                width={'40px'}
                                height={'40px'}
                                variant={'none'}
                                size="md"
                            />
                        </Tab>
                        <Text lineHeight={1} mt={'2px'} fontSize={'12px'}  color={ activeTabIndex === 1 ? 'gray.700' : 'gray.600'} fontWeight={activeTabIndex === 1 ? 'bold': 'normal'} textAlign={'center'} >
                            Convidados
                        </Text>
                    </Flex>




                    <Flex direction={'column'} justify={'center'} align={'center'} width={'full'}>
                        <Tab bg={'none'} _selected={{ color: 'gray', bg: 'blue.100', borderRadius: '20px', width: '80px', height: '40px', border: '1px solid', borderColor:'gray.500' }} height={'40px'}>
                            <IconButton
                                aria-label="Search database"
                                icon={<FaUtensils size={30} color="gray.600"/>}
                                // color={'gray.500'}
                                variant={'none'}
                                width={'40px'}
                                height={'40px'}
                                size="md"
                            />
                        </Tab>
                        <Text fontSize={'12px'} color={ activeTabIndex === 2 ? 'gray.700' : 'gray.600'} fontWeight={activeTabIndex === 2 ? 'bold': 'normal'} textAlign={'center'}>
                            Cardápio
                        </Text>
                    </Flex>


                    <Flex direction={'column'} justify={'center'} align={'center'} width={'full'}>
                        <Tab bg={'none'} _selected={{ color: 'gray', bg: 'blue.100', borderRadius: '20px', width: '80px', height: '40px', border: '1px solid', borderColor:'gray.500' }} height={'40px'}>
                            <IconButton
                                aria-label="Search database"
                                icon={<MdAccessTime size={30}  color="gray.600"/>}

                                variant={'none'}
                                width={'40px'}
                                height={'40px'}
                                size="md"
                            />
                        </Tab>
                        <Text fontSize={'12px'} color={ activeTabIndex === 3 ? 'gray.700' : 'gray.600'} fontWeight={activeTabIndex === 3 ? 'bold': 'normal'} textAlign={'center'}>
                            Programa
                        </Text>
                    </Flex>


                </TabList>
            </Tabs>
        </Flex>
    );
};

export default FooterTabs;
