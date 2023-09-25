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
} from "@chakra-ui/react";
import { Case } from "../data/models";
import { ExternalLinkIcon } from "@chakra-ui/icons";

interface Props {
  caseData: Case;
}

const CaseCard = ({ caseData }: Props) => {
  if (!caseData) {
    return null;
  }

  const { caseName, caseID, caseJury, caseLink, caseClient } = caseData;

  return (
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
          <Box>APPOINTMENTS</Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CaseCard;
