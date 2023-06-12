import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getEmergencyResponsePlanById, updateEmergencyResponsePlanById } from 'apiSdk/emergency-response-plans';
import { Error } from 'components/error';
import { emergencyResponsePlanValidationSchema } from 'validationSchema/emergency-response-plans';
import { EmergencyResponsePlanInterface } from 'interfaces/emergency-response-plan';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { FireDepartmentInterface } from 'interfaces/fire-department';
import { getFireDepartments } from 'apiSdk/fire-departments';

function EmergencyResponsePlanEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<EmergencyResponsePlanInterface>(
    () => (id ? `/emergency-response-plans/${id}` : null),
    () => getEmergencyResponsePlanById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: EmergencyResponsePlanInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateEmergencyResponsePlanById(id, values);
      mutate(updated);
      resetForm();
      router.push('/emergency-response-plans');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<EmergencyResponsePlanInterface>({
    initialValues: data,
    validationSchema: emergencyResponsePlanValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Emergency Response Plan
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
              {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
            </FormControl>
            <FormControl id="description" mb="4" isInvalid={!!formik.errors?.description}>
              <FormLabel>Description</FormLabel>
              <Input type="text" name="description" value={formik.values?.description} onChange={formik.handleChange} />
              {formik.errors.description && <FormErrorMessage>{formik.errors?.description}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<FireDepartmentInterface>
              formik={formik}
              name={'fire_department_id'}
              label={'Select Fire Department'}
              placeholder={'Select Fire Department'}
              fetcher={getFireDepartments}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'emergency_response_plan',
  operation: AccessOperationEnum.UPDATE,
})(EmergencyResponsePlanEditPage);
