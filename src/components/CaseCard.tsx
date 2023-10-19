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
import AppointmentCaseAlert from "./AppointmentComponents/AppointmentCaseAlert";

interface Props {
  caseData: Case;
}

const CaseCard = ({ caseData }: Props) => {
  if (!caseData) {
    return null;
  }

  const {
    caseName,
    caseID,
    caseJury,
    caseLink,
    caseClient,
    appointments,
    _id,
  } = caseData;

  return (
    <Card size="lg" variant="outline" h={"600px"}>
      <CardHeader className="case-card-header" h={"90px"}>
        <Heading fontSize="xl">{caseName}</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="3">
          <Box h={"135px"}>
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
          <AppointmentCaseAlert appointments={appointments} caseId={_id} />
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CaseCard;
