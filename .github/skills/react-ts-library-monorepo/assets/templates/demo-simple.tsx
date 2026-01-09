import { ComponentName } from '@workspace/package';
import { MantineDemo } from '@mantinex/demo';

/**
 * Simple static demo
 *
 * This is a basic demonstration showing the component with minimal configuration.
 * Use this pattern for straightforward examples without interactivity.
 */
function Demo() {
  return (
    <ComponentName variant="default" size="md" withBorder>
      Basic example content
    </ComponentName>
  );
}

const code = `
import { ComponentName } from '@your-package/name';

function Demo() {
  return (
    <ComponentName
      variant="default"
      size="md"
      withBorder
    >
      Basic example content
    </ComponentName>
  );
}
`;

export const basicUsage: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};
