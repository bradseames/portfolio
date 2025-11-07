import { Button, Group, SimpleGrid, Textarea, TextInput, Title } from "@mantine/core";
import { useForm, type UseFormReturnType, isEmail } from "@mantine/form";
import { useUncontrolled } from "@mantine/hooks";

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function NameInput({ form }: { form: UseFormReturnType<FormValues> }) {
  return (
    <TextInput
      key={form.key("name")}
      {...form.getInputProps("name")}
      label="Name"
      placeholder="Your name"
      name="name"
      variant="filled"
    />
  );
}

function EmailInput({ form }: { form: UseFormReturnType<FormValues> }) {
  return (
    <TextInput
      key={form.key("email")}
      {...form.getInputProps("email")}
      label="Email"
      placeholder="Your email"
      name="email"
      variant="filled"
    />
  );
}

function SubjectInput({ form }: { form: UseFormReturnType<FormValues> }) {
  return (
    <TextInput
      key={form.key("subject")}
      {...form.getInputProps("subject")}
      label="Subject"
      placeholder="Subject"
      mt="md"
      name="subject"
      variant="filled"
    />
  );
}

function MessageInput({ form }: { form: UseFormReturnType<FormValues> }) {
  return (
    <Textarea
      key={form.key("message")}
      mt="md"
      label="Message"
      placeholder="Your message"
      maxRows={10}
      minRows={5}
      autosize
      name="message"
      variant="filled"
      {...form.getInputProps("message")}
    />
  );
}

export default function ContactForm() {
  const form = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: isEmail("Invalid email"),
      subject: (value) => value.trim().length === 0,
    },
    onValuesChange: (values) => {
      console.log(values);
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} onReset={form.onReset}>
      <Title
        order={2}
        size="h1"
        style={{ fontFamily: "Outfit, var(--mantine-font-family)" }}
        fw={900}
        ta="center"
      >
        Get in touch
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
        <NameInput form={form}></NameInput>
        <EmailInput form={form}></EmailInput>
      </SimpleGrid>

      <SubjectInput form={form}></SubjectInput>
      <MessageInput form={form}></MessageInput>

      <Group justify="center" mt="xl">
        <Button type="submit" size="md">
          Send message
        </Button>
      </Group>
    </form>
  );
}
