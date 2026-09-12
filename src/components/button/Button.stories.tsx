import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import writeIcon from '@/assets/icons/ic-write.png';

import Button from './Button';
import './Button.stories.css';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: '버튼',
    onClick: fn(),
    className: 'button-story',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'olive', 'oliveOutline'],
    },
    shape: {
      control: 'select',
      options: ['rounded', 'pill'],
    },
    iconPosition: {
      control: 'select',
      options: ['start', 'end'],
    },
    type: {
      control: 'select',
      options: ['button', 'submit'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    shape: 'rounded',
    children: '저장하기',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    shape: 'rounded',
    children: '취소',
  },
};

export const Olive: Story = {
  args: {
    variant: 'olive',
    shape: 'pill',
    children: 'category',
  },
};

export const OliveOutline: Story = {
  args: {
    variant: 'oliveOutline',
    shape: 'pill',
    children: '임시저장',
  },
};

export const Pill: Story = {
  args: {
    variant: 'primary',
    shape: 'pill',
    children: '메인 화면으로',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    shape: 'pill',
    icon: writeIcon,
    children: 'Write',
  },
};

export const WithIconEnd: Story = {
  args: {
    variant: 'primary',
    shape: 'pill',
    icon: writeIcon,
    iconPosition: 'end',
    children: 'Write',
  },
};

export const WithIconClassName: Story = {
  args: {
    variant: 'primary',
    shape: 'pill',
    icon: writeIcon,
    iconClassName: 'button-story-icon',
    children: 'Write',
  },
};

export const AsLink: Story = {
  args: {
    variant: 'primary',
    shape: 'pill',
    href: '/movie/write',
    icon: writeIcon,
    children: 'Write',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    shape: 'rounded',
    disabled: true,
    children: '저장하기',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="button-story-grid">
      <Button className="button-story" variant="primary" shape="rounded">
        primary
      </Button>
      <Button className="button-story" variant="secondary" shape="rounded">
        secondary
      </Button>
      <Button className="button-story" variant="olive" shape="pill">
        olive
      </Button>
      <Button className="button-story" variant="oliveOutline" shape="pill">
        oliveOutline
      </Button>
      <Button
        className="button-story"
        variant="primary"
        shape="pill"
        icon={writeIcon}
      >
        icon start (기본)
      </Button>
      <Button
        className="button-story"
        variant="secondary"
        shape="pill"
        icon={writeIcon}
        iconPosition="end"
      >
        icon end
      </Button>
      <Button className="button-story" variant="primary" disabled>
        disabled
      </Button>
    </div>
  ),
};
