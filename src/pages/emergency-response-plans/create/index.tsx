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
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createEmergencyResponsePlan } from 'apiSdk/emergency-response-plans';
import { Error } from 'components/error';
import { emergencyResponsePlanValidationSchema } from 'validationSchema/emergency-response-plans';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { FireDepartmentInterface } from 'interfaces/fire-department';
import { getFireDepartments } from 'apiSdk/fire-departments';
import { EmergencyResponsePlanInterface } from 'interfaces/emergency-response-plan';

function EmergencyResponsePlanCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: EmergencyResponsePlanInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createEmergencyResponsePlan(values);
      resetForm();
      router.push('/emergency-response-plans');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<EmergencyResponsePlanInterface>({
    initialValues: {
      name: '',
      description: '',
      fire_department_id: (router.query.fire_department_id as string) ?? null,
    },
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
            Create Emergency Response Plan
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
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
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'emergency_response_plan',
  operation: AccessOperationEnum.CREATE,
})(EmergencyResponsePlanCreatePage);
