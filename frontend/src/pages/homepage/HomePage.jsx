import {
  Avatar,
  Box,
  chakra,
  Flex,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import SuggestionAI from '../../components/homepage/SuggestionAI';
import TopDestination from '../../components/homepage/TopDestination';
import { factories } from '../../factory';
export default function HomePage() {
  return (
    <div className="mx-auto max-w-[80%] 2xl:max-w-[60%] ">
      <TopDestination />
      <SuggestionAI />
      <GridBlurredBackdrop />
    </div>
  );
}

function TestimonialCard({ user, review, star }) {
  const { fullName, profilePictureUrl, index } = user;
  return (
    <Flex
      boxShadow={'lg'}
      maxW={'600px'}
      direction={{ base: 'column-reverse', md: 'row' }}
      width={'full'}
      rounded={'xl'}
      p={10}
      justifyContent={'space-between'}
      position={'relative'}
      bg={useColorModeValue('white', 'gray.100')}
    >
      <Flex direction={'column'} textAlign={'left'} gap={3}>
        <div className="flex flex-row gap-3 font-bold">
          <chakra.p fontFamily={'Inter'} fontWeight={'bold'} fontSize={'20px'}>
            {`${fullName}`}
          </chakra.p>
          <div>
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`fa${i < star ? 's' : 'r'} fa-star text-yellow-500`}
              ></i>
            ))}
          </div>
        </div>
        <chakra.p fontFamily={'Inter'} fontWeight={'medium'} fontSize={'18px'}>
          {review}
        </chakra.p>
      </Flex>
      <Avatar
        src={profilePictureUrl}
        height={'80px'}
        width={'80px'}
        alignSelf={'center'}
        m={{ base: '0 0 35px 0', md: '0 0 0 10px' }}
      />
    </Flex>
  );
}
function GridBlurredBackdrop() {
  const [reviewsPin, setReviews] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    factories.getReviews({ isShow: 1 }).then((data) => {
      setReviews(data);
    });
    factories.getReviews().then((data) => {
      setCount(data.length);
    });
  }, []);
  return (
    <Flex
      textAlign={'center'}
      pt={10}
      justifyContent={'center'}
      direction={'column'}
      width={'full'}
      overflow={'hidden'}
    >
      <Box width={{ base: 'full', sm: 'lg', lg: 'xl' }} margin={'auto'}>
        <chakra.h3
          fontFamily={'Work Sans'}
          fontWeight={'bold'}
          fontSize={25}
          textTransform={'uppercase'}
          color={'purple.400'}
        >
          Khách hàng phản hồi về chúng tôi
        </chakra.h3>
        <chakra.h2
          margin={'auto'}
          width={'70%'}
          fontFamily={'Inter'}
          fontWeight={'medium'}
          color={useColorModeValue('gray.500', 'gray.400')}
        >
          {`Đánh giá dựa trên `}
          <chakra.strong color={useColorModeValue('gray.700', 'gray.50')}>
            {count}
          </chakra.strong>{' '}
          lượt vé đã bán ra
        </chakra.h2>
      </Box>
      <SimpleGrid
        columns={{ base: 1, xl: 2 }}
        spacingX={'10'}
        spacingY={'10'}
        mt={16}
        mb={16}
        mx={'auto'}
      >
        {reviewsPin?.map((cardInfo, index) => (
          <TestimonialCard
            key={index}
            user={cardInfo.userId}
            review={cardInfo.review}
            star={cardInfo.star}
            index={index}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
}
