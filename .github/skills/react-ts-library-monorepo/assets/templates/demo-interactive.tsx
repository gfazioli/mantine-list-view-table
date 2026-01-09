import { useState } from 'react';
import { ComponentName } from '@workspace/package';
import { Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

/**
 * Interactive demo with state
 *
 * This demonstrates a component with state and user interactions.
 * Use this pattern when you need to show dynamic behavior.
 */
function Demo() {
  const [value, setValue] = useState('');
  const [isActive, setIsActive] = useState(false);

  return (
    <Stack gap="md">
      <ComponentName
        value={value}
        onChange={setValue}
        active={isActive}
        onToggle={() => setIsActive((prev) => !prev)}
        variant="filled"
        size="md"
      />

      <Stack gap="xs">
        <Text size="sm">Current value: {value}</Text>
        <Text size="sm">Active: {isActive ? 'Yes' : 'No'}</Text>
      </Stack>
    </Stack>
  );
}

const code = `
import { useState } from 'react';
import { ComponentName } from '@your-package/name';
import { Stack, Text } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState('');
  const [isActive, setIsActive] = useState(false);

  return (
    <Stack gap="md">
      <ComponentName
        value={value}
        onChange={setValue}
        active={isActive}
        onToggle={() => setIsActive((prev) => !prev)}
        variant="filled"
        size="md"
      />
      
      <Stack gap="xs">
        <Text size="sm">Current value: {value}</Text>
        <Text size="sm">Active: {isActive ? 'Yes' : 'No'}</Text>
      </Stack>
    </Stack>
  );
}
`;

export const interactive: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};
