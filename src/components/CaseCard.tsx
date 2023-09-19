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
import { Appointments, Case } from "../data/models";
import { ExternalLinkIcon } from "@chakra-ui/icons";

interface Props {
  caseData: Case; // Rename the prop to avoid conflicts with 'case' keyword
  caseAppointments: Appointments[];
}

const CaseCard = ({ caseData, caseAppointments = [] }: Props) => {
  if (!caseData) {
    // Add a check for undefined caseData
    return null;
  }

  const { caseName, caseID, caseJury, caseLink, caseClient } = caseData;

  const nextNearestAppointment = caseAppointments
    ? caseAppointments
        .filter((appointment) => appointment.date > new Date()) // Filter future appointments
        .sort((a, b) => a.date.getTime() - b.date.getTime())[0] // Sort by date and get the first (nearest) appointment
    : undefined;

  const nearestAppointmentDate = nextNearestAppointment
    ? nextNearestAppointment.date.toLocaleDateString()
    : "No upcoming appointments"; // Display "No upcoming appointments" if there are none

  const relationshipType = "case"; // Replace with the desired type

  const caseSpecificAppointments = caseAppointments.filter((appointment) =>
    appointment.relatedTo.some(
      (related) =>
        related.entityId === caseData._id && related.type === relationshipType
    )
  );

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
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Proximo vencimiento:
              </Heading>
              {caseSpecificAppointments.length === 0 ? (
                <Text>No appointments</Text>
              ) : (
                caseSpecificAppointments.map((appointment) => (
                  <Text key={appointment._id} pt="2" fontSize="sm">
                    {appointment.type}:{" "}
                    {new Date(appointment.date).toLocaleDateString()}
                  </Text>
                ))
              )}
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};

export default CaseCard;
