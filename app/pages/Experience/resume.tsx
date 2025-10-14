import {Container} from '@mantine/core';

export default function Resume() {
  return (
      <Container>
        <embed
            src="/app/assets/resume.pdf"
            type="application/pdf"
            width="800"
            height="800"
        />
      </Container>
  );
}
