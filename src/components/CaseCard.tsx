import {
  Card,
  CardBody,
  Heading,
  CardHeader,
  Stack,
  StackDivider,
  Box,
  Text,
  Link,
  Flex,
} from "@chakra-ui/react";
import Case from "../data/models";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import CasePopper from "./CasePopper";

interface Props {
  caseData: Case; // Rename the prop to avoid conflicts with 'case' keyword
}

const CaseCard = ({ caseData }: Props) => {
  if (!caseData) {
    // Add a check for undefined caseData
    return null;
  }

  const { caseName, caseID, caseJury, caseLink, caseClient } = caseData;

  return (
    <>
      <Card size="lg" variant="outline">
        <CardHeader className="case-card-header">
          <Heading fontSize="xl">{caseName}</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="2">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Informacion general:
              </Heading>
              <Text pt={"2"} fontSize={"sm"}>
                Cliente: {caseClient}
              </Text>
              <Text pt="2" fontSize="sm">
                Expediente: {caseID}
              </Text>
              <Text pt="2" fontSize="sm">
                Juzgado: {caseJury}
              </Text>
            </Box>
            <Box>
              <Link href={caseLink} isExternal>
                Documentacion del caso <ExternalLinkIcon mx="2px" />
              </Link>
            </Box>
            <Flex justify={"space-between"} align={"center"}>
              <Link href="#">Mas informacion</Link>
              <CasePopper />
            </Flex>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};

export default CaseCard;
