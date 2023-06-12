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
import { getUserTrainingProgramById, updateUserTrainingProgramById } from 'apiSdk/user-training-programs';
import { Error } from 'components/error';
import { userTrainingProgramValidationSchema } from 'validationSchema/user-training-programs';
import { UserTrainingProgramInterface } from 'interfaces/user-training-program';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { TrainingProgramInterface } from 'interfaces/training-program';
import { getUsers } from 'apiSdk/users';
import { getTrainingPrograms } from 'apiSdk/training-programs';

function UserTrainingProgramEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<UserTrainingProgramInterface>(
    () => (id ? `/user-training-programs/${id}` : null),
    () => getUserTrainingProgramById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: UserTrainingProgramInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateUserTrainingProgramById(id, values);
      mutate(updated);
      resetForm();
      router.push('/user-training-programs');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<UserTrainingProgramInterface>({
    initialValues: data,
    validationSchema: userTrainingProgramValidationSchema,
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
            Edit User Training Program
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
            <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
              <FormLabel>Status</FormLabel>
              <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
              {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <AsyncSelect<TrainingProgramInterface>
              formik={formik}
              name={'training_program_id'}
              label={'Select Training Program'}
              placeholder={'Select Training Program'}
              fetcher={getTrainingPrograms}
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
  entity: 'user_training_program',
  operation: AccessOperationEnum.UPDATE,
})(UserTrainingProgramEditPage);
