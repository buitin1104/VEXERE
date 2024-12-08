import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Link,
} from '@nextui-org/react';
import { useAuth } from '../../context/AuthContext';

export default function AdminProfile() {
  const { auth } = useAuth();
  console.log('🚀 ~ AdminProfile ~ auth:', auth);
  return (
    <Card className="mt-10 ml-4 max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src={auth?.profilePictureUrl}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{auth?.fullName}</p>
          <p className="text-small text-default-500">{auth?.branchName}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link>
      </CardFooter>
    </Card>
  );
}
